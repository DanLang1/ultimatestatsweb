import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, eq, Feedback } from "astro:db";

export const server = {
  createPost: defineAction({
    accept: "form",
    input: z.object({
      content: z
        .string()
        .min(1, "Message cannot be empty")
        .max(500, "Message too long"),
      createdBy: z.string().optional(),
    }),
    handler: async ({ content, createdBy }) => {
      const id = crypto.randomUUID();
      await db.insert(Feedback).values({
        id,
        content,
        createdBy: createdBy || "Anonymous",
        upvotes: 0,
        createdAt: new Date(),
      });
      return { success: true, id };
    },
  }),
  upvotePost: defineAction({
    accept: "json",
    input: z.object({
      id: z.string(),
    }),
    handler: async ({ id }) => {
      const post = await db
        .select()
        .from(Feedback)
        .where(eq(Feedback.id, id))
        .get();
      if (!post) {
        throw new Error("Post not found");
      }
      await db
        .update(Feedback)
        .set({ upvotes: post.upvotes + 1 })
        .where(eq(Feedback.id, id));
      return { success: true, upvotes: post.upvotes + 1 };
    },
  }),
};
