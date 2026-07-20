import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-btn"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-mint-600 text-white shadow-lg transition-all duration-300 hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 focus:outline-none"
          aria-label="Scroll to top"
        >
          {/* Circular progress bar background */}
          <svg className="absolute left-0 top-0 h-full w-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="22"
              className="fill-none stroke-mint-200/20"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              className="fill-none stroke-white transition-all duration-100"
              strokeWidth="3"
              strokeDasharray="138"
              strokeDashoffset={138 - (138 * scrollProgress) / 100}
            />
          </svg>
          <ArrowUp className="h-5 w-5 relative z-10 animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
