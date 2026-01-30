'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// ------------------ DATA ------------------
const monthlyData = [
  { month: 'Jan', revenue: 42400 },
  { month: 'Feb', revenue: 48800 },
  { month: 'Mar', revenue: 56200 },
  { month: 'Apr', revenue: 61500 },
  { month: 'May', revenue: 72800 },
  { month: 'Jun', revenue: 84560 },
];

const recentTransactions = [
  { id: 'ORD-1091', product: 'Handmade Vase', amount: 1200, status: 'Delivered' },
  { id: 'ORD-1090', product: 'Clay Pot Set', amount: 2450, status: 'Shipped' },
  { id: 'ORD-1089', product: 'Wooden Wall Art', amount: 980, status: 'Pending' },
];

const topProducts = [
  { name: 'Terracotta Vase', sales: 342, revenue: 410400 },
  { name: 'Ceramic Plates', sales: 289, revenue: 346800 },
  { name: 'Wooden Wall Art', sales: 267, revenue: 261660 },
];

// ------------------ PAGE ------------------
export default function EarningsPage() {
  const [loaded, setLoaded] = useState(false);
  const [period, setPeriod] = useState('6m');

  useEffect(() => setLoaded(true), []);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Earnings</h1>
          <p className="text-gray-600 mt-1">Nirmatri Crafts · Seller Dashboard</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Withdraw Funds
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Balance" value="₹84,560" change="+18.2%" positive />
        <StatCard label="This Month" value="₹28,945" change="+24.5%" positive />
        <StatCard label="Pending" value="₹4,245" change="6 orders" positive={null} />
        <StatCard label="Avg Order" value="₹883" change="+3.8%" positive />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          <div className="flex gap-2">
            {['1m', '3m', '6m', '1y'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded ${
                  period === p ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(v?: number) => (v ?? 0).toString()}/>
            <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="#93c5fd" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          {recentTransactions.map(tx => (
            <div key={tx.id} className="flex justify-between py-2 border-b last:border-0">
              <span>{tx.product}</span>
              <span className="font-semibold">₹{tx.amount}</span>
            </div>
          ))}
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Top Products</h3>
          {topProducts.map(p => (
            <div key={p.name} className="flex justify-between py-2">
              <span>{p.name}</span>
              <span className="font-semibold">₹{p.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ------------------ CARD ------------------
function StatCard({ label, value, change, positive }: any) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${positive === null ? 'text-gray-500' : positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  );
}
