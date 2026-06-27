'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-navy rounded flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-2xl font-bold text-navy mb-1">Create Account</h1>
          <p className="text-sm text-slate-500">Join PrintOrbit for professional services</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <form className="space-y-3.5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer pt-1">
              <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-navy focus:ring-navy/20" />
              <span>I agree to the <a href="#" className="text-navy hover:underline">Terms</a> and <a href="#" className="text-navy hover:underline">Privacy Policy</a></span>
            </label>

            <Button variant="primary" className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-navy hover:text-navy-light font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
