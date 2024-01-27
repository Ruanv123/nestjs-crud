import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { DbService } from 'src/services/db/db.service';
import { Recipe } from '@prisma/client';

@Injectable()
export class RecipesService {
    constructor(private readonly db: DbService) {}

    async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return await this.db.recipe.create({
            data: createRecipeDto,
        });
    }

    async findAll(): Promise<Recipe[]> {
        return await this.db.recipe.findMany();
    }

    async findOne(id: number): Promise<Recipe> {
        return await this.db.recipe.findUnique({
            where: { id },
        });
    }

    async update(
        id: number,
        updateRecipeDto: UpdateRecipeDto,
    ): Promise<Recipe> {
        return await this.db.recipe.update({
            where: { id },
            data: updateRecipeDto,
        });
    }

    async remove(id: number) {
        await this.db.recipe.delete({
            where: { id },
        });

        return;
    }
}
