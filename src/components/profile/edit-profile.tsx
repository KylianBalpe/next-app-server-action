"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import React from "react";
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
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { editProfileFormSchema } from "@/lib/form/profile-form";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export default function EditProfile({ session }: { session: Session }) {
  const [isEdit, setIsEdit] = React.useState(false);

  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: session.user.name || "",
      username: session.user.username,
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const response = await res.json();
    } catch (error) {
      console.error(error);
    } finally {
      setIsEdit(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-sm flex-col space-y-4">
      <Button onClick={() => setIsEdit(!isEdit)} className="mx-auto max-w-max">
        <Pencil className="mr-2 h-4 w-4" /> Edit Profile
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} disabled={!isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} disabled={!isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEdit && <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
}
