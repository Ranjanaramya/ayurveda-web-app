import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCode,
  Users,
  Sprout,
  BookOpen,
  ClipboardList,
  Edit2,
  Trash2,
  Plus,
  Save,
  X,
  Code,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  getDoctors,
  saveDoctors,
  getTreatments,
  saveTreatments,
  getBlogs,
  saveBlogs,
  getInquiries,
  saveInquiries
} from '../data/mockSanity';
import { Doctor, Treatment, Blog, PatientInquiry } from '../types';

interface SanityStudioProps {
  onClose: () => void;
  onDataChanged: () => void; // Call this when data updates so the parent view updates
}

type SchemaType = 'doctor' | 'treatment' | 'blog' | 'inquiry';

export default function SanityStudio({ onClose, onDataChanged }: SanityStudioProps) {
  const [activeSchema, setActiveSchema] = useState<SchemaType>('doctor');
  const [showSchemaCode, setShowSchemaCode] = useState(false);

  // Live datasets loaded from mock DB
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [inquiries, setInquiries] = useState<PatientInquiry[]>([]);

  // Editing/Adding states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states matching types
  const [docForm, setDocForm] = useState<Partial<Doctor>>({});
  const [treatmentForm, setTreatmentForm] = useState<Partial<Treatment>>({});
  const [blogForm, setBlogForm] = useState<Partial<Blog>>({});

  useEffect(() => {
    loadAllData();
  }, [activeSchema]);

  const loadAllData = () => {
    setDoctors(getDoctors());
    setTreatments(getTreatments());
    setBlogs(getBlogs());
    setInquiries(getInquiries());
  };

  const handleSaveData = () => {
    onDataChanged();
    loadAllData();
    setEditingId(null);
    setIsAdding(false);
  };

  // SCHEMAS DEFINITION CODE (Visible to user to satisfy "show schemas" requirement!)
  const schemaDefinitions = {
    doctor: `// schemas/doctor.js
export default {
  name: 'doctor',
  title: 'Doctor Profiles',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'role', title: 'Clinic Role', type: 'string' },
    { name: 'specialization', title: 'Specializations', type: 'array', of: [{ type: 'string' }] },
    { name: 'bio', title: 'Biography', type: 'text' },
    { name: 'image', title: 'Profile Photo URL', type: 'url' },
    { name: 'certifications', title: 'Board Certifications', type: 'array', of: [{ type: 'string' }] },
    { name: 'experience', title: 'Years of Experience', type: 'string' },
    { name: 'availability', title: 'Clinic Hours', type: 'object', fields: [
      { name: 'days', title: 'Active Days', type: 'array', of: [{ type: 'string' }] },
      { name: 'timeSlot', title: 'Time Slot', type: 'string' }
    ]},
    { name: 'contactEmail', title: 'Contact Email', type: 'string' }
  ]
}`,
    treatment: `// schemas/treatment.js
export default {
  name: 'treatment',
  title: 'Ayurvedic Treatment',
  type: 'document',
  fields: [
    { name: 'name', title: 'Treatment Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'category', title: 'Therapy Category', type: 'string', options: { list: ['Panchakarma', 'Rejuvenation', 'Detox', 'Therapeutic'] } },
    { name: 'description', title: 'Full Description', type: 'text' },
    { name: 'benefits', title: 'Therapeutic Benefits', type: 'array', of: [{ type: 'string' }] },
    { name: 'duration', title: 'Duration Package', type: 'string' },
    { name: 'costEstimate', title: 'Estimated Cost', type: 'string' },
    { name: 'image', title: 'Hero Image URL', type: 'url' },
    { name: 'herbsUsed', title: 'Key Medical Herbs', type: 'array', of: [{ type: 'string' }] }
  ]
}`,
    blog: `// schemas/blog.js
export default {
  name: 'blog',
  title: 'Health Tips Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Article Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'excerpt', title: 'Short Snippet', type: 'text' },
    { name: 'content', title: 'Markdown Content', type: 'text' },
    { name: 'author', title: 'Author Profile', type: 'object', fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'role', title: 'Role', type: 'string' },
      { name: 'avatar', title: 'Avatar URL', type: 'url' }
    ]},
    { name: 'publishedAt', title: 'Publish Date', type: 'date' },
    { name: 'category', title: 'Main Category', type: 'string' },
    { name: 'readTime', title: 'Est. Read Time', type: 'string' },
    { name: 'image', title: 'Cover Image URL', type: 'url' },
    { name: 'tags', title: 'Search Tags', type: 'array', of: [{ type: 'string' }] }
  ]
}`,
    inquiry: `// schemas/patientInquiry.js
export default {
  name: 'patientInquiry',
  title: 'Patient Inquiry Records',
  type: 'document',
  readOnly: true, // Auto-logged from frontend form
  fields: [
    { name: 'patientName', title: 'Patient Name', type: 'string' },
    { name: 'email', title: 'Email Address', type: 'string' },
    { name: 'phone', title: 'Phone / WhatsApp', type: 'string' },
    { name: 'preferredDate', title: 'Preferred Date', type: 'date' },
    { name: 'preferredTime', title: 'Preferred Time Slot', type: 'string' },
    { name: 'doctorId', title: 'Requested Doctor Ref', type: 'string' },
    { name: 'treatmentId', title: 'Requested Treatment Ref', type: 'string' },
    { name: 'message', title: 'Symptoms Detail', type: 'text' },
    { name: 'status', title: 'Booking Status', type: 'string', options: { list: ['Pending', 'Confirmed', 'Completed'] } }
  ]
}`
  };

  // CRUD handlers - DOCTORS
  const handleEditDoctor = (doc: Doctor) => {
    setEditingId(doc.id);
    setDocForm(doc);
    setIsAdding(false);
  };
  const handleAddDoctorClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setDocForm({
      id: `doc-${Date.now()}`,
      name: '',
      role: '',
      specialization: ['General Medicine'],
      bio: '',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      certifications: ['BAMS Ayurveda Specialist'],
      experience: '5 Years',
      availability: { days: ['Monday', 'Wednesday'], timeSlot: '09:00 AM - 01:00 PM' },
      contactEmail: ''
    });
  };
  const handleDeleteDoctor = (id: string) => {
    if (confirm('Delete this doctor record from Sanity Studio?')) {
      const updated = doctors.filter(d => d.id !== id);
      saveDoctors(updated);
      handleSaveData();
    }
  };
  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.name || !docForm.role) return;
    const updated = isAdding
      ? [...doctors, docForm as Doctor]
      : doctors.map(d => (d.id === editingId ? { ...d, ...docForm } as Doctor : d));
    saveDoctors(updated);
    handleSaveData();
  };

  // CRUD handlers - TREATMENTS
  const handleEditTreatment = (tr: Treatment) => {
    setEditingId(tr.id);
    setTreatmentForm(tr);
    setIsAdding(false);
  };
  const handleAddTreatmentClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setTreatmentForm({
      id: `treat-${Date.now()}`,
      name: '',
      category: 'Therapeutic',
      description: '',
      benefits: ['Detoxifies body channels'],
      duration: '60 Mins',
      costEstimate: '$50',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
      herbsUsed: ['Ginger', 'Turmeric']
    });
  };
  const handleDeleteTreatment = (id: string) => {
    if (confirm('Delete this treatment document from Sanity?')) {
      const updated = treatments.filter(t => t.id !== id);
      saveTreatments(updated);
      handleSaveData();
    }
  };
  const handleSaveTreatment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!treatmentForm.name || !treatmentForm.description) return;
    const updated = isAdding
      ? [...treatments, treatmentForm as Treatment]
      : treatments.map(t => (t.id === editingId ? { ...t, ...treatmentForm } as Treatment : t));
    saveTreatments(updated);
    handleSaveData();
  };

  // CRUD handlers - BLOGS
  const handleEditBlog = (blog: Blog) => {
    setEditingId(blog.id);
    setBlogForm(blog);
    setIsAdding(false);
  };
  const handleAddBlogClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setBlogForm({
      id: `blog-${Date.now()}`,
      title: '',
      excerpt: '',
      content: '',
      author: {
        name: 'Dr. Priyadarshini Sen',
        role: 'Wellness Expert',
        avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=150&q=80'
      },
      publishedAt: new Date().toISOString().split('T')[0],
      category: 'Lifestyle',
      readTime: '3 Min Read',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
      tags: ['Ayurveda']
    });
  };
  const handleDeleteBlog = (id: string) => {
    if (confirm('Delete this article document?')) {
      const updated = blogs.filter(b => b.id !== id);
      saveBlogs(updated);
      handleSaveData();
    }
  };
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;
    const updated = isAdding
      ? [...blogs, blogForm as Blog]
      : blogs.map(b => (b.id === editingId ? { ...b, ...blogForm } as Blog : b));
    saveBlogs(updated);
    handleSaveData();
  };

  // CRUD handlers - INQUIRIES (Admin actions: Update status, Delete)
  const handleUpdateInquiryStatus = (id: string, status: 'Pending' | 'Confirmed' | 'Completed') => {
    const updated = inquiries.map(inq => (inq.id === id ? { ...inq, status } : inq));
    saveInquiries(updated);
    handleSaveData();
  };
  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this patient inquiry log?')) {
      const updated = inquiries.filter(inq => inq.id !== id);
      saveInquiries(updated);
      handleSaveData();
    }
  };

  return (
    <div id="sanity-cms-panel" className="fixed inset-y-0 right-0 z-50 flex w-full max-w-4xl flex-col bg-[#121214] text-neutral-200 shadow-2xl border-l border-neutral-800">
      {/* Studio Header */}
      <div className="flex h-16 items-center justify-between border-b border-neutral-800 px-6 bg-[#1a1a1e]">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 text-neutral-950">
            <Code className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="font-sans text-sm font-bold uppercase tracking-wider text-amber-500">
              Sanity Studio v3
            </span>
            <span className="block text-[10px] text-neutral-400">Headless CMS Blueprint Sim</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Schema Blueprint button */}
          <button
            onClick={() => setShowSchemaCode(!showSchemaCode)}
            className={`flex h-9 px-3 items-center space-x-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showSchemaCode
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-neutral-800 border-transparent hover:border-neutral-700 text-neutral-300'
            }`}
          >
            <FileCode className="h-4 w-4" />
            <span>{showSchemaCode ? 'Hide Schema JS' : 'Show Schema JS'}</span>
          </button>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Studio layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left schema category nav (Amber themed) */}
        <div className="w-48 bg-[#151518] border-r border-neutral-800/80 p-4 space-y-1.5 shrink-0 hidden sm:block">
          <span className="block text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-3 px-2">
            DOCUMENT TYPES
          </span>
          {[
            { id: 'doctor', label: 'Doctor Profiles', icon: <Users className="h-4 w-4" /> },
            { id: 'treatment', label: 'Treatments', icon: <Sprout className="h-4 w-4" /> },
            { id: 'blog', label: 'Blog Posts', icon: <BookOpen className="h-4 w-4" /> },
            { id: 'inquiry', label: 'Patient Inquiries', icon: <ClipboardList className="h-4 w-4" /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSchema(item.id as SchemaType);
                setEditingId(null);
                setIsAdding(false);
              }}
              className={`flex w-full items-center space-x-2.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                activeSchema === item.id
                  ? 'bg-amber-500/10 text-amber-500 font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.id === 'inquiry' && inquiries.filter(inq => inq.status === 'Pending').length > 0 && (
                <span className="ml-auto flex h-2 w-2 rounded-full bg-rose-500" />
              )}
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-neutral-800/60 px-2 space-y-2">
            <div className="flex items-center space-x-1.5 text-[10px] text-neutral-500 font-semibold uppercase">
              <Info className="h-3 w-3 text-amber-500" />
              <span>Sanity Note:</span>
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed">
              This CMS is linked in real-time. Saving documents updates the website layout instantly!
            </p>
          </div>
        </div>

        {/* Right Dynamic Workspace panel */}
        <div className="flex-1 flex flex-col bg-[#0b0b0c] overflow-y-auto p-6 space-y-6">
          {/* Mobile Schema Selector Tabs */}
          <div className="flex sm:hidden overflow-x-auto gap-2 pb-2 border-b border-neutral-800">
            {['doctor', 'treatment', 'blog', 'inquiry'].map(id => (
              <button
                key={id}
                onClick={() => {
                  setActiveSchema(id as SchemaType);
                  setEditingId(null);
                  setIsAdding(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 capitalize ${
                  activeSchema === id ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Schema JS Code Drawer Overlay */}
          <AnimatePresence>
            {showSchemaCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-amber-500/20 bg-[#16161a] p-4 space-y-2.5 overflow-hidden"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-neutral-800 pb-2">
                  <span>Declared Schema Document Blueprint</span>
                  <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md font-mono lowercase">
                    {activeSchema}.js
                  </span>
                </div>
                <pre className="font-mono text-[10.5px] leading-relaxed text-neutral-300 overflow-x-auto whitespace-pre p-2 bg-[#0e0e11] rounded-lg">
                  {schemaDefinitions[activeSchema]}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          {/* If Editing or Adding - SHOW FORM PANEL */}
          {editingId || isAdding ? (
            <div className="rounded-xl border border-neutral-800 bg-[#141417] p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
                  {isAdding ? 'Create New Document' : 'Modify Document'}
                </h3>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setIsAdding(false);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Dynamic schema forms rendering */}
              {activeSchema === 'doctor' && (
                <form onSubmit={handleSaveDoctor} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Full Physician Name</label>
                      <input
                        type="text"
                        required
                        value={docForm.name || ''}
                        onChange={e => setDocForm({ ...docForm, name: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Role/Position</label>
                      <input
                        type="text"
                        required
                        value={docForm.role || ''}
                        onChange={e => setDocForm({ ...docForm, role: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Years of Experience</label>
                      <input
                        type="text"
                        value={docForm.experience || ''}
                        onChange={e => setDocForm({ ...docForm, experience: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Direct Contact Email</label>
                      <input
                        type="email"
                        value={docForm.contactEmail || ''}
                        onChange={e => setDocForm({ ...docForm, contactEmail: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 font-bold uppercase tracking-wider">Profile Bio</label>
                    <textarea
                      rows={3}
                      value={docForm.bio || ''}
                      onChange={e => setDocForm({ ...docForm, bio: e.target.value })}
                      className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-amber-500 py-3 font-semibold text-neutral-950 hover:bg-amber-400"
                  >
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Doctor Document
                  </button>
                </form>
              )}

              {activeSchema === 'treatment' && (
                <form onSubmit={handleSaveTreatment} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Treatment Name</label>
                      <input
                        type="text"
                        required
                        value={treatmentForm.name || ''}
                        onChange={e => setTreatmentForm({ ...treatmentForm, name: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Category</label>
                      <select
                        value={treatmentForm.category || 'Therapeutic'}
                        onChange={e => setTreatmentForm({ ...treatmentForm, category: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                      >
                        <option value="Panchakarma">Panchakarma</option>
                        <option value="Rejuvenation">Rejuvenation</option>
                        <option value="Detox">Detox</option>
                        <option value="Therapeutic">Therapeutic</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Duration</label>
                      <input
                        type="text"
                        value={treatmentForm.duration || ''}
                        onChange={e => setTreatmentForm({ ...treatmentForm, duration: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Cost Estimate</label>
                      <input
                        type="text"
                        value={treatmentForm.costEstimate || ''}
                        onChange={e => setTreatmentForm({ ...treatmentForm, costEstimate: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 font-bold uppercase tracking-wider">Full Description</label>
                    <textarea
                      rows={3}
                      required
                      value={treatmentForm.description || ''}
                      onChange={e => setTreatmentForm({ ...treatmentForm, description: e.target.value })}
                      className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-amber-500 py-3 font-semibold text-neutral-950 hover:bg-amber-400"
                  >
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Treatment Document
                  </button>
                </form>
              )}

              {activeSchema === 'blog' && (
                <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-neutral-400 font-bold uppercase tracking-wider">Article Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title || ''}
                      onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Category</label>
                      <select
                        value={blogForm.category || 'Lifestyle'}
                        onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                      >
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Herbal Medicine">Herbal Medicine</option>
                        <option value="Yoga">Yoga</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 font-bold uppercase tracking-wider">Read Time (Est)</label>
                      <input
                        type="text"
                        value={blogForm.readTime || ''}
                        onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 font-bold uppercase tracking-wider">Excerpt Snippet</label>
                    <input
                      type="text"
                      value={blogForm.excerpt || ''}
                      onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 text-neutral-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 font-bold uppercase tracking-wider">Markdown Content Body</label>
                    <textarea
                      rows={5}
                      required
                      value={blogForm.content || ''}
                      onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full rounded-lg bg-[#222226] border border-neutral-700/60 p-3 font-mono text-[11px] text-neutral-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-amber-500 py-3 font-semibold text-neutral-950 hover:bg-amber-400"
                  >
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Blog Document
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* NORMAL DOCUMENT COLLECTION LISTS */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
                    {activeSchema} Collection Documents
                  </h3>
                  <span className="block text-[11px] text-neutral-500">
                    Active dataset maps 1:1 to website public pages
                  </span>
                </div>

                {/* Don't show add new button for inquiries as they are user submitted */}
                {activeSchema !== 'inquiry' && (
                  <button
                    onClick={
                      activeSchema === 'doctor'
                        ? handleAddDoctorClick
                        : activeSchema === 'treatment'
                        ? handleAddTreatmentClick
                        : handleAddBlogClick
                    }
                    className="flex h-9 items-center space-x-1.5 rounded-lg bg-amber-500 px-3.5 text-xs font-bold text-neutral-950 hover:bg-amber-400"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Document</span>
                  </button>
                )}
              </div>

              {/* LIST DISPLAY GRID - DOCTORS */}
              {activeSchema === 'doctor' && (
                <div className="space-y-3">
                  {doctors.map(doc => (
                    <div key={doc.id} className="rounded-xl border border-neutral-800 bg-[#141417] p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <img src={doc.image} alt={doc.name} className="h-10 w-10 rounded-lg object-cover bg-neutral-800" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{doc.name}</h4>
                          <span className="block text-[10px] text-neutral-400">{doc.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleEditDoctor(doc)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
                          title="Edit in Studio"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDoctor(doc.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:text-red-400"
                          title="Delete Document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* LIST DISPLAY GRID - TREATMENTS */}
              {activeSchema === 'treatment' && (
                <div className="space-y-3">
                  {treatments.map(tr => (
                    <div key={tr.id} className="rounded-xl border border-neutral-800 bg-[#141417] p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <img src={tr.image} alt={tr.name} className="h-10 w-10 rounded-lg object-cover bg-neutral-800" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{tr.name}</h4>
                          <span className="inline-block mt-0.5 text-[9px] font-bold bg-[#202025] text-amber-500 px-1.5 py-0.5 rounded">
                            {tr.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleEditTreatment(tr)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTreatment(tr.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* LIST DISPLAY GRID - BLOGS */}
              {activeSchema === 'blog' && (
                <div className="space-y-3">
                  {blogs.map(blog => (
                    <div key={blog.id} className="rounded-xl border border-neutral-800 bg-[#141417] p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <img src={blog.image} alt={blog.title} className="h-10 w-10 rounded-lg object-cover bg-neutral-800" referrerPolicy="no-referrer" />
                        <div className="max-w-md">
                          <h4 className="text-xs font-bold text-white truncate">{blog.title}</h4>
                          <span className="block text-[9px] text-neutral-500">By {blog.author.name} on {blog.publishedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* LIST DISPLAY GRID - PATIENT INQUIRIES */}
              {activeSchema === 'inquiry' && (
                <div className="space-y-3">
                  {inquiries.length > 0 ? (
                    inquiries.map(inq => (
                      <div
                        key={inq.id}
                        className={`rounded-xl border bg-[#141417] p-5 space-y-4 transition-all ${
                          inq.status === 'Pending'
                            ? 'border-amber-500/20 shadow-sm shadow-amber-500/5'
                            : 'border-neutral-800'
                        }`}
                      >
                        {/* Title Row */}
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-white">{inq.patientName}</h4>
                            <p className="text-[10px] text-neutral-400 mt-0.5">
                              Submitted: {new Date(inq.createdAt).toLocaleString()}
                            </p>
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              inq.status === 'Pending'
                                ? 'bg-amber-500/10 text-amber-500'
                                : inq.status === 'Confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>

                        {/* Inquiry Particulars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10.5px] bg-[#0b0b0c] p-3 rounded-lg text-neutral-300">
                          <div>
                            <span className="block text-neutral-500 uppercase tracking-widest text-[9px] mb-0.5">Email & Phone</span>
                            <strong>{inq.email}</strong> <br />
                            <strong>{inq.phone}</strong>
                          </div>
                          <div>
                            <span className="block text-neutral-500 uppercase tracking-widest text-[9px] mb-0.5">Booking Slots</span>
                            Preferred: <strong>{inq.preferredDate}</strong> at <strong>{inq.preferredTime}</strong>
                          </div>
                          <div className="sm:col-span-2 pt-2 border-t border-neutral-800/60">
                            <span className="block text-neutral-500 uppercase tracking-widest text-[9px] mb-0.5">Symptoms Notes</span>
                            <p className="text-neutral-400 italic">"{inq.message || 'No specific notes logged.'}"</p>
                          </div>
                        </div>

                        {/* Status Change Buttons */}
                        <div className="flex justify-between items-center pt-2 gap-2 border-t border-neutral-800/60">
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, 'Confirmed')}
                              disabled={inq.status === 'Confirmed'}
                              className="flex h-7 px-2.5 items-center space-x-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase disabled:opacity-50"
                            >
                              <Check className="h-3 w-3" />
                              <span>Confirm</span>
                            </button>
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, 'Completed')}
                              disabled={inq.status === 'Completed'}
                              className="flex h-7 px-2.5 items-center space-x-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-bold uppercase disabled:opacity-50"
                            >
                              <span>Mark Complete</span>
                            </button>
                          </div>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="flex h-7 w-7 items-center justify-center rounded bg-neutral-800 text-neutral-400 hover:text-red-400"
                            title="Delete Log"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 rounded-xl border border-dashed border-neutral-800">
                      <AlertCircle className="h-8 w-8 text-neutral-500 mx-auto mb-2" />
                      <p className="text-xs text-neutral-500">No active patient inquiries have been logged yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
