import { Doctor } from '../types/doctor';
import { Treatment } from '../types/treatment';
import { Blog } from '../types/blog';
import { PatientInquiry } from '../types/inquiry';
import { Testimonial, FAQItem, GalleryItem } from '../types/common';

// Default Seed Data
const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Vasudevan Namboothiri',
    role: 'Chief Physician & Ayurvedic Consultant',
    specialization: ['Panchakarma', 'Kayachikitsa (Internal Medicine)', 'Marma Chikitsa'],
    bio: 'Dr. Vasudevan has over 22 years of experience practicing traditional Kerala Ayurveda. He specializes in degenerative spine disorders, rheumatological conditions, and detox programs.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=70',
    certifications: [
      'BAMS (Bachelor of Ayurvedic Medicine and Surgery) - Kottakkal Ayurveda College',
      'MD (Ayurveda) - Government Ayurveda College, Trivandrum',
      'National Award for Ayurvedic Research (2022)'
    ],
    experience: '22+ Years',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlot: '08:30 AM - 01:30 PM'
    },
    contactEmail: 'vasudevan.n@ayurhospital.com'
  },
  {
    id: 'doc-2',
    name: 'Dr. Priyadarshini Sen',
    role: 'Senior Consultant & Wellness Expert',
    specialization: ['Striroga (Gynaecology)', 'Rasayana (Rejuvenation)', 'Ayurvedic Dietetics'],
    bio: 'With 15 years of dedicated practice, Dr. Priyadarshini integrates customized herbal formulations and specialized diets to treat metabolic disorders, stress, and lifestyle ailments.',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=600&q=70',
    certifications: [
      'BAMS - Sri Dharmasthala Manjunatheshwara College of Ayurveda',
      'Post Graduate Diploma in Ayurvedic Nutrition (PGDAN)',
      'Certified Yoga Therapist (CYT)'
    ],
    experience: '15+ Years',
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      timeSlot: '02:00 PM - 06:30 PM'
    },
    contactEmail: 'priyadarshini.s@ayurhospital.com'
  },
  {
    id: 'doc-3',
    name: 'Dr. Madhavan Nair',
    role: 'Senior Panchakarma Specialist',
    specialization: ['Shalyachikitsa', 'Neuromuscular Rehabilitation', 'Spine & Joint Care'],
    bio: 'Dr. Nair is renowned for his expert administration of complex Panchakarma regimens for chronic nerve injuries, hemiplegia, sciatica, and severe arthritis problems.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=70',
    certifications: [
      'BAMS - Government Ayurveda College, Tripunithura',
      'Master in Panchakarma Therapies',
      'Lifetime Member of Ayurvedic Academy of India'
    ],
    experience: '18+ Years',
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlot: '09:00 AM - 04:00 PM'
    },
    contactEmail: 'madhavan.n@ayurhospital.com'
  }
];

const DEFAULT_TREATMENTS: Treatment[] = [
  {
    id: 'treat-1',
    name: 'Panchakarma Detoxification',
    category: 'Panchakarma',
    description: 'A comprehensive 5-stage purification procedure designed to eliminate deeply rooted toxins, cleanse metabolic channels, and bring the three major Doshas into stable equilibrium.',
    benefits: [
      'Removes deep cellular toxins (Ama)',
      'Restores optimal metabolic rate and digestion (Agni)',
      'Enhances systemic immunity and overall physical strength',
      'Slows down aging processes and improves skin luster'
    ],
    duration: '7 to 21 Days Course',
    costEstimate: '$450 - $1200',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=70',
    herbsUsed: ['Triphala', 'Guggulu', 'Castor Oil', 'Neem']
  },
  {
    id: 'treat-2',
    name: 'Shirodhara Mind Calming Therapy',
    category: 'Rejuvenation',
    description: 'A therapeutic process of gently and continuously pouring warm, customized herbal oils, medicated buttermilk, or decoctions onto the forehead (the third eye region).',
    benefits: [
      'Deeply calms the central nervous system',
      'Combats chronic insomnia, anxiety, and depression',
      'Alleviates tension headaches, migraines, and mental fatigue',
      'Improves memory power and sensory coordination'
    ],
    duration: '60 Mins per session',
    costEstimate: '$85 / Session',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=70',
    herbsUsed: ['Brahmi', 'Ashwagandha', 'Sandalwood', 'Jatamansi']
  },
  {
    id: 'treat-3',
    name: 'Abhyanga Herbal Oil Massage',
    category: 'Therapeutic',
    description: 'A deeply nourishing full-body massage performed by skilled therapists synchronizing rhythmic strokes with warm oils selected specifically for your body constitution (Prakriti).',
    benefits: [
      'Improves arterial and lymphatic circulation',
      'Lubricates joints, reducing stiffness and muscular tension',
      'Moisturizes and tones skin layers thoroughly',
      'Supports healthy sleeping cycles and stress reduction'
    ],
    duration: '45 to 60 Mins',
    costEstimate: '$65 / Session',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=70',
    herbsUsed: ['Bala', 'Dashamoola', 'Sesame Oil', 'Coconut Oil']
  },
  {
    id: 'treat-4',
    name: 'Greeva & Kati Vasti (Spinal Therapy)',
    category: 'Therapeutic',
    description: 'A localized treatment where a reservoir of warm medicated oil is held over the cervical (Greeva) or lumbar (Kati) region of the spine using a retaining wall of black gram dough.',
    benefits: [
      'Nourishes dry and degenerating spinal discs',
      'Relieves sciatica, herniated discs, and spondylosis pain',
      'Increases range of spinal mobility',
      'Reduces surrounding muscle spasms and inflammation'
    ],
    duration: '45 Mins per session',
    costEstimate: '$75 / Session',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=70',
    herbsUsed: ['Ksheerabala', 'Murivenna', 'Sahacharadi Oil']
  }
];

const DEFAULT_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'Understanding Dinacharya: The Art of Ayurvedic Daily Routine',
    excerpt: 'Aligning your daily habits with natural biological rhythms can increase your longevity, strengthen your digestive fire, and promote deep peace of mind.',
    content: `In Ayurveda, health is defined as a harmonious state of body, mind, and spirit. This state is largely governed by how we interact with the cycles of nature. The ancient sages formulated a beautifully practical daily routine called **Dinacharya** to optimize this alignment.

### Why Follow Dinacharya?
1. **Biological Clock Alignment**: Keeps your circadian rhythm synchronized.
2. **Natural Detoxification**: Helps the body eliminate metabolic wastes naturally.
3. **Mental Clarity**: Morning hours are rich in Sattva (purity/clarity), perfect for setting intentions.

### Core Morning Habits:
- **Wake Up Early (Brahma Muhurtha)**: Arising around 1.5 hours before sunrise connects you with the high spiritual energy present during this time.
- **Tongue Scraping (Jihwa Nirlekhana)**: Using a copper scraper removes toxins (Ama) accumulated overnight, fresh-starts digestive enzymes, and prevents bad breath.
- **Oil Pulling (Gandusha)**: Swishing warm sesame or coconut oil in your mouth for 5-10 minutes strengthens teeth and gums, improves vocal clarity, and extracts fat-soluble toxins.
- **Abhyanga (Self-Massage)**: Rubbing warm sesame oil on your scalp, ears, and soles calms the nervous system and energizes the day ahead.

Integrating even two or three of these habits will make a noticeable difference in your physical vitality and emotional calm.`,
    author: {
      name: 'Dr. Priyadarshini Sen',
      role: 'Wellness Expert',
      avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=150&q=70'
    },
    publishedAt: '2026-07-15',
    category: 'Lifestyle',
    readTime: '4 Min Read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=70',
    tags: ['Dinacharya', 'Daily Routine', 'Wellness', 'Self-Care']
  },
  {
    id: 'blog-2',
    title: 'The Golden Rules of Ayurvedic Eating for Strong Digestion',
    excerpt: 'Ayurveda teaches us that "You are not what you eat, but what you digest." Learn how simple behavioral shifts during meals can transform your gut health.',
    content: `Modern science is increasingly recognizing that gut health is the foundation of the immune system. Ayurveda discovered this thousands of years ago, declaring **Agni** (the internal digestive fire) to be the root of life, health, and vitality.

If your Agni is weak, even the most organic, nutrient-dense diet will lead to incomplete digestion and create **Ama**—sticky metabolic toxins that lodge in tissues and cause chronic disease.

### Ayurvedic Guidelines for Perfect Digestion:

1. **Eat Only When Hungry**: Wait until your previous meal has been fully digested (usually 4-6 hours). A clear sign of hunger is a light feeling in the abdomen and high physical energy.
2. **Sip Warm Water**: Cold or iced beverages put out your digestive fire (Agni) immediately. Sip warm water, ginger water, or cumin-coriander-fennel tea instead.
3. **Eat in a Calm, Sitting Position**: Avoid scrolling through your phone, watching TV, or driving. Eating with mindfulness signals your vagus nerve to initiate digestion.
4. **Fill the Stomach Proportionately**: Think of your stomach capacity divided into:
   - **1/3 Solid Food**
   - **1/3 Liquid or Soup**
   - **1/3 Empty Space** (vital for expansion and turning of food)
5. **Incorporate Spice Medicine**: Cooking with ginger, turmeric, cumin, fennel, and black pepper naturally pre-digests food and enhances nutrient absorption.

Start incorporating these guidelines and watch chronic bloating, acid reflux, and lethargy fade away within days!`,
    author: {
      name: 'Dr. Vasudevan Namboothiri',
      role: 'Chief Physician',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=70'
    },
    publishedAt: '2026-07-10',
    category: 'Nutrition',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=70',
    tags: ['Agni', 'Nutrition', 'Digestion', 'Healthy Gut']
  },
  {
    id: 'blog-3',
    title: 'Top 5 Powerful Adaptogenic Herbs to Fight Stress Naturally',
    excerpt: 'In our fast-paced modern world, chronic stress takes a heavy toll. Discover how traditional herbs like Ashwagandha and Brahmi shield your mind and body.',
    content: `Stress is a primary driver of modern lifestyle disorders, from high blood pressure to hormonal imbalances. In the language of Ayurveda, severe chronic stress is a state of **Vata imbalance** which dries up the life force energy known as **Ojas**.

To restore this vital reservoir, Ayurvedic practitioners turn to a specialized category of strengthening herbs called **Rasayanas**. These act as modern adaptogens, restoring stress thresholds without caffeine crashes.

### The Top 5 Stress-Shielding Herbs:

- **Ashwagandha (Withania somnifera)**: Often called the king of Ayurvedic herbs. Ashwagandha lowers cortisol levels, strengthens muscular endurance, improves sleep quality, and calms Vata hyperactivity.
- **Brahmi (Bacopa monnieri)**: A legendary brain and nervous system tonic. It calms mental chatter, supports cognitive focus during stressful workloads, and supports emotional stability.
- **Tulsi (Holy Basil)**: Highly revered as "The Queen of Herbs," Tulsi is rich in antioxidants. It elevates mood, supports respiratory health, and balances stress hormones.
- **Shatavari (Asparagus racemosus)**: An excellent adaptogen for balancing the endocrine system, particularly beneficial for women's stress, reproductive wellness, and emotional balance.
- **Guduchi (Tinospora cordifolia)**: Known as "Amrita" or the nectar of immortality. Guduchi is a powerful immune modulator that protects our cellular structure from stress-induced inflammatory damage.

*Disclaimer: Always consult with a certified Ayurvedic doctor before starting therapeutic doses of herbal supplements to identify your specific Prakriti requirements.*`,
    author: {
      name: 'Dr. Madhavan Nair',
      role: 'Panchakarma Specialist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=70'
    },
    publishedAt: '2026-07-05',
    category: 'Herbal Medicine',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=70',
    tags: ['Herbs', 'Adaptogens', 'Stress Relief', 'Ashwagandha', 'Brahmi']
  }
];

const DEFAULT_INQUIRIES: PatientInquiry[] = [
  {
    id: 'inq-1',
    patientName: 'Ramesh Kumar',
    email: 'ramesh.k@gmail.com',
    phone: '+91 98765 43210',
    preferredDate: '2026-07-22',
    preferredTime: '10:00 AM',
    doctorId: 'doc-1',
    treatmentId: 'treat-1',
    message: 'Seeking consultations for severe lower back ache and lumbar stiffness. Interested in complete Panchakarma detox programs.',
    createdAt: '2026-07-18T10:30:00.000Z',
    status: 'Confirmed'
  },
  {
    id: 'inq-2',
    patientName: 'Sarah Jenkins',
    email: 'sarah.j@outlook.com',
    phone: '+1 (555) 345-6789',
    preferredDate: '2026-07-25',
    preferredTime: '03:30 PM',
    doctorId: 'doc-2',
    treatmentId: 'treat-2',
    message: 'Having trouble sleeping and dealing with severe occupational burnout. I would like to schedule Shirodhara oil sessions.',
    createdAt: '2026-07-19T02:15:00.000Z',
    status: 'Pending'
  }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientId: 'PAT-2026-1042',
    name: 'Anjali Sharma',
    location: 'Mumbai, India',
    text: 'I was suffering from chronic sciatica for over 5 years. After undergoing 14 days of spinal Kati Vasti and special oil massages, my pain has completely vanished. The doctors here are profoundly knowledgeable.',
    rating: 5,
    treatmentReceived: 'Kati Vasti & Spine Care',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=70',
    approved: true,
    createdAt: '2026-07-01T10:00:00.000Z'
  },
  {
    id: 't-2',
    patientId: 'PAT-2026-2180',
    name: 'David Miller',
    location: 'California, USA',
    text: 'The Panchakarma program here was completely life-transforming. The peaceful environment, customized organic diet, and intense therapeutic detox gave me a second lease on life. I feel lighter, clearer, and full of energy!',
    rating: 5,
    treatmentReceived: '14-Day Panchakarma Detox',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=70',
    approved: true,
    createdAt: '2026-07-05T14:30:00.000Z'
  },
  {
    id: 't-3',
    patientId: 'PAT-2026-3409',
    name: 'Saroja Jayawardene',
    location: 'Colombo, Sri Lanka',
    text: 'Amazing hospitality and authentic Ayurveda treatments. Dr. Priyadarshini listened to my health issues with such incredible patience and formulated a diet plan that resolved my severe digestive bloating within weeks.',
    rating: 5,
    treatmentReceived: 'Agni Deepana & Diet Consultation',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=70',
    approved: true,
    createdAt: '2026-07-10T09:15:00.000Z'
  }
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What happens during an initial Ayurvedic consultation?',
    answer: 'The physician performs Ashtavidha Pariksha (eightfold examination), including detailed Nadi Pariksha (radial pulse assessment), tongue diagnosis, eye check-up, and analyzing your speech and skin. This evaluates your inherent body constitution (Prakriti) and current metabolic imbalances (Vikriti) to craft customized herbal prescriptions and lifestyle modifications.',
    category: 'Consultation'
  },
  {
    id: 'faq-2',
    question: 'How long do I need to undergo Panchakarma therapy?',
    answer: 'A standard Panchakarma purification program usually takes 7 to 21 days depending on your medical history, age, and severity of imbalances. Each daily session lasts around 1.5 to 2.5 hours, including oil application, steam baths, and specialized cleansing rituals prescribed by the Chief Doctor.',
    category: 'Treatments'
  },
  {
    id: 'faq-3',
    question: 'Are there any side effects of Ayurvedic medicines?',
    answer: 'Traditional Ayurvedic formulations use purely natural plant extracts, barks, and seeds. When prescribed by a certified, qualified practitioner according to your Prakriti, they are completely safe and non-toxic. Self-medicating or buying unstandardized, non-certified remedies online should be strictly avoided.',
    category: 'Medicines'
  },
  {
    id: 'faq-4',
    question: 'Can Ayurveda cure chronic arthritis and joint pain?',
    answer: 'Yes, Ayurveda is highly effective in treating joint disorders like osteoarthritis, rheumatoid arthritis, and gout. Treatments like Kati Vasti, Janu Vasti, and Patra Pinda Sweda reduce joint inflammation, lubricate joint spaces, regenerate bone tissue, and restore excellent pain-free mobility.',
    category: 'Treatments'
  },
  {
    id: 'faq-5',
    question: 'Is AyurVeda Care Hospital located in Jaffna accessible for outstation patients?',
    answer: 'Yes, our hospital at 42 Neem Garden Road, Kopay, Jaffna is easily accessible from all parts of Sri Lanka. We provide residential accommodation facilities for patients requiring extended therapy stays. Our administrative team helps coordinate travel, transport, and accommodation arrangements upon request.',
    category: 'General'
  },
  {
    id: 'faq-6',
    question: 'What dietary restrictions should I follow during Ayurvedic treatment?',
    answer: 'During treatment, our doctors prescribe a personalized Pathya (suitable diet) plan. Generally, freshly cooked warm meals, easily digestible foods like rice, lentils, and cooked vegetables are recommended. Cold, processed, spicy, and heavy foods are typically avoided. Alcohol and smoking should be completely stopped throughout the treatment period.',
    category: 'Lifestyle'
  },
  {
    id: 'faq-7',
    question: 'Do you offer treatment for stress, anxiety, and sleep disorders?',
    answer: 'Absolutely. We specialize in Manasika (mind-related) therapies including Shirodhara, Brahmi-based herbal preparations, Nasyam, and guided Yoga-Pranayama sessions. These are highly effective in calming an overactive nervous system, reducing anxiety and depression, and restoring natural healthy sleep patterns within 7 to 14 days of consistent therapy.',
    category: 'Treatments'
  },
  {
    id: 'faq-8',
    question: 'How do I book an appointment at your Jaffna hospital?',
    answer: 'You can book a consultation through our online appointment form on this website, call us at +94 (21) 222-4567, or WhatsApp us at +94 77 123 4567. Walk-in OPD consultations are also available Mon–Sat from 8:00 AM to 7:00 PM. For specialized Panchakarma or residential programs, advance booking at least 3 to 5 days before is recommended.',
    category: 'Appointments'
  },
  {
    id: 'faq-9',
    question: 'Are your herbal medicines prepared in-house or sourced externally?',
    answer: 'We maintain an in-house GMP-certified herbal preparation unit using fresh herbs from our own organic garden as well as responsibly sourced Western Ghats and Sri Lankan native plant species. All kashayams (decoctions), tailams (oils), and arishtams (fermented formulations) are prepared fresh daily under the direct supervision of our senior Ayurvedic physicians.',
    category: 'Medicines'
  },
  {
    id: 'faq-10',
    question: 'Is Ayurvedic treatment suitable for children and elderly patients?',
    answer: 'Yes, Ayurveda has specialized branches for both children (Kaumarabhritya) and elderly (Rasayana therapy). Treatments are carefully calibrated based on age, body strength (Bala), and constitution. Our pediatric treatments address common issues like respiratory conditions, digestive problems, and immunity. Geriatric programs focus on rejuvenation, joint health, cognitive function, and longevity.',
    category: 'General'
  }
];

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Authentic Kerala Shirodhara',
    category: 'Treatments',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=70',
    description: 'Continuous streams of warm medicated herbal oils to quiet mental stress and soothe sensory channels.'
  },
  {
    id: 'g-2',
    title: 'In-house Herbal Medicine Garden',
    category: 'Herbal Garden',
    image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=600&q=70',
    description: 'Cultivating over 150 species of rare, organic healing herbs utilized to prepare fresh decoctions daily.'
  },
  {
    id: 'g-3',
    title: 'Serene Sunset Yoga and Pranayama Studio',
    category: 'Yoga & Meditation',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=70',
    description: 'Quiet spiritual spaces designed for deep diaphragmatic breathing and restoring physical equilibrium.'
  },
  {
    id: 'g-4',
    title: 'Hospital Certification and Standards Lobby',
    category: 'Hospital',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=70',
    description: 'NABH certified authentic healthcare architecture meeting the highest hygiene and traditional standards.'
  }
];

// Helper functions for localStorage persistence with SSR safety
const getStoredData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch (e) {
    return defaultValue;
  }
};

const setStoredData = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getDoctors = (): Doctor[] => getStoredData('ayur_doctors', DEFAULT_DOCTORS);
export const saveDoctors = (doctors: Doctor[]) => setStoredData('ayur_doctors', doctors);

export const getTreatments = (): Treatment[] => getStoredData('ayur_treatments', DEFAULT_TREATMENTS);
export const saveTreatments = (treatments: Treatment[]) => setStoredData('ayur_treatments', treatments);

export const getBlogs = (): Blog[] => getStoredData('ayur_blogs', DEFAULT_BLOGS);
export const saveBlogs = (blogs: Blog[]) => setStoredData('ayur_blogs', blogs);

export const getInquiries = (): PatientInquiry[] => getStoredData('ayur_inquiries', DEFAULT_INQUIRIES);
export const saveInquiries = (inquiries: PatientInquiry[]) => setStoredData('ayur_inquiries', inquiries);

export const getAllTestimonialsRaw = (): Testimonial[] => getStoredData('ayur_testimonials', DEFAULT_TESTIMONIALS);
export const getTestimonials = (): Testimonial[] => {
  const all = getStoredData('ayur_testimonials', DEFAULT_TESTIMONIALS);
  return all.filter((t) => t.approved !== false);
};
export const saveTestimonials = (testimonials: Testimonial[]) => setStoredData('ayur_testimonials', testimonials);

export const getFAQs = (): FAQItem[] => getStoredData('ayur_faqs_v2', DEFAULT_FAQS);
export const getGallery = (): GalleryItem[] => getStoredData('ayur_gallery', DEFAULT_GALLERY);
