'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, DollarSign, CheckCircle2, Leaf, ArrowRight } from 'lucide-react';
import { getTreatments } from '@/lib/mockSanity';
import { useCms } from '@/lib/cmsContext';

export default function TreatmentsPage() {
  const router = useRouter();
  const { dataVersion } = useCms();
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Panchakarma' | 'Rejuvenation' | 'Therapeutic' | 'Detox'
  >('All');

  const treatments = getTreatments();

  const categories: ('All' | 'Panchakarma' | 'Rejuvenation' | 'Therapeutic' | 'Detox')[] = [
    'All',
    'Panchakarma',
    'Rejuvenation',
    'Therapeutic',
    'Detox',
  ];

  const filteredTreatments =
    activeCategory === 'All'
      ? treatments
      : treatments.filter((t) => t.category.toLowerCase() === activeCategory.toLowerCase());

  const handleBookNow = (treatmentId: string) => {
    router.push(`/appointment?treatmentId=${treatmentId}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
          Our Specialities & Protocols
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Certified Ayurvedic Treatments & Services
        </h1>
        <p className="text-neutral-600 dark:text-neutral-350 text-sm max-w-2xl mx-auto leading-relaxed">
          Explore our certified therapeutic treatment regimens. Every session utilizes organic, freshly
          harvested herbs prepared in our proprietary pharmacy under severe clinical supervision.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
              activeCategory === cat
                ? 'bg-mint-600 text-white shadow-md shadow-mint-600/10 dark:bg-mint-500'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/85 dark:bg-neutral-800 dark:text-neutral-305 dark:hover:bg-neutral-700/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Treatments Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTreatments.map((treatment) => (
            <motion.div
              layout
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="group flex flex-col md:flex-row rounded-3xl overflow-hidden bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[300px] bg-neutral-100">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-mint-200/95 dark:bg-neutral-950/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-mint-700 dark:text-mint-400 uppercase tracking-widest shadow-sm">
                  {treatment.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                      {treatment.name}
                    </h2>
                    {/* Duration & Cost row */}
                    <div className="flex flex-wrap gap-4 mt-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1.5 text-mint-600 dark:text-mint-400" />
                        {treatment.duration}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-mint-600 dark:text-mint-400" />
                        {treatment.costEstimate}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {treatment.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-neutral-850 dark:text-neutral-200 uppercase tracking-wider">
                      Therapeutic Benefits:
                    </span>
                    <ul className="space-y-1.5">
                      {treatment.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-xs text-neutral-600 dark:text-neutral-400"
                        >
                          <CheckCircle2 className="h-4 w-4 text-mint-500 mr-2 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Herbs Used Badge List */}
                  {treatment.herbsUsed && (
                    <div className="pt-2">
                      <span className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                        Key Herbs:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {treatment.herbsUsed.map((herb, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center bg-mint-50 dark:bg-mint-950/40 text-[10px] font-bold text-mint-700 dark:text-mint-400 px-2 py-0.5 rounded-md border border-mint-100 dark:border-mint-900/30"
                          >
                            <Leaf className="h-2.5 w-2.5 mr-1" />
                            {herb}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleBookNow(treatment.id)}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white hover:bg-mint-600 dark:bg-neutral-800 dark:hover:bg-mint-500 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Book Treatment Session
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Package Promo Panel */}
      <div className="rounded-3xl bg-neutral-900 dark:bg-neutral-950 text-white p-8 md:p-12 relative overflow-hidden border border-neutral-800">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-mint-600/10 blur-2xl" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-3">
            <span className="inline-block bg-mint-500/10 border border-mint-500/20 text-mint-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
              Custom Healing Retreats
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Looking for long-term residential wellness packages?
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
              We offer bespoke 7-day, 14-day, and 21-day residential therapy sessions that include fully
              customized Ayurvedic diets, daily meditation classes, pristine accommodation, and unlimited
              checkups.
            </p>
          </div>
          <div className="text-left md:text-right">
            <button
              onClick={() => router.push('/contact')}
              className="inline-flex items-center justify-center rounded-xl bg-mint-500 px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg hover:bg-mint-400 transition-all hover:translate-y-[-2px] cursor-pointer"
            >
              Consult Wellness Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
