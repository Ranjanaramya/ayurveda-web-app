import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mint-100 dark:bg-mint-900/30 text-mint-600 dark:text-mint-400">
        <Leaf className="h-10 w-10 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Balance Disrupted
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
          The path you seek cannot be found. Let us guide you back to the center of harmony and holistic healing.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-xl bg-mint-600 px-6 text-sm font-semibold text-white shadow-md hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 transition-all duration-300"
      >
        Return to Harmony
      </Link>
    </div>
  );
}
