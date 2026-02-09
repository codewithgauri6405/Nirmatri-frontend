'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TermsModal from '@/app/components/TermsModal';

export default function SellerPrivacyPolicyPage() {
  const [showTerms, setShowTerms] = useState(false);


  
  // ============================================
  // STATE & HOOKS
  // ============================================
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // ============================================
  // PRIVACY POLICY CONTENT
  // ============================================
  const privacyContent = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: 'Welcome to Nirmatri Crafts. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you register and operate as a seller on our platform. Please read this privacy policy carefully.'
    },
    {
      id: 'information-collection',
      title: '2. Information We Collect',
      content: 'We collect personal information that you voluntarily provide to us when registering as a seller. This includes:',
      subsections: [
        '• Personal identifiers: Name, email address, phone number, business address',
        '• Financial information: Bank account details, IFSC code, PAN number, GST number',
        '• Identity verification: Aadhaar number, PAN card, address proof documents',
        '• Business information: Store name, product categories, business type',
        '• Product data: Product listings, images, descriptions, pricing',
        '• Transaction data: Sales records, order history, payout information',
        '• Communication data: Customer service interactions, support tickets',
        '• Device information: IP address, browser type, operating system, device identifiers'
      ]
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      content: 'We use the information we collect or receive to:',
      subsections: [
        '• Facilitate account creation and login processes',
        '• Process and manage your seller registration and verification',
        '• Enable product listings and sales transactions',
        '• Process payments and prevent fraudulent transactions',
        '• Send administrative information such as order updates, policy changes',
        '• Provide customer support and respond to inquiries',
        '• Monitor and analyze usage trends to improve our services',
        '• Send marketing communications about new features and opportunities',
        '• Comply with legal obligations and enforce our terms',
        '• Protect against malicious, deceptive, or illegal activity'
      ]
    },
    {
      id: 'data-sharing',
      title: '4. Data Sharing and Disclosure',
      content: 'We may share your information in the following situations:',
      subsections: [
        '• With customers: Product information, store name, and contact details',
        '• With service providers: Payment processors, shipping partners, cloud storage providers',
        '• With business partners: Marketing and analytics partners (anonymized data)',
        '• For legal compliance: When required by law, court order, or government request',
        '• Business transfers: In case of merger, acquisition, or asset sale',
        '• With your consent: Any other sharing with your explicit permission'
      ]
    },
    {
      id: 'data-security',
      title: '5. Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information, including:',
      subsections: [
        '• SSL/TLS encryption for data transmission',
        '• Secure database storage with encryption at rest',
        '• Regular security audits and vulnerability assessments',
        '• Access controls and authentication mechanisms',
        '• Employee training on data protection practices',
        '• However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.'
      ]
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      content: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Specifically:',
      subsections: [
        '• Active seller accounts: Data retained while account is active',
        '• Financial records: Retained for 7 years as per Indian tax laws',
        '• Transaction history: Retained for 5 years for dispute resolution',
        '• Marketing data: Retained until you unsubscribe',
        '• Upon account deletion: Most data deleted within 30 days, except legally required records'
      ]
    },
    {
      id: 'your-rights',
      title: '7. Your Privacy Rights',
      content: 'As a seller on our platform, you have the following rights:',
      subsections: [
        '• Right to access: Request copies of your personal data',
        '• Right to rectification: Request correction of inaccurate data',
        '• Right to erasure: Request deletion of your data (with legal limitations)',
        '• Right to restriction: Request limitation of processing',
        '• Right to data portability: Receive your data in a structured format',
        '• Right to object: Object to processing of your personal data',
        '• Right to withdraw consent: Withdraw consent at any time',
        'To exercise these rights, contact us at privacy@nirmatri.com'
      ]
    },
    {
      id: 'cookies',
      title: '8. Cookies and Tracking Technologies',
      content: 'We use cookies and similar tracking technologies to track activity on our platform and store certain information:',
      subsections: [
        '• Essential cookies: Required for platform functionality',
        '• Performance cookies: Analyze how you use our platform',
        '• Functional cookies: Remember your preferences',
        '• Targeting cookies: Deliver relevant advertisements',
        'You can control cookie preferences through your browser settings. Disabling cookies may limit platform functionality.'
      ]
    },
    {
      id: 'third-party',
      title: '9. Third-Party Services',
      content: 'Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies:',
      subsections: [
        '• Payment gateways: Razorpay, PayU, Paytm',
        '• Shipping providers: BlueDart, Delhivery, India Post',
        '• Analytics: Google Analytics, Mixpanel',
        '• Cloud services: AWS, Google Cloud',
        '• Communication: SendGrid, Twilio'
      ]
    },
    {
      id: 'international-transfers',
      title: '10. International Data Transfers',
      content: 'Your information may be transferred to and processed in countries other than India. We ensure appropriate safeguards are in place:',
      subsections: [
        '• Standard contractual clauses approved by regulatory authorities',
        '• Compliance with EU-India data transfer regulations',
        '• Adequate level of protection as per Indian data protection laws',
        '• By using our platform, you consent to such transfers'
      ]
    },
    {
      id: 'children-privacy',
      title: '11. Children\'s Privacy',
      content: 'Our platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. Sellers must be at least 18 years old. If you become aware that a child has provided us with personal data, please contact us immediately.'
    },
    {
      id: 'policy-updates',
      title: '12. Updates to This Policy',
      content: 'We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last Modified" date. For material changes, we will notify you via:',
      subsections: [
        '• Email notification to your registered email address',
        '• Prominent notice on the seller dashboard',
        '• Push notifications through our mobile app',
        'Continued use of the platform after changes constitutes acceptance of the updated policy.'
      ]
    },
    {
      id: 'contact',
      title: '13. Contact Us',
      content: 'If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:',
      subsections: [
        '• Email: privacy@nirmatri.com',
        '• Data Protection Officer: dpo@nirmatri.com',
        '• Address: Nirmatri Crafts Pvt. Ltd., Bangalore, Karnataka, India',
        '• Phone: +91-80-XXXX-XXXX',
        'We will respond to your request within 30 days.'
      ]
    },
  ];

  // ============================================
  // RENDER
  // ============================================

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


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <TermsModal
  open={showTerms}
  onClose={() => setShowTerms(false)}
  termsContent={termsContent}
/>


      <main className="min-h-screen">
        {/* ============================================ */}
        {/* HEADER SECTION */}
        {/* ============================================ */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Go back"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm opacity-80">Back</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Privacy Policy
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-4">
                Seller Data Protection & Privacy Guidelines
              </p>
              <div className="flex flex-wrap gap-4 text-sm opacity-75">
                <span>📅 Last Updated: February 4, 2026</span>
                <span>•</span>
                <span>📋 Version 3.0</span>
                <span>•</span>
                <span>🇮🇳 Jurisdiction: India</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============================================ */}
        {/* MAIN CONTENT */}
        {/* ============================================ */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📑 Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {privacyContent.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveSection(section.id);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Privacy Content Sections */}
          <div className="space-y-8">
            {privacyContent.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 p-6 md:p-8 scroll-mt-4 transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'border-blue-500 dark:border-blue-600 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {section.content}
                </p>
                
                {section.subsections && (
                  <ul className="space-y-2 ml-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <li
                        key={subIndex}
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      >
                        {subsection}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </div>

          {/* ============================================ */}
          {/* COMPLIANCE BADGES */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🔒</span>
              <span>Compliance & Certifications</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ComplianceBadge 
                icon="🇮🇳" 
                label="IT Act 2000" 
                description="India Compliant"
              />
              <ComplianceBadge 
                icon="🔐" 
                label="ISO 27001" 
                description="Data Security"
              />
              <ComplianceBadge 
                icon="✅" 
                label="PCI DSS" 
                description="Payment Security"
              />
              <ComplianceBadge 
                icon="🛡️" 
                label="GDPR Ready" 
                description="EU Standards"
              />
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* ACTION BUTTONS */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            {/* <Link
              href="setShowTerms(true)"
              className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              📄 View Terms of Service
            </Link> */}
            <button
  type="button"
  onClick={() => setShowTerms(true)}
  className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
>
  📄 View Terms of Service
</button>

            <button
              onClick={() => window.print()}
              className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              🖨️ Print Policy
            </button>
          </motion.div>

          {/* ============================================ */}
          {/* CONTACT SECTION */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center space-y-4"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our Data Protection Officer is here to help
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <a 
                  href="mailto:privacy@nirmatri.com" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2"
                >
                  <span>📧</span>
                  <span>privacy@nirmatri.com</span>
                </a>
                <span className="text-gray-400">•</span>
                <a 
                  href="mailto:dpo@nirmatri.com" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2"
                >
                  <span>🛡️</span>
                  <span>dpo@nirmatri.com</span>
                </a>
                <span className="text-gray-400">•</span>
                <a 
                  href="/help" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2"
                >
                  <span>📚</span>
                  <span>Help Center</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              This privacy policy is effective as of February 1, 2026 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/* ============================================ */
/* COMPLIANCE BADGE COMPONENT */
/* ============================================ */
function ComplianceBadge({ 
  icon, 
  label, 
  description 
}: {
  icon: string;
  label: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
        {label}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400">
        {description}
      </div>
    </div>
  );
}