import PostDetailClient from "@/components/PostDetailClient";
import { api } from "../../services/api";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await api.jsonplaceholder.fetchPost(params.id);

  return <PostDetailClient initialPost={post} />;
}
