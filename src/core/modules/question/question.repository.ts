import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import {
    Question,
    Prisma,
    InterviewQuestion,
    Category,
} from '@generated/client';

export type CategoryNode = {
    id: number;
    title: string;
    questions: Question[];
    children: CategoryNode[];
};

function buildCategoryTree(
    categories: Category[],
    questionMap: Map<number, Question[]>,
): CategoryNode[] {
    const idToCategory: Record<
        number,
        Category & { questions: Question[]; children: Category[] }
    > = {};
    const rootCategories: (Category & {
        questions: Question[];
        children: Category[];
    })[] = [];

    // Расширяем категории
    for (const cat of categories) {
        idToCategory[cat.id] = {
            ...cat,
            questions: [],
            children: [],
        };
    }

    // Привязываем вопросы к категориям
    for (const [categoryId, qs] of questionMap.entries()) {
        if (idToCategory[categoryId]) {
            idToCategory[categoryId].questions = qs;
        }
    }

    // Строим иерархию
    for (const category of Object.values(idToCategory)) {
        if (category.parentId != null) {
            const parent = idToCategory[category.parentId];
            if (parent) {
                parent.children.push(category);
            }
        } else {
            rootCategories.push(category);
        }
    }

    // Фильтруем дерево и возвращаем только нужные ветки
    function filterEmptyBranches(
        cat: Category & { questions: Question[]; children: Category[] },
    ): CategoryNode | null {
        const filteredChildren: CategoryNode[] = cat.children
            .map((child) => filterEmptyBranches(idToCategory[child.id]))
            .filter((c): c is CategoryNode => c !== null);

        const hasQuestions = cat.questions.length > 0;

        if (hasQuestions || filteredChildren.length > 0) {
            return {
                id: cat.id,
                title: cat.title,
                questions: cat.questions,
                children: filteredChildren,
            };
        }

        return null;
    }

    return rootCategories
        .map(filterEmptyBranches)
        .filter((c): c is CategoryNode => c !== null);
}

@Injectable()
export class QuestionRepository {
    constructor(private prisma: PrismaService) {}

    create(createQuestionDto: Prisma.QuestionCreateInput): Promise<Question> {
        return this.prisma.question.create({
            data: {
                ...createQuestionDto,
            },
        });
    }

    findAll(): Promise<Question[]> {
        return this.prisma.question.findMany();
    }

    findByInterviewId({
        interviewId,
    }: {
        interviewId: number;
    }): Promise<InterviewQuestion[]> {
        return this.prisma.interviewQuestion.findMany({
            where: {
                interview: {
                    id: interviewId,
                },
            },
            include: {
                question: true,
            },
        });
    }

    findOneByPosition({
        interviewId,
        position,
    }: {
        interviewId: number;
        position: number;
    }): Promise<InterviewQuestion | null> {
        return this.prisma.interviewQuestion.findFirst({
            where: {
                position,
                interview: {
                    id: interviewId,
                },
            },
            include: {
                question: {
                    include: {
                        answers: {
                            select: {
                                id: true,
                                text: true,
                                questionId: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findAllByDirection({ directionId }: { directionId: number }) {
        const questionsWithCategory = await this.prisma.question.findMany({
            where: { directionId },
            include: {
                category: true,
            },
        });

        const categoryIdToQuestions = new Map<number, Question[]>();

        for (const question of questionsWithCategory) {
            const catId = question.categoryId;
            if (!categoryIdToQuestions.has(catId)) {
                categoryIdToQuestions.set(catId, []);
            }
            categoryIdToQuestions.get(catId)!.push(question);
        }

        const allCategories = await this.prisma.category.findMany({
            include: {
                parent: true,
                children: true,
            },
        });

        return buildCategoryTree(allCategories, categoryIdToQuestions);
    }

    findOne(id: number): Promise<Question | null> {
        return this.prisma.question.findUnique({
            where: { id: id },
            include: { category: true },
        });
    }

    update(
        id: number,
        updateQuestionDto: Prisma.QuestionUpdateInput,
    ): Promise<Question> {
        return this.prisma.question.update({
            data: {
                ...updateQuestionDto,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<Question> {
        return this.prisma.question.delete({ where: { id: id } });
    }
}
