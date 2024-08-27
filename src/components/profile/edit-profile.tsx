"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { editUsernameFormSchema } from "@/lib/form/profile-form";
import { Session } from "next-auth";
import { useToast } from "@/components/ui/use-toast";
import { updateUsername } from "@/lib/action/profile-action";

export default function EditProfile({ session }: { session: Session }) {
  const [isEdit, setIsEdit] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editUsernameFormSchema>>({
    resolver: zodResolver(editUsernameFormSchema),
    defaultValues: {
      username: session.user.username || "",
    },
  });

  async function onSubmit(values: z.infer<typeof editUsernameFormSchema>) {
    try {
      const res = await updateUsername(values);

      if (res.code !== 200) {
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
      setIsEdit(!isEdit);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-sm flex-col space-y-4 pb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div className="inline-flex w-full items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      disabled={!isEdit}
                    />
                  </FormControl>
                  {!isEdit && (
                    <Button type="button" onClick={() => setIsEdit(!isEdit)}>
                      Edit
                    </Button>
                  )}
                  {isEdit && <Button type="submit">Save</Button>}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
