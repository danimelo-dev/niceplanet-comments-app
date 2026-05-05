import type { Comment } from "../services/commentsApi";

type Props = {
  comments: Comment[];
};

export function CommentList({ comments }: Props) {
  if (comments.length === 0) {
    return <p className="empty">Nenhum comentário ainda. Seja o primeiro!</p>;
  }

  return (
    <section className="comments-list">
      {comments.map((comment, index) => (
        <article className="comment-card" key={`${comment.name}-${index}`}>
          <strong>{comment.name}</strong>
          <p>{comment.message}</p>
        </article>
      ))}
    </section>
  );
}