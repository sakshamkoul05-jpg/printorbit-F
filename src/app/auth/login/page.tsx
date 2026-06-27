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
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-printorbit-navy mb-2">Welcome Back</h1>
          <p className="text-printorbit-gray">Sign in to your PrintOrbit account</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-printorbit-navy mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-printorbit-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-printorbit-navy mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-printorbit-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-printorbit-gray hover:text-printorbit-navy"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-printorbit-slate">
                <input type="checkbox" className="rounded border-gray-300 text-printorbit-red focus:ring-printorbit-red" />
                Remember me
              </label>
              <a href="#" className="text-sm text-printorbit-red hover:text-printorbit-red-dark">
                Forgot password?
              </a>
            </div>

            <Button variant="primary" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-printorbit-gray">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-printorbit-red hover:text-printorbit-red-dark font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
