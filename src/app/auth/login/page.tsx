'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-6 glow-gold-strong">
            <span className="text-black text-2xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white-dim">Sign in to your PrintOrbit account</p>
        </div>

        <div className="card-3d rounded-2xl p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white-dim hover:text-gold transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white-muted cursor-pointer">
                <input type="checkbox" className="rounded border-gold/20 bg-black-light text-gold focus:ring-gold/30" />
                Remember me
              </label>
              <a href="#" className="text-sm text-gold hover:text-gold-light transition-colors">
                Forgot password?
              </a>
            </div>

            <Button variant="primary" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-white-dim">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-gold hover:text-gold-light font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
