import Container from '@/components/ui/Container';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted font-medium">Loading...</p>
        </div>
      </Container>
    </div>
  );
}
