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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-printorbit-navy mb-2">My Account</h1>
      <p className="text-printorbit-gray mb-8">Manage your orders, quotes, and designs.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:border-printorbit-red/30 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-printorbit-red/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-printorbit-red/20 transition-colors">
              <item.icon className="w-6 h-6 text-printorbit-red" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-printorbit-navy group-hover:text-printorbit-red transition-colors">{item.label}</h3>
              <p className="text-sm text-printorbit-gray">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-printorbit-gray group-hover:text-printorbit-red transition-colors" />
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 text-sm text-printorbit-gray hover:text-red-600 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
