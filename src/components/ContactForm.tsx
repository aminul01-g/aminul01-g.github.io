import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field
}

export default function ContactForm(): React.ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Check honeypot field
    if (data.website) {
      console.log('Bot detected');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create FormData for Formspree
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);

      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mgvzwoao', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="contact-form space-y-4 glass-card rounded-2xl p-8 flex flex-col justify-center h-full backdrop-blur-md border border-white/30 dark:border-gray-700/60 shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
      aria-label="Contact form"
    >
      {/* Honeypot field for spam protection */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        {...register('website')}
        aria-hidden="true"
        name="website"
      />

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-white">
          Name{' '}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <motion.input
          id="name"
          type="text"
          placeholder="Your Name"
          className={`w-full border-none p-3 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300/30 shadow-inner transition-all duration-200 ${
            errors.name ? 'ring-2 ring-red-400 bg-red-50 dark:bg-red-900/20' : ''
          }`}
          {...register('name', {
            required: 'Name is required.',
            minLength: { value: 2, message: 'Name should be at least 2 characters.' },
            maxLength: { value: 50, message: 'Name should be less than 50 characters.' },
          })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : 'name-help'}
          whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px #6366f1' }}
          whileHover={{ scale: 1.005 }}
          disabled={isSubmitting}
          name="name"
        />
        <div id="name-help" className="sr-only">
          Enter your full name (2-50 characters)
        </div>
        {errors.name && (
          <motion.span
            id="name-error"
            className="text-xs text-red-500 flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="polite"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name.message}
          </motion.span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-white">
          Email{' '}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <motion.input
          id="email"
          type="email"
          placeholder="your-email@gmail.com"
          className={`w-full border-none p-3 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300/30 shadow-inner transition-all duration-200 ${
            errors.email ? 'ring-2 ring-red-400 bg-red-50 dark:bg-red-900/20' : ''
          }`}
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address.',
            },
          })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : 'email-help'}
          whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px #6366f1' }}
          whileHover={{ scale: 1.005 }}
          disabled={isSubmitting}
          name="email"
        />
        <div id="email-help" className="sr-only">
          Enter a valid email address
        </div>
        {errors.email && (
          <motion.span
            id="email-error"
            className="text-xs text-red-500 flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="polite"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.email.message}
          </motion.span>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-800 dark:text-white"
        >
          Message{' '}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <motion.textarea
          id="message"
          rows={5}
          placeholder="Your Message"
          className={`w-full border-none p-3 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300/30 shadow-inner resize-none transition-all duration-200 ${
            errors.message ? 'ring-2 ring-red-400 bg-red-50 dark:bg-red-900/20' : ''
          }`}
          {...register('message', {
            required: 'Message is required.',
            minLength: { value: 10, message: 'Message should be at least 10 characters.' },
            maxLength: { value: 1000, message: 'Message should be less than 1000 characters.' },
          })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-help'}
          whileFocus={{ scale: 1.005, boxShadow: '0 0 0 2px #6366f1' }}
          whileHover={{ scale: 1.002 }}
          disabled={isSubmitting}
          name="message"
        />
        <div id="message-help" className="sr-only">
          Enter your message (10-1000 characters)
        </div>
        {errors.message && (
          <motion.span
            id="message-error"
            className="text-xs text-red-500 flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="polite"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.message.message}
          </motion.span>
        )}
      </div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="polite"
        >
          <svg
            className="w-5 h-5 text-green-600 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-green-800 dark:text-green-200 text-sm font-medium">
            Message sent successfully! I&apos;ll get back to you soon.
          </span>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="polite"
        >
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-red-800 dark:text-red-200 text-sm font-medium">
            Failed to send message. Please try again or contact me directly.
          </span>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-400/40 flex items-center justify-center gap-2 mt-2 shadow-lg ${
          isSubmitting
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary to-indigo-500 hover:from-primary-600 hover:to-indigo-600'
        }`}
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </>
        )}
      </motion.button>
    </form>
  );
}
