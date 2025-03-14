"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Comment } from "@/app/types";

export default function Comments({ comments }: { comments: Comment[] }) {
  return (
    <section className="flex flex-col gap-7">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <CardTitle>{comment.name}</CardTitle>
            <CardDescription>{comment.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-ellipsis">{comment.body}</CardContent>
        </Card>
      ))}
    </section>
  );
}
