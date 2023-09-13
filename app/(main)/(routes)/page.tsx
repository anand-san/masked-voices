import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

export default async function SetupApge() {
  const profile = await initialProfile();

  const polls = await db.poll.findFirst({
    where: {
      createdBy: profile.id,
    },
  });

  return (
    <>
      <Button> Create poll</Button>

      <UserButton afterSignOutUrl="/" />
    </>
  );
}
