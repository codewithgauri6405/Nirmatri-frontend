"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function KYCStatusPage() {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // KYC Status - Change this to test different states
  const [kycStatus, setKycStatus] = useState<"pending" | "approved" | "rejected" | "incomplete">("pending");

  // Documents State
  const [documents, setDocuments] = useState([
    {
      id: "pan",
      name: "PAN Card",
      status: "approved",
      uploadedDate: "2026-01-15",
      verifiedDate: "2026-01-18",
      number: "ABCDE1234F",
      file: null as File | null,
      rejectionReason: "",
    },
    {
      id: "aadhaar",
      name: "Aadhaar Card",
      status: "approved",
      uploadedDate: "2026-01-15",
      verifiedDate: "2026-01-18",
      number: "XXXX XXXX 5678",
      file: null as File | null,
      rejectionReason: "",
    },
    {
      id: "address",
      name: "Address Proof",
      status: "pending",
      uploadedDate: "2026-02-01",
      verifiedDate: null,
      number: "",
      file: null as File | null,
      rejectionReason: "",
    },
    {
      id: "photo",
      name: "Owner Photo",
      status: "approved",
      uploadedDate: "2026-01-15",
      verifiedDate: "2026-01-16",
      number: "",
      file: null as File | null,
      rejectionReason: "",
    },
  ]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleFileUpload = (docId: string, file: File | null) => {
    if (file) {
      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      
      setDocuments(docs => docs.map(doc => 
        doc.id === docId 
          ? { ...doc, file, status: "pending", uploadedDate: new Date().toISOString().split('T')[0] }
          : doc
      ));
    }
  };

  const handleResubmit = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc?.file) {
      console.log("Resubmitting document:", docId, doc.file);
      alert("Document resubmitted successfully! It will be reviewed within 24 hours.");
      setDocuments(docs => docs.map(d => 
        d.id === docId ? { ...d, status: "pending" } : d
      ));
    } else {
      alert("Please upload a document first");
    }
  };

  // ============================================
  // STATS
  // ============================================
  const stats = {
    approved: documents.filter(d => d.status === "approved").length,
    pending: documents.filter(d => d.status === "pending").length,
    rejected: documents.filter(d => d.status === "rejected").length,
    total: documents.length,
  };

  const completionPercentage = Math.round((stats.approved / stats.total) * 100);

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
            KYC Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your KYC to start receiving payouts
          </p>
        </div>

        {/* ============================================ */}
        {/* KYC STATUS BANNER */}
        {/* ============================================ */}
        <div className={`rounded-xl shadow-sm border-2 p-6 md:p-8 mb-6 ${
          kycStatus === "approved"
            ? "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-700"
            : kycStatus === "rejected"
            ? "bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-700"
            : kycStatus === "pending"
            ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500 dark:border-orange-700"
            : "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-700"
        }`}>
          <div className="flex items-start gap-4">
            <div className="text-4xl md:text-5xl">
              {kycStatus === "approved" && "✅"}
              {kycStatus === "rejected" && "❌"}
              {kycStatus === "pending" && "⏳"}
              {kycStatus === "incomplete" && "📋"}
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold mb-2 ${
                kycStatus === "approved"
                  ? "text-green-900 dark:text-green-300"
                  : kycStatus === "rejected"
                  ? "text-red-900 dark:text-red-300"
                  : kycStatus === "pending"
                  ? "text-orange-900 dark:text-orange-300"
                  : "text-blue-900 dark:text-blue-300"
              }`}>
                {kycStatus === "approved" && "KYC Approved"}
                {kycStatus === "rejected" && "KYC Rejected"}
                {kycStatus === "pending" && "KYC Under Review"}
                {kycStatus === "incomplete" && "KYC Incomplete"}
              </h2>
              <p className={`mb-4 ${
                kycStatus === "approved"
                  ? "text-green-800 dark:text-green-400"
                  : kycStatus === "rejected"
                  ? "text-red-800 dark:text-red-400"
                  : kycStatus === "pending"
                  ? "text-orange-800 dark:text-orange-400"
                  : "text-blue-800 dark:text-blue-400"
              }`}>
                {kycStatus === "approved" && "Your KYC has been verified. You can now receive payouts."}
                {kycStatus === "rejected" && "Some documents were rejected. Please review and resubmit."}
                {kycStatus === "pending" && "Your documents are being reviewed. This usually takes 24-48 hours."}
                {kycStatus === "incomplete" && "Please upload all required documents to complete KYC."}
              </p>

              {/* Progress Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-full h-3 overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-500 ${
                    kycStatus === "approved" ? "bg-green-600" : "bg-blue-600"
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {stats.approved} of {stats.total} documents verified ({completionPercentage}%)
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* STATS CARDS */}
        {/* ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Documents" value={stats.total} icon="📄" color="blue" />
          <StatCard title="Approved" value={stats.approved} icon="✅" color="green" />
          <StatCard title="Pending" value={stats.pending} icon="⏳" color="orange" />
          <StatCard title="Rejected" value={stats.rejected} icon="❌" color="red" />
        </div>

        {/* ============================================ */}
        {/* DOCUMENTS LIST */}
        {/* ============================================ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Required Documents
          </h2>

          <div className="space-y-4">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onFileUpload={handleFileUpload}
                onResubmit={handleResubmit}
                onViewDetails={() => setSelectedDocument(doc.id)}
              />
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* HELP & SUPPORT */}
        {/* ============================================ */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3">
            Need Help with KYC?
          </h3>
          <p className="text-blue-800 dark:text-blue-400 mb-4">
            Our support team is here to help you complete your verification process.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:kyc@nirmatri.com"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              📧 Email Support
            </a>
            <a
              href="/help/kyc"
              className="px-6 py-2.5 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              📚 KYC Guidelines
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
/* COMPONENTS */
/* ============================================ */

function StatCard({ title, value, icon, color }: any) {
  const colorClasses: any = {
    blue: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20",
    green: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20",
    orange: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20",
    red: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20",
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}

function DocumentCard({ document, onFileUpload, onResubmit, onViewDetails }: any) {
  const statusConfig: any = {
    approved: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-700 dark:text-green-300",
      badge: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      icon: "✅",
    },
    pending: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-700 dark:text-orange-300",
      badge: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
      icon: "⏳",
    },
    rejected: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-700 dark:text-red-300",
      badge: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
      icon: "❌",
    },
  };

  const config = statusConfig[document.status] || statusConfig.pending;

  return (
    <div className={`rounded-lg border-2 p-4 md:p-6 ${config.bg} ${config.border}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Document Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {document.name}
            </h3>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.badge}`}>
              {config.icon} {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
            </span>
          </div>

          {document.number && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              <strong>Number:</strong> {document.number}
            </p>
          )}

          {document.uploadedDate && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              <strong>Uploaded:</strong> {new Date(document.uploadedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}

          {document.verifiedDate && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Verified:</strong> {new Date(document.verifiedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}

          {document.status === "rejected" && document.rejectionReason && (
            <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">
                <strong>Rejection Reason:</strong> {document.rejectionReason}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 min-w-[200px]">
          {document.status === "approved" ? (
            <button
              disabled
              className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg opacity-50 cursor-not-allowed"
            >
              ✓ Verified
            </button>
          ) : (
            <>
              <input
                type="file"
                id={`file-${document.id}`}
                accept="image/*,application/pdf"
                onChange={(e) => onFileUpload(document.id, e.target.files?.[0] || null)}
                className="hidden"
              />
              <label
                htmlFor={`file-${document.id}`}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center cursor-pointer transition-colors"
              >
                📁 {document.file ? "Change File" : "Upload Document"}
              </label>

              {document.file && (
                <>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    {document.file.name}
                  </p>
                  <button
                    onClick={() => onResubmit(document.id)}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    ✓ Submit
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
