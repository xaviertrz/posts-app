import PostCommentsClient from "@/components/PostCommentsClient";
import { api } from "../../../services/api";

export default async function PostCommentsPage({
  params,
}: {
  params: { id: string };
}) {
  const comments = await api.jsonplaceholder.fetchComments(params.id);

  return <PostCommentsClient initialComments={comments} postId={params.id} />;
}
