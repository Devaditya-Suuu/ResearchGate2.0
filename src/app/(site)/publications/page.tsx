export default function PublicationsPage(){
  const items = Array.from({length:6}).map((_,i)=> ({
    title: `Research Paper Title ${i+1}`,
    authors: 'Author Names',
    venue: 'Journal / Conference',
    abstract: 'Abstract preview of the research and its impact summary.',
    link: '#'
  }));

//   const tags = ['All', 'AI', 'Biotech', 'Security', 'Systems'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-white">
      <header className="mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">RECENT PUBLICATIONS</h1>
        <div className="h-1 w-32 bg-blue-600 mt-4 rounded-full" />
      </header>

      {/* <div className="flex flex-wrap items-center gap-3 mb-8">
        {tags.map((t, i) => (
          <button key={t} className={`text-xs px-3 py-1.5 rounded-full border ${i===0 ? 'bg-blue-600 border-blue-600' : 'border-white/15 bg-slate-900/60'} hover:bg-white/10`}>{t}</button>
        ))}
      </div> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <article key={i} className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur p-5 flex flex-col">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{p.authors} — {p.venue}</p>
            <p className="text-sm text-slate-300 mt-3 flex-1">{p.abstract}</p>
            <div className="mt-4 flex items-center justify-between">
              <a href={p.link} className="text-xs text-blue-400 hover:underline">Read paper →</a>
              <span className="text-[10px] text-slate-500">2025</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
