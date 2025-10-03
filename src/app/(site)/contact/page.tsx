export default function ContactPage(){
  return <div className="max-w-3xl mx-auto px-6 py-24">
    <h1 className="text-4xl font-bold mb-6">Contact</h1>
    <p className="text-gray-600 dark:text-gray-300 mb-10">Reach out for collaborations, partnerships, mentoring or queries.</p>
    <form className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input className="w-full rounded-md border px-3 py-2 bg-white/70 dark:bg-slate-800/70" placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full rounded-md border px-3 py-2 bg-white/70 dark:bg-slate-800/70" placeholder="you@college.edu" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea rows={5} className="w-full rounded-md border px-3 py-2 bg-white/70 dark:bg-slate-800/70" placeholder="Write your message..." />
      </div>
      <button type="submit" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 text-sm font-medium">Send Message</button>
    </form>
  </div>;
}
