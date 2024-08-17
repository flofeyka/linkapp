import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { PostModel } from "./posts.model";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([PostModel]),
    forwardRef(() => AuthModule),
  ]
})
export class PostsModule {}
