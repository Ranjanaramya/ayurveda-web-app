'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_ITEMS } from '../../lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-drawer"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden border-t border-neutral-200/50 dark:border-white/15 bg-neutral-105/95 dark:bg-neutral-800/90 backdrop-blur-xl shadow-lg"
        >
          <div className="space-y-1 px-4 pb-6 pt-3 shadow-inner">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-mint-50 text-mint-700 dark:bg-mint-900/30 dark:text-mint-300'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/30'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
              <Link
                href="/appointment"
                onClick={onClose}
                className="w-full py-3 text-center rounded-lg bg-mint-600 text-white font-semibold shadow-md hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
