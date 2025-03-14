import PostsClient from "@/components/PostsClient";
import { api } from "../services/api";

export default async function PostsPage() {
  const posts = await api.jsonplaceholder.fetchPosts();

  return (
    <main>
      <h2 className="font-bold text-xl mb-6">Publicaciones</h2>
      <PostsClient initialPosts={posts} />
    </main>
  );
}
