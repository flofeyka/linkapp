import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user-dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  async signIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = this.generateToken(user);
    return { user, token };
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("User with this email is already existed", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    const token = this.generateToken(user);

    return { user, token };
  }

  private generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email
    };

    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException("Wrong email or password", HttpStatus.UNAUTHORIZED);
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwordEquals) {
      throw new HttpException("Wrong email or password", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
