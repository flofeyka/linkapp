import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private postService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log(req.user.id, req.params.id);

    try {

      const postFound = await this.postService.findPostById(req.body.id || req.params.id);
      if(!postFound) {
        throw new NotFoundException("Post with this id is not found");
      }

      console.log(postFound.userId !== req.user.id)

      if(postFound.userId !== req.user.id) {
        throw new BadRequestException("Request is forbidden");
      }

      return true;

    } catch(e) {
      console.log(e);
      throw new BadRequestException('Request is forbidden');
    }

  }
}