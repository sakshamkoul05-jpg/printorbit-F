'use client';

import { motion } from 'motion/react';
import { Upload, Palette, Eye, Package, Truck, CheckCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  { icon: Upload, title: 'Upload Design', description: 'Upload your artwork or use our design templates', color: 'primary' },
  { icon: Palette, title: 'Customize', description: 'Choose materials, finishes, and quantities', color: 'accent' },
  { icon: Eye, title: 'Preview', description: 'Get a digital proof before printing', color: 'success' },
  { icon: Package, title: 'Print', description: 'We print with premium quality materials', color: 'primary' },
  { icon: Truck, title: 'Deliver', description: 'Fast delivery to your doorstep', color: 'accent' },
  { icon: CheckCircle, title: 'Done!', description: 'Love your prints or we\'ll reprint for free', color: 'success' },
];

export default function PrintingProcess() {
  return (
    <section className="py-5 bg-dark position-relative overflow-hidden">
      {/* Background Effects */}
      <div className="position-absolute inset-0">
        <div className="position-absolute top-0" style={{ left: '25%', width: '384px', height: '384px', background: 'rgba(var(--bs-primary-rgb), 0.1)', borderRadius: '50%', filter: 'blur(96px)' }} />
        <div className="position-absolute bottom-0" style={{ right: '25%', width: '384px', height: '384px', background: 'rgba(var(--bs-accent-rgb), 0.1)', borderRadius: '50%', filter: 'blur(96px)' }} />
      </div>

      <Container className="position-relative" style={{ zIndex: 10 }}>
        <SectionHeader
          badge="How It Works"
          title="Simple 6-Step Process"
          description="From design to delivery, we make printing easy"
          className="text-white"
        />

        <div className="row g-4 mt-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="glass-dark rounded-4 p-4 h-100">
                <div className="d-flex align-items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className={`rounded-4 d-flex align-items-center justify-content-center ${
                      step.color === 'primary' ? 'bg-primary' :
                      step.color === 'accent' ? 'bg-accent' : 'bg-success'
                    }`} style={{ width: '48px', height: '48px', backgroundColor: step.color === 'primary' ? 'rgba(var(--bs-primary-rgb), 0.2)' : step.color === 'accent' ? 'rgba(var(--bs-accent-rgb), 0.2)' : 'rgba(var(--bs-success-rgb), 0.2)' }}>
                      <step.icon size={24} className={
                        step.color === 'primary' ? 'text-primary-light' :
                        step.color === 'accent' ? 'text-accent-light' : 'text-success-light'
                      } />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="fw-bold text-white" style={{ fontSize: '12px', opacity: 0.4 }}>STEP {i + 1}</span>
                    </div>
                    <h3 className="fw-semibold font-heading text-white mb-2">{step.title}</h3>
                    <p className="text-white" style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.6 }}>{step.description}</p>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="d-none d-lg-block position-absolute" style={{ top: '50%', right: '-16px', width: '32px', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
