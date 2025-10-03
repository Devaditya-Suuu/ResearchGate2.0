"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventCard from "@/components/events/EventCard";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!sectionsRef.current) return;
    const sections = sectionsRef.current.querySelectorAll(".reveal");
    sections.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    });
  }, []);

  const sampleEvents = [
    {
      title: "AI Ethics Workshop",
      excerpt: "Explore ethics in AI and responsible research practices",
      cta: true,
    },
    {
      title: "Hyperthon",
      excerpt: "a three hour super fast hackathon",
    },
    {
      title: "Internal hackathon",
      excerpt: "a 12 hours long hackathon for all the branches of sit",
    },
    {
      title: "Freshers event",
      excerpt: "A warm welcome party to all the freshers from the family of RG",
    },
  ];

  return (
    <div className="space-y-32 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[82vh] flex items-center">
        <div className="absolute inset-0 -z-10 bg-slate-950" />
        {/* Glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full bg-blue-700/20 blur-3xl -z-10" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-700/10 blur-3xl -z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-blue-400 text-xs tracking-widest mb-3">
              RESEARCHGATE CLUB
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <span className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
                Innovate, Explore,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                and Publish Together
              </span>
            </h1>
            <p className="mt-6 text-slate-300 max-w-xl">
              A community of students and mentors driving impactful research with
              events, collaborations, and publications across domains.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.push("/events")}
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 text-sm font-medium shadow txt-btn"
              >
                Explore Events
              </button>
              <button
                type="button"
                onClick={() => router.push("/publications")}
                className="rounded-full border border-white/20 hover:bg-white/10 text-white px-8 py-3 text-sm font-medium txt-btn"
              >
                Recent Publications
              </button>
            </div>
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { k: "Members", v: "70+" },
                { k: "Papers", v: "45+" },
                { k: "Pubs", v: "28" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl bg-slate-900/50 border border-white/10 p-4 text-center"
                >
                  <div className="text-2xl font-bold">{s.v}</div>
                  <div className="text-xs text-slate-400">{s.k}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-900/20 p-6 backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                {sampleEvents.slice(0, 4).map((e, i) => (
                  <EventCard
                    key={i}
                    title={e.title}
                    excerpt={e.excerpt}
                    cta={i === 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div ref={sectionsRef} className="space-y-32">
        {/* Domains */}
        <section className="reveal max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Featured Domains
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["AI & ML", "Biotech", "Sustainability", "Systems"].map((d) => (
              <motion.div
                key={d}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur"
              >
                <h3 className="font-semibold mb-2 text-white">{d}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cutting edge explorations and open collaboration in {d}.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="reveal max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Recent Publications
            </h2>
            <Link
              href="/publications"
              className="text-sm font-medium text-blue-400 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur flex flex-col"
              >
                <h3 className="font-medium mb-2">Exploratory Study #{i + 1}</h3>
                <p className="text-xs text-slate-400 flex-1">
                  An abstract preview of the research focus and findings summary.
                </p>
                <Link
                  href="/publications"
                  className="mt-4 text-xs font-medium text-blue-400"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700/30 via-indigo-700/20 to-purple-700/30 p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl -z-10" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl -z-10" />
              <h2 className="text-3xl md:text-4xl font-semibold">
                Become a Member
              </h2>
              <p className="text-slate-200 mt-2 max-w-2xl">
                Ready to contribute to impactful research? Join us and collaborate
                with peers across disciplines, access mentorship, and accelerate
                your academic journey.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/sign-up")}
                  className="rounded-full bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-sm font-medium"
                >
                  Register for club recruitment
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/members")}
                  className="rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-3 text-sm font-medium"
                >
                  Our Members
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
