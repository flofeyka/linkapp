import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({example: 'email@example.com', description: 'Unique email address'})
  readonly email: string;

  @ApiProperty({example: 'qwerty12345', description: 'Password'})
  readonly password: string;
}