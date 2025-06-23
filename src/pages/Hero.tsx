import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import Typewriter from '../components/Typewriter';

const socialLinks = [
	{
		href: profile.github,
		label: 'GitHub',
		icon: (
			<svg
				className="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
			</svg>
		),
	},
	{
		href: profile.linkedin,
		label: 'LinkedIn',
		icon: (
			<svg
				className="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
			</svg>
		),
	},
	{
		href: profile.leetcode,
		label: 'LeetCode',
		icon: (
			<svg
				className="w-6 h-6"
        fill="currentColor"
				viewBox="0 0 24 24"
        >
        <path d="M8.7 14.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L5.42 12l3.28 2.3zm6.6 0 3.28-2.3-3.28-2.3a1 1 0 1 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4z"/>
        </svg>
			
		),
	},
	{
		href: profile.behance,
		label: 'Behance',
		icon: (
			<svg
				className="w-6 h-6"
        fill="currentColor"
				viewBox="0 0 24 24"
      >
      <path d="M22 9.5h-6v1.5h6v-1.5zm-9.438 2.599c.535-.391.854-1.01.854-1.808 0-1.854-1.297-2.291-2.747-2.291h-6.669v9.5h6.826c1.635 0 3.174-.931 3.174-2.871 0-1.168-.519-1.9-1.438-2.53zm-5.562-2.099h2.588c.647 0 1.362.237 1.362 1.018 0 .708-.472 1.082-1.13 1.082h-2.82v-2.1zm2.97 6.5h-2.97v-2.4h2.949c.751 0 1.276.333 1.276 1.154 0 .82-.611 1.246-1.255 1.246zm11.03-2.5c-.088-.709-.35-1.27-.78-1.669-.456-.42-1.073-.631-1.836-.631-1.06 0-1.877.364-2.434 1.08-.466.605-.726 1.432-.726 2.365 0 .898.286 1.646.848 2.225.562.578 1.298.867 2.19.867 1.29 0 2.29-.591 2.702-1.57h-1.626c-.246.335-.612.5-1.096.5-.43 0-.781-.137-1.05-.408-.27-.271-.429-.648-.475-1.119h4.287c.031-.222.045-.438.05-.64.001-.08.002-.159.002-.237 0-.085-.001-.17-.004-.253-.006-.17-.016-.34-.035-.51z"/>
      </svg>
        
			
		),
	},
	{
		href: profile.telegram,
		label: 'Telegram',
		icon: (
			<svg
				className="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path d="M9.036 16.572l-.398 5.607c.57 0 .818-.244 1.116-.537l2.675-2.558 5.547 4.053c1.016.561 1.74.266 1.993-.941l3.617-16.964c.369-1.627-.591-2.264-1.627-1.872l-21.1 8.122c-1.617.627-1.6 1.527-.277 1.927l5.396 1.687 12.522-7.89c.59-.377 1.127-.168.686.209z" />
			</svg>
		),
	},
];

export default function Hero() {
	return (
		<section
			id="hero"
			className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-20 fade-in"
		>
			<div className="hero-bg" />
			<motion.img
				src={profile.profilePic}
				alt="profile"
				className="w-36 h-36 rounded-full mb-6 border-4 border-primary shadow-lg relative z-10"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.7 }}
			/>
			<motion.h1
				className="text-4xl sm:text-6xl font-bold mb-4 dark:text-white relative z-10"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.7 }}
			>
				Hi, I'm {profile.name}
			</motion.h1>
			<Typewriter
				words={[profile.title, profile.slogan]}
				className="text-primary text-xl sm:text-2xl mb-6 font-semibold relative z-10"
				speed={70}
				pause={1200}
			/>
			{/* Social Icons Row */}
			<div className="flex justify-center gap-4 mb-4 z-10">
				{socialLinks.map((link) => (
					<a
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={link.label}
						className="text-gray-500 hover:text-primary dark:hover:text-primary transition-colors duration-200"
					>
						{link.icon}
					</a>
				))}
			</div>
			<motion.a
				href={profile.resume}
				target="_blank"
				rel="noopener noreferrer"
				className="btn relative z-10"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8, duration: 0.7 }}
				tabIndex={0}
			>
				View Resume
			</motion.a>
		</section>
	);
}
