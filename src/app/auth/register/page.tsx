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
    <div className="d-flex align-items-center justify-content-center px-4 py-16 min-vh-100" style={{ backgroundColor: '#F4F2EF' }}>
      <div className="w-100" style={{ maxWidth: '28rem' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="d-inline-block">
            <div className="w-12 h-12 d-flex align-items-center justify-content-center mx-auto mb-4" style={{ backgroundColor: '#ED1C24' }}>
              <span className="text-white fw-bold fs-5">P</span>
            </div>
          </Link>
          <h1 className="fs-3 fw-bold" style={{ color: '#0F0F0F' }}>Sign Up for PrintOrbit</h1>
        </div>

        {/* Card */}
        <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
            <div>
              <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>Email Address</label>
              <div className="position-relative">
                <Mail size={16} className="position-absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className="form-control text-sm"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div>
              <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>Password</label>
              <div className="position-relative">
                <Lock size={16} className="position-absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a password"
                  className="form-control text-sm"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute border-0 bg-transparent"
                  style={{ right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>Phone Number</label>
              <div className="position-relative">
                <Smartphone size={16} className="position-absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="form-control text-sm"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="d-flex align-items-start gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="form-check-input mt-1"
              />
              <span className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                I agree to the{' '}
                <Link href="/about" className="text-decoration-underline" style={{ color: '#ED1C24' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/about" className="text-decoration-underline" style={{ color: '#ED1C24' }}>Privacy Policy</Link>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password || !termsAccepted}
              className="w-100 py-3 text-sm fw-semibold text-white"
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
            <Link href="/auth/login" className="fw-semibold" style={{ color: '#ED1C24' }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
