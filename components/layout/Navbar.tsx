'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react';
import { NAV_ITEMS } from '../../lib/constants';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Navbar({
  theme,
  toggleTheme,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-105/85 dark:bg-neutral-800/60 backdrop-blur-2xl shadow-xl border-b border-neutral-200/50 dark:border-white/15 py-3'
          : 'bg-neutral-100/60 dark:bg-neutral-800/40 backdrop-blur-xl border-b border-neutral-200/30 dark:border-white/10 py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
          </Link>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-mint-600 text-white dark:bg-mint-500 dark:text-white shadow-sm'
                      : 'bg-neutral-100/80 text-neutral-800 hover:bg-mint-50 hover:text-mint-700 dark:bg-neutral-800/60 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-mint-300 border border-neutral-200/60 dark:border-neutral-700/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Book Appointment Shortcut CTA */}
            <Link
              href="/appointment"
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-mint-600 px-5 text-sm font-semibold text-white shadow-md hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 transition-all duration-300"
            >
              Book Consultation
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
