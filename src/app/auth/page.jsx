"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function AuthPage(){
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    if (mode === 'register') {
      try {
        const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        setSuccess('Account created. You can sign in now.');
        setMode('signin');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) setError('Invalid credentials'); else setSuccess('Signed in');
    setLoading(false);
  };

  return <div className="max-w-md mx-auto px-6 py-24">
    <h1 className="text-3xl font-bold mb-2">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h1>
    <p className="text-sm text-gray-500 mb-6">{mode === 'signin' ? 'Access your ResearchGate Club account.' : 'Join the club to participate in research activities.'}</p>
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-md border px-3 py-2 bg-white/70 dark:bg-slate-800/70" placeholder="Your name" />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full rounded-md border px-3 py-2 bg-white/70 dark:bg-slate-800/70" placeholder="you@college.edu" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full rounded-md border px-3 py-2 bg-white/70 dark:bg-slate-800/70" required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
      <button disabled={loading} className="w-full rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-3 text-sm font-medium">{loading ? (mode === 'signin' ? 'Signing in...' : 'Creating...') : (mode === 'signin' ? 'Sign In' : 'Register')}</button>
    </form>
    <button onClick={()=> { setMode(m=> m==='signin' ? 'register' : 'signin'); setError(''); setSuccess(''); }} className="mt-6 w-full text-xs text-blue-600 hover:underline">
      {mode === 'signin' ? 'Need an account? Register' : 'Have an account? Sign In'}
    </button>
  </div>;
}
