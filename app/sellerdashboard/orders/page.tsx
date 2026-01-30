'use client';

import { useState } from 'react';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-1091',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      address: '123 MG Road, Bangalore, Karnataka - 560001',
    },
    items: [
      { name: 'Handmade Vase', quantity: 1, price: 1200 },
    ],
    total: 1200,
    status: 'delivered',
    payment: 'paid',
    date: '2026-01-27',
    deliveryDate: '2026-01-30',
  },
  {
    id: 'ORD-1090',
    customer: {
      name: 'Rahul Verma',
      email: 'rahul.v@email.com',
      phone: '+91 98765 43211',
      address: '456 Park Street, Kolkata, West Bengal - 700016',
    },
    items: [
      { name: 'Clay Pot Set', quantity: 1, price: 2450 },
    ],
    total: 2450,
    status: 'shipped',
    payment: 'paid',
    date: '2026-01-27',
    deliveryDate: '2026-01-31',
  },
  {
    id: 'ORD-1089',
    customer: {
      name: 'Anita Desai',
      email: 'anita.desai@email.com',
      phone: '+91 98765 43212',
      address: '789 Linking Road, Mumbai, Maharashtra - 400050',
    },
    items: [
      { name: 'Wooden Wall Art', quantity: 1, price: 980 },
    ],
    total: 980,
    status: 'pending',
    payment: 'paid',
    date: '2026-01-26',
    deliveryDate: '2026-01-30',
  },
  {
    id: 'ORD-1088',
    customer: {
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 98765 43213',
      address: '321 Rajpath, New Delhi, Delhi - 110001',
    },
    items: [
      { name: 'Handwoven Basket', quantity: 2, price: 675 },
    ],
    total: 1350,
    status: 'processing',
    payment: 'paid',
    date: '2026-01-26',
    deliveryDate: '2026-01-29',
  },
  {
    id: 'ORD-1087',
    customer: {
      name: 'Meera Kapoor',
      email: 'meera.k@email.com',
      phone: '+91 98765 43214',
      address: '654 Civil Lines, Jaipur, Rajasthan - 302006',
    },
    items: [
      { name: 'Ceramic Dinner Set', quantity: 1, price: 3200 },
    ],
    total: 3200,
    status: 'delivered',
    payment: 'paid',
    date: '2026-01-25',
    deliveryDate: '2026-01-28',
  },
  {
    id: 'ORD-1086',
    customer: {
      name: 'Arjun Reddy',
      email: 'arjun.reddy@email.com',
      phone: '+91 98765 43215',
      address: '987 Banjara Hills, Hyderabad, Telangana - 500034',
    },
    items: [
      { name: 'Bamboo Serving Tray', quantity: 2, price: 850 },
      { name: 'Handmade Vase', quantity: 1, price: 1200 },
    ],
    total: 2900,
    status: 'cancelled',
    payment: 'refunded',
    date: '2026-01-24',
    deliveryDate: '-',
  },
  {
    id: 'ORD-1085',
    customer: {
      name: 'Sneha Patel',
      email: 'sneha.patel@email.com',
      phone: '+91 98765 43216',
      address: '147 Ashram Road, Ahmedabad, Gujarat - 380009',
    },
    items: [
      { name: 'Hand-painted Ceramic Plates', quantity: 1, price: 1800 },
    ],
    total: 1800,
    status: 'pending',
    payment: 'pending',
    date: '2026-01-26',
    deliveryDate: '2026-01-30',
  },
  {
    id: 'ORD-1084',
    customer: {
      name: 'Karthik Iyer',
      email: 'karthik.iyer@email.com',
      phone: '+91 98765 43217',
      address: '258 Anna Salai, Chennai, Tamil Nadu - 600002',
    },
    items: [
      { name: 'Wooden Wall Art', quantity: 2, price: 980 },
      { name: 'Ceramic Dinner Set', quantity: 1, price: 3200 },
    ],
    total: 5160,
    status: 'processing',
    payment: 'paid',
    date: '2026-01-25',
    deliveryDate: '2026-01-29',
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || order.payment === selectedPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;
  const shippedOrders = orders.filter(o => o.status === 'shipped').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  // Status config
  const statusConfig = {
    pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
    processing: { label: 'Processing', class: 'bg-blue-100 text-blue-700', icon: '⚙️' },
    shipped: { label: 'Shipped', class: 'bg-purple-100 text-purple-700', icon: '🚚' },
    delivered: { label: 'Delivered', class: 'bg-green-100 text-green-700', icon: '✅' },
    cancelled: { label: 'Cancelled', class: 'bg-red-100 text-red-700', icon: '❌' },
  };

  const paymentConfig = {
    paid: { label: 'Paid', class: 'bg-green-100 text-green-700' },
    pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-700' },
    refunded: { label: 'Refunded', class: 'bg-gray-100 text-gray-700' },
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Orders</h1>
              <p className="text-gray-600 mt-1">Manage and track all your orders</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
              📊 Export Orders
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <StatCard label="Total Orders" value={totalOrders} icon="📦" color="blue" />
            <StatCard label="Pending" value={pendingOrders} icon="⏳" color="yellow" />
            <StatCard label="Processing" value={processingOrders} icon="⚙️" color="purple" />
            <StatCard label="Shipped" value={shippedOrders} icon="🚚" color="indigo" />
            <StatCard label="Delivered" value={deliveredOrders} icon="✅" color="green" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Payment Filter */}
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig];
                  const payment = paymentConfig[order.payment as keyof typeof paymentConfig];

                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="font-medium text-blue-600 hover:text-blue-700"
                        >
                          {order.id}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{order.items.length} item(s)</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">₹{order.total.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${status.class}`}>
                          <span>{status.icon}</span>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${payment.class}`}>
                          {payment.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {new Date(order.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="View Details"
                          >
                            👁️
                          </button>
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center mt-6">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedStatus !== 'all' || selectedPayment !== 'all'
                ? 'Try adjusting your filters'
                : 'You have no orders yet'}
            </p>
          </div>
        )}
      </main>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowDetailsModal(false)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, icon, color }: {
  label: string;
  value: number;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    green: 'bg-green-50 border-green-200 text-green-700',
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

// Order Details Modal
function OrderDetailsModal({ order, onClose, onUpdateStatus }: {
  order: any;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: string) => void;
}) {
  const statusConfig = {
    pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
    processing: { label: 'Processing', class: 'bg-blue-100 text-blue-700', icon: '⚙️' },
    shipped: { label: 'Shipped', class: 'bg-purple-100 text-purple-700', icon: '🚚' },
    delivered: { label: 'Delivered', class: 'bg-green-100 text-green-700', icon: '✅' },
    cancelled: { label: 'Cancelled', class: 'bg-red-100 text-red-700', icon: '❌' },
  };

  const status = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Order Details</h2>
            <p className="text-gray-600 mt-1">{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Status and Date */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg ${status.class}`}>
                <span className="text-lg">{status.icon}</span>
                {status.label}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Date</label>
              <p className="text-gray-900">{new Date(order.date).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gray-600 w-24">Name:</span>
                <span className="font-medium text-gray-900">{order.customer.name}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 w-24">Email:</span>
                <span className="text-gray-900">{order.customer.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 w-24">Phone:</span>
                <span className="text-gray-900">{order.customer.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 w-24">Address:</span>
                <span className="text-gray-900">{order.customer.address}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-3 text-gray-900">₹{item.price.toLocaleString()}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        ₹{(item.quantity * item.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-semibold text-gray-900">
                      Total Amount:
                    </td>
                    <td className="px-4 py-3 font-bold text-lg text-gray-900">
                      ₹{order.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Expected Delivery:</span>
                <span className="font-medium text-gray-900">
                  {order.deliveryDate !== '-' 
                    ? new Date(order.deliveryDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-medium text-gray-900 capitalize">{order.payment}</span>
              </div>
            </div>
          </div>

          {/* Update Status */}
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Order Status</h3>
              <div className="flex gap-3">
                {['processing', 'shipped', 'delivered'].map((newStatus) => (
                  <button
                    key={newStatus}
                    onClick={() => {
                      onUpdateStatus(order.id, newStatus);
                      onClose();
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium capitalize"
                  >
                    Mark as {newStatus}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            📄 Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
}