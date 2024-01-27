import { IsString } from 'class-validator';

export class Recipe {
    id: number;

    @IsString()
    title: string;
}
