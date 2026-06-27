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
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          badge="How It Works"
          title="Simple 6-Step Process"
          description="From design to delivery, we make printing easy"
          className="text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      step.color === 'primary' ? 'bg-primary/20' :
                      step.color === 'accent' ? 'bg-accent/20' : 'bg-success/20'
                    }`}>
                      <step.icon className={`w-6 h-6 ${
                        step.color === 'primary' ? 'text-primary-light' :
                        step.color === 'accent' ? 'text-accent-light' : 'text-success-light'
                      }`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-white/40">STEP {i + 1}</span>
                    </div>
                    <h3 className="font-semibold font-heading text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
