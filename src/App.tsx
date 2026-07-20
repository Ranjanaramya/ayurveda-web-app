import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SanityStudio from './components/SanityStudio';

// Views
import HomeView from './components/HomeView';
import TreatmentsView from './components/TreatmentsView';
import DoctorsView from './components/DoctorsView';
import BlogsView from './components/BlogsView';
import ContactView from './components/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('');
  const [cmsPanelOpen, setCmsPanelOpen] = useState<boolean>(false);
  const [dataVersion, setDataVersion] = useState<number>(0); // Trigger re-renders when CMS data changes

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') return 'dark';
      if (stored === 'light') return 'light';
      return 'dark'; // Default to dark mode
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Triggered when data is updated in Sanity Studio, ensuring website lists refresh immediately
  const handleDataChanged = () => {
    setDataVersion(prev => prev + 1);
  };

  // Close CMS panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCmsPanelOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'treatments':
        return (
          <TreatmentsView
            setActiveTab={setActiveTab}
            setSelectedTreatmentId={setSelectedTreatmentId}
          />
        );
      case 'doctors':
        return (
          <DoctorsView
            setActiveTab={setActiveTab}
            setSelectedDoctorId={setSelectedDoctorId}
          />
        );
      case 'blogs':
        return <BlogsView />;
      case 'contact':
        return (
          <ContactView
            selectedDoctorId={selectedDoctorId}
            setSelectedDoctorId={setSelectedDoctorId}
            selectedTreatmentId={selectedTreatmentId}
            setSelectedTreatmentId={setSelectedTreatmentId}
          />
        );
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-mint-50 text-neutral-800 dark:bg-mint-950 dark:text-neutral-100 flex flex-col justify-between selection:bg-mint-200 dark:selection:bg-mint-900 selection:text-mint-900 transition-colors duration-300">
      
      {/* 1. Header Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleCmsPanel={() => setCmsPanelOpen(!cmsPanelOpen)}
        cmsPanelOpen={cmsPanelOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. Main content container styled with sliding route animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${dataVersion}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4. Bottom to Up scroll button */}
      <ScrollToTop />

      {/* 5. Headless Sanity CMS Studio Drawer Panel */}
      <AnimatePresence>
        {cmsPanelOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-4xl"
          >
            <SanityStudio
              onClose={() => setCmsPanelOpen(false)}
              onDataChanged={handleDataChanged}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay for CMS Panel when open */}
      <AnimatePresence>
        {cmsPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCmsPanelOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs cursor-pointer"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
