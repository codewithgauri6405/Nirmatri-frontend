'use client';

import { useState, useEffect } from 'react';

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
    items: [{ name: 'Handmade Vase', quantity: 1, price: 1200 }],
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
    items: [{ name: 'Clay Pot Set', quantity: 1, price: 2450 }],
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
    items: [{ name: 'Wooden Wall Art', quantity: 1, price: 980 }],
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
    items: [{ name: 'Handwoven Basket', quantity: 2, price: 675 }],
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
    items: [{ name: 'Ceramic Dinner Set', quantity: 1, price: 3200 }],
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
    items: [{ name: 'Hand-painted Ceramic Plates', quantity: 1, price: 1800 }],
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
  const [darkMode, setDarkMode] = useState(false);

  // Load and Persist Dark Mode
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || order.payment === selectedPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const processingOrders = orders.filter((o) => o.status === 'processing').length;
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

  const statusConfig = {
    pending: { label: 'Pending', class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400', icon: '⏳' },
    processing: { label: 'Processing', class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', icon: '⚙️' },
    shipped: { label: 'Shipped', class: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400', icon: '🚚' },
    delivered: { label: 'Delivered', class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', icon: '✅' },
    cancelled: { label: 'Cancelled', class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', icon: '❌' },
  };

  const paymentConfig = {
    paid: { label: 'Paid', class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    pending: { label: 'Pending', class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
    refunded: { label: 'Refunded', class: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' },
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Orders</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track all your orders</p>
              </div>
              {/* <div className="flex items-center gap-3">
               
                <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  📊 Export Orders
                </button>
              </div> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <StatCard label="Total Orders" value={totalOrders} icon="📦" color="blue" darkMode={darkMode} />
              <StatCard label="Pending" value={pendingOrders} icon="⏳" color="yellow" darkMode={darkMode} />
              <StatCard label="Processing" value={processingOrders} icon="⚙️" color="purple" darkMode={darkMode} />
              <StatCard label="Shipped" value={shippedOrders} icon="🚚" color="indigo" darkMode={darkMode} />
              <StatCard label="Delivered" value={deliveredOrders} icon="✅" color="green" darkMode={darkMode} />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Order ID or Customer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                </div>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    const payment = paymentConfig[order.payment as keyof typeof paymentConfig];

                    return (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {order.id}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{order.customer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{order.items.length} item(s)</td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">₹{order.total.toLocaleString()}</td>
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
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{new Date(order.date).toLocaleDateString('en-IN')}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDetails(order)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
                            >
                              👁️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {showDetailsModal && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setShowDetailsModal(false)}
            onUpdateStatus={handleUpdateStatus}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, darkMode }: {
  label: string;
  value: number;
  icon: string;
  color: string;
  darkMode: boolean;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
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

function OrderDetailsModal({ order, onClose, onUpdateStatus, darkMode }: {
  order: any;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: string) => void;
  darkMode: boolean;
}) {
  const statusConfig = {
    pending: { label: 'Pending', class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400', icon: '⏳' },
    processing: { label: 'Processing', class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', icon: '⚙️' },
    shipped: { label: 'Shipped', class: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400', icon: '🚚' },
    delivered: { label: 'Delivered', class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', icon: '✅' },
    cancelled: { label: 'Cancelled', class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', icon: '❌' },
  };

  const status = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Order Details</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{order.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl">×</button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg ${status.class}`}>
                {status.label}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Date</label>
              <p className="text-gray-900 dark:text-white">{new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Customer Information</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><span className="w-24 inline-block opacity-70">Name:</span> <b>{order.customer.name}</b></p>
              <p><span className="w-24 inline-block opacity-70">Email:</span> {order.customer.email}</p>
              <p><span className="w-24 inline-block opacity-70">Phone:</span> {order.customer.phone}</p>
              <p><span className="w-24 inline-block opacity-70">Address:</span> {order.customer.address}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Order Items</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr className="text-gray-900 dark:text-gray-100">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Qty</th>
                    <th className="px-4 py-3 text-left">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-300">
                  {order.items.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t dark:border-gray-700">
          <button onClick={onClose} className="flex-1 px-6 py-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg">Close</button>
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg">Generate Invoice</button>
        </div>
      </div>
    </div>
  );
}