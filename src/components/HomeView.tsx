import { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { getFAQs, getGallery, getTestimonials } from '../data/mockSanity';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Hospital' | 'Treatments' | 'Herbal Garden' | 'Yoga & Meditation'>('All');
  
  const faqs = getFAQs();
  const gallery = getGallery();
  const testimonials = getTestimonials();

  const filteredGallery = galleryFilter === 'All'
    ? gallery
    : gallery.filter(item => item.category === galleryFilter);

  const specializations = [
    {
      icon: <Activity className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Spine & Joint Rehabilitation',
      desc: 'Non-invasive therapies using Kati Vasti, Kizhi, and traditional Marma techniques to treat sciatica, degenerative disks, and arthritic conditions.'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Authentic Panchakarma Detox',
      desc: 'Complete 5-fold systemic cleansing customized to restore optimal metabolic rate (Agni) and eliminate cellular toxins (Ama).'
    },
    {
      icon: <Sprout className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Stress & Burnout Management',
      desc: 'Nourishing Shirodhara and herbal Abhyanga treatments aimed at calming the central nervous system and restoring emotional stability.'
    },
    {
      icon: <Heart className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
      title: 'Chronic Lifestyle Care',
      desc: 'Comprehensive dietary planning and proprietary herbal protocols to successfully manage diabetes, obesity, and gastrointestinal disorders.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-mint-50 via-white to-transparent dark:from-mint-950/20 dark:via-neutral-950 dark:to-transparent">
        {/* Decorative Circles */}
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-mint-100/50 blur-3xl dark:bg-mint-900/10 pointer-events-none" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-mint-200/30 blur-3xl dark:bg-mint-800/10 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-mint-100 px-3 py-1.5 text-xs font-semibold text-mint-800 dark:bg-mint-900/50 dark:text-mint-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Traditional Kerala Ayurvedic Medicine</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                Restore Your Natural <br />
                <span className="text-mint-600 dark:text-mint-400">Harmony & Vitality</span>
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">
                Experience authentic, NABH-certified healing protocols curated by legendary physicians. Customized therapies, organic herbal formulations, and calming retreat spaces designed to align your mind, body, and spirit.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="inline-flex items-center justify-center rounded-xl bg-mint-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-mint-700 dark:bg-mint-500 dark:hover:bg-mint-400 transition-all hover:translate-y-[-2px]"
                >
                  Book Instant Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setActiveTab('treatments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-mint-100/80 dark:border-neutral-700 dark:bg-neutral-900/80 px-6 py-3.5 text-sm font-semibold text-neutral-700 dark:text-neutral-200 shadow-sm hover:bg-mint-200 dark:hover:bg-neutral-800 transition-all"
                >
                  Explore Services
                </button>
              </div>

              {/* Live Status Summary Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                <div>
                  <span className="block font-serif text-3xl font-bold text-mint-700 dark:text-mint-400">25,000+</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Patients Treated</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-mint-700 dark:text-mint-400">22+ Years</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Clinical Heritage</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-mint-700 dark:text-mint-400">100%</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Organic Herbal Sourcing</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column Interactive Mockup/Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-mint-200 dark:border-neutral-900 bg-mint-100">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
                  alt="Traditional Ayurvedic Herbal Oil Therapy"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
                
                {/* Floating Certificate Badge */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-mint-100/90 dark:bg-neutral-950/90 rounded-2xl p-4 shadow-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                        NABH Accredited Hospital
                      </span>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">
                        Highest Standard of Hygiene & Authentic Clinical Protocols
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION (HOSPITAL CERTIFICATION) */}
      <section id="about-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Collage with scroll reveal */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400&q=80"
                alt="Ayurveda Herbs preparation"
                className="rounded-2xl w-full aspect-square object-cover shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="rounded-2xl bg-mint-100 dark:bg-mint-900/30 p-6 flex flex-col justify-center text-center">
                <span className="block font-serif text-4xl font-bold text-mint-700 dark:text-mint-400">150+</span>
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
                src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=400&q=80"
                alt="Herbal greenhouse"
                className="rounded-2xl w-full aspect-square object-cover shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Right Core Description with delayed scroll reveal */}
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
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Our hospital stands as an esteemed beacon of authentic Ayurveda. We undergo rigorous clinical audits, and hold the prestigious National Accreditation Board for Hospitals & Healthcare Providers (NABH) certification, ensuring that traditional wisdom is practiced under flawless medical hygiene and modern safety standards.
            </p>

            {/* List of Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                'National Quality Assurance Standards (NQAS)',
                '100% Organic ISO-Certified Raw Material Sourcing',
                'Fully Accredited Panchakarma Therapy Suites',
                'Traditional Ashtavaidya Clinical Heritage Lineage',
                'Registered Pharmacy under GMP Guidelines',
                'Multi-Disciplinary Team of Senior BAMS/MD Doctors'
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
                  <strong className="text-neutral-900 dark:text-white">Kerala Govt. Ayurveda Department Approved:</strong> Recommended category A clinical establishment representing the finest standards of purification and patient recovery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE SPECIALIZATIONS */}
      <section id="specializations" className="bg-neutral-50 dark:bg-neutral-900/50 py-20 border-y border-neutral-100 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
              What We Excel In
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Our Core Healing Specializations
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Each specialized division utilizes customized medicines prepared in-house, ensuring immediate symptom relief coupled with therapeutic system rejuvenation.
            </p>
          </div>

          {/* Grid with scroll reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="group relative rounded-2xl bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mint-50 dark:bg-mint-900/30 group-hover:bg-mint-100 dark:group-hover:bg-mint-900/50 transition-colors">
                  {spec.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {spec.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {spec.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section id="gallery-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
              Visual Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Our Healing Spaces & Garden
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Hospital', 'Treatments', 'Herbal Garden', 'Yoga & Meditation'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none ${
                  galleryFilter === cat
                    ? 'bg-mint-600 text-white dark:bg-mint-500'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid with animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl overflow-hidden bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 shadow-sm"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-mint-200/95 dark:bg-neutral-950/95 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-mint-700 dark:text-mint-400 uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="font-serif text-sm font-semibold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section id="testimonials-section" className="bg-mint-100/50 dark:bg-neutral-900/50 py-20 border-y border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
              Patient Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Real Stories of Life-Changing Recoveries
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Hear directly from individuals who achieved remarkable physical restoration when conventional paths proved challenging.
            </p>
          </div>

          {/* Testimonials Grid with scroll reveal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="rounded-2xl bg-mint-50 dark:bg-neutral-950 p-6 border border-neutral-200/60 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover shrink-0 bg-neutral-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block text-xs font-bold text-neutral-900 dark:text-white">{t.name}</span>
                    <span className="block text-[10px] text-neutral-400">{t.location}</span>
                    <span className="inline-block mt-1 text-[10px] font-medium bg-mint-50 dark:bg-mint-900/30 text-mint-700 dark:text-mint-300 px-2 py-0.5 rounded-full">
                      Tx: {t.treatmentReceived}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            Learn more about ancient Indian medical systems, our in-house medicine purity, and how treatments work.
          </p>
        </div>

        {/* Accordions with scroll reveal */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-mint-100 dark:bg-neutral-950 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-neutral-900 dark:text-white hover:bg-mint-200/40 dark:hover:bg-neutral-900/30 transition-colors focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-neutral-100 dark:border-neutral-800"
                    >
                      <div className="p-5 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed bg-mint-50/50 dark:bg-neutral-900/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
