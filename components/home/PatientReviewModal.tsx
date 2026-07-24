'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

interface PatientReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PatientReviewModal({ isOpen, onClose, onSuccess }: PatientReviewModalProps) {
  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [treatmentReceived, setTreatmentReceived] = useState('Panchakarma Detoxification');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !name || !text) return;

    setSubmitting(true);
    try {
      // Direct Next.js API Route fetch call (Writes to Sanity Dataset)
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId,
          name,
          location,
          treatmentReceived,
          rating,
          text,
        }),
      });

      if (res.ok) {
        setSubmitting(false);
        setSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        throw new Error('Failed to post review');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitting(false);
      alert('Failed to submit review. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setPatientId('');
    setName('');
    setLocation('');
    setText('');
    setRating(5);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl bg-mint-50 dark:bg-neutral-950 border border-mint-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 z-10 space-y-6"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center space-x-1.5 rounded-full bg-mint-100 dark:bg-mint-900/40 px-3 py-1 text-[11px] font-bold text-mint-800 dark:text-mint-300">
                    <Sparkles className="h-3.5 w-3.5 text-mint-600" />
                    <span>Patient Verification & Moderation</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                    Submit Patient Feedback
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Enter your Patient ID to verify your treatment session. Submitted reviews are moderated via Sanity Studio prior to going live.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Patient ID */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Patient ID <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PAT-2026-8912"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                    />
                  </div>

                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Full Name <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Colombo, Sri Lanka"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                    />
                  </div>

                  {/* Treatment Received */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Treatment Received
                    </label>
                    <select
                      value={treatmentReceived}
                      onChange={(e) => setTreatmentReceived(e.target.value)}
                      className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                    >
                      <option value="Panchakarma Detoxification">Panchakarma Detoxification</option>
                      <option value="Shirodhara Therapy">Shirodhara Mind Calming</option>
                      <option value="Kati Vasti Spine Care">Kati Vasti & Spine Care</option>
                      <option value="Abhyanga Oil Therapy">Abhyanga Herbal Massage</option>
                      <option value="General Wellness Consult">General Wellness Consult</option>
                    </select>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center space-x-1 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            (hoverRating || rating) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-neutral-300 dark:text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Detailed Review <span className="text-emerald-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your treatment results and clinical experience..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-mint-600 hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 text-white font-bold uppercase tracking-wider py-3.5 text-xs transition-colors shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Transmitting Review...' : 'Submit Review For Approval'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <UserCheck className="h-8 w-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                    Review Submitted Successfully!
                  </h3>
                  <div className="p-4 rounded-xl bg-mint-100/50 dark:bg-mint-950/30 border border-mint-200/50 dark:border-mint-900/30 text-xs text-neutral-700 dark:text-neutral-300 space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white">Patient ID:</span>
                      <span className="font-mono text-mint-700 dark:text-mint-400">{patientId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white">Status:</span>
                      <span className="inline-flex items-center text-amber-600 dark:text-amber-400 font-bold">
                        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                        Pending Sanity Studio Approval
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed pt-2">
                    Thank you! Once our medical administration approves your submission inside Sanity Studio, your review will automatically appear on the live website.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-mint-600 dark:bg-neutral-800 dark:hover:bg-mint-500 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}