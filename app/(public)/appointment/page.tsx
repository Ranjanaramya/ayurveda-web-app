'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, ShieldAlert, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { getDoctorsList, getDoctorConsultationsList } from '@/services/doctorService';
import { getTreatmentsList } from '@/services/treatmentService';
import { createPatientInquiry } from '@/services/inquiryService';
import { CLINIC_INFO } from '@/lib/constants';
import { useCms } from '@/lib/cmsContext';
import { Doctor } from '@/types/doctor';
import { Treatment } from '@/types/treatment';
import { client } from '@/sanity/lib/client';

const ALL_TIME_SLOTS = [
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
];

function AppointmentForm() {
  const searchParams = useSearchParams();
  const doctorIdParam = searchParams.get('doctorId') || '';
  const treatmentIdParam = searchParams.get('treatmentId') || '';

  const { dataVersion } = useCms();
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [treatmentsList, setTreatmentsList] = useState<Treatment[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Form states
  const todayObj = new Date();
  const todayMinDate = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;

  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('08:00 AM - 09:00 AM');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync doctors, treatments & consultation configs from Sanity CMS
  useEffect(() => {
    async function loadData() {
      try {
        const [docs, treats, consultations] = await Promise.all([
          getDoctorsList(),
          getTreatmentsList(),
          getDoctorConsultationsList(),
        ]);

        const mergedDoctors: Doctor[] = [...(docs || [])];
        const mergedTreatments: Treatment[] = [...(treats || [])];

        if (consultations && consultations.length > 0) {
          consultations.forEach((c: any, cIdx: number) => {
            if (c.status === 'unavailable' || c.status === 'on_leave') return;

            const docObj = c.doctor;
            const docName = docObj?.name || c.customDoctorName || c.title;

            if (docName) {
              const existingDocIndex = mergedDoctors.findIndex(
                (d) => (docObj?.id && d.id === docObj.id) || d.name.toLowerCase().trim() === docName.toLowerCase().trim()
              );

              const timeSlots = [
                ...(c.availableTimeSlots || []),
                ...(c.customTimeSlots || []),
              ];

              const referencedTreatments: Treatment[] = c.treatments || [];
              const customTreatNames: string[] = c.customTreatments || [];
              const refTreatIds: string[] = referencedTreatments.map((t) => t.id || (t as any)._id).filter(Boolean);

              if (existingDocIndex >= 0) {
                if (timeSlots.length > 0) {
                  mergedDoctors[existingDocIndex].availableTimeSlots = timeSlots;
                }
                if (c.activeDays && c.activeDays.length > 0) {
                  mergedDoctors[existingDocIndex].availability.days = c.activeDays;
                }
                if (refTreatIds.length > 0) {
                  mergedDoctors[existingDocIndex].treatmentIds = Array.from(
                    new Set([...(mergedDoctors[existingDocIndex].treatmentIds || []), ...refTreatIds])
                  );
                }
              } else {
                const newDoc: Doctor = {
                  id: docObj?.id || c.id || `consult-doc-${cIdx}`,
                  name: docName,
                  role: docObj?.role || '',
                  specialization: docObj?.specialization || customTreatNames || ['Ayurvedic Consultation'],
                  bio: docObj?.bio || 'Certified Ayurvedic Practitioner available for consultations.',
                  image: docObj?.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
                  certifications: docObj?.certifications || ['BAMS', 'MD (Ayurveda)'],
                  experience: docObj?.experience || '10+ Years',
                  availability: {
                    days: c.activeDays && c.activeDays.length > 0 ? c.activeDays : (docObj?.availability?.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
                    timeSlot: timeSlots[0] || docObj?.availability?.timeSlot || '08:00 AM - 09:00 AM',
                  },
                  availableTimeSlots: timeSlots.length > 0 ? timeSlots : ALL_TIME_SLOTS,
                  contactEmail: docObj?.contactEmail || '',
                  treatmentIds: refTreatIds,
                };
                mergedDoctors.push(newDoc);
              }

              // Process referenced treatments
              referencedTreatments.forEach((tr) => {
                if (tr && !mergedTreatments.some((t) => t.id === tr.id || t.name.toLowerCase().trim() === tr.name.toLowerCase().trim())) {
                  mergedTreatments.push(tr);
                }
              });

              // Process custom treatments
              customTreatNames.forEach((tName: string, tIdx: number) => {
                if (tName && !mergedTreatments.some((t) => t.name.toLowerCase().trim() === tName.toLowerCase().trim())) {
                  mergedTreatments.push({
                    id: `consult-treat-${cIdx}-${tIdx}`,
                    name: tName,
                    category: 'Therapeutic',
                    description: `Specialized ${tName} protocol configured under ${docName}'s consultation schedule.`,
                    duration: '60 mins',
                    costEstimate: 'LKR 2,500',
                    benefits: ['Promotes deep bodily healing', 'Restores natural Ayurvedic vitality'],
                    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
                    herbsUsed: ['Triphala', 'Ashwagandha'],
                  });
                }
              });
            }
          });
        }

        // Process doctor specializations into treatment list
        mergedDoctors.forEach((doc: Doctor) => {
          if (doc.specialization && doc.specialization.length > 0) {
            doc.specialization.forEach((specName: string, sIdx: number) => {
              if (specName && !mergedTreatments.some((t) => t.name.toLowerCase().trim() === specName.toLowerCase().trim())) {
                mergedTreatments.push({
                  id: `spec-treat-${doc.id}-${sIdx}`,
                  name: specName,
                  category: 'Clinical Focus',
                  description: `Specialized ${specName} consultation and therapeutic care provided by ${doc.name}.`,
                  duration: '45-60 mins',
                  costEstimate: 'LKR 2,500',
                  benefits: ['Clinical Ayurvedic diagnosis', 'Personalized treatment regimen'],
                  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
                  herbsUsed: ['Organic Herbal Formulations'],
                });
              }
            });
          }
        });

        setDoctorsList(mergedDoctors);
        setTreatmentsList(mergedTreatments);
      } catch (err) {
        console.error('Failed to load doctors/treatments/consultations list:', err);
      }
    }
    loadData();
  }, [dataVersion]);

  // Sync params on mount/change
  useEffect(() => {
    if (doctorIdParam) setSelectedDoctorId(doctorIdParam);
  }, [doctorIdParam]);

  useEffect(() => {
    if (treatmentIdParam) setSelectedTreatmentId(treatmentIdParam);
  }, [treatmentIdParam]);

  // Direct GROQ Availability Fetch for Selected Doctor
  useEffect(() => {
    if (!selectedDoctorId) {
      setAvailableSlots([]);
      setAvailableDays([]);
      return;
    }

    const fetchDoctorAvailability = async () => {
      setLoadingSlots(true);
      try {
        const query = `*[_type == "doctor" && (_id == $doctorId || id == $doctorId)][0]{
          "days": availability.days,
          "timeSlots": availability.timeSlots
        }`;

        const data = await client.fetch(query, { doctorId: selectedDoctorId });

        if (data?.timeSlots && data.timeSlots.length > 0) {
          setAvailableSlots(data.timeSlots);
          if (!data.timeSlots.includes(preferredTime)) {
            setPreferredTime(data.timeSlots[0]);
          }
        } else {
          setAvailableSlots([]);
        }

        if (data?.days && data.days.length > 0) {
          setAvailableDays(data.days);
        } else {
          setAvailableDays([]);
        }
      } catch (err) {
        console.error('Failed to fetch doctor availability:', err);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchDoctorAvailability();
  }, [selectedDoctorId]);

  // Dynamic Cross-Filtering Helpers
  const selectedDoctorObj = doctorsList.find((d) => d.id === selectedDoctorId);

  // 1. Available Doctors (Filtered by selectedTreatmentId)
  const availableDoctors = doctorsList.filter((doc) => {
    if (!selectedTreatmentId) return true;
    if (doc.treatmentIds && doc.treatmentIds.includes(selectedTreatmentId)) {
      return true;
    }
    const selectedTreat = treatmentsList.find((t) => t.id === selectedTreatmentId);
    if (!selectedTreat) return true;
    return doc.specialization.some((s) => {
      const sLower = s.toLowerCase().trim();
      const nameLower = selectedTreat.name.toLowerCase().trim();
      const catLower = selectedTreat.category.toLowerCase().trim();
      return nameLower.includes(sLower) || sLower.includes(nameLower) || catLower.includes(sLower) || sLower.includes(catLower);
    });
  });

  // 2. Available Treatments (Filtered by selectedDoctorId)
  const availableTreatments = treatmentsList.filter((treat) => {
    if (!selectedDoctorId || !selectedDoctorObj) return true;
    if (selectedDoctorObj.treatmentIds && selectedDoctorObj.treatmentIds.includes(treat.id)) {
      return true;
    }
    return selectedDoctorObj.specialization.some((s) => {
      const sLower = s.toLowerCase().trim();
      const nameLower = treat.name.toLowerCase().trim();
      const catLower = treat.category.toLowerCase().trim();
      return nameLower.includes(sLower) || sLower.includes(nameLower) || catLower.includes(sLower) || sLower.includes(catLower);
    });
  });

  // 3. Available Time Slots (Doctor dynamic slots -> Doctor profile slots -> ALL_TIME_SLOTS)
  const activeTimeSlots =
    availableSlots.length > 0
      ? availableSlots
      : selectedDoctorObj && selectedDoctorObj.availableTimeSlots && selectedDoctorObj.availableTimeSlots.length > 0
      ? selectedDoctorObj.availableTimeSlots
      : ALL_TIME_SLOTS;

  // Handle Doctor Selection change
  const handleDoctorChange = (docId: string) => {
    setSelectedDoctorId(docId);
    const newDoc = doctorsList.find((d) => d.id === docId);
    if (newDoc) {
      if (selectedTreatmentId) {
        const isTreatValid =
          newDoc.treatmentIds && newDoc.treatmentIds.length > 0
            ? newDoc.treatmentIds.includes(selectedTreatmentId)
            : true;
        if (!isTreatValid) {
          setSelectedTreatmentId('');
        }
      }
      if (newDoc.availableTimeSlots && newDoc.availableTimeSlots.length > 0) {
        if (!newDoc.availableTimeSlots.includes(preferredTime)) {
          setPreferredTime(newDoc.availableTimeSlots[0]);
        }
      }
    }
  };

  // Handle Treatment Selection change
  const handleTreatmentChange = (treatId: string) => {
    setSelectedTreatmentId(treatId);
    if (treatId && selectedDoctorId) {
      const currentDoc = doctorsList.find((d) => d.id === selectedDoctorId);
      if (currentDoc && currentDoc.treatmentIds && currentDoc.treatmentIds.length > 0) {
        if (!currentDoc.treatmentIds.includes(treatId)) {
          setSelectedDoctorId(''); // Reset to Any Available Specialist if not offering this treatment
        }
      }
    }
  };

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
    } else if (preferredDate < todayMinDate) {
      newErrors.preferredDate = 'Preferred date cannot be in the past. Please select today or a future date.';
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
      const selectedDocObj = doctorsList.find((d) => d.id === selectedDoctorId);
      const selectedTreatObj = treatmentsList.find((t) => t.id === selectedTreatmentId);

      const doctorName = selectedDocObj
        ? `${selectedDocObj.name}${selectedDocObj.role ? ' (' + selectedDocObj.role + ')' : ''}`
        : 'Any Available Specialist';
      const treatmentName = selectedTreatObj ? selectedTreatObj.name : 'General Consultation';

      await createPatientInquiry({
        patientName: patientName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        preferredDate,
        preferredTime,
        doctorId: selectedDoctorId || 'any',
        treatmentId: selectedTreatmentId || 'any',
        doctorName,
        treatmentName,
        message: message.trim(),
      });

      setSubmitting(false);
      setShowSuccess(true);

      // Reset fields
      setPatientName('');
      setEmail('');
      setPhone('');
      setPreferredDate('');
      setPreferredTime(activeTimeSlots[0] || '08:00 AM - 09:00 AM');
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
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] sm:text-xs font-bold text-[#1B4D3E] dark:text-emerald-400 uppercase tracking-[0.2em] block">
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

      {/* Main Content Layout - Expanded Form Width on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* Left Column: Emergency Assistance + Hospital Info (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
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
          <div className="rounded-3xl bg-[#FDFBF7] dark:bg-neutral-900/60 border border-[#F0EBE1] dark:border-neutral-800 p-6 sm:p-8 space-y-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#1B4D3E] dark:text-emerald-300">
              AyurVeda Care Hospital
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our campus is located in a quiet, pollution-free sector of Sri Lanka, featuring organic herbal
              gardens, outdoor meditation decks, and pristine climate-controlled clinical suites.
            </p>

            <div className="space-y-6">
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

        {/* Right Column: Appointment Booking Form (8 cols for expanded desktop width) */}
        <div id="appointment-form-section" className="lg:col-span-7 xl:col-span-8">
          <div className="rounded-3xl bg-[#DDEEE3] dark:bg-neutral-900/90 border border-[#C5DFC8] dark:border-neutral-800 p-6 sm:p-10 md:p-12 shadow-sm space-y-6 sm:space-y-8">
            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.form
                  key="appointment-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6 sm:space-y-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center space-x-3 pb-2 border-b border-[#C5DFC8]/60 dark:border-neutral-800">
                    <Calendar className="h-6.5 w-6.5 text-[#1B4D3E] dark:text-emerald-400 shrink-0" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B4D3E] dark:text-emerald-300">
                      Enter Consultation Particulars
                    </h3>
                  </div>

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="patient-name"
                        className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
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
                        className={`w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border ${
                          errors.patientName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                        } px-4.5 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm min-h-[52px] sm:min-h-[56px] transition-all`}
                      />
                      {errors.patientName && <p className="text-xs text-red-500 font-semibold mt-1">{errors.patientName}</p>}
                    </div>

                    {/* Email address */}
                    <div className="space-y-2">
                      <label
                        htmlFor="patient-email"
                        className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
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
                        className={`w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                        } px-4.5 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm min-h-[52px] sm:min-h-[56px] transition-all`}
                      />
                      <datalist id="appt-email-suggestions">
                        {email.includes('@') ? null : [
                          '@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com', '@icloud.com', '@rediffmail.com'
                        ].map((domain) => (
                          <option key={domain} value={`${email.split('@')[0]}${domain}`} />
                        ))}
                      </datalist>
                      {errors.email && <p className="text-xs text-red-500 font-semibold mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Phone, Preferred Date, Preferred Hours (Spacious Layout) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                    {/* Phone Number */}
                    <div className="space-y-2 md:col-span-4">
                      <label
                        htmlFor="patient-phone"
                        className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PHONE / WHATSAPP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="patient-phone"
                        placeholder="e.g. +94 77 123 4567"
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
                        className={`w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border ${
                          errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                        } px-4 sm:px-4.5 py-3.5 sm:py-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 shadow-sm min-h-[52px] sm:min-h-[56px] transition-all`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 font-semibold mt-1">{errors.phone}</p>}
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-2 md:col-span-4">
                      <label
                        htmlFor="appointment-date"
                        className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PREFERRED DATE <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="appointment-date"
                        min={todayMinDate}
                        value={preferredDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPreferredDate(val);
                          if (val && val < todayMinDate) {
                            setErrors((prev) => ({
                              ...prev,
                              preferredDate: 'Preferred date cannot be in the past. Please select today or a future date.',
                            }));
                          } else {
                            if (errors.preferredDate) setErrors((prev) => ({ ...prev, preferredDate: '' }));
                          }
                        }}
                        className={`w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border ${
                          errors.preferredDate ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                        } px-3.5 sm:px-4 py-3.5 sm:py-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 shadow-sm min-h-[52px] sm:min-h-[56px] transition-all`}
                      />
                      {errors.preferredDate && <p className="text-xs text-red-500 font-semibold mt-1">{errors.preferredDate}</p>}
                    </div>

                    {/* Preferred Hours */}
                    <div className="space-y-2 md:col-span-4">
                      <label
                        htmlFor="preferred-time"
                        className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PREFERRED HOURS
                      </label>
                      {loadingSlots ? (
                        <div className="h-[52px] sm:h-[56px] flex items-center px-3.5 bg-white dark:bg-neutral-950 border border-[#C8DCD0] dark:border-neutral-800 rounded-xl sm:rounded-2xl text-xs text-neutral-400 animate-pulse">
                          Fetching doctor slots...
                        </div>
                      ) : (
                        <select
                          id="preferred-time"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border border-[#C8DCD0] dark:border-neutral-800 px-3 sm:px-3.5 py-3.5 sm:py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-sm min-h-[52px] sm:min-h-[56px] transition-all"
                        >
                          {activeTimeSlots.map((slot, idx) => (
                            <option key={idx} value={slot} className="dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                              {slot}
                            </option>
                          ))}
                        </select>
                      )}
                      {selectedTreatmentId && treatmentsList.find((t) => t.id === selectedTreatmentId)?.duration && (
                        <p className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 mt-1 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            Therapy Duration: {treatmentsList.find((t) => t.id === selectedTreatmentId)?.duration}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Ayurvedic Consultant Expert & Preferred Therapy (Cross-filtered) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {/* Preferred Doctor selection */}
                    <div className="space-y-2">
                      <label
                        htmlFor="select-doctor"
                        className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        AYURVEDIC CONSULTANT EXPERT
                      </label>
                      <select
                        id="select-doctor"
                        value={selectedDoctorId}
                        onChange={(e) => handleDoctorChange(e.target.value)}
                        className="w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border border-[#C8DCD0] dark:border-neutral-800 px-3.5 sm:px-4 py-3.5 sm:py-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-sm min-h-[52px] sm:min-h-[56px] transition-all"
                      >
                        <option value="" className="dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Any Available Specialist</option>
                        {availableDoctors.map((doc) => (
                          <option key={doc.id} value={doc.id} className="dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                            {doc.name} {doc.role ? `— ${doc.role}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Treatment selection */}
                    <div className="space-y-2">
                      <label
                        htmlFor="select-treatment"
                        className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                      >
                        PREFERRED THERAPY / TREATMENT
                      </label>
                      <select
                        id="select-treatment"
                        value={selectedTreatmentId}
                        onChange={(e) => handleTreatmentChange(e.target.value)}
                        className="w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border border-[#C8DCD0] dark:border-neutral-800 px-3.5 sm:px-4 py-3.5 sm:py-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-sm min-h-[52px] sm:min-h-[56px] transition-all"
                      >
                        <option value="" className="dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">General Health Check-up</option>
                        {availableTreatments.map((tr) => (
                          <option key={tr.id} value={tr.id} className="dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                            {tr.name} ({tr.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Doctor Working Days Badge */}
                  {selectedDoctorId && (availableDays.length > 0 || selectedDoctorObj?.availability?.days) && (
                    <div className="p-3.5 bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>
                        <strong>Doctor Working Days:</strong> {(availableDays.length > 0 ? availableDays : selectedDoctorObj?.availability?.days)?.join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Dynamic Doctor Information Card */}
                  <AnimatePresence>
                    {selectedDoctorId && selectedDoctorObj && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-neutral-900/60 border border-emerald-200/80 dark:border-emerald-800/40 space-y-3.5 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-neutral-800 pb-3">
                          <div>
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block">
                              Consultant Specialist Details
                            </span>
                            <h4 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                              {selectedDoctorObj.name}
                            </h4>
                          </div>
                          {selectedDoctorObj.role && (
                            <span className="bg-emerald-700 text-white dark:bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                              {selectedDoctorObj.role}
                            </span>
                          )}
                        </div>

                        {selectedDoctorObj.bio && (
                          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {selectedDoctorObj.bio}
                          </p>
                        )}

                        {/* Doctor Info Grid: Experience, Working Days */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white/80 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-700/40">
                            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span><strong>Experience:</strong> {selectedDoctorObj.experience || '10+ Years'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white/80 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-700/40">
                            <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span><strong>Working Days:</strong> {(availableDays.length > 0 ? availableDays : selectedDoctorObj.availability?.days)?.join(', ') || 'Mon - Sat'}</span>
                          </div>
                        </div>

                        {selectedDoctorObj.specialization && selectedDoctorObj.specialization.length > 0 && (
                          <div className="pt-2">
                            <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                              Clinical Specializations:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {selectedDoctorObj.specialization.map((spec, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center text-xs font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-300/60 dark:border-emerald-700/40"
                                >
                                  <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dynamic Treatment Details Card */}
                  <AnimatePresence>
                    {selectedTreatmentId && treatmentsList.find((t) => t.id === selectedTreatmentId) && (() => {
                      const selectedTreatmentObj = treatmentsList.find((t) => t.id === selectedTreatmentId)!;
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 dark:bg-neutral-900/60 border border-emerald-200/80 dark:border-emerald-800/40 space-y-3.5 shadow-sm"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-neutral-800 pb-3">
                            <div>
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block">
                                Selected Therapy Regimen Details
                              </span>
                              <h4 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                                {selectedTreatmentObj.name}
                              </h4>
                            </div>
                            <span className="bg-emerald-700 text-white dark:bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                              {selectedTreatmentObj.category}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {selectedTreatmentObj.description}
                          </p>

                          {/* Details Grid: Duration, Cost Estimate, Working Days */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white/70 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-700/40">
                              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span><strong>Duration:</strong> {selectedTreatmentObj.duration || '60 mins'}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white/70 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-700/40">
                              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span><strong>Fee Estimate:</strong> {selectedTreatmentObj.costEstimate || 'LKR 2,500'}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white/70 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-700/40">
                              <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span><strong>Working Days:</strong> {(availableDays.length > 0 ? availableDays : selectedDoctorObj?.availability?.days)?.join(', ') || 'Mon - Sat'}</span>
                            </div>
                          </div>

                          {selectedTreatmentObj.benefits && selectedTreatmentObj.benefits.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                                Key Clinical Benefits:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {selectedTreatmentObj.benefits.map((benefit, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/30"
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>

                  {/* Message/Symptoms notes */}
                  <div className="space-y-2">
                    <label
                      htmlFor="symptoms-message"
                      className="block text-xs sm:text-[13px] font-bold text-[#2C5E4B] dark:text-emerald-300 uppercase tracking-wider"
                    >
                      DESCRIBE SYMPTOMS OR RECOVERY GOALS
                    </label>
                    <textarea
                      id="symptoms-message"
                      rows={5}
                      placeholder="e.g. chronic lower lumbar back pain since 6 months, severe sleeping troubles..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      className={`w-full rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-950 border ${
                        errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C8DCD0] dark:border-neutral-800'
                      } px-4.5 sm:px-5 py-4 sm:py-4.5 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 resize-none shadow-sm min-h-[140px] sm:min-h-[160px] transition-all`}
                    />
                    {errors.message && <p className="text-xs text-red-500 font-semibold mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-[#134E39] hover:bg-[#0E3D2C] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold uppercase tracking-wider py-4.5 sm:py-5 px-6 text-sm sm:text-base transition-all shadow-md active:scale-[0.99] cursor-pointer min-h-[54px] sm:min-h-[58px] disabled:opacity-50 mt-2"
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
                      'REQUEST CERTIFIED APPOINTMENT'
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
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                      Inquiry Logged Successfully!
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Thank you! Your clinical appointment inquiry is now saved into our{' '}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        Patient Inquiry System
                      </strong>
                      . Our team will verify your slot shortly.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 text-xs sm:text-sm text-neutral-500 font-medium border border-neutral-200/50 dark:border-neutral-800">
                    Our administrative medical coordinator will call you shortly on your WhatsApp/Phone to
                    confirm your diagnostic slot!
                  </div>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-6 py-3 rounded-xl bg-neutral-900 text-white hover:bg-emerald-600 dark:bg-neutral-800 dark:hover:bg-emerald-500 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer"
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
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12 animate-pulse">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 mx-auto rounded-full" />
            <div className="h-10 w-80 bg-neutral-200 dark:bg-neutral-800 mx-auto rounded-xl" />
            <div className="h-4 w-96 bg-neutral-200 dark:bg-neutral-800 mx-auto rounded-md" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 h-96 bg-neutral-200 dark:bg-neutral-800 rounded-3xl" />
            <div className="lg:col-span-7 h-[600px] bg-neutral-200 dark:bg-neutral-800 rounded-3xl" />
          </div>
        </div>
      }
    >
      <AppointmentForm />
    </Suspense>
  );
}