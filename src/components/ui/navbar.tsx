"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

const links = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/members', label: 'Members' },
  { href: '/publications', label: 'Recent Publications' },
  { href: '/merchandise', label: 'Merchandise' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll on mobile when menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('overflow-hidden', open && isMobile);
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  return (
    <header className={clsx('fixed top-0 left-0 w-full z-50 transition-all', scrolled ? 'backdrop-blur bg-white/60 shadow-sm dark:bg-slate-900/60' : 'bg-transparent')}>      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="font-bold text-xl tracking-tight">ResearchGate<span className="text-blue-600">.</span></Link>
        <div className="hidden md:flex gap-6 items-center">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={clsx('relative font-medium text-sm hover:text-blue-600 transition', pathname === l.href && 'text-blue-600')}>{l.label}</Link>
          ))}
          <button onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <SignedOut>
            <Link href="/sign-in" className="rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-500 transition">Sign In</Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-8 h-8' }}} />
          </SignedIn>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <button onClick={() => setOpen(o => !o)} className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10"><Menu size={24}/></button>
        </div>
      </nav>
      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 md:hidden z-40 bg-black/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-t dark:border-slate-700 relative z-50 shadow-lg">
            <div className="flex flex-col p-4 gap-2">
              {links.map(l => (
                <Link key={l.href} href={l.href} className={clsx('py-2 text-sm font-medium', pathname === l.href && 'text-blue-600')} onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
              <SignedOut>
                <Link href="/sign-in" onClick={() => setOpen(false)} className="mt-2 rounded bg-blue-600 text-white px-4 py-2 text-center text-sm font-medium">Sign In</Link>
              </SignedOut>
              <SignedIn>
                <div className="mt-2"><UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-8 h-8' }}} /></div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
