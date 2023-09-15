import React from "react";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { CreateTopicDialog } from "@/components/ui/modals/create-poll";

export default async function SetupApge() {
  const profile = await initialProfile();

  const polls = await db.poll.findFirst({
    where: {
      createdBy: profile.id,
    },
  });

  return (
    <div>
      <CreateTopicDialog />
    </div>
  );
}
