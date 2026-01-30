"use client";

import Link from "next/link";

export default function SellerDashboardPage() {
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
    <main className="min-h-screen bg-[#F8FAFC] p-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {seller.storeName}
          </h1>
          <p className="text-sm text-slate-500">
            Seller ID: {seller.sellerId} ·{" "}
            <span
              className={`font-medium ${
                seller.status === "Active"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {seller.status}
            </span>
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <Link href="/seller/profile" className="text-blue-600 hover:underline">
            Profile
          </Link>
          <Link
            href="/sellerauth/logout"
            className="text-red-600 hover:underline"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Active Products" value={stats.activeProducts} />
        <StatCard title="Total Earnings" value={stats.totalEarnings} />
        <StatCard title="Pending Orders" value={stats.pendingOrders} />
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <ActionButton title="➕ Add New Product" href="/seller/products/add" />
        <ActionButton title="📦 Manage Products" href="/seller/products" />
        <ActionButton title="🏦 Bank Details" href="/seller/settings/bank" />
        <ActionButton title="🧑‍⚖️ KYC Status" href="/seller/settings/kyc" />
      </div>

      {/* ================= ORDERS ================= */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-12">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="py-3">Order ID</th>
                <th>Product</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="py-3 text-blue-600 font-medium">
                    {order.id}
                  </td>
                  <td>{order.product}</td>
                  <td>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="text-right font-medium">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Notifications & Alerts
        </h2>

        <ul className="space-y-3 text-sm text-slate-700">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="border-l-4 border-blue-500 bg-slate-50 rounded-r-lg px-3 py-2"
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
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function ActionButton({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6
                 hover:shadow-md hover:border-slate-200 transition
                 text-sm font-medium text-slate-900"
    >
      {title}
    </Link>
  );
}
