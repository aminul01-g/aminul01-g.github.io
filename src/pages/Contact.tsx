import { motion } from 'framer-motion';
import { useState } from 'react';

const contactInfo = [
	{
		label: 'Email',
		value: 'aminulamin0001@gmail.com',
		icon: (
			<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<rect x={3} y={5} width={18} height={14} rx={2} />
				<polyline points="3,7 12,13 21,7" />
			</svg>
		),
		href: 'mailto:aminulamin0001@gmail.com',
		button: true,
	},
	{
		label: 'Location',
		value: 'Dhaka, Bangladesh',
		icon: (
			<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
			</svg>
		),
		href: 'https://www.google.com/maps/place/Dhaka,+Bangladesh',
		button: true,
	},
	{
		label: 'Phone',
		value: '+880 1771671345',
		icon: (
			<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
			</svg>
		),
		href: 'https://wa.me/8801771671345',
		button: true,
	},
];

export default function Contact() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('Message sending is not yet implemented.');
		// Future: Integrate with Formspree, EmailJS, or backend
	};

	return (
		<section id="contact" className="py-16 bg-white dark:bg-gray-900">
			<div className="max-w-5xl mx-auto px-4">
				<motion.h2
					className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7 }}
				>
					Let's Connect
				</motion.h2>
				<div className="grid md:grid-cols-2 gap-8 items-start">
					{/* Contact Info Cards */}
					<div className="space-y-6 flex flex-col justify-stretch h-full">
						{contactInfo.map((info) => (
							<a
								href={info.href}
								target={
									info.label === 'Location' ? '_blank' : undefined
								}
								rel={
									info.label === 'Location'
										? 'noopener noreferrer'
										: undefined
								}
								key={info.label}
								className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow min-h-[90px] h-full transition hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer group"
								style={{ textDecoration: 'none' }}
							>
								{info.icon}
								<div>
									<div className="font-semibold text-gray-800 dark:text-white text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
										{info.label}
									</div>
									<div className="text-gray-500 dark:text-gray-300 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
										{info.value}
									</div>
								</div>
							</a>
						))}
					</div>
					{/* Contact Form */}
					<form
						className="space-y-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow flex flex-col justify-center h-full"
						style={{ minHeight: '370px', maxHeight: '520px' }}
						onSubmit={handleSubmit}
						autoComplete="off"
					>
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-800 dark:text-white">
								Name
							</label>
							<input
								type="text"
								name="name"
								placeholder="Your Name"
								className="w-full border-none p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20"
								value={form.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-800 dark:text-white">
								Email
							</label>
							<input
								type="email"
								name="email"
								placeholder="your-mail@gmail.com"
								className="w-full border-none p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20"
								value={form.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-800 dark:text-white">
								Message
							</label>
							<textarea
								name="message"
								placeholder="Your Message"
								rows={5}
								className="w-full border-none p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
								value={form.message}
								onChange={handleChange}
								required
							></textarea>
						</div>
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-md font-semibold hover:from-purple-500 hover:to-blue-500 transition flex items-center justify-center gap-2 mt-2"
						>
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M22 2L11 13"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M22 2L15 22l-4-9-9-4 20-7z"
								/>
							</svg>
							Send Message
						</button>
						{status && (
							<p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
								{status}
							</p>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}
