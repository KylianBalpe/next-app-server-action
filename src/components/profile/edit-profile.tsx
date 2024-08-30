"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { EditUsernameFormSchema } from "@/lib/form/profile-form";
import { Session } from "next-auth";
import { useToast } from "@/components/ui/use-toast";
import { updateUsername } from "@/app/actions/profile/profile-action";

export default function EditProfile({ session }: { session: Session }) {
  const [isEdit, setIsEdit] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EditUsernameFormSchema>>({
    resolver: zodResolver(EditUsernameFormSchema),
    defaultValues: {
      username: session.user.username || "",
    },
  });

  async function onSubmit(values: z.infer<typeof EditUsernameFormSchema>) {
    try {
      const res = await updateUsername(values);

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
        description: "Username updated successfully",
        duration: 3000,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
          duration: 3000,
        });
      }
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
