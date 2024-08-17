import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user-dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../users/user.model";


@ApiTags("Auth API")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({ summary: "Registration" })
  @ApiResponse({
    status: 200, type: User, example: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlbWFpbEBlbWFpbC5ydSIsImlhdCI6MTcyMzgyNDgxOSwiZXhwIjoxNzIzOTExMjE5fQ.USbZF_rabRYQBjyjq5vpMhI-cRxjkWUIj85p_8Jpg-g"
    }
  })
  @ApiResponse({
    status: 400, example: {
      message: "User with this email is already existed",
      statusCode: 400
    }
  })
  @Post("/signup")
  async signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }


  @ApiOperation({ summary: "Authorization" })
  @ApiResponse({
    status: 200, example: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlbWFpbEBlbWFpbC5ydSIsImlhdCI6MTcyMzgyNDgxOSwiZXhwIjoxNzIzOTExMjE5fQ.USbZF_rabRYQBjyjq5vpMhI-cRxjkWUIj85p_8Jpg-g"
    }
  })
  @ApiResponse({
    status: 400, example: {
      message: "Wrong email or password",
      statusCode: 400
    }
  })
  @Post("/signin")
  async signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }
}
