"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/services/api";
import { Post } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function PostDetailClient({
  initialPost,
}: {
  initialPost: Post;
}) {
  const postId = initialPost.id;

  const {
    data: post,
    isPending,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => api.jsonplaceholder.fetchPost(postId.toString()),
    initialData: initialPost,
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>Error al obtener la publicación.</p>;
  if (!post) return <p>Publicación no encontrada.</p>;

  return (
    <main>
      <div className="mb-6 flex justify-between">
        <Link href="/posts">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Volver a la lista
          </Button>
        </Link>

        <Link href={`/posts/${postId}/comments`}>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Ver comentarios
          </Button>
        </Link>
      </div>

      <Card className="max-w-3xl mx-auto bg-inherit">
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{post.body}</CardContent>
      </Card>
    </main>
  );
}
