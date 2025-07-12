import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'AI Research Lead',
    company: 'TechCorp',
    content:
      "Aminul's expertise in machine learning and his innovative approach to problem-solving have been invaluable to our team. His work on our NLP project exceeded expectations.",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Prof. Michael Rodriguez',
    role: 'Computer Science Professor',
    company: 'BUBT University',
    content:
      "Aminul is one of the most dedicated students I've had the pleasure to teach. His passion for AI and commitment to excellence is truly remarkable.",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Alex Thompson',
    role: 'Senior Developer',
    company: 'InnovateTech',
    content:
      'Working with Aminul on our deep learning project was a great experience. His technical skills and collaborative spirit made him an excellent team member.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 5,
  },
];

export default function TestimonialsCarousel(): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Pause auto-play on hover/focus
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 px-4" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300"
          >
            What People Say
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Testimonials from colleagues, professors, and industry professionals
          </p>
        </div>

        <div
          ref={carouselRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="region"
          aria-label="Testimonials carousel"
          aria-live="polite"
          aria-atomic="false"
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Previous testimonial"
            aria-controls="testimonials-carousel"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Next testimonial"
            aria-controls="testimonials-carousel"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-primary/10 dark:border-gray-700 p-8 md:p-12"
                id="testimonials-carousel"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length}`}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="mb-6">
                    <ImageWithFallback
                      src={testimonials[currentIndex].avatar}
                      alt={`${testimonials[currentIndex].name} avatar`}
                      className="w-20 h-20 rounded-full border-4 border-primary/20 object-cover mx-auto"
                      loading="lazy"
                    />
                  </div>

                  {/* Rating */}
                  <div
                    className="flex items-center gap-1 mb-6"
                    aria-label={`${testimonials[currentIndex].rating} out of 5 stars`}
                  >
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 italic leading-relaxed max-w-4xl">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </blockquote>

                  {/* Author Info */}
                  <div className="text-center">
                    <cite className="not-italic">
                      <div className="font-semibold text-gray-900 dark:text-white text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </div>
                    </cite>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div
            className="flex justify-center mt-8 space-x-2"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-controls="testimonials-carousel"
              />
            ))}
          </div>

          {/* Screen reader status */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {`Testimonial ${currentIndex + 1} of ${testimonials.length}: ${testimonials[currentIndex].name}, ${testimonials[currentIndex].role} at ${testimonials[currentIndex].company}`}
          </div>
        </div>
      </div>
    </section>
  );
}
