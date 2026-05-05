import { Request, Response } from "express";
import { CreateCommentUseCase } from "../../application/create-comment.usecase";
import { ListCommentsUseCase } from "../../application/list-comments.usecase";

export class CommentsController {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly listCommentsUseCase: ListCommentsUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const comment = await this.createCommentUseCase.execute(req.body);
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async list(req: Request, res: Response) {
    const comments = await this.listCommentsUseCase.execute();
    return res.status(200).json(comments);
  }
}