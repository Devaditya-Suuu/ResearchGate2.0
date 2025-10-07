import EventCard from "../../../components/events/EventCard";

export default async function EventsPage(){
  // TODO: fetch real events
  const events = [
    { title: 'AI Ethics Workshop', excerpt: 'Explore ethics in AI and responsible research practices', cta: true },
    { title: 'Hyperthon', excerpt: 'a three hour super fast hackathon' },
    { title: 'Internal hackathon', excerpt: 'a 12 hours long hackathon for all the branches of sit' },
    { title: 'Freshers event', excerpt: 'A warm welcome party to all the freshers from the family of RG' },
  ];

  const categories = ['Workshops', 'Conferences', 'Hackathons'];

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto text-white">
      <header className="mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">UPCOMING EVENTS</h1>
        <div className="h-1 w-32 bg-blue-600 mt-4 rounded-full" />
      </header>

      <section className="grid lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-6">
          <h2 className="text-slate-300 text-sm tracking-widest">FEATURED EVENTS</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {events.map((e, i) => (
              <EventCard key={i} title={e.title} excerpt={e.excerpt} cta={i === 1} />
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <button className="rounded-md border border-white/20 px-5 py-2 text-sm text-slate-200 hover:bg:white/10">Explore Events</button>
          </div>
        </div>

        <aside className="rounded-2xl bg-slate-900/60 dark:bg-slate-800/60 border border:white/10 p-5 h-fit">
          <h3 className="text-sm tracking-widest text-slate-300 mb-4">EVENT CATEGORIES</h3>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <a className="text-blue-400 text-sm hover:underline" href="#">{c}</a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
