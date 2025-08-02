import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';

interface FormData {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field
}

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  blur: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

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
          Accept: 'application/json',
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
    <motion.form
      className="glass-card rounded-2xl p-8 space-y-6 backdrop-blur-enhanced border border-white/20 dark:border-gray-700/30 shadow-xl"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
      aria-label="Contact form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={fieldVariants}>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Send me a message
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as
          possible.
        </p>
      </motion.div>

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

      {/* Name Field */}
      <motion.div className="space-y-2" variants={fieldVariants}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-white">
          Name{' '}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <motion.input
          id="name"
          type="text"
          placeholder="Your full name"
          className={`w-full p-4 rounded-xl glass-input backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 ${
            errors.name
              ? 'border-red-400 bg-red-50/50 dark:bg-red-900/20'
              : 'border-white/20 dark:border-gray-600/30 bg-white/50 dark:bg-gray-800/50'
          } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
          {...register('name', {
            required: 'Name is required.',
            minLength: { value: 2, message: 'Name should be at least 2 characters.' },
            maxLength: { value: 50, message: 'Name should be less than 50 characters.' },
          })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : 'name-help'}
          variants={inputVariants}
          whileFocus="focus"
          disabled={isSubmitting}
          name="name"
        />
        <div id="name-help" className="sr-only">
          Enter your full name (2-50 characters)
        </div>
        {errors.name && (
          <motion.span
            id="name-error"
            className="text-sm text-red-500 flex items-center gap-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="polite"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name.message}
          </motion.span>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div className="space-y-2" variants={fieldVariants}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-white">
          Email{' '}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <motion.input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          className={`w-full p-4 rounded-xl glass-input backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 ${
            errors.email
              ? 'border-red-400 bg-red-50/50 dark:bg-red-900/20'
              : 'border-white/20 dark:border-gray-600/30 bg-white/50 dark:bg-gray-800/50'
          } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address.',
            },
          })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : 'email-help'}
          variants={inputVariants}
          whileFocus="focus"
          disabled={isSubmitting}
          name="email"
        />
        <div id="email-help" className="sr-only">
          Enter a valid email address
        </div>
        {errors.email && (
          <motion.span
            id="email-error"
            className="text-sm text-red-500 flex items-center gap-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="polite"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.email.message}
          </motion.span>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div className="space-y-2" variants={fieldVariants}>
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
          placeholder="Tell me about your project, ideas, or just say hello..."
          className={`w-full p-4 rounded-xl glass-input backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none ${
            errors.message
              ? 'border-red-400 bg-red-50/50 dark:bg-red-900/20'
              : 'border-white/20 dark:border-gray-600/30 bg-white/50 dark:bg-gray-800/50'
          } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
          {...register('message', {
            required: 'Message is required.',
            minLength: { value: 10, message: 'Message should be at least 10 characters.' },
            maxLength: { value: 1000, message: 'Message should be less than 1000 characters.' },
          })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-help'}
          variants={inputVariants}
          whileFocus="focus"
          disabled={isSubmitting}
          name="message"
        />
        <div id="message-help" className="sr-only">
          Enter your message (10-1000 characters)
        </div>
        {errors.message && (
          <motion.span
            id="message-error"
            className="text-sm text-red-500 flex items-center gap-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="polite"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.message.message}
          </motion.span>
        )}
      </motion.div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          className="glass-card p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="polite"
        >
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-green-800 dark:text-green-200 font-medium">
              Message sent successfully!
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Thank you for reaching out. I&apos;ll get back to you soon.
            </p>
          </div>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          className="glass-card p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="polite"
        >
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-red-800 dark:text-red-200 font-medium">Failed to send message</h4>
            <p className="text-red-700 dark:text-red-300 text-sm">
              Please try again or contact me directly via email.
            </p>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.div variants={fieldVariants}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
          glow={!isSubmitting}
        >
          {isSubmitting ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg
                className="w-5 h-5 ml-2"
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
        </Button>
      </motion.div>

      {/* Additional Info */}
      <motion.div className="text-center pt-4 border-t border-white/10" variants={fieldVariants}>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your information is secure and will never be shared with third parties.
        </p>
      </motion.div>
    </motion.form>
  );
}
