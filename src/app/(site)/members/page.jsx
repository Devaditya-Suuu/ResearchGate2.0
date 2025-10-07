
import MemberCard from "../../../components/members/MemberCard";

export default function MembersPage(){
  const members = [
    { name: 'Ujjwal pai jakerbet', role: 'Lead Developer', imageUrl: '/members/pai.jpg' },
    { name: 'Jane Doe', role: 'Lead Developer', imageUrl: '/members/jane.jpg' },
    { name: 'John Newman', role: 'Community Manager', imageUrl: '/members/john.jpg' },
    { name: 'Diana Prince', role: 'Community Manager', imageUrl: '/members/diana.jpg' },
    { name: 'Data Privacy Seminar', role: 'Community Manager', imageUrl: '/members/dp.jpg' },
    { name: 'Security Vulnerability Hackathon', role: 'Community Manager', imageUrl: '/members/sv.jpg' }
  ];

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto text:white">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">OUR MEMBERS</h1>
          <div className="h-1 w-32 bg-blue-600 mt-4 rounded-full" />
        </div>
      </header>

      <section>
        <h2 className="text-slate-300 text-sm tracking-widest mb-4">FEATURED MEMBERS</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <MemberCard key={i} name={m.name} role={m.role} imageUrl={m.imageUrl} />
          ))}
        </div>
      </section>
    </div>
  );
}
