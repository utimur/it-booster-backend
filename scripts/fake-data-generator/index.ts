import {
    PrismaClient,
    QuestionType,
    UserRole,
} from '../../generated/prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function generateFakeMarkdown(): string {
    const title = `# ${faker.company.catchPhrase()}`;
    const subtitle = `## ${faker.company.name()}`;

    const paragraph = () => `\n${faker.lorem.paragraphs(2)}`;
    const list = () =>
        `- ${faker.lorem.words(3)}\n- ${faker.lorem.words(3)}- ${faker.lorem.words(3)}`;
    const codeBlock = () =>
        `\`\`\`js\nconsole.log('${faker.hacker.phrase()}')\n\`\`\``;

    return `${title}
        ${subtitle}
        ${paragraph()}
        ${list()}
        ${codeBlock()}
        ${paragraph()}
        ${subtitle}
    `;
}

async function main() {
    const directionTitles = faker.helpers.uniqueArray(
        () => faker.name.jobTitle(),
        5,
    );
    const categoryTitles = faker.helpers.uniqueArray(
        () => faker.word.noun(),
        5,
    );

    const directions = await Promise.all(
        directionTitles.map((title) =>
            prisma.direction.create({ data: { title } }),
        ),
    );

    const categories = await Promise.all(
        categoryTitles.map((title) =>
            prisma.category.create({ data: { title } }),
        ),
    );

    const mainUser = await prisma.user.create({
        data: {
            role: UserRole.admin,
            firstName: 'Ulbi',
            lastName: 'Timur',
            username: 'timap_07',
            authDate: new Date(),
            photoUrl: null,
            telegramId: 385456129,
        },
    });

    const telegramIds = faker.helpers.uniqueArray(
        () => faker.number.int({ min: 100000, max: 999999 }),
        10,
    );
    const users = await Promise.all(
        telegramIds.map((id) =>
            prisma.user.create({
                data: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    username: faker.internet.userName(),
                    authDate: faker.date.recent(),
                    photoUrl: faker.image.avatar(),
                    telegramId: id,
                    role: UserRole.user,
                },
            }),
        ),
    );

    await Promise.all(
        users.map((user) =>
            prisma.session.create({
                data: {
                    userId: user.id,
                    tgHash: faker.string.alphanumeric(24),
                    token: faker.string.uuid(),
                },
            }),
        ),
    );

    // Вопросы и ответы
    const questions = await Promise.all(
        Array.from({ length: 20 }).map(async () => {
            const category = faker.helpers.arrayElement(categories);
            const direction = faker.helpers.arrayElement(directions);

            const question = await prisma.question.create({
                data: {
                    text: faker.lorem.sentence(),
                    title: faker.word.noun(),
                    type: faker.helpers.arrayElement(
                        Object.values(QuestionType),
                    ),
                    explanation: generateFakeMarkdown(),
                    categoryId: category.id,
                    directionId: direction.id,
                },
            });

            const answers = await Promise.all(
                Array.from({
                    length: faker.number.int({ min: 2, max: 3 }),
                }).map((_, index) =>
                    prisma.answer.create({
                        data: {
                            text: faker.lorem.words(3),
                            isCorrect: index === 0,
                            questionId: question.id,
                        },
                    }),
                ),
            );

            return { question, answers };
        }),
    );

    const usedDirectionIds = new Set<number>();
    const interviews: any[] = [];

    for (let i = 0; i < 5; i++) {
        const direction = directions.find((d) => !usedDirectionIds.has(d.id));
        if (!direction) break;
        usedDirectionIds.add(direction.id);

        const interview = await prisma.interview.create({
            data: {
                authorId: mainUser.id,
                directionId: direction.id,
                categories: {
                    connect: [
                        { id: categories[i % categories.length].id },
                        { id: categories[(i + 1) % categories.length].id },
                    ],
                },
            },
        });

        interviews.push(interview);
    }

    // Уникальность ответа
    const usedAnswerIds = new Set<number>();

    for (const interview of interviews) {
        const shuffledQuestions = faker.helpers.shuffle(questions);
        const picked = shuffledQuestions.slice(0, 10);

        for (let position = 1; position <= picked.length; position++) {
            const { question, answers } = picked[position - 1];

            const interviewQuestion = await prisma.interviewQuestion.create({
                data: {
                    position,
                    interviewId: interview.id,
                    questionId: question.id,
                },
            });

            const availableAnswers = answers.filter(
                (a) => !usedAnswerIds.has(a.id),
            );
            if (availableAnswers.length === 0) {
                console.warn(
                    '❗ Нет доступных ответов для вопроса:',
                    question.id,
                );
                continue;
            }

            const answer = faker.helpers.arrayElement(availableAnswers);
            usedAnswerIds.add(answer.id);

            await prisma.interviewQuestionAnswer.create({
                data: {
                    interviewQuestionId: interviewQuestion.id,
                    answerId: answer.id,
                },
            });
        }
    }

    console.log('🌱 Seed data inserted');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
