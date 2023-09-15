"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";

interface FileUplaodProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "topicImage" | "commentImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUplaodProps) => {
  if (value)
    return (
      <div className="relative h-40 w-96">
        <Image fill src={value} alt="upload"></Image>
        <button
          onClick={() => onChange("")}
          className="bg-red-400 text-black p1 rounded-full absolute bottom-2 right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
