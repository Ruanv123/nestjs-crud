import { Type } from 'class-transformer';
import {
    IsISO8601,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

export class UserObject {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}

export class Recipe {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    ingredients: string;

    @IsString()
    instructions: string;

    @IsString()
    @IsISO8601()
    createdAt: string;

    @IsString()
    @IsISO8601()
    updatedAt: string;

    @ValidateNested()
    @Type(() => UserObject)
    user: UserObject[];
}
