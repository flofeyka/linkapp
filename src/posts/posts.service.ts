import { Injectable, NotFoundException } from "@nestjs/common";
import { PostModel } from "./posts.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class PostsService {
  constructor(@InjectModel(PostModel) private readonly postRepository: typeof PostModel) {}

  async createPost({ message, userId }): Promise<PostModel> {
    return await this.postRepository.create({ message, userId });
  }

  async updatePost({ message, id }): Promise<PostModel> {
    const result = await this.postRepository.update({ message }, {
      where: {
        id
      }
    });

    if (result[0] === 0) {
      throw new NotFoundException("Post with this id is not found");
    }

    return await this.findPostById(id);

  }

  async deletePost({ id }): Promise<boolean> {
    const postFound = await this.findPostById(id);
    if (!postFound) {
      throw new NotFoundException("Post with this id is not found");
    }

    const deletedPost = await this.postRepository.update({ isDeleted: true }, {
      where: { id }
    });

    return deletedPost[0] === 1;
  }

  async restorePost({ id }): Promise<PostModel> {
    const restoredPost = await this.postRepository.update({ isDeleted: false }, {
      where: {
        id
      }
    });

    if (restoredPost[0] !== 1) {
      throw new NotFoundException("Post with this id is not found");
    }

    return await this.findPostById(id);
  }

  async findPostById(id: number): Promise<PostModel> {
    return await this.postRepository.findByPk(id);
  }

  async getUsersPosts(userId: number): Promise<PostModel[]> {
    // const postsFound = await this.postRepository.findAll({
    //   userId: userId
    // });

    return postsFound;
  }
}
