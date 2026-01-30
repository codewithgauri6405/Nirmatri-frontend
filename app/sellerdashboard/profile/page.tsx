"use client";

export default function SellerProfilePage() {
  return (
    <main className="min-h-screen bg-[#F6F9F8] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Seller Profile & Settings
        </h1>

        <div className="space-y-5">
          <Input label="Store Name" value="Nirmatri Crafts" />
          <Input label="Owner Name" value="Adarsh Kumar" />
          <Input label="Email" value="seller@nirmatri.com" />
          <Input label="Phone" value="+91 9876543210" />

          <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}

function Input({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        defaultValue={value}
        className="w-full rounded-lg border px-4 py-2 text-gray-900"
      />
    </div>
  );
}
