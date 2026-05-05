import { CommentRepository } from "../domain/comment.repository";

export class ListCommentsUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute() {
    // 📍 Log de entrada
    console.log(
      JSON.stringify({
        event: "comments_list_requested",
        timestamp: new Date().toISOString(),
      })
    );

    try {
      const comments = await this.commentRepository.findAll();

      // 📍 Log de sucesso
      console.log(
        JSON.stringify({
          event: "comments_list_success",
          total: comments.length,
          timestamp: new Date().toISOString(),
        })
      );

      return comments;
    } catch (error: any) {
      // 📍 Log de erro
      console.error(
        JSON.stringify({
          event: "comments_list_failed",
          error: error.message,
          timestamp: new Date().toISOString(),
        })
      );

      throw error;
    }
  }
}