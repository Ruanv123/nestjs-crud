import { Module } from '@nestjs/common';
import { DbService } from './services/db/db.service';
import { DbModule } from './services/db/db.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [DbModule, RecipesModule, UserModule, AuthModule],
    controllers: [],
    providers: [DbService],
})
export class AppModule {}
