"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreatePostFormSchema } from "@/lib/form/post-form";

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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { createPost } from "@/lib/action/post-action";
import { useToast } from "@/components/ui/use-toast";

export default function AddPostForm() {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreatePostFormSchema>>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreatePostFormSchema>) {
    if (status === "authenticated" && session) {
      try {
        const res = await createPost(values);

        if (res.code !== 201) {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.message,
            duration: 3000,
          });
          return;
        }

        toast({
          variant: "success",
          title: "Success",
          description: res.message,
          duration: 3000,
        });
      } catch (error) {
        console.error(error);
      } finally {
        form.reset();
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="itemsflex mx-auto flex w-full max-w-screen-sm flex-col space-y-2"
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
