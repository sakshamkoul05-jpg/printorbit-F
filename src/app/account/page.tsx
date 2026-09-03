'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package, FileText, Heart, Settings, LogOut, MapPin, Gift,
  Clock, Truck, CheckCircle, XCircle, Eye, Download,
  Repeat, User, Bell, Shield,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { useAuthStore } from '@/store/auth';
import { formatPrice, formatDate } from '@/lib/utils';

const ORDERS = [
  { id: 'ORD-2024-001', date: '2024-03-15', status: 'delivered', amount: 4990, items: 3, tracking: 'TRK123456789' },
  { id: 'ORD-2024-002', date: '2024-03-20', status: 'printing', amount: 12500, items: 5, tracking: null },
  { id: 'ORD-2024-003', date: '2024-03-25', status: 'shipped', amount: 3200, items: 1, tracking: 'TRK987654321' },
  { id: 'ORD-2024-004', date: '2024-03-28', status: 'confirmed', amount: 8900, items: 2, tracking: null },
];

const SAVED_DESIGNS = [
  { id: '1', name: 'Business Card - Final', product: 'Business Cards', updatedAt: '2024-03-20' },
  { id: '2', name: 'Flyer - Spring Sale', product: 'A5 Flyers', updatedAt: '2024-03-18' },
  { id: '3', name: 'Banner - Exhibition', product: 'Vinyl Banner', updatedAt: '2024-03-15' },
];

const WISHLIST_ITEMS = [
  { id: '1', name: 'Metallic Foil Business Cards', price: 899 },
  { id: '2', name: 'Custom Mailer Boxes', price: 149 },
  { id: '3', name: 'Die-Cut Vinyl Stickers', price: 199 },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  pending: { color: '#92400E', bg: '#FEF3C7' },
  confirmed: { color: '#1E40AF', bg: '#DBEAFE' },
  processing: { color: '#3730A3', bg: '#E0E7FF' },
  printing: { color: '#6B21A8', bg: '#F3E8FF' },
  shipped: { color: '#155E75', bg: '#CFFAFE' },
  delivered: { color: '#065F46', bg: '#D1FAE5' },
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, logout } = useAuthStore();

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'designs', label: 'Saved Designs', icon: FileText },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white p-5 sticky top-24" style={{ border: '1px solid #E5E7EB' }}>
                <div className="flex items-center gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDF2F2' }}>
                    <User className="w-6 h-6" style={{ color: '#ED1C24' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{user?.full_name || 'Guest User'}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{user?.phone || 'guest@email.com'}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium"
                      style={{
                        backgroundColor: activeTab === tab.id ? '#FDF2F2' : 'transparent',
                        color: activeTab === tab.id ? '#ED1C24' : '#6B7280',
                      }}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                  <hr style={{ borderColor: '#E5E7EB', margin: '8px 0' }} />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium"
                    style={{ color: '#DC2626' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: '#0F0F0F' }}>My Orders</h2>
                  <div className="space-y-4">
                    {ORDERS.map((order) => {
                      const statusColor = STATUS_CONFIG[order.status]?.color || '#4B5563';
                      const statusBg = STATUS_CONFIG[order.status]?.bg || '#F3F4F6';

                      return (
                        <div key={order.id} className="bg-white p-5" style={{ border: '1px solid #E5E7EB' }}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{order.id}</p>
                              <p className="text-xs" style={{ color: '#6B7280' }}>{formatDate(order.date)}</p>
                            </div>
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold capitalize"
                              style={{ backgroundColor: statusBg, color: statusColor }}
                            >
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-sm" style={{ color: '#6B7280' }}>{order.items} item{order.items > 1 ? 's' : ''}</span>
                              <span className="text-lg font-bold" style={{ color: '#ED1C24' }}>{formatPrice(order.amount)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {order.tracking && (
                                <button className="px-3 py-1.5 text-xs font-medium rounded" style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}>
                                  Track
                                </button>
                              )}
                              <button className="px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1" style={{ backgroundColor: '#FDF2F2', color: '#ED1C24' }}>
                                <Eye className="w-3 h-3" />
                                View
                              </button>
                              {order.status === 'delivered' && (
                                <button className="px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
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
                </div>
              )}

              {activeTab === 'designs' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold" style={{ color: '#0F0F0F' }}>Saved Designs</h2>
                    <Link href="/design-studio" className="px-4 py-2 text-white text-sm font-semibold rounded" style={{ backgroundColor: '#ED1C24' }}>
                      New Design
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {SAVED_DESIGNS.map((design) => (
                      <div key={design.id} className="bg-white" style={{ border: '1px solid #E5E7EB' }}>
                        <div className="aspect-[4/3] flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
                          <FileText className="w-10 h-10" style={{ color: '#D1D5DB' }} />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-semibold mb-1" style={{ color: '#0F0F0F' }}>{design.name}</h3>
                          <p className="text-xs mb-3" style={{ color: '#6B7280' }}>{design.product} · {formatDate(design.updatedAt)}</p>
                          <div className="flex gap-2">
                            <Link href="/design-studio" className="flex-1 px-3 py-1.5 text-xs font-medium rounded text-center" style={{ backgroundColor: '#FDF2F2', color: '#ED1C24' }}>
                              Edit
                            </Link>
                            <button className="px-3 py-1.5 rounded" style={{ backgroundColor: '#F3F4F6' }}>
                              <Download className="w-3.5 h-3.5" style={{ color: '#6B7280' }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: '#0F0F0F' }}>Wishlist</h2>
                  <div className="space-y-3">
                    {WISHLIST_ITEMS.map((item) => (
                      <div key={item.id} className="bg-white p-4 flex items-center gap-4" style={{ border: '1px solid #E5E7EB' }}>
                        <div className="w-16 h-16 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: '#F3F4F6' }}>
                          <Package className="w-6 h-6" style={{ color: '#D1D5DB' }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{item.name}</h3>
                          <p className="text-sm font-bold" style={{ color: '#ED1C24' }}>{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-white text-xs font-semibold rounded" style={{ backgroundColor: '#ED1C24' }}>
                            Add to Cart
                          </button>
                          <button className="p-2 rounded" style={{ color: '#DC2626' }}>
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold" style={{ color: '#0F0F0F' }}>Saved Addresses</h2>
                    <button className="px-4 py-2 text-white text-sm font-semibold rounded" style={{ backgroundColor: '#ED1C24' }}>
                      + Add Address
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5" style={{ border: '2px solid #ED1C24' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase" style={{ backgroundColor: '#FDF2F2', color: '#ED1C24' }}>Primary</span>
                        <div className="flex gap-2">
                          <button className="text-xs font-medium" style={{ color: '#ED1C24' }}>Edit</button>
                          <button className="text-xs font-medium" style={{ color: '#DC2626' }}>Delete</button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold mb-1" style={{ color: '#0F0F0F' }}>Office - Faridabad</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                        Sector 15, Faridabad,<br />Haryana 121001
                      </p>
                      <p className="text-xs mt-2" style={{ color: '#6B7280' }}>+91 98765 43211</p>
                    </div>
                    <div className="bg-white p-5" style={{ border: '1px solid #E5E7EB' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span />
                        <div className="flex gap-2">
                          <button className="text-xs font-medium" style={{ color: '#ED1C24' }}>Edit</button>
                          <button className="text-xs font-medium" style={{ color: '#DC2626' }}>Delete</button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold mb-1" style={{ color: '#0F0F0F' }}>Home - Dharamshala</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                        McLeod Ganj, Dharamshala,<br />HP 176219
                      </p>
                      <p className="text-xs mt-2" style={{ color: '#6B7280' }}>+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rewards' && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: '#0F0F0F' }}>Rewards &amp; Loyalty</h2>
                  <div className="rounded-md p-6 text-white mb-6" style={{ backgroundColor: '#ED1C24' }}>
                    <p className="text-sm opacity-80 mb-1">Your Points Balance</p>
                    <p className="text-4xl font-bold">2,450</p>
                    <p className="text-sm opacity-60 mt-2">Worth ₹245 in discounts</p>
                  </div>
                  <div className="bg-white p-5" style={{ border: '1px solid #E5E7EB' }}>
                    <h3 className="text-sm font-semibold mb-4" style={{ color: '#0F0F0F' }}>Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { desc: 'Order #ORD-2024-001 completed', points: '+250', date: 'Mar 15' },
                        { desc: 'Referral bonus - Rahul M.', points: '+500', date: 'Mar 10' },
                        { desc: 'Redeemed for 10% discount', points: '-300', date: 'Mar 5' },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-2 last:border-0" style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <div>
                            <p className="text-sm" style={{ color: '#0F0F0F' }}>{activity.desc}</p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>{activity.date}</p>
                          </div>
                          <span className="text-sm font-bold" style={{ color: activity.points.startsWith('+') ? '#065F46' : '#DC2626' }}>
                            {activity.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: '#0F0F0F' }}>Account Settings</h2>
                  <div className="space-y-4">
                    <div className="bg-white p-5" style={{ border: '1px solid #E5E7EB' }}>
                      <h3 className="text-sm font-semibold mb-4" style={{ color: '#0F0F0F' }}>Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium mb-1 block" style={{ color: '#6B7280' }}>Full Name</label>
                          <input type="text" defaultValue={user?.full_name || ''} className="w-full px-4 py-2.5 rounded border text-sm outline-none" style={{ borderColor: '#D1D5DB' }} />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block" style={{ color: '#6B7280' }}>Phone</label>
                          <input type="tel" defaultValue={user?.phone || ''} className="w-full px-4 py-2.5 rounded border text-sm outline-none" style={{ borderColor: '#D1D5DB' }} />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block" style={{ color: '#6B7280' }}>Company</label>
                          <input type="text" defaultValue={user?.company_name || ''} className="w-full px-4 py-2.5 rounded border text-sm outline-none" style={{ borderColor: '#D1D5DB' }} />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block" style={{ color: '#6B7280' }}>GST Number</label>
                          <input type="text" defaultValue={user?.gst_number || ''} className="w-full px-4 py-2.5 rounded border text-sm outline-none" style={{ borderColor: '#D1D5DB' }} />
                        </div>
                      </div>
                      <button className="mt-4 px-6 py-2.5 text-white text-sm font-semibold rounded" style={{ backgroundColor: '#ED1C24' }}>
                        Save Changes
                      </button>
                    </div>

                    <div className="bg-white p-5" style={{ border: '1px solid #E5E7EB' }}>
                      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#0F0F0F' }}>
                        <Bell className="w-4 h-4" style={{ color: '#ED1C24' }} />
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        {['Order updates', 'Promotional emails', 'SMS notifications', 'Newsletter'].map((item) => (
                          <label key={item} className="flex items-center justify-between py-2">
                            <span className="text-sm" style={{ color: '#4B5563' }}>{item}</span>
                            <input type="checkbox" defaultChecked className="w-4 h-4" style={{ accentColor: '#ED1C24' }} />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-5" style={{ border: '1px solid #E5E7EB' }}>
                      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#0F0F0F' }}>
                        <Shield className="w-4 h-4" style={{ color: '#ED1C24' }} />
                        Security
                      </h3>
                      <button className="px-4 py-2 text-sm font-medium rounded" style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}>
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
