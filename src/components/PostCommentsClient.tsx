"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Comment } from "@/app/types";
import dynamic from "next/dynamic";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { api } from "@/app/services/api";
import { CommentForm } from "./CommentForm";

const Comments = dynamic(() => import("@/components/Comments"), { ssr: false });

export default function PostCommentsClient({
  initialComments,
  postId,
}: {
  initialComments: Comment[];
  postId: string;
}) {
  const [localComments, setLocalComments] =
    useState<Comment[]>(initialComments);

  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => api.jsonplaceholder.fetchComments(postId),
    initialData: initialComments,
  });

  const handleNewComment = (newComment: Comment) => {
    setLocalComments((prev) => [newComment, ...prev]);
  };

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>Ocurrió un error: {error.message}</p>;

  return (
    <main>
      <div className="mb-6">
        <Link href={`/posts/${postId}`}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Volver al post
          </Button>
        </Link>
      </div>

      <h2 className="font-bold text-xl mb-6">Comentarios</h2>

      <CommentForm onNewComment={handleNewComment} postId={Number(postId)} />

      {comments.length >= 1 ? (
        <Comments comments={localComments} />
      ) : (
        <p>No se encontraron comentarios</p>
      )}
    </main>
  );
}
