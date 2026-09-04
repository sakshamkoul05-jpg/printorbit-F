import Container from '@/components/ui/Container';
import { Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <Container>
        <div className="text-center mx-auto" style={{ maxWidth: '28rem' }}>
          <div className="w-20 h-20 bg-primary/10 rounded-3 d-flex align-items-center justify-content-center mx-auto mb-6">
            <Package size={40} className="text-primary" />
          </div>
          <h1 className="display-4 fw-bold text-dark mb-3">404</h1>
          <h2 className="fs-4 fw-semibold text-dark/80 mb-2">Page Not Found</h2>
          <p className="text-muted mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <a
            href="/"
            className="d-inline-flex align-items-center gap-2 px-6 py-3 bg-primary text-white rounded-3 fw-semibold transition-colors"
          >
            Back to Home
          </a>
        </div>
      </Container>
    </div>
  );
}
