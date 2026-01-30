'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Nirmatri Crafts',
    email: 'seller@nirmatri.com',
    phone: '+91 98765 43210',
    address: 'Shop 12, Artisan Market, New Delhi',
    gst: 'GST123456789',
    pan: 'ABCDE1234F',
  });

  const [shopSettings, setShopSettings] = useState({
    shopName: 'Nirmatri Crafts',
    description: 'Authentic handmade crafts and artisan goods',
    minOrderValue: '500',
    deliveryTime: '7-10',
    returnPolicy: '15',
  });

  const [bankDetails, setBankDetails] = useState({
    accountName: 'Nirmatri Crafts',
    accountNumber: '****4892',
    ifsc: 'HDFC0001234',
    bankName: 'HDFC Bank',
    branch: 'Connaught Place, New Delhi',
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    paymentAlerts: true,
    productReviews: true,
    promotionalEmails: false,
    smsNotifications: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'shop', label: 'Shop Settings', icon: '🏪' },
    { id: 'payment', label: 'Payment & Bank', icon: '💳' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account and shop preferences
            </p>
          </div>

          {activeTab === 'profile' && (
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
            </button>
          )}
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span className="text-green-800 font-medium">
              Settings saved successfully!
            </span>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border p-8">

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['name','email','phone','gst'].map(field => (
                  <input
                    key={field}
                    value={(profileData as any)[field]}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                  />
                ))}

                <textarea
                  rows={3}
                  value={profileData.address}
                  disabled={!isEditing}
                  className={`md:col-span-2 w-full px-4 py-2.5 border rounded-lg ${
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shop Settings</h2>
              <input className="input" value={shopSettings.shopName} />
              <textarea className="input" rows={4} value={shopSettings.description} />
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Bank Details</h2>
              <input className="input" value={bankDetails.bankName} />
              <input className="input" value={bankDetails.ifsc} />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]: [string, boolean]) => (
              <NotificationToggle
                key={key}
                label={key}
                description=""
                checked={value}
                onChange={(checked: boolean) =>
                setNotifications({ ...notifications, [key]: checked })
                }
              />
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Security</h2>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg">
                Delete Account
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: any) {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`h-6 w-11 rounded-full ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      />
    </div>
  );
}
