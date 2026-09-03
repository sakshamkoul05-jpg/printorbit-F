'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16" style={{ backgroundColor: '#F4F2EF' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#ED1C24' }}>
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0F0F' }}>Create Account</h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>Join PrintOrbit for professional printing services</p>
        </div>

        <div className="bg-white p-6" style={{ border: '1px solid #E5E7EB' }}>
          <form className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                  <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} placeholder="John"
                    className="w-full pl-10 pr-4 py-2.5 border rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    style={{ borderColor: '#D1D5DB' }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                  <input type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} placeholder="Doe"
                    className="w-full pl-10 pr-4 py-2.5 border rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    style={{ borderColor: '#D1D5DB' }} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  style={{ borderColor: '#D1D5DB' }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-2.5 border rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  style={{ borderColor: '#D1D5DB' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-2.5 border rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  style={{ borderColor: '#D1D5DB' }} />
              </div>
            </div>

            <div className="p-3 rounded-md" style={{ backgroundColor: '#F9FAFB' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#374151' }}>Password must contain:</p>
              <ul className="space-y-1">
                {[
                  'At least 8 characters',
                  'One uppercase letter',
                  'One lowercase letter',
                  'One number',
                ].map((req) => (
                  <li key={req} className="flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#D1D5DB' }}></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <label className="flex items-start gap-2 text-sm cursor-pointer pt-1" style={{ color: '#4B5563' }}>
              <input type="checkbox" className="mt-0.5 rounded" style={{ accentColor: '#ED1C24' }} />
              <span>I agree to the <a href="#" className="underline" style={{ color: '#ED1C24' }}>Terms</a> and <a href="#" className="underline" style={{ color: '#ED1C24' }}>Privacy Policy</a></span>
            </label>

            <Button variant="primary" className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold" style={{ color: '#ED1C24' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
