'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Smartphone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !termsAccepted) return;
    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.email.split('@')[0],
        phone: formData.phone || undefined,
      });
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: '#F4F2EF' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#ED1C24' }}>
              <span className="text-white font-bold text-lg">P</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: '#0F0F0F' }}>Sign Up for PrintStop</h1>
        </div>

        {/* Card */}
        <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm"
                  style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm"
                  style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-10 pr-4 py-2.5 text-sm"
                  style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5"
                style={{ accentColor: '#ED1C24' }}
              />
              <span className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                I agree to the{' '}
                <Link href="/terms" className="underline" style={{ color: '#ED1C24' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline" style={{ color: '#ED1C24' }}>Privacy Policy</Link>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password || !termsAccepted}
              className="w-full py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: '#ED1C24', opacity: loading || !formData.email || !formData.password || !termsAccepted ? 0.5 : 1 }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold" style={{ color: '#ED1C24' }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
