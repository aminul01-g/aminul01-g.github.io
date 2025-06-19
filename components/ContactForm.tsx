import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // NOTE: This will not work in a static export.
    // You would need a service like Formspree or a serverless function.
    setStatus('This form is for demo purposes only.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
       <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
        <input id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none" required />
      </div>
       <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
        <input id="email" name="email" placeholder="you@example.com" value={formData.email} type="email" onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
        <textarea id="message" name="message" placeholder="Your message..." value={formData.message} onChange={handleChange} rows={5} className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none" required />
      </div>
      <div className="text-center">
        <button type="submit" className="bg-sky-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-sky-700 transition-colors disabled:bg-slate-500" disabled={status === 'Sending...'}>
            {status === 'Sending...' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {status && status !== 'Sending...' && <p className="text-center mt-4 text-slate-300">{status}</p>}
    </form>
  );
};
export default ContactForm;
