'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Smartphone, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleOtpLogin = async () => {
    if (!otp) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google login implementation
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
          <h1 className="text-2xl font-bold" style={{ color: '#0F0F0F' }}>Login to PrintStop</h1>
        </div>

        {/* Card */}
        <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
          {authMethod === 'otp' ? (
            <>
              {!otpSent ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full pl-10 pr-4 py-2.5 text-sm"
                        style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendOtp}
                    disabled={loading || !phone}
                    className="w-full py-3 text-sm font-semibold text-white"
                    style={{ backgroundColor: '#ED1C24', opacity: loading || !phone ? 0.5 : 1 }}
                  >
                    {loading ? 'Sending...' : 'Send me a verification code'}
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm mb-3" style={{ color: '#6B7280' }}>
                      Enter the OTP sent to {phone}
                    </p>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full px-3 py-2.5 text-sm"
                      style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                    />
                  </div>

                  <button
                    onClick={handleOtpLogin}
                    disabled={loading || otp.length !== 6}
                    className="w-full py-3 text-sm font-semibold text-white"
                    style={{ backgroundColor: '#ED1C24', opacity: loading || otp.length !== 6 ? 0.5 : 1 }}
                  >
                    {loading ? 'Verifying...' : 'Login'}
                  </button>

                  <button
                    onClick={() => { setOtpSent(false); setOtp(''); }}
                    className="w-full mt-3 py-2 text-sm font-medium"
                    style={{ color: '#ED1C24' }}
                  >
                    Change Number
                  </button>
                </>
              )}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full" style={{ borderTop: '1px solid #E5E5E5' }}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3" style={{ backgroundColor: '#FFFFFF', color: '#9CA3AF' }}>or</span>
                </div>
              </div>

              <button
                onClick={() => setAuthMethod('password')}
                className="w-full py-2.5 text-sm font-medium"
                style={{ color: '#ED1C24', border: '1px solid #E5E5E5' }}
              >
                Login with Password
              </button>
            </>
          ) : (
            <>
              <form onSubmit={handlePasswordLogin}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
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
                </div>

                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="w-full mt-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: '#ED1C24', opacity: loading || !email || !password ? 0.5 : 1 }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full" style={{ borderTop: '1px solid #E5E5E5' }}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3" style={{ backgroundColor: '#FFFFFF', color: '#9CA3AF' }}>or</span>
                </div>
              </div>

              <button
                onClick={() => setAuthMethod('otp')}
                className="w-full py-2.5 text-sm font-medium"
                style={{ color: '#ED1C24', border: '1px solid #E5E5E5' }}
              >
                Login with OTP
              </button>
            </>
          )}

          {/* Google Login */}
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium"
              style={{ border: '1px solid #E5E5E5', color: '#374151' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login with Google
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold" style={{ color: '#ED1C24' }}>
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: '#9CA3AF' }}>
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline" style={{ color: '#6B7280' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline" style={{ color: '#6B7280' }}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
