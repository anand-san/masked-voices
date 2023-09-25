"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useUser } from "@clerk/nextjs";

const WS_URL = "ws://127.0.0.1:3112";

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "A comment should be of minimum 2 letters",
  }),
});

export default function EditorComments() {
  const [isMounted, setIsMounted] = useState(false);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  const { user } = useUser();
  const filteredUser = useMemo(
    () => ({
      fullName: user?.fullName,
      profileUrl: user?.imageUrl,
    }),
    [user]
  );
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(WS_URL);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      // setMessageHistory((prev) => prev.concat(lastMessage));
      // setMessageHistory([...messageHistory, lastMessage.data]);
    }
  }, [lastJsonMessage, setMessageHistory, messageHistory]);

  useEffect(() => {
    if (filteredUser.fullName && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        user: filteredUser,
        message: "Connected",
        dateTime: Date().toLocaleUpperCase(),
      });
    }
  }, [filteredUser, sendJsonMessage, readyState]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      sendJsonMessage({
        user: filteredUser,
        message: values.comment,
        dateTime: Date().toLocaleUpperCase(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex justify-center items-center w-full"
        >
          <div className="space-y-2 px-4">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Comment
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={false}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-96"
                        placeholder="What do you think?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button variant="primary" disabled={false} className="w-24">
            Post
          </Button>
        </form>
      </Form>
      <hr className="w-full mt-8" />

      {lastJsonMessage ? (
        <span>Last message: {JSON.stringify(lastJsonMessage)}</span>
      ) : null}
      {/* <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul> */}
    </div>
  );
}
