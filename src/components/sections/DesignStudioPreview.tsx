'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Palette, Wand2, Layers, Upload, ArrowRight, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

const features = [
  { icon: Palette, title: '500+ Templates', description: 'Professional templates for every product' },
  { icon: Wand2, title: 'AI Design Assistant', description: 'Generate designs with AI in seconds' },
  { icon: Layers, title: 'Layer Editor', description: 'Advanced editing with layers and effects' },
  { icon: Upload, title: 'Upload & Edit', description: 'Upload your designs and make changes' },
];

export default function DesignStudioPreview() {
  return (
    <section className="py-5 bg-dark position-relative overflow-hidden">
      {/* Background Effects */}
      <div className="position-absolute inset-0">
        <div className="position-absolute top-0 end-0" style={{ width: '500px', height: '500px', background: 'rgba(var(--bs-primary-rgb), 0.2)', borderRadius: '50%', filter: 'blur(96px)' }} />
        <div className="position-absolute bottom-0 start-0" style={{ width: '500px', height: '500px', background: 'rgba(var(--bs-accent-rgb), 0.2)', borderRadius: '50%', filter: 'blur(96px)' }} />
      </div>

      <Container className="position-relative" style={{ zIndex: 10 }}>
        <div className="row align-items-center g-4">
          {/* Left Content */}
          <motion.div
            className="col-12 col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Sparkles size={16} className="text-accent" />
              <span className="fw-medium text-white" style={{ fontSize: '14px' }}>AI-Powered Design Studio</span>
            </div>

            <h2 className="fs-2 fw-bold font-heading text-white mb-3">
              Design Like a Pro, <span className="gradient-text">Even If You&apos;re Not</span>
            </h2>
            <p className="fs-5 text-white mb-4" style={{ opacity: 0.6 }}>
              Our AI-powered design studio helps you create stunning prints in minutes. No design skills needed.
            </p>

            <div className="row g-3 mb-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="col-12 col-sm-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <feature.icon size={20} className="text-primary-light" />
                    </div>
                    <div>
                      <h4 className="fw-semibold text-white mb-0" style={{ fontSize: '14px' }}>{feature.title}</h4>
                      <p className="text-white mb-0" style={{ fontSize: '12px', opacity: 0.5 }}>{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/design-studio">
              <Button variant="accent" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                Try Design Studio Free
              </Button>
            </Link>
          </motion.div>

          {/* Right - Preview */}
          <motion.div
            className="col-12 col-lg-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-dark rounded-4 p-3" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
              {/* Mock Editor UI */}
              <div className="bg-slate-800 rounded-4 overflow-hidden">
                {/* Toolbar */}
                <div className="d-flex align-items-center gap-2 px-3 py-2 border-bottom border-slate-700">
                  <div className="d-flex gap-1">
                    <div className="bg-danger rounded-circle" style={{ width: '12px', height: '12px' }} />
                    <div className="bg-warning rounded-circle" style={{ width: '12px', height: '12px' }} />
                    <div className="bg-success rounded-circle" style={{ width: '12px', height: '12px' }} />
                  </div>
                  <div className="flex-fill mx-3">
                    <div className="bg-slate-700 rounded px-3 py-1 text-white" style={{ fontSize: '12px', opacity: 0.5 }}>Design Studio</div>
                  </div>
                </div>

                {/* Canvas */}
                <div className="d-flex align-items-center justify-content-center position-relative" style={{ aspectRatio: '16/9', background: 'linear-gradient(to bottom right, rgba(var(--bs-primary-rgb), 0.2), rgba(var(--bs-accent-rgb), 0.2))' }}>
                  <div className="position-absolute border border-2 border-dashed rounded-3 d-flex align-items-center justify-content-center" style={{ inset: '16px', borderColor: 'rgba(255,255,255,0.2)' }}>
                    <div className="text-center">
                      <Palette size={48} className="text-white mx-auto mb-2" style={{ opacity: 0.3 }} />
                      <p className="text-white" style={{ fontSize: '14px', opacity: 0.5 }}>Your design here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="position-absolute glass rounded-4 p-3 shadow-lg"
              style={{ top: '-16px', right: '-16px' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="fs-4">🎨</span>
            </motion.div>
            <motion.div
              className="position-absolute glass rounded-4 p-3 shadow-lg"
              style={{ bottom: '-16px', left: '-16px' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="fs-4">✨</span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
