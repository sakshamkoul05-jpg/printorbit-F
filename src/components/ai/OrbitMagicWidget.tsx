'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Loader2, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { aiAPI } from '@/lib/ai';
import { usePathname } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { label: 'Design Help', prompt: 'Help me design a professional business card' },
  { label: 'Pricing', prompt: 'What are your pricing and bulk discount rates?' },
  { label: 'Materials', prompt: 'What paper types and finishes do you offer?' },
  { label: 'Track Order', prompt: 'How can I track my order status?' },
];

const PAGE_CONTEXT: Record<string, string> = {
  '/': 'User is on the PrintOrbit homepage',
  '/products': 'User is browsing the product catalog',
  '/templates': 'User is browsing design templates',
  '/design-studio': 'User is in the design studio editor',
  '/cart': 'User is viewing their shopping cart',
  '/checkout': 'User is at checkout',
  '/quote/request': 'User is requesting a quote',
  '/contact': 'User is on the contact page',
  '/about': 'User is on the about page',
  '/portfolio': 'User is viewing the portfolio',
  '/blog': 'User is reading the blog',
  '/sample-kit': 'User is interested in sample kits',
  '/corporate': 'User is looking at corporate solutions',
};

export default function OrbitMagicWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi there! I'm Orbit Magic, your PrintOrbit design assistant. I can help you with product recommendations, design tips, pricing, and more. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Listen for custom event from navbar
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-orbit-magic', handleToggle);
    return () => window.removeEventListener('toggle-orbit-magic', handleToggle);
  }, []);

  // Show notification bubble after 3 seconds on first visit
  useEffect(() => {
    if (hasShown) return;
    const timer = setTimeout(() => {
      setHasShown(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasShown]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const context = PAGE_CONTEXT[pathname] || `User is on: ${pathname}`;

    try {
      const result = await aiAPI.chat(text.trim(), context);
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: result.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Mascot Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 group ${isOpen ? 'hidden' : ''}`}
        aria-label="Open Orbit Magic AI assistant"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        {/* Button body */}
        <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
          <Image
            src="/mascot-orbit.svg"
            alt="Orbit Magic"
            width={44}
            height={44}
            className="drop-shadow-sm"
          />
        </span>
        {/* Notification badge */}
        {!isOpen && hasShown && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full"
          >
            1
          </motion.span>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/mascot-orbit.svg"
                    alt="Orbit Magic"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    Orbit Magic
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  </h3>
                  <p className="text-[11px] text-white/70">PrintOrbit AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-slate-100 text-slate-700 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (show only if few messages) */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.prompt)}
                    disabled={isLoading}
                    className="px-3 py-1.5 text-[11px] font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-full transition-colors disabled:opacity-50 border border-primary/10"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-slate-100 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Orbit Magic anything..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile FAB (shown when chat is closed, on small screens) */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/30"
          aria-label="Open Orbit Magic"
        >
          <MessageCircle className="w-4 h-4" />
          Orbit Magic
        </motion.button>
      )}
    </>
  );
}
