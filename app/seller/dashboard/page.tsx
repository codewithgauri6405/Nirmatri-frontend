"use client";

import Link from "next/link";


export default function SellerDashboardPage() {
  // ============================================
  // THEME HOOK
  // ============================================


  // ============================================
  // SELLER DATA
  // ============================================
  const seller = {
    storeName: "Nirmatri Crafts",
    sellerId: "SELLER-1023",
    status: "Pending KYC",
  };

  const stats = {
    totalOrders: 128,
    activeProducts: 34,
    totalEarnings: "₹84,560",
    pendingOrders: 6,
  };

  const orders = [
    {
      id: "ORD-1001",
      product: "Handmade Vase",
      status: "Delivered",
      amount: "₹1,200",
    },
    {
      id: "ORD-1002",
      product: "Clay Pot Set",
      status: "Shipped",
      amount: "₹2,450",
    },
    {
      id: "ORD-1003",
      product: "Wooden Wall Art",
      status: "Pending",
      amount: "₹980",
    },
  ];

  const notifications = [
    "⚠️ Complete your KYC to receive payouts",
    "📦 New order received today",
    "❗ One product is out of stock",
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 p-4 md:p-8 transition-colors">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
            {seller.storeName}
          </h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
            Seller ID: <span className="font-medium">{seller.sellerId}</span> ·{" "}
            <span
              className={`font-medium ${
                seller.status === "Active"
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            >
              {seller.status}
            </span>
          </p>
        </div>

        {/* Quick Actions (Desktop) */}
        <div className="hidden sm:flex gap-3 text-sm">
          <Link
            href="/seller/dashboard/profile"
            className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Profile
          </Link>
          <Link
            href="http://localhost:3000/"
            className="px-4 py-2 text-red-600 dark:text-red-400 hover:underline"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <StatCard title="Total Orders" value={stats.totalOrders} icon="📦" />
        <StatCard title="Active Products" value={stats.activeProducts} icon="🏺" />
        <StatCard title="Total Earnings" value={stats.totalEarnings} icon="💰" />
        <StatCard title="Pending Orders" value={stats.pendingOrders} icon="⏳" />
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <ActionButton title="Add New Product" icon="➕" href="/seller/dashboard/addnewproduct"/>
        <ActionButton title="Manage Products" icon="📦" href="/seller/dashboard/manageproducts" />
        <ActionButton title="Bank Details" icon="🏦" href="/seller/dashboard/bank-details"/>
        <ActionButton title="KYC Status" icon="🧑‍⚖️" href="/seller/dashboard/kyc-status" />
      </div>

      {/* ================= ORDERS ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm p-4 md:p-6 mb-8 md:mb-12 transition-colors">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Recent Orders
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-gray-700">
                <th className="py-3 font-medium">Order ID</th>
                <th className="font-medium">Product</th>
                <th className="font-medium">Status</th>
                <th className="text-right font-medium">Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 dark:border-gray-700 last:border-none hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 text-blue-600 dark:text-blue-400 font-medium">
                    {order.id}
                  </td>
                  <td className="text-slate-900 dark:text-gray-100">{order.product}</td>
                  <td>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            : order.status === "Shipped"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="text-right font-medium text-slate-900 dark:text-gray-100">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-50 dark:bg-gray-700 rounded-lg p-4 border border-slate-100 dark:border-gray-600"
            >
          <div className="flex justify-between items-start mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {order.id}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full
                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : order.status === "Shipped"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                    }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-slate-900 dark:text-gray-100 mb-2">{order.product}</p>
              <p className="text-right font-semibold text-slate-900 dark:text-gray-100">
                {order.amount}
              </p>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-4 text-center">
          <Link
            href="/seller/dashboard/orders"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View All Orders →
          </Link>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm p-4 md:p-6 transition-colors">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Notifications & Alerts
        </h2>

        <ul className="space-y-3 text-sm">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="border-l-4 border-blue-500 dark:border-blue-600 bg-slate-50 dark:bg-blue-900/20 rounded-r-lg px-4 py-3 text-slate-700 dark:text-gray-200"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

/* ================= SMALL COMPONENTS ================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm p-4 md:p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-500 dark:text-gray-400">{title}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function ActionButton({ 
  title, 
  icon,
  href 
}: { 
  title: string; 
  icon: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm p-4 md:p-6
                 hover:shadow-md hover:border-slate-200 dark:hover:border-gray-600 transition-all
                 text-sm md:text-base font-medium text-slate-900 dark:text-white
                 flex items-center gap-3 group"
    >
      <span className="text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span>{title}</span>
    </Link>
  );
}
