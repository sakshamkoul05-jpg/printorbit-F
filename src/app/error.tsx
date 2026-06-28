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
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red" />
          </div>
          <h2 className="text-xl font-semibold text-dark mb-2">Something went wrong</h2>
          <p className="text-muted mb-8 text-sm">
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </Container>
    </div>
  );
}
