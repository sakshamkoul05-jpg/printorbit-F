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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-1">My Account</h1>
      <p className="text-sm text-slate-500 mb-8">Manage your orders, quotes, and designs.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-lg border border-slate-200 p-5 group flex items-center gap-4 hover:border-navy/30 transition-colors"
          >
            <div className="w-11 h-11 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-navy/5 transition-colors">
              <item.icon className="w-5 h-5 text-navy" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-navy text-sm">{item.label}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-navy transition-colors" />
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
