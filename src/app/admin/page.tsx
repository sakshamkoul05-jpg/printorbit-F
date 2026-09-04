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
      pending: 'bg-warning bg-opacity-10 text-warning',
      confirmed: 'bg-primary bg-opacity-10 text-primary',
      processing: 'bg-info bg-opacity-10 text-info',
      shipped: 'bg-info bg-opacity-10 text-info',
      delivered: 'bg-success bg-opacity-10 text-success',
      active: 'bg-success bg-opacity-10 text-success',
      draft: 'bg-secondary bg-opacity-10 text-secondary',
      expired: 'bg-danger bg-opacity-10 text-danger',
      'In Stock': 'bg-success bg-opacity-10 text-success',
      'Low Stock': 'bg-warning bg-opacity-10 text-warning',
    };
    return map[status] || 'bg-secondary bg-opacity-10 text-secondary';
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className={`position-fixed top-0 bottom-0 start-0 z-50 bg-dark text-white transition-all ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'} d-none d-lg-block`} style={{ width: sidebarOpen ? '256px' : '64px', transition: 'width 0.3s' }}>
        <div className="d-flex align-items-center justify-content-between h-16 px-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {sidebarOpen && (
            <div className="d-flex align-items-center gap-2">
              <Logo size="sm" dark={false} showText={false} />
              <span className="fw-bold text-sm font-heading">Admin Panel</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-sm p-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <nav className="p-2 d-flex flex-column gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-100 d-flex align-items-center gap-3 px-3 py-2 rounded-xl text-sm fw-medium ${activeTab === item.id ? 'bg-primary text-white' : ''}`}
              style={activeTab !== item.id ? { color: 'rgba(255,255,255,0.5)' } : {}}
            >
              <item.icon size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: sidebarOpen ? '256px' : '64px', transition: 'margin-left 0.3s' }}>
        {/* Top Bar */}
        <div className="h-16 bg-white border-bottom d-flex align-items-center justify-content-between px-4 shrink-0" style={{ borderColor: '#dee2e6' }}>
          <h1 className="text-lg fw-bold text-dark font-heading text-capitalize">{activeTab}</h1>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <Search size={16} className="position-absolute text-muted" style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="form-control form-control-sm ps-9"
                style={{ width: '256px', borderRadius: '12px' }}
              />
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: 'rgba(13, 110, 253, 0.1)' }}>
              <span className="text-xs fw-bold text-primary">A</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="d-flex flex-column gap-4">
              {/* Stats */}
              <div className="row g-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="col-12 col-md-6 col-lg-3">
                    <div className="bg-white rounded-2xl border p-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="rounded-xl d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(13, 110, 253, 0.1)' }}>
                          <stat.icon size={20} className="text-primary" />
                        </div>
                        <span className={`text-xs fw-semibold d-flex align-items-center gap-1 ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                          {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl fw-bold text-dark font-heading">{stat.value}</p>
                      <p className="text-xs text-muted mt-1">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <div className="bg-white rounded-2xl border p-4">
                    <h3 className="text-sm fw-semibold text-dark mb-3">Revenue Overview</h3>
                    <div className="rounded-xl d-flex align-items-center justify-content-center" style={{ height: '256px', background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.05), rgba(108, 92, 231, 0.05))' }}>
                      <BarChart3 size={48} style={{ color: 'rgba(13, 110, 253, 0.2)' }} />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="bg-white rounded-2xl border p-4">
                    <h3 className="text-sm fw-semibold text-dark mb-3">Orders Overview</h3>
                    <div className="rounded-xl d-flex align-items-center justify-content-center" style={{ height: '256px', background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.05), rgba(13, 110, 253, 0.05))' }}>
                      <ShoppingCart size={48} style={{ color: 'rgba(108, 92, 231, 0.2)' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                {/* Recent Orders */}
                <div className="col-12 col-lg-6">
                  <div className="bg-white rounded-2xl border p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="text-sm fw-semibold text-dark">Recent Orders</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-xs text-primary fw-medium btn btn-link p-0">View All</button>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      {RECENT_ORDERS.map((order) => (
                        <div key={order.id} className="d-flex align-items-center justify-content-between py-2 border-bottom" style={{ borderColor: '#f8f9fa' }}>
                          <div>
                            <p className="text-sm fw-medium text-dark">{order.id}</p>
                            <p className="text-xs text-muted">{order.customer} · {order.date}</p>
                          </div>
                          <div className="text-end">
                            <p className="text-sm fw-semibold text-dark">{formatPrice(order.amount)}</p>
                            <span className={`fw-semibold px-2 py-0.5 rounded-pill text-capitalize ${statusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="col-12 col-lg-6">
                  <div className="bg-white rounded-2xl border p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="text-sm fw-semibold text-dark">Top Products</h3>
                      <button onClick={() => setActiveTab('products')} className="text-xs text-primary fw-medium btn btn-link p-0">View All</button>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      {TOP_PRODUCTS.map((product, i) => (
                        <div key={i} className="d-flex align-items-center justify-content-between py-2 border-bottom" style={{ borderColor: '#f8f9fa' }}>
                          <div className="d-flex align-items-center gap-3">
                            <span className="rounded-lg d-flex align-items-center justify-center fw-bold text-primary" style={{ width: '24px', height: '24px', backgroundColor: 'rgba(13, 110, 253, 0.1)' }}>
                              {i + 1}
                            </span>
                            <div>
                              <p className="text-sm fw-medium text-dark">{product.name}</p>
                              <p className="text-xs text-muted">{product.orders} orders</p>
                            </div>
                          </div>
                          <div className="text-end">
                            <p className="text-sm fw-semibold text-dark">{product.revenue}</p>
                            <span className="text-success fw-semibold">{product.growth}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-4 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: '#dee2e6' }}>
                  <h3 className="fw-semibold text-dark">All Orders</h3>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-1">
                      <Filter size={12} /> Filter
                    </button>
                    <button className="btn btn-primary btn-sm">Export</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead className="bg-light text-xs text-muted text-uppercase">
                      <tr>
                        <th className="px-4 py-3 text-start fw-semibold">Order ID</th>
                        <th className="px-4 py-3 text-start fw-semibold">Customer</th>
                        <th className="px-4 py-3 text-start fw-semibold">Amount</th>
                        <th className="px-4 py-3 text-start fw-semibold">Status</th>
                        <th className="px-4 py-3 text-start fw-semibold">Date</th>
                        <th className="px-4 py-3 text-end fw-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_ORDERS.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-3 text-sm fw-medium text-dark">{order.id}</td>
                          <td className="px-4 py-3 text-sm text-secondary">{order.customer}</td>
                          <td className="px-4 py-3 text-sm fw-semibold text-dark">{formatPrice(order.amount)}</td>
                          <td className="px-4 py-3">
                            <span className={`fw-semibold px-2 py-1 rounded-pill text-capitalize ${statusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted">{order.date}</td>
                          <td className="px-4 py-3 text-end">
                            <div className="d-flex align-items-center justify-content-end gap-1">
                              <button className="btn btn-sm btn-light p-1"><Eye size={14} className="text-muted" /></button>
                              <button className="btn btn-sm btn-light p-1"><Edit size={14} className="text-muted" /></button>
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
              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-4 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: '#dee2e6' }}>
                  <h3 className="fw-semibold text-dark">All Products</h3>
                  <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                    <Plus size={14} /> Add Product
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead className="bg-light text-xs text-muted text-uppercase">
                      <tr>
                        <th className="px-4 py-3 text-start fw-semibold">Product</th>
                        <th className="px-4 py-3 text-start fw-semibold">Category</th>
                        <th className="px-4 py-3 text-start fw-semibold">Price</th>
                        <th className="px-4 py-3 text-start fw-semibold">Stock</th>
                        <th className="px-4 py-3 text-start fw-semibold">Orders</th>
                        <th className="px-4 py-3 text-start fw-semibold">Status</th>
                        <th className="px-4 py-3 text-end fw-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTS.map((product) => (
                        <tr key={product.id}>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div className="bg-light rounded-lg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <Package size={20} className="text-muted" />
                              </div>
                              <span className="text-sm fw-medium text-dark">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-secondary">{product.category}</td>
                          <td className="px-4 py-3 text-sm fw-semibold text-dark">{formatPrice(product.price)}</td>
                          <td className="px-4 py-3">
                            <span className={`fw-semibold px-2 py-1 rounded-pill ${statusColor(product.stock)}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-secondary">{product.orders}</td>
                          <td className="px-4 py-3">
                            <span className={`fw-semibold px-2 py-1 rounded-pill text-capitalize ${statusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <div className="d-flex align-items-center justify-content-end gap-1">
                              <button className="btn btn-sm btn-light p-1"><Eye size={14} className="text-muted" /></button>
                              <button className="btn btn-sm btn-light p-1"><Edit size={14} className="text-muted" /></button>
                              <button className="btn btn-sm btn-light p-1"><Trash2 size={14} className="text-muted" /></button>
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
              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-4 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: '#dee2e6' }}>
                  <h3 className="fw-semibold text-dark">Coupons & Discounts</h3>
                  <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                    <Plus size={14} /> Create Coupon
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead className="bg-light text-xs text-muted text-uppercase">
                      <tr>
                        <th className="px-4 py-3 text-start fw-semibold">Code</th>
                        <th className="px-4 py-3 text-start fw-semibold">Discount</th>
                        <th className="px-4 py-3 text-start fw-semibold">Type</th>
                        <th className="px-4 py-3 text-start fw-semibold">Usage</th>
                        <th className="px-4 py-3 text-start fw-semibold">Valid Until</th>
                        <th className="px-4 py-3 text-start fw-semibold">Status</th>
                        <th className="px-4 py-3 text-end fw-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COUPONS.map((coupon) => (
                        <tr key={coupon.code}>
                          <td className="px-4 py-3 text-sm fw-semibold text-dark" style={{ fontFamily: 'monospace' }}>{coupon.code}</td>
                          <td className="px-4 py-3 text-sm fw-semibold text-primary">{coupon.discount}</td>
                          <td className="px-4 py-3 text-sm text-secondary">{coupon.type}</td>
                          <td className="px-4 py-3 text-sm text-secondary">{coupon.usage} uses</td>
                          <td className="px-4 py-3 text-sm text-muted">{coupon.valid}</td>
                          <td className="px-4 py-3">
                            <span className={`fw-semibold px-2 py-1 rounded-pill text-capitalize ${statusColor(coupon.status)}`}>
                              {coupon.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <div className="d-flex align-items-center justify-content-end gap-1">
                              <button className="btn btn-sm btn-light p-1"><Edit size={14} className="text-muted" /></button>
                              <button className="btn btn-sm btn-light p-1"><Trash2 size={14} className="text-muted" /></button>
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
              <div className="bg-white rounded-2xl border p-5 text-center">
                <div className="rounded-2xl d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px', backgroundColor: 'rgba(13, 110, 253, 0.1)' }}>
                  <Settings size={32} style={{ color: 'rgba(13, 110, 253, 0.3)' }} />
                </div>
                <h3 className="text-lg fw-semibold text-dark mb-2 text-capitalize">{activeTab}</h3>
                <p className="text-sm text-muted">This section is coming soon. Full CRUD functionality will be available.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
