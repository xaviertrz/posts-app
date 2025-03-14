"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Comment } from "@/app/types";

const formSchema = z.object({
  name: z.string().min(1, { message: "El título no puede estar vacío." }),
  email: z.string().email().default("you@email.com"),
  comment: z
    .string()
    .min(1, { message: "El comentario no puede estar vacío." }),
});

export function CommentForm({
  onNewComment,
  postId,
}: {
  onNewComment: (comment: Comment) => void;
  postId: number;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "you@email.com",
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    setTimeout(() => {
      const newComment = {
        name: values.name,
        email: values.email,
        body: values.comment,
        id: Date.now(),
        postId: postId,
      };

      onNewComment(newComment);
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="mb-8 border rounded-2xl p-4 shadow-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 justify-end"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Escribe un título..."
                    {...field}
                    className="focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Escribe un comentario..."
                    {...field}
                    className="focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            variant="default"
            className="w-fit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Comentando..." : "Comentar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
