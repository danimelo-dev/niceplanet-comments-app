import { Comment } from "./comment"; 

export interface CommentRepository {
  findAll(): Promise<Comment[]>;
  save(comment: Comment): Promise<Comment>;
}