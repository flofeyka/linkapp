import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import * as process from "node:process";
import { User } from "./users/user.model";
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { PostModel } from "./posts/posts.model";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, PostModel],
      autoLoadModels: true,
      dialectOptions: { ssl: { require: true } },
    })
    ,UsersModule, PostsModule, AuthModule],
})
export class AppModule {

}