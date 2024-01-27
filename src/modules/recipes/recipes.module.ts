import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { DbModule } from 'src/services/db/db.module';

@Module({
    controllers: [RecipesController],
    providers: [RecipesService],
    imports: [DbModule],
})
export class RecipesModule {}
