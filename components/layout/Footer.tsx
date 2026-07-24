'use client';

import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Clock, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import { CLINIC_INFO, NAV_ITEMS } from '../../lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="relative overflow-hidden group text-neutral-200 border-t border-mint-700/40"
    >
      {/* Background Nature Image & Interactive Hover Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-122955356/122955356.jpg"
          alt="Ayurveda Herbal Forest Background"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover scale-100 group-hover:scale-108 group-hover:brightness-125 transition-all duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Lighter, Semi-Transparent Dark Emerald Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-emerald-950/75 to-neutral-950/65 group-hover:opacity-85 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-mint-950/20 mix-blend-overlay" />
      </div>

      {/* Content Wrapper with Glassmorphism Panels */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo & Bio */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-900/90 text-mint-400 border border-mint-500/50 shadow-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  Ayur<span className="text-mint-400">Veda</span>
                </span>
                <span className="block text-[10px] font-semibold tracking-widest text-mint-300 uppercase">
                  Care Hospital
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-200/90 leading-relaxed drop-shadow-xs">
              Blending ancient Sri Lankan Ayurveda & Deshiya Cikitsa wisdom with modern clinical excellence. Fully certified
              treatment programs for holistic healing and life-long vitality.
            </p>
            <div className="rounded-2xl bg-neutral-950/60 p-4 border border-mint-500/30 backdrop-blur-md hover:border-mint-400/50 hover:bg-neutral-950/80 transition-all duration-300 shadow-md">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                ★ CERTIFIED MEDICAL SYSTEM
              </span>
              <p className="text-[11px] text-neutral-300">
                NABH certified authentic healthcare with 100% organic herbal quality standardizations.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-2xl bg-neutral-950/40 p-5 border border-white/10 backdrop-blur-md hover:border-mint-500/40 hover:bg-neutral-950/60 transition-all duration-300">
            <h3 className="font-serif text-lg font-semibold text-white mb-4 border-b border-mint-500/40 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-mint-300 hover:translate-x-1.5 inline-block transition-all duration-200 font-medium text-neutral-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/appointment"
                  className="hover:text-mint-300 hover:translate-x-1.5 inline-block transition-all duration-200 font-medium text-neutral-200"
                >
                  Appointment Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Timing & Hours */}
          <div className="rounded-2xl bg-neutral-950/40 p-5 border border-white/10 backdrop-blur-md hover:border-mint-500/40 hover:bg-neutral-950/60 transition-all duration-300">
            <h3 className="font-serif text-lg font-semibold text-white mb-4 border-b border-mint-500/40 pb-2 inline-block">
              Working Hours
            </h3>
            <ul className="space-y-4 text-sm text-neutral-200">
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Outpatient Consultations</span>
                  <p className="text-xs text-neutral-300">{CLINIC_INFO.hours.outpatients}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Therapy & Panchakarma</span>
                  <p className="text-xs text-neutral-300">{CLINIC_INFO.hours.therapy}</p>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">Prior booking is highly recommended</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl bg-neutral-950/40 p-5 border border-white/10 backdrop-blur-md hover:border-mint-500/40 hover:bg-neutral-950/60 transition-all duration-300">
            <h3 className="font-serif text-lg font-semibold text-white mb-4 border-b border-mint-500/40 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-sm text-neutral-200">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-mint-400 shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-mint-300 transition-colors font-medium"
                >
                  {CLINIC_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-mint-400 shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:text-mint-300 transition-colors font-medium"
                >
                  {CLINIC_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Side-by-Side Half-Width Location Map & Terms / Privacy Policy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          {/* Left Column: Hospital Location Map (Half Width) */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-mint-500/30 shadow-2xl bg-neutral-950/60 backdrop-blur-md p-4 space-y-3 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-mint-400" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-white">
                  Hospital Location Map
                </h4>
              </div>
              <a
                href="https://maps.google.com/?q=Jaffna+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-mint-400 hover:underline inline-flex items-center"
              >
                Google Maps
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
              <iframe
                title="AyurVeda Care Hospital Location Map - Jaffna, Sri Lanka"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31636.99019993636!2d80.00745!3d9.66152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe51d04b9bef37%3A0x38e84c1de1c6ca7c!2sJaffna%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full filter brightness-90 contrast-105 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Right Column: Terms & Conditions and Privacy Policy */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-mint-500/30 shadow-2xl bg-neutral-950/60 backdrop-blur-md p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 border-b border-mint-500/30 pb-2">
                <ShieldCheck className="h-5 w-5 text-mint-400" />
                <h4 className="font-serif text-base font-bold text-white">
                  Terms & Legal Compliance
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Privacy Policy Block */}
                <Link
                  href="/privacy-policy"
                  className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-mint-500/40 transition-all space-y-2 block"
                >
                  <span className="text-xs font-bold text-mint-300 flex items-center">
                    <FileText className="h-3.5 w-3.5 mr-1.5 text-mint-400" />
                    Privacy Policy
                  </span>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    We strictly protect your medical record privacy under Indian Clinical Privacy Standards. Patient records are encrypted and never disclosed.
                  </p>
                </Link>

                {/* Terms & Conditions Block */}
                <Link
                  href="/terms-and-conditions"
                  className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-mint-500/40 transition-all space-y-2 block"
                >
                  <span className="text-xs font-bold text-mint-300 flex items-center">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-mint-400" />
                    Terms & Conditions
                  </span>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    Therapy packages require initial OPD Nadi pulse diagnosis. Panchakarma slot cancellations must be logged 24 hours prior.
                  </p>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-300 border-t border-white/10 pt-3 gap-2">
              <span className="text-[11px] font-medium">
                NABH Accreditation Code: NABH/2026/AYUR-9912
              </span>
              <div className="flex space-x-4 text-[11px] font-semibold">
                <Link href="/privacy-policy" className="text-mint-400 hover:underline">Privacy Guidelines</Link>
                <Link href="/terms-and-conditions" className="text-mint-400 hover:underline">Clinical Terms</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-mint-800/40 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-300">
          <p className="text-center md:text-left mb-4 md:mb-0 font-medium">
            &copy; {currentYear} AyurVeda Care Hospital. All Rights Reserved.
          </p>
          <p className="max-w-md text-center md:text-right text-[12px] font-semibold text-neutral-300/80">
            Developed by EdGrow Tech (PVT) LTD.
          </p>
        </div>
      </div>
    </footer>
  );
}
