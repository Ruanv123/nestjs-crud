import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsString()
    ingredients: string;

    @ApiProperty()
    @IsString()
    instructions: string;

    @ApiProperty()
    @IsNumber()
    userId: number;
}
