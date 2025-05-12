import { IsDate, IsNotEmpty } from 'class-validator';

export class Category {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsDate()
    createdAt: string;

    @IsDate()
    updatedAt: string;
}
