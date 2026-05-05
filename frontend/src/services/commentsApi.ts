export type Comment = {
  name: string;
  message: string;
};

const API_URL = "http://localhost:3001";

export async function getComments(): Promise<Comment[]> {
  const response = await fetch(`${API_URL}/comments`);

  if (!response.ok) {
    throw new Error("Erro ao buscar comentários");
  }

  return response.json();
}

export async function createComment(comment: Comment): Promise<Comment> {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-correlation-id": crypto.randomUUID(),
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar comentário");
  }

  return response.json();
}