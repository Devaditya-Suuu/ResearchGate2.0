"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("Thank you! Your message has been sent.");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-16 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur p-8 shadow-xl">
        <h1 className="text-4xl font-bold mb-2 text-white">Contact Us</h1>
        <p className="text-slate-300 mb-8">Reach out for collaborations, partnerships, mentoring or queries.</p>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Name</label>
            <input
              className="w-full rounded-md border border-white/10 bg-white/80 dark:bg-slate-800/80 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              minLength={2}
              maxLength={64}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-white/10 bg-white/80 dark:bg-slate-800/80 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@college.edu"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Message</label>
            <textarea
              rows={5}
              className="w-full rounded-md border border-white/10 bg-white/80 dark:bg-slate-800/80 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
              minLength={10}
              maxLength={2000}
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 text-sm font-medium disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {success && <div className="text-green-400 text-sm mt-2">{success}</div>}
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
