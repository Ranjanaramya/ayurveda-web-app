'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Send,
  CheckCircle,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { CLINIC_INFO } from '@/lib/constants';
import { createContactMessage } from '@/services/contactService';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@domain.com)';
    }

    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    } else if (phone.length > 15 || phoneDigits.length > 15) {
      newErrors.phone = 'Phone number cannot exceed 15 digits';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrors({});
    } catch (err) {
      console.error('Error submitting contact form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    {
      id: 'treat-1',
      title: 'Panchakarma Detoxification',
      img: '/services/panchakarma.png',
      desc: 'Complete 5-fold systemic cleansing customized to eliminate cellular toxins and restore Agni.',
    },
    {
      id: 'treat-2',
      title: 'Shirodhara & Mind Calming',
      img: '/services/shirodhara.png',
      desc: 'Continuous warm herbal oil pour over the third eye region for anxiety, insomnia, and burnout.',
    },
    {
      id: 'treat-4',
      title: 'Spine & Joint Rehabilitation',
      img: '/services/spine-joint.png',
      desc: 'Kati Vasti and Marma therapies for sciatica, lumbar spondylosis, and arthritic joint care.',
    },
    {
      id: 'treat-3',
      title: 'Abhyanga Herbal Oil Massage',
      img: '/services/abhyanga.png',
      desc: 'Synchronized full-body massage using bio-active herbal oils tailored to your Prakriti.',
    },
    {
      id: 'opd-consult',
      title: 'Doctor OPD Pulse Diagnosis',
      img: '/services/opd-pulse.png',
      desc: 'Ashtavidha Pariksha pulse examination with senior BAMS/MD Ayurvedic physicians.',
    },
    {
      id: 'herbal-pharmacy',
      title: 'GMP Certified Herbal Remedies',
      img: '/services/herbal-remedies.png',
      desc: 'In-house prepared organic tailams, kashayams, and arishtams from Western Ghats herbs.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-emerald-400 uppercase tracking-[0.2em] block">
          GET IN TOUCH & CONSULTATIONS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B4D3E] dark:text-emerald-300">
          Contact AyurVeda Care Hospital
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Reach out to our clinical administration via WhatsApp, Phone, or Direct Messaging. We are available
          to assist your recovery journey.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Emergency Assistance & Hospital Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Emergency Assistance Notice */}
          <div className="p-6 rounded-2xl bg-[#FAF6EE] dark:bg-amber-950/30 border border-[#EFE6D5] dark:border-amber-900/40 flex items-start space-x-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8D9C0] dark:bg-amber-900/60 text-[#A07038] dark:text-amber-400 mt-0.5">
              <ShieldAlert className="h-5 w-5 animate-pulse" />
            </div>
            <div className="text-xs space-y-1">
              <strong className="text-[#A07038] dark:text-amber-400 font-bold block text-xs tracking-wide">
                Emergency Assistance:
              </strong>
              <p className="text-[#75644C] dark:text-amber-200/80 leading-relaxed text-xs">
                If you are suffering from acute orthopedic dislocations or severe neural spinal pain, please
                call our 24/7 dispatch directly at{' '}
                <strong className="text-[#3B2E1E] dark:text-white font-bold">
                  {CLINIC_INFO.emergencyPhone}
                </strong>{' '}
                for rapid admissions.
              </p>
            </div>
          </div>

          {/* Hospital Info Card */}
          <div className="rounded-3xl bg-[#FDFBF7] dark:bg-neutral-900/60 border border-[#F0EBE1] dark:border-neutral-800 p-8 space-y-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#1B4D3E] dark:text-emerald-300">
              AyurVeda Care Hospital
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our campus is located in a quiet, pollution-free sector of Sri Lanka, featuring organic herbal
              gardens, outdoor meditation decks, and pristine climate-controlled clinical suites.
            </p>

            <div className="space-y-6">
              {/* Hotlines */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F2E9] text-[#1B4D3E] dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                    CONSULTATION HOTLINES:
                  </span>
                  <a
                    href={`tel:${CLINIC_INFO.phone.replace(/[^0-9+]/g, '')}`}
                    className="block text-sm font-bold text-neutral-900 dark:text-white hover:text-[#1B4D3E] transition-colors"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                  <a
                    href={`tel:${CLINIC_INFO.phoneBackup.replace(/[^0-9+]/g, '')}`}
                    className="block text-sm font-bold text-neutral-900 dark:text-white hover:text-[#1B4D3E] transition-colors"
                  >
                    {CLINIC_INFO.phoneBackup}
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F2E9] text-[#1B4D3E] dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                    OFFICIAL INQUIRIES:
                  </span>
                  <a
                    href={`mailto:${CLINIC_INFO.email}`}
                    className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-[#1B4D3E] transition-colors"
                  >
                    {CLINIC_INFO.email}
                  </a>
                  <a
                    href={`mailto:${CLINIC_INFO.appointmentEmail}`}
                    className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-[#1B4D3E] transition-colors"
                  >
                    {CLINIC_INFO.appointmentEmail}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F2E9] text-[#1B4D3E] dark:bg-emerald-950/60 dark:text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                    CLINICAL LOCATION:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {CLINIC_INFO.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F2E9] text-[#1B4D3E] dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                    ADMISSIONS & CHECK-INS:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                    Open 24 Hours (Residential Treatments) <br />
                    Outpatients: {CLINIC_INFO.hours.outpatients}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: General Inquiry Form Card */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#DDEEE3] dark:bg-neutral-900/90 border border-[#C5DFC8] dark:border-neutral-800 p-8 sm:p-10 shadow-sm space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex items-center space-x-2.5 pb-2">
                  <FileText className="h-6 w-6 text-[#1B4D3E] dark:text-emerald-400" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B4D3E] dark:text-emerald-300">
                    Submit General Inquiry
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider">
                      FULL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priyan"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      className={`w-full rounded-xl bg-white dark:bg-neutral-950 border ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                      } px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm`}
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider">
                      EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priyan@gmail.com"
                      value={email}
                      autoComplete="email"
                      list="contact-email-suggestions"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      className={`w-full rounded-xl bg-white dark:bg-neutral-950 border ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                      } px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm`}
                    />
                    <datalist id="contact-email-suggestions">
                      {email.includes('@') ? null : [
                        '@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com', '@icloud.com', '@rediffmail.com'
                      ].map((domain) => (
                        <option key={domain} value={`${email.split('@')[0]}${domain}`} />
                      ))}
                    </datalist>
                    {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone Number / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider">
                    PHONE NUMBER / WHATSAPP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    maxLength={15}
                    inputMode="numeric"
                    value={phone}
                    onKeyDown={(e) => {
                      const allowed = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End'];
                      if (allowed.includes(e.key)) return;
                      if (e.key === '+' && phone.length === 0) return;
                      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                    }}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full rounded-xl bg-white dark:bg-neutral-950 border ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                    } px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 font-medium mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider">
                    MESSAGE <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your inquiry..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    className={`w-full rounded-xl bg-white dark:bg-neutral-950 border ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                    } px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 resize-none shadow-sm`}
                  />
                  {errors.message && <p className="text-xs text-red-500 font-medium mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-[#134E39] hover:bg-[#0E3D2C] text-white font-bold uppercase tracking-wider py-4 text-xs transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      SEND MESSAGE
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <CheckCircle className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B4D3E] dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been logged in Sanity and our administration office will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#134E39] text-white hover:bg-[#0E3D2C] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Submit another message
                </button>
              </div>
            )}

            <div className="border-t border-[#C5DFC8]/60 dark:border-neutral-800 pt-6 text-center space-y-3">
              <p className="text-xs text-[#3B6856] dark:text-neutral-400 font-medium">Looking to book a certified medical consultation?</p>
              <Link
                href="/appointment"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#134E39] hover:bg-[#0E3D2C] text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 px-6 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                GO TO APPOINTMENT SCHEDULER
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* NEW SECTION: Clinical Services & Specialties Overview */}
      <section className="pt-8 space-y-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
            Our Offerings
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
            Hospital Services & Clinical Divisions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
            Discover our specialized treatment wings supervised by senior Ayurvedic scholars. Click any service
            to schedule a consultation directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group rounded-2xl bg-mint-50/50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 p-6 flex flex-col justify-between space-y-4 hover:shadow-md hover:border-mint-500/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-50 dark:bg-mint-950/30 border border-mint-200/60 dark:border-mint-900/30 overflow-hidden">
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white group-hover:text-mint-600 dark:group-hover:text-mint-400 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              <Link
                href={`/appointment?treatmentId=${svc.id}`}
                className="inline-flex items-center text-xs font-bold text-mint-700 dark:text-mint-400 hover:translate-x-1 transition-transform uppercase tracking-wider pt-2"
              >
                Inquire & Schedule
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
