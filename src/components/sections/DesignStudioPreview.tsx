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
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white">AI-Powered Design Studio</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Design Like a Pro, <span className="gradient-text">Even If You&apos;re Not</span>
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Our AI-powered design studio helps you create stunning prints in minutes. No design skills needed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-light" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                    <p className="text-xs text-white/50">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/design-studio">
              <Button variant="accent" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                Try Design Studio Free
              </Button>
            </Link>
          </motion.div>

          {/* Right - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-dark rounded-2xl p-4 shadow-2xl">
              {/* Mock Editor UI */}
              <div className="bg-slate-800 rounded-xl overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-slate-700 rounded px-3 py-1 text-xs text-white/50">Design Studio</div>
                  </div>
                </div>

                {/* Canvas */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                  <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="w-12 h-12 text-white/30 mx-auto mb-2" />
                      <p className="text-sm text-white/50">Your design here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 glass rounded-xl p-3 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl">🎨</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 glass rounded-xl p-3 shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-2xl">✨</span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
