"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditPostFormSchema } from "@/lib/form/post-form";
import { Textarea } from "@/components/ui/textarea";
import { PostsType } from "@/utils/model/post-model";
import { updatePost } from "@/app/actions/post/post-action";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function EditPostForm({ post }: { post: PostsType }) {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof EditPostFormSchema>>({
    resolver: zodResolver(EditPostFormSchema),
    defaultValues: {
      content: post.content,
    },
  });

  async function onSubmit(values: z.infer<typeof EditPostFormSchema>) {
    if (status === "authenticated" && session) {
      try {
        const res = await updatePost(values, post.id);

        if (!res?.ok) {
          toast({
            variant: "destructive",
            title: "Error",
            description: res?.message,
            duration: 3000,
          });

          return;
        }

        toast({
          variant: "success",
          title: "Success",
          description: res?.message,
          duration: 3000,
        });

        router.push("/");
      } catch (error) {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
            duration: 3000,
          });
          console.error(error);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error occurred",
            duration: 3000,
          });
          console.error(error);
        }
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-screen-sm flex-col space-y-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Share your thoughts here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="ml-auto">
          Post
        </Button>
      </form>
    </Form>
  );
}
