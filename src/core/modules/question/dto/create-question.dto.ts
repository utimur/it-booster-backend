import { IsNotEmpty } from 'class-validator';
import { QuestionType } from '@generated/client';

export class CreateQuestionDto {
    @IsNotEmpty()
    type: QuestionType;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    directionId: number;
}
