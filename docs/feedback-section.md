# Feedback Section

This is the feedback board section that was previously on the landing page. Can be re-added when ready to go live.

## Description

- Section title: "Tell me why I'm wrong"
- Subtitle: "Found a bug? Have a wild feature idea? Drop it here and I'll see what I can do."
- Uses FeedbackBoard component with client:visible for lazy loading

## Dependencies

- FeedbackBoard component from `../components/FeedbackBoard`
- Requires `initialPosts` prop from database query

## Database Query (in frontmatter)

```typescript
import FeedbackBoard from "../components/FeedbackBoard";
import { db, Feedback, desc } from "astro:db";

const posts = await db
  .select()
  .from(Feedback)
  .orderBy(desc(Feedback.upvotes), desc(Feedback.createdAt));
```

---

## Original Astro Component Code

```astro
<!-- Feedback -->
<section class="py-20 border-t border-[var(--border-color)]">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold mb-4">Tell me why I'm wrong</h2>
    <p class="opacity-70 max-w-md mx-auto">
      Found a bug? Have a wild feature idea? Drop it here and I'll see what I can do.
    </p>
  </div>
  <FeedbackBoard client:visible initialPosts={posts} />
</section>
```
