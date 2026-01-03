import React, { useState } from "react";
import { actions } from "astro:actions";

interface FeedbackItem {
  id: string;
  content: string;
  upvotes: number;
  createdAt: Date;
  createdBy: string | null;
}

export default function FeedbackBoard({
  initialPosts,
}: {
  initialPosts: FeedbackItem[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Bot protection
  const [mathQ, setMathQ] = useState(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { a, b, ans: a + b };
  });
  const [userAns, setUserAns] = useState("");

  const handleUpvote = async (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
    const res = await actions.upvotePost({ id });
    if (!res.data?.success) {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes - 1 } : p))
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAns) !== mathQ.ans) {
      alert("Incorrect math answer! Just checking you're human.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("content", newContent);

    const { data, error } = await actions.createPost(formData);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setNewContent("");
      setUserAns("");
      setMathQ({
        a: Math.floor(Math.random() * 10),
        b: Math.floor(Math.random() * 10),
        ans: 0,
      }); // Fix ans later to be computed
      setShowForm(false);

      const newPost: FeedbackItem = {
        id: data.id,
        content: newContent,
        upvotes: 0,
        createdAt: new Date(),
        createdBy: "Anonymous",
      };
      setPosts([newPost, ...posts]);
    }
    setIsSubmitting(false);
    // Reset math Q properly
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setMathQ({ a, b, ans: a + b });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
        <div>
          <h2 className="text-xl font-bold">Community Feedback</h2>
          <p className="text-sm opacity-70">
            Vote on features or suggest new ones
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-card p-6 rounded-2xl shadow-sm border border-[var(--border-color)] space-y-4 animate-in fade-in slide-in-from-top-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Feedback / Suggestion
            </label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-[var(--accent-color)] outline-none"
              placeholder="I wish the app had..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Human Check: What is {mathQ.a} + {mathQ.b}?
            </label>
            <input
              type="number"
              value={userAns}
              onChange={(e) => setUserAns(e.target.value)}
              className="w-full max-w-[100px] bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 focus:ring-2 focus:ring-[var(--accent-color)] outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--accent-color)] text-white py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Submit Feedback"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            No feedback yet. Be the first!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-card p-4 rounded-xl shadow-sm border border-[var(--border-color)] flex gap-4 transition-all hover:border-[var(--accent-color)]"
            >
              <div className="flex flex-col items-center gap-1 min-w-[50px]">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 group"
                  title="Upvote"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-[var(--accent-color)]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </button>
                <span className="font-bold text-lg">{post.upvotes}</span>
              </div>
              <div className="flex-1">
                <p className="whitespace-pre-wrap">{post.content}</p>
                <div className="mt-2 text-xs opacity-50 flex gap-2">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.createdBy && <span>• by {post.createdBy}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
