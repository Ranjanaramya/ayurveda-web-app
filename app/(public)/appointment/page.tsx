'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, ShieldAlert, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { getDoctors, getTreatments } from '@/lib/mockSanity';
import { createPatientInquiry } from '@/services/inquiryService';
import { CLINIC_INFO } from '@/lib/constants';
import { Loader } from '@/components/common/Loader';

function AppointmentForm() {
  const searchParams = useSearchParams();
  const doctorIdParam = searchParams.get('doctorId') || '';
  const treatmentIdParam = searchParams.get('treatmentId') || '';

  const doctors = getDoctors();
  const treatments = getTreatments();

  // Form states
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('08:30 AM - 11:30 AM');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync params on mount/change
  useEffect(() => {
    if (doctorIdParam) setSelectedDoctorId(doctorIdParam);
  }, [doctorIdParam]);

  useEffect(() => {
    if (treatmentIdParam) setSelectedTreatmentId(treatmentIdParam);
  }, [treatmentIdParam]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!patientName.trim()) {
      newErrors.patientName = 'Patient Full Name is required';
    } else if (patientName.trim().length < 2) {
      newErrors.patientName = 'Patient Name must be at least 2 characters';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
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

    if (!preferredDate) {
      newErrors.preferredDate = 'Preferred Date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(preferredDate);
      if (selected < today) {
        newErrors.preferredDate = 'Preferred date cannot be in the past';
      }
    }

    if (message.trim() && message.trim().length < 5) {
      newErrors.message = 'Description must be at least 5 characters if provided';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await createPatientInquiry({
        patientName: patientName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        preferredDate,
        preferredTime,
        doctorId: selectedDoctorId || 'any',
        treatmentId: selectedTreatmentId || 'any',
        message: message.trim(),
      });

      setSubmitting(false);
      setShowSuccess(true);

      // Reset fields
      setPatientName('');
      setEmail('');
      setPhone('');
      setPreferredDate('');
      setPreferredTime('08:30 AM - 11:30 AM');
      setMessage('');
      setSelectedDoctorId('');
      setSelectedTreatmentId('');
      setErrors({});
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      alert('Failed to log booking inquiry. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-emerald-400 uppercase tracking-[0.2em] block">
          Schedule & Consultations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B4D3E] dark:text-emerald-300">
          Book Your Holistic Consultation
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Take the first step toward customized lifestyle healing. Submit your medical request below, and our
          administration will confirm your slot within 2 business hours.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Emergency Assistance + Hospital Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Emergency Assistance Notice — top, matching Contact page */}
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
              Our campus is located in a quiet, pollution-free sector of Kerala, featuring organic herbal
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

        {/* Right Column: Appointment Booking Form (7 cols) */}
        <div id="appointment-form-section" className="lg:col-span-7">
          <div className="rounded-3xl bg-[#DDEEE3] dark:bg-neutral-900/90 border border-[#C5DFC8] dark:border-neutral-800 p-8 sm:p-10 shadow-sm space-y-6">

            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.form
                  key="appointment-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center space-x-2.5 pb-2">
                    <Calendar className="h-6 w-6 text-[#1B4D3E] dark:text-emerald-400" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B4D3E] dark:text-emerald-300">
                      Enter Consultation Particulars
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="patient-name"
                        className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PATIENT FULL NAME <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="patient-name"
                        placeholder="e.g. Senthil Kumar"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (errors.patientName) setErrors((prev) => ({ ...prev, patientName: '' }));
                        }}
                        className={`w-full rounded-xl bg-white dark:bg-neutral-950 border ${
                          errors.patientName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                        } px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm`}
                      />
                      {errors.patientName && <p className="text-xs text-red-500 font-medium mt-1">{errors.patientName}</p>}
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="patient-email"
                        className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        EMAIL ADDRESS <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="patient-email"
                        placeholder="e.g. senthil@gmail.com"
                        value={email}
                        autoComplete="email"
                        list="appt-email-suggestions"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        className={`w-full rounded-xl bg-white dark:bg-neutral-950 border ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                        } px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm`}
                      />
                      <datalist id="appt-email-suggestions">
                        {email.includes('@') ? null : [
                          '@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com', '@icloud.com', '@rediffmail.com'
                        ].map((domain) => (
                          <option key={domain} value={`${email.split('@')[0]}${domain}`} />
                        ))}
                      </datalist>
                      {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Phone Number */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label
                        htmlFor="patient-phone"
                        className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PHONE / WHATSAPP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="patient-phone"
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

                    {/* Preferred Date */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label
                        htmlFor="appointment-date"
                        className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PREFERRED DATE <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="appointment-date"
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          if (errors.preferredDate) setErrors((prev) => ({ ...prev, preferredDate: '' }));
                        }}
                        className={`w-full rounded-xl bg-white dark:bg-neutral-950 border ${
                          errors.preferredDate ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                        } px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 shadow-sm`}
                      />
                      {errors.preferredDate && <p className="text-xs text-red-500 font-medium mt-1">{errors.preferredDate}</p>}
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label
                        htmlFor="preferred-time"
                        className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PREFERRED HOURS
                      </label>
                      <select
                        id="preferred-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full rounded-xl bg-white dark:bg-neutral-950 border border-[#C8DCD0] dark:border-neutral-800 px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-sm"
                      >
                        <option value="08:30 AM - 11:30 AM">Morning (08:30 AM - 11:30 AM)</option>
                        <option value="11:30 AM - 02:00 PM">Mid-Day (11:30 AM - 02:00 PM)</option>
                        <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
                        <option value="05:00 PM - 07:30 PM">Evening (05:00 PM - 07:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Doctor selection */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="select-doctor"
                        className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        AYURVEDIC CONSULTANT EXPERT
                      </label>
                      <select
                        id="select-doctor"
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full rounded-xl bg-white dark:bg-neutral-950 border border-[#C8DCD0] dark:border-neutral-800 px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-sm"
                      >
                        <option value="">Any Available Specialist</option>
                        {doctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name} - ({doc.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Treatment selection */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="select-treatment"
                        className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PREFERRED THERAPY / TREATMENT
                      </label>
                      <select
                        id="select-treatment"
                        value={selectedTreatmentId}
                        onChange={(e) => setSelectedTreatmentId(e.target.value)}
                        className="w-full rounded-xl bg-white dark:bg-neutral-950 border border-[#C8DCD0] dark:border-neutral-800 px-4 py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-sm"
                      >
                        <option value="">General Health Check-up</option>
                        {treatments.map((tr) => (
                          <option key={tr.id} value={tr.id}>
                            {tr.name} ({tr.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message/Symptoms notes */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="symptoms-message"
                      className="block text-[11px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                    >
                      DESCRIBE SYMPTOMS OR RECOVERY GOALS
                    </label>
                    <textarea
                      id="symptoms-message"
                      rows={4}
                      placeholder="e.g. chronic lower lumbar back pain since 6 months, severe sleeping troubles..."
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
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      'Request Certified Appointment'
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-5"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                      Inquiry Logged Successfully!
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Thank you! Your clinical appointment inquiry is now saved into our{' '}
                      <strong className="text-mint-605 dark:text-mint-400">
                        Sanity Patient Inquiry Schema
                      </strong>
                      . You can view, verify, or change its state in real-time inside the Simulated Sanity Studio
                      drawer panel.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 text-xs text-neutral-500 font-medium border border-neutral-200/50 dark:border-neutral-800">
                    Our administrative medical coordinator will call you shortly on your WhatsApp/Phone to
                    confirm your diagnostic slot!
                  </div>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-mint-600 dark:bg-neutral-800 dark:hover:bg-mint-500 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Book another consultation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <AppointmentForm />
    </Suspense>
  );
}
