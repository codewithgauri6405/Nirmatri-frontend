"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import  TermsModal  from "@/app/components/TermsModal";
import { Input } from "@/app/components/ui/input";

// ============================================
// CONFIGURATION
// ============================================
const steps = ["Store Info", "KYC", "Bank","Phone Verification","Review"];

export default function SellerOnboardingPage() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false); // Get current theme (light/dark)
  const router = useRouter();

  // Form data state for all steps
  const [formData, setFormData] = useState({

    // Store Info 
    ownerName: "",
    storeName: "",
    storeCategory: [] as string[],
    // storeDescription: "",
    // storeAddress: "",

    // KYC
    panNumber: "",
    aadhaarNumber: "",
    panDocument: null as File | null,
    aadhaarDocument: null as File | null,

    // Bank Details
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",

    // Phone Verification
    phoneNumber: "",
    otp: "",
    isOtpSent: false,
    isOtpVerified: false,
  });

  // ============================================
  // FORM UPDATE HANDLER
  // ============================================
  const updateFormData = (field: string, value: string | string[] | File | null | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ============================================
  // NAVIGATION HANDLERS
  // ============================================
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // ✅ Stepper complete
      setShowSuccess(true);

      // ⏳ success message ke baad dashboard
      setTimeout(() => {
        router.push("/seller/dashboard");
      }, 2000);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-8 transition-colors duration-200">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transition-colors duration-200">
        {/* ============================================ */}
        {/* 🔹 STEPPER HEADER */}
        <div className="mb-8 md:mb-10">
          {/* Stepper Progress */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 flex items-center">
                {/* Step Circle */}
                <div
                  className={`h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300
                  ${
                    index < currentStep
                      ? "bg-green-600 text-white" // Completed
                      : index === currentStep
                      ? "bg-blue-600 text-white shadow-lg scale-110" // Current
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400" // Upcoming
                  }`}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>

                {/* Step Label (hidden on small screens) */}
                <span
                  className={`ml-2 md:ml-3 text-xs md:text-sm font-medium hidden sm:block transition-colors duration-300
                  ${
                    index <= currentStep
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step}
                </span>

                {/* Connector Line */}
                {index !== steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 md:mx-4 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: index < currentStep ? "100%" : "0%",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length} • {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* 🔹 STEP CONTENT */}
        {/* ============================================ */}
        {!showSuccess && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="min-h-[400px]"
            >
              {currentStep === 0 && <StoreInfo formData={formData} updateFormData={updateFormData} />}
              {currentStep === 1 && <KYC formData={formData} updateFormData={updateFormData} />}
              {currentStep === 2 && <Bank formData={formData} updateFormData={updateFormData} />}
              {currentStep === 3 && <PhoneVerification formData={formData} updateFormData={updateFormData} />}
              {currentStep === 4 && <Review formData={formData} />}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ============================================ */}
        {/* ✅ SUCCESS MESSAGE */}
        {/* ============================================ */}
        {showSuccess && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Nirmatri!
            </h3>
            <p className="text-lg font-semibold text-green-700 dark:text-green-400">
              Successfully created your seller account
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Redirecting you to your dashboard…
            </p>
            <div className="mt-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </motion.div>
        )}

        {/* ============================================ */}
        {/* 🔹 NAVIGATION BUTTONS */}
        {/* ============================================ */}
        {!showSuccess && (
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 md:mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              ← Back
            </button>

            <button
              onClick={nextStep}
              className="px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {currentStep === steps.length - 1 ? "Submit & Finish" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

/* ============================================ */
/* 🔹 STEP COMPONENTS */
/* ============================================ */

// ============================================
// STEP 1: STORE INFORMATION
// ============================================
interface FormDataProps {
  formData: {
    ownername?: string;
    ownerName?: string;
    storeName: string;
    storeCategory: string[];
    panNumber: string;
    aadhaarNumber: string;
    panDocument: File | null;
    aadhaarDocument: File | null;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    phoneNumber: string;
    otp: string;
    isOtpSent: boolean;
    isOtpVerified: boolean;
  };
  updateFormData: (field: string, value: string | string[] | File | null | boolean) => void;
}

function StoreInfo({ formData, updateFormData }: FormDataProps) {
  const categories = [
    "Home Decor",
    "Kitchenware",
    "Textiles & Fabrics",
    "Jewelry & Accessories",
    "Pottery & Ceramics",
    "Wood Crafts",
    "Art & Paintings",
    "Storage & Organization",
    "Toys & Games",
    "Others",
  ];
  // Handle category selection/deselection
  const handleCategoryToggle = (category: string) => {
    const currentCategories = formData.storeCategory || [];
    
    if (currentCategories.includes(category)) {
      // Remove category if already selected
      updateFormData(
        "storeCategory",
        currentCategories.filter((c: string) => c !== category)
      );
    } else {
      // Add category if not selected
      updateFormData("storeCategory", [...currentCategories, category]);
    }
  };

  // Check if a category is selected
  const isCategorySelected = (category: string) => {
    const currentCategories = formData.storeCategory || [];
    return currentCategories.includes(category);
  };
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Store Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about your handmade goods store
        </p>
      </div>

      {/* Owner Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Owner Name
        </label>
        <Input
          value={formData.ownerName}
          onChange={(e) => updateFormData("ownerName", e.target.value)}
          placeholder="Type your full name"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your full name as it appears on your ID
        </p>
      </div>
      {/* Store Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Store Name
        </label>
        <input
          value={formData.storeName}
          onChange={(e) => updateFormData("storeName", e.target.value)}
          placeholder="e.g., Nirmatri Crafts"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Choose a unique name for your store
        </p>
      </div>

      {/* Store Categories - Multi-select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Store Categories
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Select all categories that apply to your products
        </p>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryToggle(cat)}
              className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                isCategorySelected(cat)
                  ? "bg-blue-600 border-blue-600 text-white shadow-md hover:bg-blue-700 hover:border-blue-700"
                  : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              {isCategorySelected(cat) && <span className="mr-1">✓</span>}
              {cat}
            </button>
          ))}
        </div>

        {/* Selected Categories Count */}
        {formData.storeCategory && formData.storeCategory.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-400">
              <strong>{formData.storeCategory.length}</strong> {formData.storeCategory.length === 1 ? 'category' : 'categories'} selected: {formData.storeCategory.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Store Description
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Store Description
        </label>
        <textarea
          value={formData.storeDescription}
          onChange={(e) => updateFormData("storeDescription", e.target.value)}
          placeholder="Describe your products and what makes them special..."
          rows={4}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Write a brief description about your store and products
        </p>
      </div>

      Store Address
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Store Address
        </label>
        <textarea
          value={formData.storeAddress}
          onChange={(e) => updateFormData("storeAddress", e.target.value)}
          placeholder="Full business address with city, state, and pincode"
          rows={3}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your complete business address
        </p>
      </div> */}
    </div>
  );
}


// ============================================
// STEP 2: KYC DETAILS
// ============================================
function KYC({ formData, updateFormData }: FormDataProps) {
  const handleFileUpload = (field: string, file: File | null) => {
    updateFormData(field, file);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          KYC Verification
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your identity documents for verification
        </p>
      </div>

      {/* PAN Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          PAN Number
        </label>
        <input
          value={formData.panNumber}
          onChange={(e) => updateFormData("panNumber", e.target.value.toUpperCase())}
          placeholder="ABCDE1234F"
          maxLength={10}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors uppercase"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your 10-character PAN number (e.g., ABCDE1234F)
        </p>
      </div>

      {/* Aadhaar Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Aadhaar Number
        </label>
        <input
          type="text"
          value={formData.aadhaarNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 12);
            updateFormData("aadhaarNumber", value);
          }}
          placeholder="123456789012"
          maxLength={12}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your 12-digit Aadhaar number
        </p>
      </div>

      {/* File Uploads */}
      <div className="space-y-4">
        <FileUpload
          label="PAN Card Document"
          file={formData.panDocument}
          onChange={(file: File | null) => handleFileUpload("panDocument", file)}
          description="Upload clear photo or PDF of your PAN card (Max 5MB)"
        />

        <FileUpload
          label="Aadhaar Card Document"
          file={formData.aadhaarDocument}
          onChange={(file: File | null) => handleFileUpload("aadhaarDocument", file)}
          description="Upload clear photo or PDF of your Aadhaar card (Max 5MB)"
        />
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-400">
          <strong>📌 Note:</strong> All documents information must be clear.
        </p>
      </div>
    </div>
  );
}

// ============================================
// STEP 3: BANK DETAILS
// ============================================
function Bank({ formData, updateFormData }: FormDataProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Bank Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add your bank account for receiving payments
        </p>
      </div>

    {/* Bank Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bank Name
        </label>
        <input
          value={formData.bankName}
          onChange={(e) => updateFormData("bankName", e.target.value)}
          placeholder="e.g., HDFC Bank, SBI, ICICI Bank"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter the name of your bank
        </p>
      </div>

      {/* Account Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Account Number
        </label>
        <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            updateFormData("accountNumber", value);
          }}
          placeholder="123456789012"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your bank account number (9-18 digits)
        </p>
      </div>

      {/* IFSC Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          IFSC Code
        </label>
        <input
          value={formData.ifscCode}
          onChange={(e) => updateFormData("ifscCode", e.target.value.toUpperCase())}
          placeholder="HDFC0001234"
          maxLength={11}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors uppercase"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your banks 11-character IFSC code
        </p>
      </div>

      
      {/* Account Holder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Account Holder Name
        </label>
        <input
          value={formData.accountHolderName}
          onChange={(e) => updateFormData("accountHolderName", e.target.value)}
          placeholder="As per bank records"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter name exactly as per bank account
        </p>
      </div>


      {/* Warning Box */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-900 dark:text-yellow-400">
          <strong>⚠️ Important:</strong> Ensure bank details are accurate. All payments will be transferred to this account.
        </p>
      </div>
      
    </div>
  );
}
 // STEP 4: PHONE VERIFICATION (OTP)
// ============================================
function PhoneVerification({ formData, updateFormData }: FormDataProps) {
  const [timer, setTimer] = useState(0);

  // OTP timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendOtp = () => {
    if (formData.phoneNumber.length === 10) {
      updateFormData("isOtpSent", true);
      setTimer(60); // 60 seconds countdown
      // TODO: Call API to send OTP
      console.log("Sending OTP to:", formData.phoneNumber);
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp.length === 6) {
      updateFormData("isOtpVerified", true);
      // TODO: Call API to verify OTP
      console.log("Verifying OTP:", formData.otp);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Phone Verification
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We will send you a verification code to confirm your number
        </p>
      </div>

      {/* Phone Number Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mobile Number
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400">+91</span>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                updateFormData("phoneNumber", value);
              }}
              placeholder="9876543210"
              disabled={formData.isOtpVerified}
              className="w-full pl-14 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          <button
            onClick={handleSendOtp}
            disabled={formData.phoneNumber.length !== 10 || timer > 0 || formData.isOtpVerified}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {formData.isOtpVerified ? "Verified ✓" : timer > 0 ? `${timer}s` : "Send OTP"}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your 10-digit mobile number
        </p>
      </div>

      {/* OTP Input (shows after sending OTP) */}
      {formData.isOtpSent && !formData.isOtpVerified && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter OTP
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={formData.otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                updateFormData("otp", value);
              }}
              placeholder="123456"
              title="Enter the 6-digit OTP sent to your mobile number"
              maxLength={6}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-lg tracking-widest font-mono"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={formData.otp.length !== 6}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Verify
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter the 6-digit code sent to your mobile
          </p>
        </motion.div>
      )}

      {/* Success Message */}
      {formData.isOtpVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-sm font-semibold text-green-900 dark:text-green-400">
                Phone number verified successfully!
              </p>
              <p className="text-xs text-green-700 dark:text-green-500 mt-1">
                You can now proceed to the next step
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-400">
          <strong>📱 Why verify?</strong> We need to confirm your identity and send order updates via SMS.
        </p>
      </div>
    </div>
  );
} 
// ============================================
// STEP 5: REVIEW & SUBMIT
// ============================================


function Review({ formData }: any) {
  const [showTerms, setShowTerms] = useState(false);
  
  const sections = [
    {
      title: "Phone Verification",
      items: [
        { label: "Mobile Number", value: formData.phoneNumber ? `+91 ${formData.phoneNumber}` : "Not provided" },
        { label: "Verification Status", value: formData.isOtpVerified ? "✅ Verified" : "❌ Not verified" },
      ],
    },
    {
      title: "Store Information",
      items: [
        { label: "Owner Name", value: formData.ownerName || "Not provided" },
        { label: "Store Name", value: formData.storeName || "Not provided" },
        { label: "Categories", value: formData.storeCategory && formData.storeCategory.length > 0 
        ? formData.storeCategory.join(", ") 
        : "Not provided" 
    },
        // { label: "Description", value: formData.storeDescription || "Not provided" },
        // { label: "Address", value: formData.storeAddress || "Not provided" },
      ],
    },
    {
      title: "KYC Details",
      items: [
        { label: "PAN Number", value: formData.panNumber || "Not provided" },
        { label: "Aadhaar Number", value: formData.aadhaarNumber ? formData.aadhaarNumber.replace(/\d(?=\d{4})/g, "X") : "Not provided" },
        { label: "PAN Document", value: formData.panDocument ? "✅ Uploaded" : "❌ Not uploaded" },
        { label: "Aadhaar Document", value: formData.aadhaarDocument ? "✅ Uploaded" : "❌ Not uploaded" },
      ],
    },
    {
      title: "Bank Details",
      items: [
        { label: "Account Holder", value: formData.accountHolderName || "Not provided" },
        { label: "Account Number", value: formData.accountNumber ? formData.accountNumber.replace(/\d(?=\d{4})/g, "X") : "Not provided" },
        { label: "IFSC Code", value: formData.ifscCode || "Not provided" },
        { label: "Bank Name", value: formData.bankName || "Not provided" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please review all details before submitting
        </p>
      </div>
       <TermsModal
  open={showTerms}
  onClose={() => setShowTerms(false)}
  termsContent={termsContent}
/>

      {/* Review Sections */}
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-200 dark:border-gray-600"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white break-words">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      


      {/* Terms and Conditions */}
      <div className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-900 dark:text-white">
              I agree to the{" "}
              <button
  type="button"
  onClick={() => setShowTerms(true)}
  className="text-blue-600 dark:text-blue-400 hover:underline"
>

                Terms and Conditions
              </button>
              {" "}and{" "}
              <a href="/seller/onboarding/privacy_policy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              By checking this box, you confirm that all information provided is accurate
            </p>
          </div>
        </label>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
        <p className="text-sm text-blue-900 dark:text-blue-400 font-semibold mb-2">
          📋 What happens next?
        </p>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
          <li>Your application will be reviewed within 24-48 hours</li>
          <li>You will receive an email confirmation once approved</li>
          <li>You can then start adding products and receiving orders</li>
        </ul>
      </div>
    </div>
  );
}
const termsContent = [
    {
      title: '1. Seller Eligibility',
      content: 'By registering as a seller on Nirmatri Crafts, you confirm that you are highlighting authentic, handcrafted items. We reserve the right to verify the origin of your products and request additional documentation if needed.'
    },
    {
      title: '2. Commissions & Fees',
      content: 'Nirmatri Crafts charges a standard 10% platform fee on every successful sale. This covers payment processing, marketing for your products, customer support, and platform maintenance. Additional fees may apply for premium features.'
    },
    {
      title: '3. Product Authenticity',
      content: 'All products must be handmade, handcrafted, or artisanal. Mass-produced items, counterfeit goods, or items misrepresented as handmade are strictly prohibited. We conduct regular quality checks to maintain marketplace integrity.'
    },
    {
      title: '4. Shipping Policy',
      content: 'Sellers are responsible for packaging products safely and securely. Orders must be dispatched within 48 hours of confirmation unless otherwise specified. Failure to ship on time may result in store penalties, reduced visibility, or account suspension.'
    },
    {
      title: '5. Payout Schedule',
      content: 'Funds from sales are held in escrow for 7 days post-delivery to handle potential returns or disputes. Payouts are processed every Monday directly to your registered bank account. Minimum payout threshold is ₹500.'
    },
    {
      title: '6. Returns & Refunds',
      content: 'Sellers must honor our 7-day return policy for damaged or defective items. Return shipping costs for seller errors will be deducted from your account. Customer satisfaction is our priority.'
    },
    {
      title: '7. Prohibited Items',
      content: 'Mass-produced industrial goods, hazardous materials, illegal substances, weapons, copyrighted designs without permission, and any items violating Indian law are strictly prohibited. Violations may result in immediate account termination.'
    },
    {
      title: '8. Intellectual Property',
      content: 'You retain ownership of your product designs. However, by listing on Nirmatri, you grant us a license to display, market, and promote your products across our platforms and marketing channels.'
    },
    {
      title: '9. Account Termination',
      content: 'We reserve the right to suspend or terminate seller accounts for policy violations, fraudulent activity, poor customer ratings, or failure to maintain quality standards. Termination procedures are outlined in our dispute resolution policy.'
    },
    {
      title: '10. Changes to Terms',
      content: 'Nirmatri reserves the right to modify these terms at any time. Sellers will be notified via email 30 days before changes take effect. Continued use of the platform constitutes acceptance of updated terms.'
    },
  ];

  

/* ============================================ */
/* 🔹 HELPER COMPONENTS */
/* ============================================ */

// File Upload Component
interface FileUploadProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  description: string;
}

function FileUpload({ label, file, onChange, description }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      // Validate file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Only JPG, PNG, and PDF files are allowed");
        return;
      }
    }
    onChange(selectedFile);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
          file
            ? "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-600 bg-white dark:bg-gray-700"
        }`}
      >
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          {file ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {file.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📁 Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}