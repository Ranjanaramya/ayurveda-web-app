'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle,
  Sprout,
  Heart,
  Activity,
  Award,
  ChevronDown,
  Star,
  ArrowRight,
  Sparkles,
  MessageSquarePlus,
  UserCheck,
  Loader2,
  Quote,
  RotateCw,
} from 'lucide-react';
import { getFAQs } from '../../lib/mockSanity';
import { fetchApprovedReviews } from '../../services/reviewService';
import { Testimonial } from '../../types/common';
import { useCms } from '../../lib/cmsContext';
import { PatientReviewModal } from '../../components/home/PatientReviewModal';

// Sanity imports for Gallery dynamic loading
import { getTreatments } from '../../services/treatmentService';
import { getGalleryItems } from '../../services/galleryService';
import { urlFor } from '@/sanity/lib/sanity';

export default function HomePage() {
  const { dataVersion } = useCms();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<
    'All' | 'Hospital' | 'Treatments' | 'Herbal Garden' | 'Yoga & Meditation'
  >('All');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [autoFlipped, setAutoFlipped] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAutoFlip = (index: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (!autoFlipped[index]) {
        setAutoFlipped((prev) => ({ ...prev, [index]: true }));
        setTimeout(() => {
          setFlippedCards((prev) => ({ ...prev, [index]: true }));
        }, 500);
      }
    }
  };

  const INITIAL_TESTIMONIALS_LIMIT = 3;
  const [showAllTestimonials, setShowAllTestimonials] = useState<boolean>(false);

 
  const visibleTestimonials = showAllTestimonials
    ? testimonials
    : testimonials.slice(0, INITIAL_TESTIMONIALS_LIMIT);

  // Dynamic Sanity States for Gallery & Treatments
  const [sanityGalleryItems, setSanityGalleryItems] = useState<any[]>([]);
  const [sanityTreatments, setSanityTreatments] = useState<any[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);

  
  const INITIAL_GALLERY_LIMIT = 8;
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_GALLERY_LIMIT);

  const faqs = getFAQs();

 
  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);
  const visibleReviews = showAllReviews ? testimonials : testimonials.slice(0, 3);

  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = [
    "https://img.magnific.com/premium-photo/table-with-bowls-ayurvedic-spices_6751-66.jpg",
    "https://img.magnific.com/premium-photo/table-with-bowl-herbs-flowers-it_1281193-695.jpg?semt=ais_hybrid&w=740&q=80",
  ];

  const getSlotClasses = (slot: number) => {
    const slots = [
      'col-start-1 row-start-1',
      'col-start-2 row-start-1',
      'col-start-2 row-start-2',
    ];

    return slots[slot] ?? slots[0];
  };

  const loadReviews = async () => {
    try {
      const data = await fetchApprovedReviews();
      setTestimonials(data || []);
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [dataVersion]);

  // Fetch both Gallery Items and Treatments from Sanity
  useEffect(() => {
    async function loadAllGalleryData() {
      try {
        setIsGalleryLoading(true);
        const [treatmentsData, galleryData] = await Promise.all([
          getTreatments(),
          getGalleryItems(),
        ]);
        setSanityTreatments(Array.isArray(treatmentsData) ? treatmentsData : []);
        setSanityGalleryItems(Array.isArray(galleryData) ? galleryData : []);
      } catch (err) {
        console.error('Failed to load gallery data:', err);
      } finally {
        setIsGalleryLoading(false);
      }
    }

    loadAllGalleryData();
  }, [dataVersion]);

  // Format Sanity treatments to match Gallery structure safely
  const formattedTreatments = sanityTreatments.map((t) => ({
    id: t._id || Math.random().toString(),
    title: t.name || t.title || 'Treatment',
    category: 'Treatments',
    description: t.description || '',
    image: t.image,
  }));

  // Format Sanity Gallery items safely
  const formattedGalleryItems = sanityGalleryItems.map((g) => ({
    id: g._id || Math.random().toString(),
    title: g.title || 'Gallery Item',
    category: g.category || 'Hospital',
    description: g.description || '',
    image: g.image,
  }));

  // Merge Sanity Gallery items with Sanity Treatments
  const combinedGallery = [...formattedGalleryItems, ...formattedTreatments];

  // Filter Logic - Case-insensitive & Whitespace handling
  const filteredGallery = combinedGallery.filter((item) => {
    if (galleryFilter === 'All') return true;
    if (!item.category) return false;

    const itemCat = String(item.category).trim().toLowerCase();
    const filterCat = String(galleryFilter).trim().toLowerCase();

    return itemCat === filterCat;
  });

  // Reset visible limit on filter change
  useEffect(() => {
    setVisibleCount(INITIAL_GALLERY_LIMIT);
  }, [galleryFilter]);

  // Safe image URL resolver
  const getImageSrc = (img: any) => {
    if (!img) return '/placeholder.jpg';
    if (typeof img === 'string') return img;
    try {
      return urlFor(img)?.url() || '/placeholder.jpg';
    } catch {
      return '/placeholder.jpg';
    }
  };

  const specializations = [
    {
      icon: <Activity className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Spine & Joint Rehabilitation',
      desc: 'Non-invasive therapies using Kati Vasti, Kizhi, and traditional Marma techniques to treat sciatica, degenerative disks, and arthritic conditions.',
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Authentic Panchakarma Detox',
      desc: 'Complete 5-fold systemic cleansing customized to restore optimal metabolic rate (Agni) and eliminate cellular toxins (Ama).',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <Sprout className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Stress & Burnout Management',
      desc: 'Nourishing Shirodhara and herbal Abhyanga treatments aimed at calming the central nervous system and restoring emotional stability.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <Heart className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Chronic Lifestyle Care',
      desc: 'Comprehensive dietary planning and proprietary herbal protocols to successfully manage diabetes, obesity, and gastrointestinal disorders.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-24 pb-20 pt-16">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative pt-20 pb-24 md:pt-32 md:pb-28 overflow-hidden bg-neutral-950 text-white"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src="https://img.magnific.com/premium-photo/table-with-bowls-ayurvedic-spices_6751-66.jpg"
            alt="Sri Lanka Rainforest Ayurveda Wellness Retreat"
            decoding="async"
            loading="eager"
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/60 to-neutral-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/40" />
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-mint-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-mint-900/80 border border-mint-500/30 px-3.5 py-1.5 text-xs font-semibold text-mint-300 backdrop-blur-md shadow-md">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="inline-flex"
                >
                  <Sparkles className="h-3.5 w-3.5 text-mint-400" />
                </motion.span>
                <span>Traditional Srilankan Ayurvedic Medicine</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Restore Your Natural <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-300 via-mint-400 to-emerald-300">
                  Harmony & Vitality
                </span>
              </h1>
              <p className="text-lg text-neutral-250 leading-relaxed max-w-lg">
                Experience authentic, NABH-certified healing protocols curated by legendary physicians.
                Customized therapies, organic herbal formulations, and calming retreat spaces designed to
                align your mind, body, and spirit.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center rounded-xl bg-mint-500 px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-xl hover:bg-mint-400 transition-all hover:translate-y-[-2px]"
                >
                  Book Instant Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/treatments"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-700/80 bg-neutral-900/60 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-neutral-200 shadow-sm hover:bg-neutral-800 transition-all"
                >
                  Explore Services
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-800/80">
                <div>
                  <span className="block font-serif text-3xl font-bold text-mint-400">25,000+</span>
                  <span className="text-xs text-neutral-400">Patients Treated</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-mint-400">22+ Years</span>
                  <span className="text-xs text-neutral-400">Clinical Heritage</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-mint-400">100%</span>
                  <span className="text-xs text-neutral-400">Organic Herbal Sourcing</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-800 bg-neutral-900">
                <img
                  src="https://img.magnific.com/premium-photo/table-with-bowl-herbs-flowers-it_1281193-695.jpg?semt=ais_hybrid&w=500&q=70"
                  alt="Traditional Ayurvedic Herbal Oil Therapy"
                  loading="lazy"
                  decoding="async"
                  width={440}
                  height={550}
                  className="w-110 h-150 mx-auto object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />


                {/* Floating Certificate Badge */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-neutral-950/90 rounded-2xl p-4 shadow-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        NABH Accredited Hospital
                      </span>
                      <p className="text-[11px] text-neutral-300 font-medium">
                        Highest Standard of Hygiene &amp; Authentic Clinical Protocols
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=350&q=65&fm=webp"
                alt="Ayurveda Herbs preparation"
                loading="lazy"
                decoding="async"
                width={350}
                height={350}
                className="rounded-2xl w-full aspect-square object-cover shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="rounded-2xl bg-mint-100 dark:bg-mint-900/30 p-6 flex flex-col justify-center text-center">
                <span className="block font-serif text-4xl font-bold text-mint-700 dark:text-mint-400">
                  150+
                </span>
                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 mt-1 uppercase tracking-widest">
                  Rare Native Healing Herbs
                </p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl bg-neutral-900 text-white dark:bg-neutral-800 p-6 text-center">
                <span className="block font-serif text-4xl font-bold text-mint-400">98%</span>
                <p className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-widest">
                  Treatment Satisfaction
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=350&q=65&fm=webp"
                alt="Herbal greenhouse"
                loading="lazy"
                decoding="async"
                width={350}
                height={350}
                className="rounded-2xl w-full aspect-square object-cover shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-mint-50 px-3 py-1.5 text-xs font-semibold text-mint-700 dark:bg-mint-900/20 dark:text-mint-300">
              <ShieldCheck className="h-4 w-4" />
              <span>Safety & Clinical Certification</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Centuries of Healing Lineage, <br />
              <span className="text-mint-600 dark:text-mint-400">NABH Certified Medical Trust</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-350 leading-relaxed">
              Our hospital stands as an esteemed beacon of authentic Ayurveda. We undergo rigorous clinical
              audits, and hold the prestigious National Accreditation Board for Hospitals & Healthcare
              Providers (NABH) certification, ensuring that traditional wisdom is practiced under flawless
              medical hygiene and modern safety standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                'National Quality Assurance Standards (NQAS)',
                '100% Organic ISO-Certified Raw Material Sourcing',
                'Fully Accredited Panchakarma Therapy Suites',
                'Traditional Ashtavaidya Clinical Heritage Lineage',
                'Registered Pharmacy under GMP Guidelines',
                'Multi-Disciplinary Team of Senior BAMS/MD Doctors',
              ].map((cert, index) => (
                <div key={index} className="flex items-start space-x-2.5">
                  <CheckCircle className="h-5 w-5 text-mint-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {cert}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="p-4 rounded-xl border border-dashed border-mint-300 dark:border-mint-800/60 bg-mint-50/50 dark:bg-mint-950/20 flex items-center space-x-4">
                <Award className="h-10 w-10 text-mint-600 shrink-0" />
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                  <strong className="text-neutral-900 dark:text-white">
                    Department of Ayurveda, Sri Lanka Approved:
                  </strong>{' '}
                  Recommended Grade-A clinical establishment representing the finest standards of traditional
                  Deshiya Cikitsa and authentic Ayurvedic purification and patient recovery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE SPECIALIZATIONS */}
     <section
  id="specializations"
  className="bg-neutral-50 dark:bg-neutral-900/30 py-20 border-y border-neutral-100 dark:border-white/10 backdrop-blur-md"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
    {/* Section Header */}
    <div className="text-center max-w-2xl mx-auto space-y-3">
      <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
        What We Excel In
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
        Our Core Healing Specializations
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm">
        Each specialized division utilizes customized medicines prepared in-house, ensuring immediate
        symptom relief coupled with therapeutic system rejuvenation.
      </p>
    </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true, margin: '-40px' }}
                onViewportEnter={() => handleAutoFlip(i)}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="perspective-1000 w-full h-[320px] group cursor-pointer select-none"
                onClick={() => toggleCardFlip(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCardFlip(i);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${spec.title} - Click or tap to flip card`}
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style-3d transition-all group-hover-flip ${
                    flippedCards[i] ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Front Face: Image & Title */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-md border border-neutral-200/60 dark:border-neutral-800 bg-neutral-900">
                    <img
                      src={spec.image}
                      alt={spec.title}
                      loading="lazy"
                      decoding="async"
                      width={480}
                      height={320}
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-end justify-between">
                        <h3 className="font-serif text-lg font-semibold text-white leading-snug drop-shadow">
                          {spec.title}
                        </h3>
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-neutral-900/80 border border-white/25 text-mint-400 backdrop-blur-md shrink-0 ml-2 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-mint-500 group-hover:text-neutral-950">
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Back Face: Original Content */}
                  <div className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-md">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mint-50 dark:bg-mint-900/30">
                          {spec.icon}
                        </div>
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-mint-200/80 dark:bg-neutral-900 border border-mint-300 dark:border-neutral-800 text-mint-600 dark:text-mint-400 backdrop-blur-md shadow-md transition-transform duration-300 hover:scale-110">
                          <ArrowRight className="h-4 w-4 rotate-180" />
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        {spec.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {spec.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-800 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-mint-600 dark:text-mint-400">
                        Ayurvedic Division
                      </span>
                      <div className="h-2 w-2 rounded-full bg-mint-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY (DYNAMIC SANITY INTEGRATED) */}
     <section id="gallery-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div className="space-y-2">
      <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
        Visual Tour
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
        Our Healing Spaces &amp; Garden
      </h2>
    </div>

    {/* Filter Buttons with Glass Effect */}
    <div className="flex flex-wrap gap-2">
      {(['All', 'Hospital', 'Treatments', 'Herbal Garden', 'Yoga & Meditation'] as const).map(
        (cat) => (
          <button
            key={cat}
            onClick={() => setGalleryFilter(cat)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none cursor-pointer backdrop-blur-md ${
              galleryFilter === cat
                ? 'bg-mint-600 text-white dark:bg-mint-500 shadow-sm'
                : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:border dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-800/60'
            }`}
          >
            {cat}
          </button>
        )
      )}
    </div>
  </div>

  {/* Grid with animation */}
  {isGalleryLoading ? (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-mint-600 dark:text-mint-400" />
    </div>
  ) : (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGallery.slice(0, visibleCount).map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              /* 
                👇 Glassmorphism & Hover Effects
              */
              className="group rounded-2xl overflow-hidden bg-mint-100/70 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/60 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:border-mint-500/30 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-800/80">
                <img
                  src={getImageSrc(item.image)}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Category Badge with Glass Effect */}
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-mint-700 dark:text-mint-400 uppercase tracking-wider border border-white/20 dark:border-white/10 shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Text Details */}
              <div className="p-4 space-y-1.5">
                <h3 className="font-serif text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-mint-600 dark:group-hover:text-mint-400 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )}
</section>

      {/* 5. TESTIMONIALS & PATIENT REVIEW SUBMISSION */}
      <section
  id="testimonials-section"
  className="bg-mint-105/50 dark:bg-neutral-900/30 py-20 border-y border-neutral-200 dark:border-white/10 backdrop-blur-md"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
          Patient Verified Feedback
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
          Real Stories of Life-Changing Recoveries
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm">
          Hear directly from individuals who achieved remarkable physical restoration. Reviews are verified with Patient IDs and approved by medical management.
        </p>
      </div>

      <button
        onClick={() => setIsReviewModalOpen(true)}
        className="inline-flex items-center justify-center rounded-xl bg-mint-600 hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 shadow-md hover:translate-y-[-2px] transition-all cursor-pointer shrink-0"
      >
        <MessageSquarePlus className="h-4 w-4 mr-2" />
        Write Patient Review
      </button>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <AnimatePresence initial={false}>
        {visibleReviews && visibleReviews.length > 0 ? (
          visibleReviews.map((t, index) => (
                  <motion.div
                    key={t.id || index}
                    initial={{ opacity: 0, y: 25, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 25, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                    className="group relative rounded-2xl bg-mint-50 dark:bg-neutral-950 p-6 border border-neutral-200/60 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300"
                  >
                    {/* Top Corner Slide Quote Icon */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 text-mint-400/40 dark:text-mint-600/30 group-hover:text-mint-600 dark:group-hover:text-mint-400 transition-colors">
                      <Quote className="h-5 w-5 group-hover:scale-110 transition-transform duration-300 transform -rotate-12" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pr-8">
                        <div className="flex text-amber-400">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        {t.patientId && (
                          <span className="inline-flex items-center text-[10px] font-mono font-bold bg-mint-100 dark:bg-mint-950 text-mint-800 dark:text-mint-300 px-2 py-0.5 rounded border border-mint-200 dark:border-mint-900/40">
                            <UserCheck className="h-3 w-3 mr-1 text-mint-600" />
                            {t.patientId}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                        "{t.text}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-3.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <img
                        src={
                          t.avatar ||
                          `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t.name)}`
                        }
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover shrink-0 bg-neutral-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="block text-xs font-bold text-neutral-900 dark:text-white">
                          {t.name}
                        </span>
                        {t.location && (
                          <span className="block text-[10px] text-neutral-400">{t.location}</span>
                        )}
                        {t.treatmentReceived && (
                          <span className="inline-block mt-1 text-[10px] font-medium bg-mint-50 dark:bg-mint-900/30 text-mint-700 dark:text-mint-300 px-2 py-0.5 rounded-full">
                            Tx: {t.treatmentReceived}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-neutral-500 dark:text-neutral-400 text-sm">
                  No approved patient reviews yet.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* View All / Show Less Button */}
          {testimonials.length > 3 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  setShowAllReviews((prev) => !prev);
                  if (showAllReviews) {
                    document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#134E39] hover:bg-[#0E3D2C] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105"
              >
                {showAllReviews ? (
                  <>
                    <ChevronDown className="h-4 w-4 rotate-180 transition-transform duration-300" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                    View All
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Patient Review Modal */}
      <PatientReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={loadReviews}
      />

      {/* 6. FAQ SECTION */}
      <section id="faq-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Learn more about ancient Indian medical systems, our in-house medicine purity, and how treatments
            work.
          </p>
        </div>

        <div className="space-y-4">
          {visibleFaqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-mint-50/70 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/60 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif font-semibold text-neutral-900 dark:text-white text-base focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-mint-600 dark:text-mint-400 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-neutral-200/50 dark:border-white/10"
                    >
                      <div className="p-5 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed bg-mint-50/50 dark:bg-neutral-950/30 backdrop-blur-md">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

  {/* View More / Show Less Button */}
 {/* View More / Show Less Button */}
{faqs.length > 4 && (
  <div className="flex justify-center pt-2">
    <button
      onClick={() => {
        setShowAllFaqs((prev) => !prev);
        setActiveFaq(null);
        if (showAllFaqs) {
          document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
      /* 
        👇 Gallery section button styling 적용 
        (bg-mint-600 hover:bg-mint-700 dark:bg-neutral-800 dark:hover:bg-mint-500)
      */
      className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-mint-600 hover:bg-mint-700 dark:bg-neutral-800/90 dark:hover:bg-mint-500 dark:hover:border-mint-500/50 dark:border dark:border-white/10 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer hover:translate-y-[-2px]"
    >
      {showAllFaqs ? (
        <>
          <ChevronDown className="h-4 w-4 rotate-180 transition-transform" />
          Show Less
        </>
      ) : (
        <>
          <ChevronDown className="h-4 w-4 transition-transform" />
          View All
        </>
      )}
    </button>
  </div>
)}
</section>
    </div>
  );
}