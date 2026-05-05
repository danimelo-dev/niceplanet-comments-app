import { useEffect, useState } from "react";
import { CommentForm } from "./components/CommentForm";
import { CommentList } from "./components/CommentList";
import { getComments } from "./services/commentsApi";
import type { Comment } from "./services/commentsApi";
import "./App.css";

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchComments() {
      try {
        const data = await getComments();

        if (isMounted) {
          setComments(data);
          setError("");
        }
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar os comentários.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleCommentCreated(comment: Comment) {
    setComments((currentComments) => [...currentComments, comment]);
  }

  return (
    <main className="page">
      <section className="container">
        <header className="header">
          <span>Mural de Comentários</span>
          <h1>Compartilhe sua mensagem</h1>
          <p>Escreva um comentário e veja ele aparecer na lista em tempo real.</p>
        </header>

        <CommentForm onCommentCreated={handleCommentCreated} />

        <section className="comments-section">
          <h2>Comentários</h2>

          {isLoading && <p className="loading">Carregando comentários...</p>}
          {error && <p className="error">{error}</p>}
          {!isLoading && !error && <CommentList comments={comments} />}
        </section>
      </section>
    </main>
  );
}

export default App;