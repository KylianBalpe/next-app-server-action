"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EditPostFormSchema } from "@/lib/form/post-form";

export default function EditPostForm({ postId }: { postId: string }) {
  // const post = await

  const form = useForm<z.infer<typeof EditPostFormSchema>>({
    resolver: zodResolver(EditPostFormSchema),
    defaultValues: {
      content: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EditPostFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return <div>EditPostForm</div>;
}
