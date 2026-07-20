import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Database, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleCmsPanel: () => void;
  cmsPanelOpen: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  toggleCmsPanel,
  cmsPanelOpen,
  theme,
  toggleTheme
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'treatments', label: 'Treatments & Services' },
    { id: 'doctors', label: 'Our Experts' },
    { id: 'blogs', label: 'Blogs & Health Tips' },
    { id: 'contact', label: 'Appointments' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-100/80 dark:bg-neutral-800/60 backdrop-blur-2xl shadow-xl border-b border-neutral-200/50 dark:border-white/15 py-3'
          : 'bg-neutral-100/60 dark:bg-neutral-800/40 backdrop-blur-xl border-b border-neutral-200/30 dark:border-white/10 py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo"
            onClick={() => setActiveTab('home')}
            className="flex cursor-pointer items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-900/50 dark:text-mint-400">
              <Leaf className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-mint-900 dark:text-mint-50">
                Ayur<span className="text-mint-600 dark:text-mint-400">Veda</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-widest text-mint-700 dark:text-mint-300 uppercase">
                Care Hospital
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-mint-600 dark:hover:text-mint-400 focus:outline-none ${
                  activeTab === item.id
                    ? 'text-mint-700 dark:text-mint-300 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint-600 dark:bg-mint-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Book Appointment Shortcut CTA */}
            <button
              onClick={() => {
                setActiveTab('contact');
                setTimeout(() => {
                  const el = document.getElementById('appointment-form-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-mint-600 px-5 text-sm font-semibold text-white shadow-md hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 transition-all duration-300"
            >
              Book Consultation
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-neutral-200/50 dark:border-white/15 bg-neutral-100/95 dark:bg-neutral-800/90 backdrop-blur-xl shadow-lg"
          >
            <div className="space-y-1 px-4 pb-6 pt-3 shadow-inner">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-mint-50 text-mint-700 dark:bg-mint-900/30 dark:text-mint-300'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById('appointment-form-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full py-3 text-center rounded-lg bg-mint-600 text-white font-semibold shadow-md hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
