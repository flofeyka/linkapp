import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { ApiProperty } from "@nestjs/swagger";

interface PostsAttr {
  userId: number;
  message: string;
}
@Table({tableName: "posts"})
export class PostModel extends Model<PostModel, PostsAttr> {
  @ApiProperty({example: "1", description: "Unique identification" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: "1", description: "Unique user's identification" })
  @Column({type: DataType.INTEGER})
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({example: "It's a new post", description: "Post message"})
  @Column({type: DataType.STRING, allowNull: false})
  message: string;

  @ApiProperty({example: true, description: "Is post banned or deleted"})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isDeleted: boolean;

}