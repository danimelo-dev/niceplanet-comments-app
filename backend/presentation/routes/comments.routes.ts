import { Router } from "express";
import { CommentsController } from "../controllers/comments.controller";
import { CreateCommentUseCase } from "../../application/create-comment.usecase";
import { ListCommentsUseCase } from "../../application/list-comments.usecase";
import { FileCommentRepository } from "../../infrastructure/repositories/file-comment.repository";

const routes = Router();

const commentRepository = new FileCommentRepository();

const createCommentUseCase = new CreateCommentUseCase(commentRepository);
const listCommentsUseCase = new ListCommentsUseCase(commentRepository);

const commentsController = new CommentsController(
  createCommentUseCase,
  listCommentsUseCase
);

routes.get("/comments", (req, res) => commentsController.list(req, res));
routes.post("/comments", (req, res) => commentsController.create(req, res));

export { routes as commentsRoutes };