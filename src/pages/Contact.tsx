import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';

const contactInfo = [
  {
    label: 'Email',
    value: 'aminulamin0001@gmail.com',
    icon: (
      <svg
        className="w-5 h-5 text-blue-500 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
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
      <svg
        className="w-5 h-5 text-blue-500 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
        />
      </svg>
    ),
    href: 'https://www.google.com/maps/place/Dhaka,+Bangladesh',
    button: true,
  },
  {
    label: 'Phone',
    value: '+880 1771671345',
    icon: (
      <svg
        className="w-5 h-5 text-blue-500 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"
        />
      </svg>
    ),
    href: 'https://wa.me/8801771671345',
    button: true,
  },
];

export default function Contact(): React.ReactElement {
  return (
    <section
      id="contact"
      className="py-16 pb-24 relative z-10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          Let&apos;s Connect
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info Cards */}
          <motion.div
            className="space-y-6 flex flex-col justify-stretch h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {contactInfo.map((info, idx) => (
              <motion.a
                href={info.href}
                target={info.label === 'Location' ? '_blank' : undefined}
                rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                key={info.label}
                className="group flex items-center GlassCard p-6 min-h-[90px] h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                style={{ textDecoration: 'none' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {info.icon}
                <div>
                  <div className="font-semibold text-white/90 text-base mb-1 group-hover:text-[#8b5cf6] transition-colors">
                    {info.label}
                  </div>
                  <div className="text-white/50 text-sm group-hover:text-[#8b5cf6] transition-colors">
                    {info.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
