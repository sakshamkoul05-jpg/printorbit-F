'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, BarChart3, Settings,
  FileText, Star, TrendingUp, TrendingDown, DollarSign, Eye, Edit, Trash2,
  Plus, Search, Filter, ChevronDown, ArrowUpRight, Clock, CheckCircle,
  AlertTriangle, Truck, Palette, Image as ImageIcon, Menu, X,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { formatPrice } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

const STATS = [
  { label: 'Total Revenue', value: '₹12,45,680', change: '+12.5%', trend: 'up', icon: DollarSign },
  { label: 'Total Orders', value: '1,284', change: '+8.2%', trend: 'up', icon: ShoppingCart },
  { label: 'Active Products', value: '342', change: '+5', trend: 'up', icon: Package },
  { label: 'Total Users', value: '8,921', change: '+124', trend: 'up', icon: Users },
];

const RECENT_ORDERS = [
  { id: 'ORD-1234', customer: 'Priya Sharma', amount: 4990, status: 'processing', date: '2 min ago' },
  { id: 'ORD-1233', customer: 'Rahul Mehta', amount: 12500, status: 'shipped', date: '15 min ago' },
  { id: 'ORD-1232', customer: 'Anjali Patel', amount: 3200, status: 'delivered', date: '1 hr ago' },
  { id: 'ORD-1231', customer: 'Vikram Singh', amount: 8900, status: 'confirmed', date: '2 hr ago' },
  { id: 'ORD-1230', customer: 'Neha Gupta', amount: 2100, status: 'pending', date: '3 hr ago' },
];

const TOP_PRODUCTS = [
  { name: 'Premium Business Cards', orders: 456, revenue: '₹2,27,400', growth: '+15%' },
  { name: 'A5 Flyers', orders: 389, revenue: '₹1,16,411', growth: '+8%' },
  { name: 'Vinyl Banners', orders: 234, revenue: '₹1,40,166', growth: '+22%' },
  { name: 'Die-Cut Stickers', orders: 567, revenue: '₹1,13,433', growth: '+12%' },
  { name: 'Custom Mailer Boxes', orders: 178, revenue: '₹2,65,222', growth: '+31%' },
];

const PRODUCTS = [
  { id: '1', name: 'Premium Matte Business Cards', category: 'Business Cards', price: 499, stock: 'In Stock', orders: 456, status: 'active' },
  { id: '2', name: 'Metallic Foil Business Cards', category: 'Business Cards', price: 899, stock: 'In Stock', orders: 183, status: 'active' },
  { id: '3', name: 'A5 Double-Sided Flyers', category: 'Flyers', price: 299, stock: 'In Stock', orders: 412, status: 'active' },
  { id: '4', name: 'Vinyl Banner 3×6ft', category: 'Banners', price: 599, stock: 'Low Stock', orders: 156, status: 'active' },
  { id: '5', name: 'Die-Cut Vinyl Stickers', category: 'Stickers', price: 199, stock: 'In Stock', orders: 523, status: 'active' },
  { id: '6', name: 'Custom Mailer Boxes', category: 'Packaging', price: 149, stock: 'In Stock', orders: 89, status: 'draft' },
];

const COUPONS = [
  { code: 'PRINTORBIT10', discount: '10%', type: 'Percentage', usage: 234, valid: '2024-12-31', status: 'active' },
  { code: 'WELCOME50', discount: '₹50', type: 'Fixed', usage: 1892, valid: '2024-06-30', status: 'active' },
  { code: 'BULK20', discount: '20%', type: 'Percentage', usage: 56, valid: '2024-12-31', status: 'active' },
  { code: 'SUMMER25', discount: '25%', type: 'Percentage', usage: 0, valid: '2024-05-31', status: 'expired' },
];

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'designs', label: 'Designs', icon: Palette },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      processing: 'bg-indigo-100 text-indigo-700',
      shipped: 'bg-cyan-100 text-cyan-700',
      delivered: 'bg-green-100 text-green-700',
      active: 'bg-green-100 text-green-700',
      draft: 'bg-slate-100 text-slate-500',
      expired: 'bg-red-100 text-red-700',
      'In Stock': 'bg-green-100 text-green-700',
      'Low Stock': 'bg-amber-100 text-amber-700',
    };
    return map[status] || 'bg-slate-100 text-slate-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-dark text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} lg:relative`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Logo size="sm" dark={false} showText={false} />
              <span className="font-bold text-sm font-heading">Admin Panel</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-white/10 rounded-lg">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-bold text-dark font-heading capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary w-64"
              />
            </div>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary">A</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className={`text-xs font-semibold flex items-center gap-1 ${stat.trend === 'up' ? 'text-success' : 'text-red'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-dark font-heading">{stat.value}</p>
                    <p className="text-xs text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                  <h3 className="text-sm font-semibold text-dark mb-4">Revenue Overview</h3>
                  <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-primary/20" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                  <h3 className="text-sm font-semibold text-dark mb-4">Orders Overview</h3>
                  <div className="h-64 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-accent/20" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-dark">Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-xs text-primary font-medium">View All</button>
                  </div>
                  <div className="space-y-3">
                    {RECENT_ORDERS.map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-dark">{order.id}</p>
                          <p className="text-xs text-muted">{order.customer} · {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-dark">{formatPrice(order.amount)}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-dark">Top Products</h3>
                    <button onClick={() => setActiveTab('products')} className="text-xs text-primary font-medium">View All</button>
                  </div>
                  <div className="space-y-3">
                    {TOP_PRODUCTS.map((product, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-dark">{product.name}</p>
                            <p className="text-xs text-muted">{product.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-dark">{product.revenue}</p>
                          <span className="text-[10px] text-success font-semibold">{product.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-dark">All Orders</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg flex items-center gap-1">
                      <Filter className="w-3 h-3" /> Filter
                    </button>
                    <button className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg">Export</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                      <tr>
                        <th className="px-5 py-3 text-left font-semibold">Order ID</th>
                        <th className="px-5 py-3 text-left font-semibold">Customer</th>
                        <th className="px-5 py-3 text-left font-semibold">Amount</th>
                        <th className="px-5 py-3 text-left font-semibold">Status</th>
                        <th className="px-5 py-3 text-left font-semibold">Date</th>
                        <th className="px-5 py-3 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {RECENT_ORDERS.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3 text-sm font-medium text-dark">{order.id}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{order.customer}</td>
                          <td className="px-5 py-3 text-sm font-semibold text-dark">{formatPrice(order.amount)}</td>
                          <td className="px-5 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${statusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-xs text-muted">{order.date}</td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products */}
          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-dark">All Products</h3>
                  <button className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" /> Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                      <tr>
                        <th className="px-5 py-3 text-left font-semibold">Product</th>
                        <th className="px-5 py-3 text-left font-semibold">Category</th>
                        <th className="px-5 py-3 text-left font-semibold">Price</th>
                        <th className="px-5 py-3 text-left font-semibold">Stock</th>
                        <th className="px-5 py-3 text-left font-semibold">Orders</th>
                        <th className="px-5 py-3 text-left font-semibold">Status</th>
                        <th className="px-5 py-3 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PRODUCTS.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-slate-300" />
                              </div>
                              <span className="text-sm font-medium text-dark">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-600">{product.category}</td>
                          <td className="px-5 py-3 text-sm font-semibold text-dark">{formatPrice(product.price)}</td>
                          <td className="px-5 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${statusColor(product.stock)}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-600">{product.orders}</td>
                          <td className="px-5 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${statusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 text-slate-400 hover:text-red hover:bg-red/5 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Coupons */}
          {activeTab === 'coupons' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-dark">Coupons & Discounts</h3>
                  <button className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" /> Create Coupon
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                      <tr>
                        <th className="px-5 py-3 text-left font-semibold">Code</th>
                        <th className="px-5 py-3 text-left font-semibold">Discount</th>
                        <th className="px-5 py-3 text-left font-semibold">Type</th>
                        <th className="px-5 py-3 text-left font-semibold">Usage</th>
                        <th className="px-5 py-3 text-left font-semibold">Valid Until</th>
                        <th className="px-5 py-3 text-left font-semibold">Status</th>
                        <th className="px-5 py-3 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {COUPONS.map((coupon) => (
                        <tr key={coupon.code} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3 text-sm font-mono font-semibold text-dark">{coupon.code}</td>
                          <td className="px-5 py-3 text-sm font-semibold text-primary">{coupon.discount}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{coupon.type}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{coupon.usage} uses</td>
                          <td className="px-5 py-3 text-sm text-muted">{coupon.valid}</td>
                          <td className="px-5 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${statusColor(coupon.status)}`}>
                              {coupon.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 text-slate-400 hover:text-red hover:bg-red/5 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Placeholder tabs */}
          {['customers', 'designs', 'content', 'analytics', 'settings'].includes(activeTab) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-primary/30" />
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2 capitalize">{activeTab}</h3>
                <p className="text-sm text-muted">This section is coming soon. Full CRUD functionality will be available.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
