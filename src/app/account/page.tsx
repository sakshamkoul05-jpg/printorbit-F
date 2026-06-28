'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Package, FileText, Heart, Settings, LogOut, MapPin, CreditCard,
  Clock, Truck, CheckCircle, XCircle, Eye, Download, ChevronRight,
  Star, Repeat, User, Bell, Shield, Gift,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { formatPrice, formatDate } from '@/lib/utils';

const ORDERS = [
  { id: 'ORD-2024-001', date: '2024-03-15', status: 'delivered', amount: 4990, items: 3, tracking: 'TRK123456789' },
  { id: 'ORD-2024-002', date: '2024-03-20', status: 'printing', amount: 12500, items: 5, tracking: null },
  { id: 'ORD-2024-003', date: '2024-03-25', status: 'shipped', amount: 3200, items: 1, tracking: 'TRK987654321' },
  { id: 'ORD-2024-004', date: '2024-03-28', status: 'confirmed', amount: 8900, items: 2, tracking: null },
];

const SAVED_DESIGNS = [
  { id: '1', name: 'Business Card - Final', thumbnail: null, product: 'Business Cards', updatedAt: '2024-03-20' },
  { id: '2', name: 'Flyer - Spring Sale', thumbnail: null, product: 'A5 Flyers', updatedAt: '2024-03-18' },
  { id: '3', name: 'Banner - Exhibition', thumbnail: null, product: 'Vinyl Banner', updatedAt: '2024-03-15' },
];

const WISHLIST_ITEMS = [
  { id: '1', name: 'Metallic Foil Business Cards', price: 899, image: null },
  { id: '2', name: 'Custom Mailer Boxes', price: 149, image: null },
  { id: '3', name: 'Die-Cut Vinyl Stickers', price: 199, image: null },
];

const STATUS_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  confirmed: { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  processing: { icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  printing: { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  shipped: { icon: Truck, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'designs', label: 'Saved Designs', icon: FileText },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-24">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{user?.full_name || 'Guest User'}</p>
                    <p className="text-xs text-muted">{user?.phone || 'guest@email.com'}</p>
                  </div>
                </div>

                {/* Nav Tabs */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-dark'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                  <hr className="border-slate-100 my-2" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red hover:bg-red/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Orders */}
              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="text-xl font-bold text-dark font-heading mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {ORDERS.map((order) => {
                      const StatusIcon = STATUS_CONFIG[order.status]?.icon || Package;
                      const statusColor = STATUS_CONFIG[order.status]?.color || 'text-slate-600';
                      const statusBg = STATUS_CONFIG[order.status]?.bg || 'bg-slate-50';

                      return (
                        <div key={order.id} className="bg-white rounded-2xl border border-slate-100 p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-sm font-semibold text-dark">{order.id}</p>
                              <p className="text-xs text-muted">{formatDate(order.date)}</p>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${statusBg}`}>
                              <StatusIcon className={`w-3.5 h-3.5 ${statusColor}`} />
                              <span className={`text-xs font-semibold capitalize ${statusColor}`}>
                                {order.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted">{order.items} item{order.items > 1 ? 's' : ''}</span>
                              <span className="text-lg font-bold text-primary">{formatPrice(order.amount)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {order.tracking && (
                                <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                                  Track
                                </button>
                              )}
                              <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                View
                              </button>
                              {order.status === 'delivered' && (
                                <button className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-lg hover:bg-accent/20 transition-colors flex items-center gap-1">
                                  <Repeat className="w-3 h-3" />
                                  Reorder
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Saved Designs */}
              {activeTab === 'designs' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-dark font-heading">Saved Designs</h2>
                    <Link href="/design-studio" className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                      New Design
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {SAVED_DESIGNS.map((design) => (
                      <div key={design.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                          <FileText className="w-10 h-10 text-slate-300" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-dark mb-1">{design.name}</h3>
                          <p className="text-xs text-muted mb-3">{design.product} · {formatDate(design.updatedAt)}</p>
                          <div className="flex gap-2">
                            <Link href="/design-studio" className="flex-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg text-center hover:bg-primary/20 transition-colors">
                              Edit
                            </Link>
                            <button className="px-3 py-1.5 bg-slate-100 text-slate-50 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Wishlist */}
              {activeTab === 'wishlist' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="text-xl font-bold text-dark font-heading mb-6">Wishlist</h2>
                  <div className="space-y-3">
                    {WISHLIST_ITEMS.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-slate-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-dark">{item.name}</h3>
                          <p className="text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                            Add to Cart
                          </button>
                          <button className="p-2 text-red hover:bg-red/5 rounded-xl transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Addresses */}
              {activeTab === 'addresses' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-dark font-heading">Saved Addresses</h2>
                    <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                      + Add Address
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border-2 border-primary/20 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Primary</span>
                        <div className="flex gap-2">
                          <button className="text-xs text-primary font-medium">Edit</button>
                          <button className="text-xs text-red font-medium">Delete</button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-dark mb-1">Office - Faridabad</p>
                      <p className="text-xs text-muted leading-relaxed">
                        Sector 15, Faridabad,<br />Haryana 121001
                      </p>
                      <p className="text-xs text-muted mt-2">+91 98765 43211</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span />
                        <div className="flex gap-2">
                          <button className="text-xs text-primary font-medium">Edit</button>
                          <button className="text-xs text-red font-medium">Delete</button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-dark mb-1">Home - Dharamshala</p>
                      <p className="text-xs text-muted leading-relaxed">
                        McLeod Ganj, Dharamshala,<br />HP 176219
                      </p>
                      <p className="text-xs text-muted mt-2">+91 98765 43210</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Rewards */}
              {activeTab === 'rewards' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="text-xl font-bold text-dark font-heading mb-6">Rewards & Loyalty</h2>
                  <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 text-white mb-6">
                    <p className="text-sm opacity-80 mb-1">Your Points Balance</p>
                    <p className="text-4xl font-bold font-heading">2,450</p>
                    <p className="text-sm opacity-60 mt-2">Worth ₹245 in discounts</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h3 className="text-sm font-semibold text-dark mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { desc: 'Order #ORD-2024-001 completed', points: '+250', date: 'Mar 15' },
                        { desc: 'Referral bonus - Rahul M.', points: '+500', date: 'Mar 10' },
                        { desc: 'Redeemed for 10% discount', points: '-300', date: 'Mar 5' },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                          <div>
                            <p className="text-sm text-dark">{activity.desc}</p>
                            <p className="text-xs text-muted">{activity.date}</p>
                          </div>
                          <span className={`text-sm font-bold ${activity.points.startsWith('+') ? 'text-success' : 'text-red'}`}>
                            {activity.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="text-xl font-bold text-dark font-heading mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                      <h3 className="text-sm font-semibold text-dark mb-4">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">Full Name</label>
                          <input type="text" defaultValue={user?.full_name || ''} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">Phone</label>
                          <input type="tel" defaultValue={user?.phone || ''} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">Company</label>
                          <input type="text" defaultValue={user?.company_name || ''} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">GST Number</label>
                          <input type="text" defaultValue={user?.gst_number || ''} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                        </div>
                      </div>
                      <button className="mt-4 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                        Save Changes
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                      <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary" />
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        {['Order updates', 'Promotional emails', 'SMS notifications', 'Newsletter'].map((item) => (
                          <label key={item} className="flex items-center justify-between py-2">
                            <span className="text-sm text-slate-600">{item}</span>
                            <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                      <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Security
                      </h3>
                      <button className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
