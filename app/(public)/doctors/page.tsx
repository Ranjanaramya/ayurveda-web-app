'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, Award, Mail, UserCheck } from 'lucide-react';
import { useCms } from '@/lib/cmsContext';
import { Doctor } from '@/types/doctor';

export default function DoctorsPage() {
  const router = useRouter();
  const { dataVersion } = useCms();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDocIds, setExpandedDocIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (docId: string) => {
    setExpandedDocIds((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const handleConsult = (docId: string) => {
    router.push(`/appointment?doctorId=${docId}`);
  };

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const { getDoctorsList } = await import('@/services/doctorService');
        const list = await getDoctorsList();
        if (list && list.length > 0) {
          setDoctors(list);
        }
      } catch (e) {
        console.error('Failed to load doctors from Sanity:', e);
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, [dataVersion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
          Meet Our Clinical Council
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Certified Ayurveda Physicians &amp; Specialists
        </h1>
        <p className="text-neutral-600 dark:text-neutral-350 text-sm max-w-2xl mx-auto leading-relaxed">
          Our senior panel consists of highly trained BAMS and MD scholars from traditional Kerala lineage
          colleges, offering patient-centric healing and deep clinical empathy.
        </p>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2.5 w-2.5 rounded-full bg-mint-500"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Doctor Profiles Grid */}
      {!loading && doctors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => {
            const isExpanded = !!expandedDocIds[doctor.id];
            return (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.12, ease: 'easeOut' }}
                className="flex flex-col justify-between rounded-3xl overflow-hidden bg-mint-100 dark:bg-neutral-955 border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Top Image — continuous zoom pulse + extra zoom on hover */}
                <div>
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <motion.img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                      animate={{ scale: [1, 1.07, 1] }}
                      whileHover={{ scale: 1.12, opacity: 0.9 }}
                      transition={{
                        scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    />
                    {/* Overlay brightens slightly on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent"
                      whileHover={{ opacity: 0.6 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                    <span className="absolute bottom-4 left-4 bg-mint-100/95 text-mint-800 dark:bg-mint-950/95 dark:text-mint-305 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      Experience: {doctor.experience}
                    </span>
                  </div>

                  {/* Profile Details */}
                  <div className="p-6 sm:p-8 pb-0 space-y-4">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                        {doctor.name}
                      </h2>
                      <p className="text-xs font-bold text-mint-600 dark:text-mint-405 uppercase tracking-wider mt-1">
                        {doctor.role}
                      </p>
                    </div>

                    {/* Specialization Badges */}
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        Expertise:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {doctor.specialization.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-[10px] font-semibold text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded-md"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {isExpanded ? (
                      <>
                        <p className="text-xs sm:text-sm text-neutral-650 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-900 pt-3">
                          {doctor.bio}
                        </p>

                        {/* Board Certifications */}
                        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                          <span className="flex items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            <Award className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                            Board Certifications:
                          </span>
                          <ul className="space-y-1.5">
                            {doctor.certifications.map((cert, cIdx) => (
                              <li
                                key={cIdx}
                                className="text-[11px] text-neutral-650 dark:text-neutral-400 flex items-start"
                              >
                                <span className="h-1 w-1 rounded-full bg-mint-500 mr-2 mt-1.5 shrink-0" />
                                <span>{cert}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-1">
                          <button
                            onClick={() => toggleExpand(doctor.id)}
                            className="inline-flex items-center text-xs font-bold text-mint-600 dark:text-mint-405 hover:underline cursor-pointer"
                          >
                            Back
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="pt-1">
                        <button
                          onClick={() => toggleExpand(doctor.id)}
                          className="inline-flex items-center text-xs font-bold text-mint-600 dark:text-mint-405 hover:underline cursor-pointer"
                        >
                          View More
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Clinic Availability Schedule */}
                  <div className="px-6 sm:px-8 pt-3 pb-0">
                    <div className="p-4 rounded-2xl bg-mint-50/50 dark:bg-mint-950/20 border border-mint-100/30 dark:border-mint-900/20">
                      <span className="flex items-center text-xs font-bold text-neutral-850 dark:text-neutral-800 mb-2">
                        <Calendar className="h-4 w-4 mr-1.5 text-mint-600 dark:text-mint-600" />
                        Clinic Availability Schedule
                      </span>
                      <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-700 font-medium">
                        <div className="flex justify-between">
                          <span>Days:</span>
                          <span className="text-neutral-900 dark:text-neutral-900 font-semibold">
                            {doctor.availability.days.join(', ')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timing:</span>
                          <span className="text-neutral-900 dark:text-neutral-900 font-semibold">
                            {doctor.availability.timeSlot}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Buttons */}
                <div className="p-6 sm:p-8 pt-4">
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${doctor.contactEmail}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-350 dark:hover:bg-neutral-800 shrink-0 border border-transparent hover:border-neutral-200/50"
                      title="Send Direct Inquiry"
                    >
                      <Mail className="h-4.5 w-4.5" />
                    </a>
                    <button
                      onClick={() => handleConsult(doctor.id)}
                      className="flex-1 inline-flex items-center justify-center rounded-xl bg-mint-600 hover:bg-mint-750 dark:bg-mint-500 dark:hover:bg-mint-400 text-white text-xs font-bold uppercase tracking-wider py-3 transition-colors shadow-sm cursor-pointer"
                    >
                      <UserCheck className="h-4 w-4 mr-1.5" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Empty state — no doctors in Sanity yet */}
      {!loading && doctors.length === 0 && (
        <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
          <p className="text-sm">No doctors found. Please add doctors in Sanity Studio.</p>
        </div>
      )}
    </motion.div>
  );
}
