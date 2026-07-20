'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Sparkles,
  Send,
  CheckCircle,
  MessageCircle,
  Activity,
  Sprout,
  Heart,
  Stethoscope,
  Pill,
  ArrowRight,
} from 'lucide-react';
import { CLINIC_INFO } from '@/lib/constants';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const services = [
    {
      id: 'treat-1',
      title: 'Panchakarma Detoxification',
      icon: <CheckCircle className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      desc: 'Complete 5-fold systemic cleansing customized to eliminate cellular toxins and restore Agni.',
    },
    {
      id: 'treat-2',
      title: 'Shirodhara & Mind Calming',
      icon: <Sprout className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      desc: 'Continuous warm herbal oil pour over the third eye region for anxiety, insomnia, and burnout.',
    },
    {
      id: 'treat-4',
      title: 'Spine & Joint Rehabilitation',
      icon: <Activity className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      desc: 'Kati Vasti and Marma therapies for sciatica, lumbar spondylosis, and arthritic joint care.',
    },
    {
      id: 'treat-3',
      title: 'Abhyanga Herbal Oil Massage',
      icon: <Heart className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      desc: 'Synchronized full-body massage using bio-active herbal oils tailored to your Prakriti.',
    },
    {
      id: 'opd-consult',
      title: 'Doctor OPD Pulse Diagnosis',
      icon: <Stethoscope className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      desc: 'Ashtavidha Pariksha pulse examination with senior BAMS/MD Ayurvedic physicians.',
    },
    {
      id: 'herbal-pharmacy',
      title: 'GMP Certified Herbal Remedies',
      icon: <Pill className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      desc: 'In-house prepared organic tailams, kashayams, and arishtams from Western Ghats herbs.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
          Get in Touch & Consultations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Contact AyurVeda Care Hospital
        </h1>
        <p className="text-neutral-600 dark:text-neutral-350 text-sm max-w-xl mx-auto leading-relaxed">
          Reach out to our clinical administration via WhatsApp, Phone, or Direct Messaging. We are available
          to assist your recovery journey.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Hospital Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800 p-8 space-y-8 shadow-sm">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              AyurVeda Care Hospital
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our campus is located in a quiet, pollution-free sector of Kerala, featuring organic herbal
              gardens, outdoor meditation decks, and pristine climate-controlled clinical suites.
            </p>

            <div className="space-y-6">

              {/* Hotlines */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950/40 dark:text-mint-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
                    Consultation Hotlines:
                  </span>
                  <a
                    href={`tel:${CLINIC_INFO.phone.replace(/[^0-9+]/g, '')}`}
                    className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                  <a
                    href={`tel:${CLINIC_INFO.phoneBackup.replace(/[^0-9+]/g, '')}`}
                    className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors"
                  >
                    {CLINIC_INFO.phoneBackup}
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950/40 dark:text-mint-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
                    Official Inquiries:
                  </span>
                  <a
                    href={`mailto:${CLINIC_INFO.email}`}
                    className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors"
                  >
                    {CLINIC_INFO.email}
                  </a>
                  <a
                    href={`mailto:${CLINIC_INFO.appointmentEmail}`}
                    className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors"
                  >
                    {CLINIC_INFO.appointmentEmail}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950/40 dark:text-mint-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
                    Clinical Location:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {CLINIC_INFO.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950/40 dark:text-mint-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
                    Admissions & Check-ins:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                    Open 24 Hours (Residential Treatments) <br />
                    Outpatients: {CLINIC_INFO.hours.outpatients}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-3.5">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-xs">
              <strong className="text-amber-800 dark:text-amber-400 block mb-0.5">
                Emergency Assistance:
              </strong>
              <p className="text-neutral-600 dark:text-neutral-300 leading-normal">
                If you are suffering from acute orthopedic dislocations or severe neural spinal pain, please
                call our 24/7 dispatch directly at{' '}
                <strong className="text-neutral-900 dark:text-white font-bold">
                  {CLINIC_INFO.emergencyPhone}
                </strong>{' '}
                for rapid admissions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: General Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 p-8 shadow-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-mint-600 dark:bg-mint-500" />

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-2 pb-2">
                  <Sparkles className="h-5 w-5 text-mint-600 dark:text-mint-400" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    Submit General Inquiry
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priyan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Phone Number / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-mint-600 hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 text-white font-bold uppercase tracking-wider py-4 text-xs transition-colors shadow-md cursor-pointer"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send message
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <CheckCircle className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out. Our administration office will respond to your email within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-mint-600 dark:bg-neutral-800 dark:hover:bg-mint-500 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Submit another message
                </button>
              </div>
            )}

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 text-center space-y-3">
              <p className="text-xs text-neutral-500">Looking to book a certified medical consultation?</p>
              <Link
                href="/appointment"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-mint-600 hover:bg-mint-700 text-white dark:bg-mint-500 dark:hover:bg-mint-400 px-6 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                Go to Appointment Scheduler
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
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint-100 dark:bg-mint-950/50 border border-mint-200/50 dark:border-mint-900/30">
                  {svc.icon}
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
