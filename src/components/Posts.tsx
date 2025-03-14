import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/app/types";

function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-7">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>{post.body}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
