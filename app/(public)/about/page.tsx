'use client';

import { Award, ShieldCheck, CheckCircle, Leaf, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
          Our Heritage & Certifications
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          About AyurVeda Care Hospital
        </h1>
        <p className="text-neutral-600 dark:text-neutral-350 text-sm max-w-2xl mx-auto leading-relaxed">
          Established in Kerala, we integrate centuries of authentic clinical lineage with rigid modern
          safety and hygiene standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Collage */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400&q=80"
              alt="Ayurveda Herbs preparation"
              className="rounded-2xl w-full aspect-square object-cover shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="rounded-2xl bg-mint-100 dark:bg-mint-900/30 p-6 flex flex-col justify-center text-center">
              <span className="block font-serif text-4xl font-bold text-mint-700 dark:text-mint-400">
                150+
              </span>
              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 mt-1 uppercase tracking-widest">
                Rare Native Healing Herbs
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="rounded-2xl bg-neutral-900 text-white dark:bg-neutral-800 p-6 text-center">
              <span className="block font-serif text-4xl font-bold text-mint-400">98%</span>
              <p className="text-xs font-semibold text-neutral-450 mt-1 uppercase tracking-widest">
                Treatment Satisfaction
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=400&q=80"
              alt="Herbal greenhouse"
              className="rounded-2xl w-full aspect-square object-cover shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-mint-50 px-3 py-1.5 text-xs font-semibold text-mint-700 dark:bg-mint-900/20 dark:text-mint-300">
            <ShieldCheck className="h-4 w-4" />
            <span>Safety & Clinical Certification</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Centuries of Healing Lineage, <br />
            <span className="text-mint-600 dark:text-mint-400">NABH Certified Medical Trust</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-350 leading-relaxed text-sm">
            Our hospital stands as an esteemed beacon of authentic Ayurveda. We undergo rigorous clinical
            audits, and hold the prestigious National Accreditation Board for Hospitals & Healthcare Providers
            (NABH) certification, ensuring that traditional wisdom is practiced under flawless medical hygiene
            and modern safety standards.
          </p>

          {/* List of Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              'National Quality Assurance Standards (NQAS)',
              '100% Organic ISO-Certified Raw Material Sourcing',
              'Fully Accredited Panchakarma Therapy Suites',
              'Traditional Ashtavaidya Clinical Heritage Lineage',
              'Registered Pharmacy under GMP Guidelines',
              'Multi-Disciplinary Team of Senior BAMS/MD Doctors',
            ].map((cert, index) => (
              <div key={index} className="flex items-start space-x-2.5">
                <CheckCircle className="h-5 w-5 text-mint-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {cert}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <div className="p-4 rounded-xl border border-dashed border-mint-300 dark:border-mint-800/60 bg-mint-50/50 dark:bg-mint-950/20 flex items-center space-x-4">
              <Award className="h-10 w-10 text-mint-600 shrink-0" />
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                <strong className="text-neutral-900 dark:text-white">
                  Kerala Govt. Ayurveda Department Approved:
                </strong>{' '}
                Recommended category A clinical establishment representing the finest standards of
                purification and patient recovery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Details */}
      <section className="bg-mint-100/50 dark:bg-neutral-950/60 p-8 sm:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white text-center">
          Our Three Pillars of Purity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-900/40 dark:text-mint-400">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
              Authentic Sourcing
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We cultivate and gather fresh herbs directly from the local Western Ghats forests and our
              in-house certified organic garden, ensuring unmatched potency.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-900/40 dark:text-mint-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
              Expert Scholars
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every diagnostic consultation includes pulse assessments and constitution audits supervised by
              senior BAMS/MD doctors holding multi-decade experience.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-900/40 dark:text-mint-400">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
              NABH Standards
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We follow rigorous clinical audits, sterile treatment rooms, and hygienic herbal preparation
              suites, proving that tradition and science work hand-in-hand.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link
          href="/appointment"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-mint-600 px-8 text-sm font-semibold text-white shadow-md hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 transition-all cursor-pointer"
        >
          Book Your Custom Consultation
        </Link>
      </div>
    </div>
  );
}
