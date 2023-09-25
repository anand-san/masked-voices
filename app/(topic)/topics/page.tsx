"use client";
import React, { HTMLInputTypeAttribute, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Delete,
  DeleteIcon,
  PlusSquare,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Topics() {
  const [topics, setTopics] = React.useState<Array<Record<any, any>>>([]);
  const [newTopicName, setNewTopicName] = React.useState<string>("");

  useEffect(() => {
    axios
      .get("/api/topics")
      .then((data) => {
        console.log({ data });
        setTopics(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const createTopic = () => {
    axios
      .post("/api/topics", {
        title: newTopicName || "Untitled",
      })
      .then((data) => {
        const udpatedData: Record<any, any> = data.data;
        setTopics([...[udpatedData], ...topics]);
      });
  };

  const handleNewTopicChange = (e) => {
    setNewTopicName(e.target?.value);
  };

  const deleteTopic = (topicId: string) => {
    console.log({ topicId });
  };
  return (
    <div className="flex m-4 cursor-pointer flex-wrap hover:border-x-fuchsia-100">
      <Card className="m-4">
        <CardHeader>
          <Input
            placeholder="Create New"
            value={newTopicName}
            onChange={handleNewTopicChange}
          />
        </CardHeader>
        <CardDescription className="flex justify-around p-8">
          <Button variant="outline" size="lg" onClick={createTopic}>
            <PlusSquare className="h-4 w-4" />
          </Button>
        </CardDescription>
      </Card>
      {topics.map((topic) => (
        <Card key={topic.id} className="m-4">
          <CardHeader>
            <CardTitle>{topic.title}</CardTitle>
          </CardHeader>
          <CardDescription className="flex justify-around p-8">
            <div>
              <p>{topic.published ? "Published" : "Unpublished"}</p>
              <p>Edited {topic.updatedAt}</p>
            </div>
            <Button variant="outline" size="icon" className="ml-8">
              <Link href={"/topics/" + topic.externalId}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteTopic(topic.id)}
              className="ml-2"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </CardDescription>
        </Card>
      ))}
    </div>
  );
}
