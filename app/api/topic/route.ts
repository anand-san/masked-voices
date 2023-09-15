import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 5 });

export async function POST(req: Request) {
  try {
    const { topic, imageUrl, description } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const saveTopic = await db.poll.create({
      data: {
        createdBy: profile.id,
        title: topic,
        description,
        inviteCode: uid.rnd(),
      },
    });
    return NextResponse.json(saveTopic);
  } catch (error) {
    console.log("TOPICS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
