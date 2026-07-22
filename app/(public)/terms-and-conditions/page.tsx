'use client';

import React from 'react';
import { ArrowLeft, Printer, Shield, Scale, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
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
          Print Terms Document
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
                Official Clinical Terms & Guidelines
              </span>
            </div>
            <div className="text-right text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <p>Doc ID: AVCH-TC-2026</p>
              <p>Accreditation Code: NABH/2026/AYUR-9912</p>
              <p>Effective Date: July 22, 2026</p>
            </div>
          </div>
        </header>

        {/* Section Icons grid */}
        <div className="grid grid-cols-3 gap-4 mb-8 no-print">
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 flex items-center space-x-3">
            <Scale className="h-5 w-5 text-mint-600" />
            <span className="text-xs font-bold">Standard Compliance</span>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 flex items-center space-x-3">
            <Clock className="h-5 w-5 text-mint-600" />
            <span className="text-xs font-bold">Booking Guidelines</span>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 flex items-center space-x-3">
            <Award className="h-5 w-5 text-mint-600" />
            <span className="text-xs font-bold">AYUSH & NABH Standards</span>
          </div>
        </div>

        {/* Legal Text */}
        <div className="space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-350 print:text-black">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              1. Outpatient Consultations & Diagnosis
            </h2>
            <p>
              All therapy and Panchakarma programs require an initial outpatient department (OPD) consultation, including Nadi pulse diagnosis, with a registered Ayurveda physician at AyurVeda Care Hospital.
            </p>
            <p>
              Medicines prescribed during consultation are custom-formulated using certified organic botanical materials prepared in our clinical laboratory.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              2. Panchakarma Therapy Booking & Cancellation
            </h2>
            <p>
              Therapy suites and Panchakarma treatment slots are allocated based on daily physician approvals. Cancellations or slot reschedule requests must be communicated and logged at least 24 hours prior to the scheduled session.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              3. Treatment Risks & Clinical Disclaimer
            </h2>
            <p>
              Therapies are designed for systemic cleansing and recovery. Patients are legally required to disclose all current modern medical history, pre-existing cardiac conditions, allergies, or prescription drugs during the initial consultation to prevent clinical contraindications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-neutral-950 dark:text-white print:text-black flex items-center gap-2">
              <span className="w-1.5 h-5 bg-mint-600 rounded-sm inline-block" />
              4. Code of Conduct & Hospital Protocols
            </h2>
            <p>
              To maintain the sacred, tranquil environment of the healing center, patients must adhere to retreat noise guidelines and respect therapist instructions. The hospital reserves the right to refuse service or cancel memberships of individuals violating safety standards.
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
