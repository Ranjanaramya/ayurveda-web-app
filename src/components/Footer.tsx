import { Leaf, Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-neutral-900 text-neutral-300 dark:bg-mint-950 dark:text-neutral-300 border-t border-neutral-800 dark:border-mint-900/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo & Bio */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleQuickLink('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-900 text-mint-400 border border-mint-800">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Ayur<span className="text-mint-400">Veda</span>
                </span>
                <span className="block text-[10px] font-semibold tracking-widest text-mint-400 uppercase">
                  Care Hospital
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-400">
              Blending ancient Kerala Ayurveda wisdom with modern clinical excellence. Fully certified treatment programs for holistic healing and life-long vitality.
            </p>
            <div className="rounded-lg bg-neutral-800/50 p-3.5 border border-neutral-800 dark:bg-mint-900/25 dark:border-mint-800/40">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                ★ CERTIFIED MEDICAL SYSTEM
              </span>
              <p className="text-[11px] text-neutral-400">
                Certified authentic healthcare with premium herbal quality standardizations.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => handleQuickLink('home')}
                  className="hover:text-mint-400 transition-colors focus:outline-none"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('treatments')}
                  className="hover:text-mint-400 transition-colors focus:outline-none"
                >
                  Treatments & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('doctors')}
                  className="hover:text-mint-400 transition-colors focus:outline-none"
                >
                  Ayurvedic Experts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('blogs')}
                  className="hover:text-mint-400 transition-colors focus:outline-none"
                >
                  Blogs & Health Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('contact')}
                  className="hover:text-mint-400 transition-colors focus:outline-none"
                >
                  Appointment Forms
                </button>
              </li>
            </ul>
          </div>

          {/* Timing & Hours */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-6">Working Hours</h3>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Outpatient Consultations</span>
                  <p className="text-xs">Mon - Sat: 08:00 AM - 07:00 PM</p>
                  <p className="text-xs">Sunday: 09:00 AM - 02:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Therapy & Panchakarma</span>
                  <p className="text-xs">Daily Sessions: 06:30 AM - 08:30 PM</p>
                  <p className="text-xs text-amber-400 font-medium">Prior booking is highly recommended</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-3.5 text-sm text-neutral-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                <span>
                  108 Lotus Temple Road, <br />
                  Ayurveda Nagar, Kerala - 695001, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-mint-400 shrink-0" />
                <a href="tel:+914712345678" className="hover:text-mint-400 transition-colors">
                  +91 (471) 234-5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-mint-400 shrink-0" />
                <a href="mailto:info@ayurvedacare.org" className="hover:text-mint-400 transition-colors">
                  info@ayurvedacare.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 dark:border-mint-900/30 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} AyurVeda Care Hospital. All Rights Reserved.
          </p>
          <p className="max-w-md text-center md:text-right text-[10px] leading-normal text-neutral-600">
            Disclaimer: The health information on this website is for informational purposes only and does not substitute professional medical advice, diagnosis, or customized clinical treatments.
          </p>
        </div>
      </div>
    </footer>
  );
}
