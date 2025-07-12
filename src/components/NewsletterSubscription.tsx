import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterSubscriptionProps {
  className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to subscribe the user
      // For now, we'll just simulate success
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={`glass-card p-8 rounded-2xl backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6">
        <motion.h3 
          className="text-2xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Stay Updated
        </motion.h3>
        <motion.p 
          className="text-gray-300 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Get the latest insights on AI, technology, and my journey delivered to your inbox.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubscribed ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                disabled={isLoading}
              />
              {error && (
                <motion.p
                  className="absolute -bottom-6 left-0 text-red-400 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !email}
              className="w-full btn-modern disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </motion.div>
                ) : (
                  <motion.div
                    key="subscribe"
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Subscribe to Newsletter
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.p 
              className="text-xs text-gray-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              No spam, unsubscribe at any time. Your privacy is protected.
            </motion.p>
          </motion.form>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            
            <motion.h4 
              className="text-xl font-semibold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Successfully Subscribed!
            </motion.h4>
            
            <motion.p 
              className="text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for subscribing! You'll receive updates on the latest content.
            </motion.p>
            
            <motion.button
              onClick={() => setIsSubscribed(false)}
              className="mt-4 text-primary-300 hover:text-primary-200 transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Subscribe another email
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NewsletterSubscription; 