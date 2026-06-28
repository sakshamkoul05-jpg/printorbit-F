import Container from '@/components/ui/Container';
import { Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-dark font-heading mb-3">404</h1>
          <h2 className="text-xl font-semibold text-dark/80 mb-2">Page Not Found</h2>
          <p className="text-muted mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Back to Home
          </a>
        </div>
      </Container>
    </div>
  );
}
