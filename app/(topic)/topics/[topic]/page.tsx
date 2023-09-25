"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "novel";
import EditorComments from "@/components/comments";
import { defaultEditorContent } from "./default-content";
import axios from "axios";

interface TopicParams {
  topic: string;
}

interface TopicProps {
  params: TopicParams;
}

export default function Topic({ params }: TopicProps) {
  const [saveStatus, setSaveStatus] = useState("");
  const [editorContent, setEditorContent] = useState(defaultEditorContent);
  const { topic } = params;

  useEffect(() => {
    axios
      .get("/api/topics/" + topic)
      .then((data) => {
        console.log({ data });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleEditorUpdate = (editor) => {
    const editorContent = editor.getJSON();
    setSaveStatus("Saving...");

    axios
      .put("/api/topics", {
        id: topic,
        data: {
          content: editorContent,
          published: false,
        },
      })
      .then((data) => {
        // Simulate a delay in saving.
        setTimeout(() => {
          setSaveStatus("Saved");
        }, 500);

        setTimeout(() => {
          setSaveStatus("");
        }, 2500);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const editable = () => true;
  return (
    <div className="flex mt-6 flex-col items-center justify-start">
      {saveStatus && (
        <div className="absolute z-10 mb-5 rounded-sm bg-stone-100 px-2 py-1 text-sm text-stone-400">
          {saveStatus}
        </div>
      )}
      <Editor
        defaultValue={editorContent}
        className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:rounded-lg sm:border sm:shadow-lg mb-6"
        onDebouncedUpdate={handleEditorUpdate}
        debounceDuration={2000}
        storageKey={topic + "__editor__content"}
        editorProps={{
          editable,
        }}
      />
      <EditorComments />
    </div>
  );
}
