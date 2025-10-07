"use client";
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';
import Image from 'next/image';

/**
 * MemberCard component displays a team member's information including their name, role, and social links.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the team member
 * @param {string} props.role - Role of the team member
 * @param {string} [props.initials] - Initials of the team member, optional
 * @param {string} [props.imageUrl] - Image URL for the team member's avatar, optional
 *
 * @returns {JSX.Element} The rendered component
 */
export default function MemberCard({ name, role, initials, imageUrl }) {
  const initialsText = (initials ?? name.split(' ').map((w) => w[0]).join('').slice(0,2).toUpperCase());
  return (
    <motion.div whileHover={{ y: -8 }} className="group rounded-2xl bg-slate-900/60 dark:bg-slate-800/60 text-white border border-white/10 shadow-sm overflow-hidden flex flex-col">
      <div className="relative h-40 w-full bg-gradient-to-br from-blue-600/30 to-indigo-600/20">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-white/40">{initialsText}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        <p className="text-xs text-slate-400 mt-1">{role}</p>
        <div className="flex items-center gap-3 mt-4 text-slate-300">
          <a aria-label="LinkedIn" className="hover:text-white" href="#"><Linkedin size={16}/></a>
          <a aria-label="Github" className="hover:text-white" href="#"><Github size={16}/></a>
          <a aria-label="Twitter" className="hover:text-white" href="#"><Twitter size={16}/></a>
        </div>
      </div>
    </motion.div>
  );
}
