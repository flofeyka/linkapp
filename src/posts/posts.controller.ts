import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PostGuard } from "./post-guard";
import { PostModel } from "./posts.model";
import { CreatePostDto } from "./dto/create-post-dto";


@ApiTags("Post API")
@Controller("posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: "Create post" })
  @ApiResponse({ status: HttpStatus.CREATED, type: PostModel })

  @UseGuards(JwtAuthGuard)
  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  async CreatePost(@Body() postDto: CreatePostDto, @Request() req) {
    return this.postService.createPost({ message: postDto.message, userId: req.user.id });
  }

  @ApiOperation({ summary: "Update post" })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  @UseGuards(JwtAuthGuard, PostGuard)
  @Put("/update/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  async UpdatePost(@Body() postDto: CreatePostDto, @Param("id") id: number) {
    return this.postService.updatePost({ message: postDto.message, id });
  }


  @ApiOperation({ summary: "Delete post message" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, type: PostModel })
  @UseGuards(JwtAuthGuard, PostGuard)
  @Delete("/delete/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async DeletePost(@Param("id") id: number) {
    return await this.postService.deletePost({ id });
  }

  @ApiOperation({ summary: "Restore deleted post" })
  @ApiResponse({ status: HttpStatus.CREATED, type: PostModel })
  @UseGuards(JwtAuthGuard, PostGuard)
  @Post("/restore/:id")
  @HttpCode(HttpStatus.CREATED)
  async RestorePost(@Param("id") id: number) {
    return await this.postService.restorePost({ id });
  }


}
