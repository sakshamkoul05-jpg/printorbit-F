import { Metadata } from 'next';
import Link from 'next/link';
import { Package, FileText, Palette, Settings, LogOut, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Account | PrintOrbit',
  description: 'Manage your PrintOrbit account, orders, and saved designs.',
};

const menuItems = [
  { icon: Package, label: 'My Orders', href: '/account/orders', description: 'Track your current and past orders' },
  { icon: FileText, label: 'My Quotes', href: '/account/quotes', description: 'View and manage your quote requests' },
  { icon: Palette, label: 'Saved Designs', href: '/account/projects', description: 'Access your saved design projects' },
  { icon: Settings, label: 'Account Settings', href: '/account/settings', description: 'Update your profile and preferences' },
];

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Dashboard</span>
      <h1 className="text-4xl font-bold text-white mb-3">My Account</h1>
      <p className="text-white-dim mb-10">Manage your orders, quotes, and designs.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-3d rounded-2xl p-6 group flex items-center gap-5"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0 group-hover:glow-gold transition-all duration-500">
              <item.icon className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white group-hover:text-gold transition-colors duration-300">{item.label}</h3>
              <p className="text-sm text-white-dim mt-0.5">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white-dim group-hover:text-gold transition-colors" />
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="inline-flex items-center gap-2 text-sm text-white-dim hover:text-ruby transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
