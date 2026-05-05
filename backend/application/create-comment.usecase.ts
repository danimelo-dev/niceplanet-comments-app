import { CommentRepository } from "../domain/comment.repository";

export class CreateCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(input: { name: string; message: string }) {
    // 📍 Log de entrada (evento de negócio)
    console.log(
      JSON.stringify({
        event: "comment_create_requested",
        name: input.name,
        messageLength: input.message?.length || 0,
        timestamp: new Date().toISOString(),
      })
    );

    if (!input.name?.trim() || !input.message?.trim()) {
      console.error(
        JSON.stringify({
          event: "comment_create_validation_error",
          reason: "Name and message are required",
          timestamp: new Date().toISOString(),
        })
      );

      throw new Error("Name and message are required");
    }

    const comment = {
      name: input.name.trim(),
      message: input.message.trim(),
    };

    try {
      const saved = await this.commentRepository.save(comment);

      // 📍 Log de sucesso
      console.log(
        JSON.stringify({
          event: "comment_created",
          name: saved.name,
          timestamp: new Date().toISOString(),
        })
      );

      return saved;
    } catch (error: any) {
      // 📍 Log de erro de infra (propagado)
      console.error(
        JSON.stringify({
          event: "comment_create_failed",
          error: error.message,
          timestamp: new Date().toISOString(),
        })
      );

      throw error;
    }
  }
}