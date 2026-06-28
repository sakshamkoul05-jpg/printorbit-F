'use client';

import Link from 'next/link';
import { use } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Tag, ArrowRight, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const BLOG_POSTS: Record<string, {
  title: string; excerpt: string; content: string; author: string; date: string;
  tags: string[]; readTime: string; coverGradient: string;
}> = {
  'premium-business-cards-guide': {
    title: 'The Ultimate Guide to Premium Business Cards in 2024',
    excerpt: 'Discover the latest trends in business card design, from metallic foils to sustainable materials.',
    content: `Business cards remain one of the most powerful networking tools in the professional world. In 2024, the trends are shifting towards premium finishes, sustainable materials, and innovative shapes that make a lasting impression.

**Metallic Foil Finishes**
Gold, silver, and rose gold foil stamping continues to be a top choice for professionals who want to stand out. The reflective quality of metallic foil catches the light and draws attention to key elements of your design.

**Sustainable Materials**
With growing environmental consciousness, many businesses are opting for recycled cardstock, plant-based inks, and biodegradable coatings. These eco-friendly options don't compromise on quality — they actually add a story to your brand.

**Texture & Dimension**
Spot UV, embossing, and debossing add tactile dimensions to your cards. When someone runs their fingers over a raised logo or a glossy pattern on matte cardstock, it creates a memorable sensory experience.

**Bold Typography**
Minimalist designs with bold, oversized typography are making a comeback. The focus is on clear communication with a strong visual hierarchy.

**Die-Cut Shapes**
Moving beyond the standard rectangle, die-cut business cards in custom shapes — circles, rounded corners, or completely unique silhouettes — help your card stand out in a stack.

At PrintOrbit, we offer all these premium options with fast delivery across India. Order your premium business cards today and make a statement at your next networking event.`,
    author: 'Priya Sharma', date: '2024-03-15', tags: ['Business Cards', 'Design', 'Premium'],
    readTime: '5 min read', coverGradient: 'from-primary to-primary-light',
  },
  'packaging-trends': {
    title: 'Custom Packaging Trends That Are Dominating 2024',
    excerpt: 'From eco-friendly materials to unboxing experiences, learn how packaging is evolving.',
    content: `Custom packaging has evolved from a functional necessity to a powerful branding tool. In 2024, the trends are clear: sustainability, personalization, and unboxing experiences that customers want to share.

**Kraft Paper Packaging**
Natural, unbleached kraft paper is the packaging material of choice for eco-conscious brands. Its organic look communicates authenticity and environmental responsibility.

**Full-Color Digital Printing**
Digital printing technology has made it possible to print vibrant, full-color designs on corrugated boxes with minimal setup costs. This means even small businesses can afford custom branded packaging.

**Mailer Boxes**
The rise of e-commerce has made mailer boxes the packaging format of choice. These self-locking boxes are easy to assemble, provide excellent protection, and offer large printable surfaces for branding.

**Soy-Based Inks**
More printers are switching to soy-based inks, which produce richer colors and are easier to recycle. They're also better for the environment, making them a win-win for brands and the planet.

**Personalized Inserts**
Adding personalized thank-you cards, discount codes, or product samples inside your packaging creates a delightful unboxing experience that encourages repeat purchases.

Ready to elevate your packaging? Explore our custom packaging solutions at PrintOrbit.`,
    author: 'Rahul Mehta', date: '2024-03-10', tags: ['Packaging', 'Trends', 'Branding'],
    readTime: '4 min read', coverGradient: 'from-accent to-accent-light',
  },
  'large-format-printing': {
    title: 'Large Format Printing: Everything You Need to Know',
    excerpt: 'A comprehensive guide to banners, posters, signage, and wall graphics for businesses.',
    content: `Large format printing encompasses a wide range of products — from vinyl banners and posters to ACM signs and wall murals. Understanding the options available helps you make the right choice for your business needs.

**Vinyl Banners**
The most versatile large format product, vinyl banners are weather-resistant, affordable, and available in any size. Perfect for events, storefronts, and exhibitions.

**Fabric Prints**
Fabric banners and displays offer a premium look with vibrant colors that pop. They're lightweight, easy to transport, and create an upscale appearance at trade shows and events.

**Wall Murals**
Transform any space with custom wall murals. From office interiors to retail spaces, large-format wall graphics create immersive environments that tell your brand story.

**Window Graphics**
Make the most of your storefront with window graphics. From frosted privacy films to vibrant promotional displays, window graphics are a cost-effective way to attract attention.

**Choosing the Right Material**
The material you choose depends on the application. Indoor products can use lighter materials, while outdoor applications require UV-resistant, waterproof options.

At PrintOrbit, we help you choose the right large format solution for your needs. Get a free consultation today.`,
    author: 'Anjali Patel', date: '2024-03-05', tags: ['Banners', 'Signage', 'Large Format'],
    readTime: '6 min read', coverGradient: 'from-success to-emerald-400',
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-dark mb-2">Post Not Found</h1>
            <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${post.coverGradient} text-white`}>
        <Container>
          <div className="py-16 max-w-3xl">
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{post.title}</span>
            </nav>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        <div className="py-12">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h2 key={i} className="text-xl font-bold text-dark font-heading mt-8 mb-3">{paragraph.replace(/\*\*/g, '')}</h2>;
                }
                return <p key={i} className="text-slate-600 leading-relaxed mb-4">{paragraph}</p>;
              })}
            </article>

            {/* Actions */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors">
                  <Bookmark className="w-4 h-4" /> Save
                </button>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1">
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
