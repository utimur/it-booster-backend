import { IsNotEmpty, IsDate } from 'class-validator';

export class Direction {
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
