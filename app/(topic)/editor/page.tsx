"use client";
import React from "react";
import { Editor } from "novel";
import EditorComments from "@/components/comments";
import { defaultEditorContent } from "./default-content";

export default function SetupApge() {
  const editable = () => true;

  return (
    <div className="flex mt-6 flex-col items-center justify-start">
      <Editor
        defaultValue={defaultEditorContent}
        className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:rounded-lg sm:border sm:shadow-lg mb-6"
        onUpdate={console.log}
        storageKey={"__content"}
        editorProps={{
          editable,
        }}
      />
      <EditorComments />
    </div>
  );
}
