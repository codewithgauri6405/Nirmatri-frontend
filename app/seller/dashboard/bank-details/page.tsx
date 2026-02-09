"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function BankDetailsPage() {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Bank Details State
  const [bankData, setBankData] = useState({
    accountHolderName: "Nirmatri Crafts",
    accountNumber: "1234567890123456",
    confirmAccountNumber: "1234567890123456",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank",
    branchName: "MG Road, Bangalore",
    accountType: "current",
    panNumber: "ABCDE1234F",
    gstNumber: "22AAAAA0000A1Z5",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payout Settings
  const [payoutSettings, setPayoutSettings] = useState({
    autoPayoutEnabled: true,
    minimumPayout: "500",
    payoutDay: "monday",
  });

  // Mock Transaction History
  const transactions = [
    {
      id: "TXN-001",
      date: "2026-02-03",
      type: "payout",
      amount: 15420,
      status: "completed",
      reference: "PAY-2026-02-03-001",
    },
    {
      id: "TXN-002",
      date: "2026-01-27",
      type: "payout",
      amount: 22150,
      status: "completed",
      reference: "PAY-2026-01-27-001",
    },
    {
      id: "TXN-003",
      date: "2026-01-20",
      type: "payout",
      amount: 18750,
      status: "completed",
      reference: "PAY-2026-01-20-001",
    },
    {
      id: "TXN-004",
      date: "2026-02-06",
      type: "pending",
      amount: 8920,
      status: "pending",
      reference: "PAY-2026-02-06-001",
    },
  ];

  // ============================================
  // HANDLERS
  // ============================================
  const updateBankData = (field: string, value: any) => {
    setBankData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bankData.accountHolderName.trim()) newErrors.accountHolderName = "Required";
    if (!bankData.accountNumber.trim()) newErrors.accountNumber = "Required";
    else if (!/^\d{9,18}$/.test(bankData.accountNumber)) newErrors.accountNumber = "Invalid account number";
    
    if (bankData.accountNumber !== bankData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers don't match";
    }

    if (!bankData.ifscCode.trim()) newErrors.ifscCode = "Required";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code";
    }

    if (!bankData.bankName.trim()) newErrors.bankName = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fix all errors");
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Replace with actual API call
    console.log("Saving bank details:", bankData);
    
    setIsSaving(false);
    setIsEditing(false);
    alert("Bank details updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset to original values (in production, fetch from API)
  };

  // ============================================
  // STATS
  // ============================================
  const stats = {
    totalPayouts: transactions.filter(t => t.status === "completed").length,
    totalEarned: transactions.filter(t => t.status === "completed").reduce((sum, t) => sum + t.amount, 0),
    pendingAmount: transactions.filter(t => t.status === "pending").reduce((sum, t) => sum + t.amount, 0),
    nextPayout: "Monday, Feb 10, 2026",
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Bank Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your bank account and payout settings
          </p>
        </div>

        {/* ============================================ */}
        {/* STATS CARDS */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Payouts" value={stats.totalPayouts} icon="💳" />
          <StatCard title="Total Earned" value={`₹${stats.totalEarned.toLocaleString()}`} icon="💰" />
          <StatCard title="Pending Payout" value={`₹${stats.pendingAmount.toLocaleString()}`} icon="⏳" />
          <StatCard title="Next Payout" value={stats.nextPayout} icon="📅" isDate />
        </div>

        {/* ============================================ */}
        {/* BANK ACCOUNT DETAILS */}
        {/* ============================================ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Account Information
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                ✏️ Edit Details
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "💾 Save Changes"
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Holder Name
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={bankData.accountHolderName}
                    onChange={(e) => updateBankData("accountHolderName", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.accountHolderName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.accountHolderName && <p className="text-red-500 text-sm mt-1">{errors.accountHolderName}</p>}
                </>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{bankData.accountHolderName}</p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Number
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={bankData.accountNumber}
                    onChange={(e) => updateBankData("accountNumber", e.target.value.replace(/\D/g, ""))}
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.accountNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                </>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">
                  XXXX XXXX {bankData.accountNumber.slice(-4)}
                </p>
              )}
            </div>

            {/* Confirm Account Number (only when editing) */}
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Account Number
                </label>
                <input
                  type="text"
                  value={bankData.confirmAccountNumber}
                  onChange={(e) => updateBankData("confirmAccountNumber", e.target.value.replace(/\D/g, ""))}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.confirmAccountNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.confirmAccountNumber && <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>}
              </div>
            )}

            {/* IFSC Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                IFSC Code
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={bankData.ifscCode}
                    onChange={(e) => updateBankData("ifscCode", e.target.value.toUpperCase())}
                    maxLength={11}
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors uppercase ${
                      errors.ifscCode ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
                </>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{bankData.ifscCode}</p>
              )}
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bank Name
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={bankData.bankName}
                    onChange={(e) => updateBankData("bankName", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.bankName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                </>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{bankData.bankName}</p>
              )}
            </div>

            {/* Branch Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Branch Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={bankData.branchName}
                  onChange={(e) => updateBankData("branchName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{bankData.branchName}</p>
              )}
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Type
              </label>
              {isEditing ? (
                <select
                  value={bankData.accountType}
                  onChange={(e) => updateBankData("accountType", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium capitalize">{bankData.accountType}</p>
              )}
            </div>

            {/* PAN Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                PAN Number
              </label>
              <p className="text-gray-900 dark:text-white font-medium">{bankData.panNumber}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PAN cannot be changed</p>
            </div>

            {/* GST Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GST Number (Optional)
              </label>
              <p className="text-gray-900 dark:text-white font-medium">{bankData.gstNumber}</p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* PAYOUT SETTINGS */}
        {/* ============================================ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Payout Settings
          </h2>

          <div className="space-y-6">
            {/* Auto Payout */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Automatic Payouts
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enable automatic weekly payouts to your bank account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={payoutSettings.autoPayoutEnabled}
                  onChange={(e) => setPayoutSettings({...payoutSettings, autoPayoutEnabled: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Minimum Payout */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Payout Amount (₹)
              </label>
              <input
                type="number"
                value={payoutSettings.minimumPayout}
                onChange={(e) => setPayoutSettings({...payoutSettings, minimumPayout: e.target.value})}
                min="500"
                className="w-full md:w-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum ₹500</p>
            </div>

            {/* Payout Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payout Day
              </label>
              <select
                value={payoutSettings.payoutDay}
                onChange={(e) => setPayoutSettings({...payoutSettings, payoutDay: e.target.value})}
                className="w-full md:w-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="monday">Every Monday</option>
                <option value="friday">Every Friday</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Payouts are processed weekly</p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* TRANSACTION HISTORY */}
        {/* ============================================ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Transactions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Reference</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {txn.reference}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white capitalize">
                      {txn.type}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      ₹{txn.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        txn.status === "completed"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                      }`}>
                        {txn.status === "completed" ? "✓ Completed" : "⏳ Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
/* COMPONENTS */
/* ============================================ */

function StatCard({ title, value, icon, isDate = false }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}
