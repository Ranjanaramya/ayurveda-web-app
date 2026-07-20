import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, ShieldAlert, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { getDoctors, getTreatments, getInquiries, saveInquiries } from '../data/mockSanity';
import { PatientInquiry } from '../types';

interface ContactViewProps {
  selectedDoctorId: string;
  setSelectedDoctorId: (id: string) => void;
  selectedTreatmentId: string;
  setSelectedTreatmentId: (id: string) => void;
}

export default function ContactView({
  selectedDoctorId,
  setSelectedDoctorId,
  selectedTreatmentId,
  setSelectedTreatmentId
}: ContactViewProps) {
  const doctors = getDoctors();
  const treatments = getTreatments();

  // Form states
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00 AM');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset pre-selections if needed on unmount or success
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !email || !phone || !preferredDate) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);

    // Simulate database insertion (Sanity CMS save)
    setTimeout(() => {
      const allInquiries = getInquiries();
      const newInquiry: PatientInquiry = {
        id: `inq-${Date.now()}`,
        patientName,
        email,
        phone,
        preferredDate,
        preferredTime,
        doctorId: selectedDoctorId || 'any',
        treatmentId: selectedTreatmentId || 'any',
        message,
        createdAt: new Date().toISOString(),
        status: 'Pending'
      };

      saveInquiries([newInquiry, ...allInquiries]);

      setSubmitting(false);
      setShowSuccess(true);

      // Reset fields
      setPatientName('');
      setEmail('');
      setPhone('');
      setPreferredDate('');
      setPreferredTime('09:00 AM');
      setMessage('');
      setSelectedDoctorId('');
      setSelectedTreatmentId('');
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
          Schedule & Contact
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Book Your Holistic Consultation
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm max-w-xl mx-auto leading-relaxed">
          Take the first step toward customized lifestyle healing. Submit your medical request below, and our administration will confirm your slot within 2 business hours.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Hospital Info (4 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800 p-8 space-y-8 shadow-sm">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              AyurVeda Care Campus
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our campus is located in a quiet, pollution-free sector of Kerala, featuring organic herbal gardens, outdoor meditation decks, and pristine climate-controlled clinical suites.
            </p>

            {/* Info Items */}
            <div className="space-y-6">
              {/* Emergency / Support Info */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950/40 dark:text-mint-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
                    Consultation Hotlines:
                  </span>
                  <a href="tel:+914712345678" className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors">
                    +91 (471) 234-5678
                  </a>
                  <a href="tel:+914712345679" className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors">
                    +91 (471) 234-5679
                  </a>
                </div>
              </div>

              {/* Email Address Info */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950/40 dark:text-mint-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
                    Official Inquiries:
                  </span>
                  <a href="mailto:info@ayurvedacare.org" className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors">
                    info@ayurvedacare.org
                  </a>
                  <a href="mailto:appointments@ayurvedacare.org" className="block text-sm font-semibold text-neutral-900 dark:text-white hover:text-mint-600 transition-colors">
                    appointments@ayurvedacare.org
                  </a>
                </div>
              </div>

              {/* Physical Address Info */}
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-950/40 dark:text-mint-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
                    Clinical Location:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    108 Lotus Temple Road, Ayurveda Nagar, <br />
                    Trivandrum, Kerala - 695001, India
                  </p>
                </div>
              </div>

              {/* Operational timings */}
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
                    Outpatients: Mon-Sat 8:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call-out Help Notice */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-3.5">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-xs">
              <strong className="text-amber-800 dark:text-amber-400 block mb-0.5">Emergency Assistance:</strong>
              <p className="text-neutral-600 dark:text-neutral-300 leading-normal">
                If you are suffering from acute orthopedic dislocations or severe neural spinal pain flare-ups, please call our 24/7 emergency dispatch directly at <strong className="text-neutral-900 dark:text-white font-bold">+91 471 222-1080</strong> for rapid admissions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Appointment Booking Form (7 cols) */}
        <div id="appointment-form-section" className="lg:col-span-7">
          <div className="rounded-3xl bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-mint-600 dark:bg-mint-500" />

            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.form
                  key="appointment-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center space-x-2 pb-2">
                    <Calendar className="h-5 w-5 text-mint-600 dark:text-mint-400" />
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                      Enter Consultation Particulars
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="patient-name" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Patient Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="patient-name"
                        required
                        placeholder="e.g. Senthil Kumar"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                      />
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label htmlFor="patient-email" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="patient-email"
                        required
                        placeholder="e.g. senthil@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Phone Number */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label htmlFor="patient-phone" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="patient-phone"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                      />
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label htmlFor="appointment-date" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="appointment-date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label htmlFor="preferred-time" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Preferred Hours
                      </label>
                      <select
                        id="preferred-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
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
                      <label htmlFor="select-doctor" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Ayurvedic Consultant Expert
                      </label>
                      <select
                        id="select-doctor"
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
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
                      <label htmlFor="select-treatment" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Preferred Therapy/Treatment
                      </label>
                      <select
                        id="select-treatment"
                        value={selectedTreatmentId}
                        onChange={(e) => setSelectedTreatmentId(e.target.value)}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
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
                    <label htmlFor="symptoms-message" className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Describe Symptoms or Recovery Goals
                    </label>
                    <textarea
                      id="symptoms-message"
                      rows={4}
                      placeholder="e.g. chronic lower lumbar back pain since 6 months, severe sleeping troubles..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-4 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-mint-600 hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 text-white font-bold uppercase tracking-wider py-4 text-xs transition-colors shadow-lg shadow-mint-600/10 focus:outline-none disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
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
                      Thank you! Your clinical appointment inquiry is now saved into our <strong className="text-mint-600 dark:text-mint-400">Sanity Patient Inquiry Schema</strong>. You can view, verify, or change its state in real-time inside the **Sanity CMS Studio** panel.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 text-xs text-neutral-500 font-medium border border-neutral-200/50 dark:border-neutral-800">
                    Our administrative medical coordinator will call you shortly on your WhatsApp/Phone to confirm your diagnostic slot!
                  </div>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-mint-600 dark:bg-neutral-800 dark:hover:bg-mint-500 text-xs font-bold uppercase tracking-wider"
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
