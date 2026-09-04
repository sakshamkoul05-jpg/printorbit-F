import Container from '@/components/ui/Container';

export default function Loading() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <Container>
        <div className="text-center">
          <div className="d-inline-flex align-items-center justify-content-center w-16 h-16 rounded-circle bg-primary/10 mb-6">
            <div className="w-8 h-8 border-3 border-primary border-top-transparent rounded-circle animate-spin" />
          </div>
          <p className="text-muted fw-medium">Loading...</p>
        </div>
      </Container>
    </div>
  );
}
