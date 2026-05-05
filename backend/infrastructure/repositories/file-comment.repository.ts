import { promises as fs } from "fs";
import path from "path";
import { Comment } from "../../domain/comment";
import { CommentRepository } from "../../domain/comment.repository";

export class FileCommentRepository implements CommentRepository {
  private readonly filePath = path.resolve(
    __dirname,
    "../database/comments.json"
  );

  async findAll(): Promise<Comment[]> {
    const data = await fs.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async save(comment: Comment): Promise<Comment> {
    const comments = await this.findAll();

    comments.push(comment);

    await fs.writeFile(
      this.filePath,
      JSON.stringify(comments, null, 2),
      "utf-8"
    );

    return comment;
  }
}