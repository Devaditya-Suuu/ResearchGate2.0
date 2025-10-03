"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  title: string;
  date?: string;
  excerpt?: string;
  cta?: boolean;
};

export default function EventCard({ title, date, excerpt, cta }: Props) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-2xl bg-slate-900/60 dark:bg-slate-800/60 text-white border border-white/10 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-blue-600/30 flex items-center justify-center font-bold">{title.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          {date && <p className="text-xs text-slate-400 mt-1">{date}</p>}
          {excerpt && <p className="text-sm text-slate-400 mt-2">{excerpt}</p>}
        </div>
        
      </div>
    </motion.div>
  );
}
