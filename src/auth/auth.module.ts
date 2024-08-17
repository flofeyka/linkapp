import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from "../users/users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/user.model";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: "1d",
      }
    }),
    forwardRef(() =>     UsersModule)
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
