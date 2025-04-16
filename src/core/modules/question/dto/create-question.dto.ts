import { IsNotEmpty } from 'class-validator';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
    @IsNotEmpty()
    type: QuestionType;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    directionId: number;
}
