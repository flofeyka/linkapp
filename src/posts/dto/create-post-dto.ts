import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {

  @ApiProperty({
    example: 'It`s the post message'
  })
  readonly message: string;
}