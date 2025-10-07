import Image from 'next/image';

export default function MerchandisePage(){
  const items = [
    { name: 'RG Hoodie', price: 550, desc: 'Premium cotton blend with embroidered logo.', imageUrl: '/merch/hoodie1.jpg' },
    { name: 'RG Tshirt', price: 550, desc: 'Soft tee with bold printed logo.', imageUrl: '/merch/tshirt.jpg' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-white">
      <header className="mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">MERCHANDISE</h1>
        <div className="h-1 w-32 bg-blue-600 mt-4 rounded-full" />
        <p className="text-slate-300 mt-4 max-w-2xl">Grab official ResearchGate Club gear and represent innovation.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur p-4 flex flex-col">
            <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-slate-800/40">
              {p.imageUrl ? (
                <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-indigo-600/40 to-blue-600/30" />
              )}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold">₹{p.price}</span>
              <button className="text-xs rounded-md bg-blue-600 hover:bg-blue-500 text-white px-3 py-2">Add to cart</button>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-10 flex justify-center">
        <button className="rounded-full border border-white/20 hover:bg-white/10 px-6 py-2 text-sm">View all products</button>
      </div> */}
    </div>
  );
}
