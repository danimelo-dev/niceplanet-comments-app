import { useState } from "react";
import type { FormEvent } from "react";
import { createComment } from "../services/commentsApi";
import type { Comment } from "../services/commentsApi";
type Props = {
  onCommentCreated: (comment: Comment) => void;
};

export function CommentForm({ onCommentCreated }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !message.trim()) {
      setError("Preencha nome e mensagem.");
      return;
    }

    try {
      setIsSubmitting(true);

      const comment = await createComment({
        name: name.trim(),
        message: message.trim(),
      });

      onCommentCreated(comment);
      setName("");
      setMessage("");
    } catch {
      setError("Não foi possível enviar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          value={name}
          placeholder="Digite seu nome"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          value={message}
          placeholder="Escreva sua mensagem"
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}