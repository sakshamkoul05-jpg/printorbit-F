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
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-6 glow-gold-strong">
            <span className="text-black text-2xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white-dim">Join PrintOrbit for premium services</p>
        </div>

        <div className="card-3d rounded-2xl p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91 98765 43210"
                  className="w-full pl-11 pr-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="Create a password"
                  className="w-full pl-11 pr-12 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white-dim hover:text-gold transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} placeholder="Confirm your password"
                  className="w-full pl-11 pr-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-white-muted cursor-pointer pt-2">
              <input type="checkbox" className="mt-0.5 rounded border-gold/20 bg-black-light text-gold focus:ring-gold/30" />
              <span>I agree to the <a href="#" className="text-gold hover:underline">Terms</a> and <a href="#" className="text-gold hover:underline">Privacy Policy</a></span>
            </label>

            <Button variant="primary" className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-white-dim">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-gold hover:text-gold-light font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
