'use client';

import Container from '@/components/ui/Container';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <Container>
        <div className="text-center mx-auto" style={{ maxWidth: '28rem' }}>
          <div className="w-20 h-20 bg-red/10 rounded-3 d-flex align-items-center justify-content-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-red" />
          </div>
          <h2 className="fs-4 fw-semibold text-dark mb-2">Something went wrong</h2>
          <p className="text-muted mb-8 text-sm">
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={reset}
            className="d-inline-flex align-items-center gap-2 px-6 py-3 bg-primary text-white rounded-3 fw-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </Container>
    </div>
  );
}
