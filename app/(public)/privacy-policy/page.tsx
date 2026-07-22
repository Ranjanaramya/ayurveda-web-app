'use client';

import React from 'react';
import { ArrowLeft, Printer, Shield, Eye, Lock, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-28 px-4 transition-colors duration-300">
      {/* Breadcrumb / Actions Navigation */}
      <div className="max-w-[800px] mx-auto mb-6 flex items-center justify-between no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mint-700 dark:text-mint-400 hover:text-mint-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-mint-600 hover:bg-mint-700 text-white px-4.5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          Print Policy Document
        </button>
      </div>

      {/* A4 Sheet Paper Mockup */}
      <article className="max-w-[800px] min-h-[1123px] mx-auto bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shadow-2xl border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-8 sm:p-16 relative overflow-hidden transition-all duration-300 print:shadow-none print:border-none print:p-0 print:bg-white print:text-black">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-mint-500 via-emerald-600 to-mint-400 no-print" />

        {/* Official Header */}
        <header className="border-b-2 border-mint-700/20 pb-8 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-950 dark:text-white print:text-black">
                AyurVeda Care Hospital
              </h1>
              <span className="block text-xs font-bold uppercase tracking-widest text-mint-600 dark:text-mint-400 print:text-mint-600 mt-1">
                Official Clinical Policy Document
              </span>
            </div>
            <div className="text-right text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <p>Doc ID: AVCH-PP-2026</p>
              <p>Accreditation Code: NABH/2026/AYUR-9912</p>
              <p>Effective Date: July 22, 2026</p>
            </div>
          </div>
        </header>

        {/* Section Icons grid */}
        <div className="grid grid-cols-3 gap-4 mb-8 no-print">
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 flex items-center space-x-3">
            <Eye className="h-5 w-5 text-mint-600" />
            <span className="text-xs font-bold">100% Transparency</span>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 flex items-center space-x-3">
            <Lock className="h-5 w-5 text-mint-600" />
            <span className="text-xs font-bold">Secure Encryption</span>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 flex items-center space-x-3">
            <Shield className="h-5 w-5 text-mint-600" />
            <span className="text-xs font-bold">NABH Approved</span>
          </div>
        </div>

        {/* Legal Text */}
        <div className="space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-350 print:text-black">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              1. Patient Clinical Data Protection
            </h2>
            <p>
              At AyurVeda Care Hospital, we hold the privacy of our patients with supreme reverence. All diagnostic assessments, Nadi pulse reports, Panchakarma schedules, and prescription details are encrypted and securely stored in compliance with standard clinical database guidelines.
            </p>
            <p>
              We protect patient identity records and never distribute or sell clinical reports, emails, or personal health profiles to external marketing companies. Access is restricted exclusively to the certified consulting physician Council.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              2. Digital Health Record (DHR) Security
            </h2>
            <p>
              All online appointments booked through our platform undergo end-to-end transport layer security. Payment records, treatment choices, and custom reviews are stored under state-of-the-art encryption models to prevent data leakages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              3. Clinical Audits and Disclosures
            </h2>
            <p>
              As a NABH accredited facility (Accreditation Code: NABH/2026/AYUR-9912), our clinical protocols are audited regularly by the health department to ensure safety, hygiene, and patient compliance. Records may only be disclosed under legal request from statutory healthcare authorities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              4. Patient Consent & Control
            </h2>
            <p>
              Patients retain the absolute right to request a full review of their logged clinical files or submit requests for complete deletion of optional survey records. Direct requests can be sent via email to our medical superintendent council.
            </p>
          </section>
        </div>

        {/* Footer Seal */}
        <footer className="border-t border-neutral-200 dark:border-neutral-800 pt-8 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 print:text-black">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-mint-600" />
            <span className="font-semibold text-neutral-900 dark:text-white print:text-black">
              NABH Legal Council Approved
            </span>
          </div>
          <p className="text-right">
            Developed by EdGrow Tech (PVT) LTD.
          </p>
        </footer>
      </article>
    </div>
  );
}
