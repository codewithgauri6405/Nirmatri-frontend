'use client';
import { motion, AnimatePresence } from 'framer-motion';


type TermsModalProps = {
  open: boolean;
  onClose: () => void;
  termsContent: {
    title: string;
    content: string;
  }[];
};

export default function TermsModal({
  open,
  onClose,
  termsContent,
}: TermsModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-4"
        >
          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Seller Terms & Conditions
              </h3>
              <button
                onClick={onClose}
                className="text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-5">
              {termsContent.map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {section.title}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
