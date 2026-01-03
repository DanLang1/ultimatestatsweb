import { defineDb, defineTable, column } from "astro:db";

const Feedback = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    content: column.text(),
    upvotes: column.number({ default: 0 }),
    createdAt: column.date({ default: new Date() }),
    createdBy: column.text({ optional: true }),
  },
});

export default defineDb({
  tables: { Feedback },
});
