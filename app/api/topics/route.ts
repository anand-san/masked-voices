import { defaultEditorContent } from "@/app/(topic)/topics/[topic]/default-content";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 5 });

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const createTopic = await db.topic.create({
      data: {
        createdBy: profile.id,
        title: title,
        content: defaultEditorContent,
        externalId: uid.rnd(),
        published: false,
      },
    });
    return NextResponse.json(createTopic);
  } catch (error) {
    console.log("TOPICS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { topicId, data } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const createTopic = await db.topic.update({
      where: {
        id: topicId,
      },
      data: {
        createdBy: profile.id,
        title: data.title,
        content: data.content,
        externalId: uid.rnd(),
        published: false,
      },
    });
    return NextResponse.json(createTopic);
  } catch (error) {
    console.log("TOPICS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const topicId = false;
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    let topics = [];

    if (!topicId) {
      topics = await db.topic.findMany({
        where: {
          createdBy: profile.id,
        },
      });
    } else {
      topics = await db.topic.findMany({
        where: {
          externalId: topicId,
        },
      });
    }

    return NextResponse.json(topics);
  } catch (error) {
    console.log("TOPICS_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
