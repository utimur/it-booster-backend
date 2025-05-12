import { IsNotEmpty } from 'class-validator';
import { QuestionType } from '@generated/client';

export class UpdateQuestionDto {
    @IsNotEmpty()
    type: QuestionType;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    directionId: number;
}
