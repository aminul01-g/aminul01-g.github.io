import { useState } from 'react';
import Button from './Button';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: '', email: '', message: '' };

function validate(form: FormState) {
  const errors: Partial<FormState> = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Invalid email address.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setStatus('loading');
    setServerMsg('');
    try {
      // Replace with your Formspree endpoint
      const res = await fetch('https://formspree.io/f/xayvjqyo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
        setServerMsg('Thank you! Your message has been sent.');
      } else {
        setStatus('error');
        setServerMsg('Something went wrong. Please try again later.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Network error. Please try again.');
    }
  };

  return (
    <form className="contact-form space-y-4 glass-card rounded-2xl p-8 flex flex-col justify-center h-full backdrop-blur-md border border-white/30 dark:border-gray-700/60 shadow-lg" onSubmit={handleSubmit} autoComplete="off" noValidate aria-label="Contact form">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-white">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          className={`w-full border-none p-3 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300/30 shadow-inner ${errors.name ? 'ring-2 ring-red-400' : ''}`}
          value={form.name}
          onChange={handleChange}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <span id="name-error" className="text-xs text-red-500">{errors.name}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-white">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="your-mail@gmail.com"
          className={`w-full border-none p-3 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300/30 shadow-inner ${errors.email ? 'ring-2 ring-red-400' : ''}`}
          value={form.email}
          onChange={handleChange}
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <span id="email-error" className="text-xs text-red-500">{errors.email}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-800 dark:text-white">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          rows={5}
          className={`w-full border-none p-3 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-300/30 shadow-inner resize-none ${errors.message ? 'ring-2 ring-red-400' : ''}`}
          value={form.message}
          onChange={handleChange}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        ></textarea>
        {errors.message && <span id="message-error" className="text-xs text-red-500">{errors.message}</span>}
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-md font-semibold hover:from-purple-500 hover:to-blue-500 transition flex items-center justify-center gap-2 mt-2 shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
        ) : (
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" /><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22l-4-9-9-4 20-7z" /></svg>
        )}
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
      {serverMsg && (
        <p className={`text-center text-sm mt-2 ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>{serverMsg}</p>
      )}
    </form>
  );
}
