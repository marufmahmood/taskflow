import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { auth } from "@/firebase/firebase";

import {
  addComment,
  getComments,
} from "@/services/comment.service";

import type { Comment } from "@/types/comment";

interface Props {
  taskId: string;
}

export default function CommentSection({
  taskId,
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState("");

  const loadComments = async () => {
    const data = await getComments(taskId);
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    await addComment(taskId, {
      message,
      createdBy: auth.currentUser?.uid || "",
      createdByName:
        auth.currentUser?.displayName ||
        auth.currentUser?.email ||
        "Unknown",
      createdAt: Date.now(),
    });

    setMessage("");

    loadComments();
  };

  return (
    <div className="mt-6">

      <h3 className="font-bold text-lg mb-3">
        💬 Comments
      </h3>

      <div className="space-y-3 mb-4">

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded-lg p-3"
          >
            <p className="font-semibold">
              {comment.createdByName}
            </p>

            <p>{comment.message}</p>
          </div>
        ))}

      </div>

      <div className="flex gap-2">

        <Input
          placeholder="Write a comment..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <Button onClick={handleSend}>
          Send
        </Button>

      </div>

    </div>
  );
}