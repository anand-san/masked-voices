import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";
const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return { userId };
};

const createUpload = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  topicImage: createUpload({ image: { maxFileCount: 1, maxFileSize: "2MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log({ metadata, file });
    }),
  commentImage: createUpload(["image"])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log({ metadata, file });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
