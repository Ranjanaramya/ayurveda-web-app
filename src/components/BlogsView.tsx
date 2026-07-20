import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, ArrowLeft, Search, Tag, Share2 } from 'lucide-react';
import { getBlogs } from '../data/mockSanity';
import { Blog } from '../types';

export default function BlogsView() {
  const [blogs] = useState<Blog[]>(getBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Nutrition' | 'Yoga' | 'Herbal Medicine' | 'Lifestyle'>('All');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const categories: ('All' | 'Nutrition' | 'Yoga' | 'Herbal Medicine' | 'Lifestyle')[] = [
    'All',
    'Lifestyle',
    'Nutrition',
    'Herbal Medicine'
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      <AnimatePresence mode="wait">
        {!selectedBlog ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
                Ayurveda Health Resource
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Holistic Blogs & Ayurvedic Health Tips
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm max-w-xl mx-auto leading-relaxed">
                Nourish your intelligence with clinical lifestyle wisdom, organic wellness regimens, and traditional dietary practices.
              </p>
            </div>

            {/* Filter and Search Bar Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-neutral-100 dark:border-neutral-850 pb-6">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-mint-600 text-white shadow-sm dark:bg-mint-500'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:max-w-xs order-1 md:order-2">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search articles & tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-mint-500 text-neutral-800 dark:text-neutral-200"
                />
              </div>
            </div>

            {/* Blogs Previews Grid */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    onClick={() => {
                      setSelectedBlog(blog);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer rounded-2xl bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Blog Header Image */}
                      <div className="relative aspect-video overflow-hidden bg-neutral-100">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 bg-mint-200/95 dark:bg-neutral-950/95 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-mint-700 dark:text-mint-400 uppercase tracking-widest shadow-sm">
                          {blog.category}
                        </span>
                      </div>

                      {/* Blog Preview Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center space-x-3.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-mint-600 dark:text-mint-400" />
                            {blog.publishedAt}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1 text-mint-600 dark:text-mint-400" />
                            {blog.readTime}
                          </span>
                        </div>

                        <h2 className="font-serif text-lg font-bold text-neutral-900 dark:text-white group-hover:text-mint-600 dark:group-hover:text-mint-400 transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h2>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Blog Author section */}
                    <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 mt-4">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          className="h-8 w-8 rounded-full object-cover bg-neutral-100"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="block text-[11px] font-bold text-neutral-900 dark:text-white">
                            {blog.author.name}
                          </span>
                          <span className="block text-[9px] text-neutral-400 font-semibold uppercase tracking-widest">
                            {blog.author.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-mint-600 dark:text-mint-400 group-hover:translate-x-1 transition-transform uppercase tracking-wider flex items-center">
                        Read
                        <span className="ml-1">→</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-3">
                <p className="text-sm font-semibold text-neutral-400">
                  No health articles match your search parameters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 text-xs font-bold text-mint-600 hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* FULL BLOG DETAILED VIEW */
          <motion.div
            key="detailed-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </button>

            {/* Article Headings */}
            <div className="space-y-4">
              <span className="inline-block bg-mint-50 dark:bg-mint-950/40 border border-mint-100 dark:border-mint-900/30 text-mint-700 dark:text-mint-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
                {selectedBlog.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
                {selectedBlog.title}
              </h1>

              {/* Author & Info bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-neutral-100 dark:border-neutral-850 py-4 text-xs font-medium text-neutral-500">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedBlog.author.avatar}
                    alt={selectedBlog.author.name}
                    className="h-10 w-10 rounded-full object-cover bg-neutral-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block font-bold text-neutral-900 dark:text-white">
                      Written by {selectedBlog.author.name}
                    </span>
                    <span className="block text-[10px] text-neutral-400">
                      {selectedBlog.author.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-mint-600" />
                    Published: {selectedBlog.publishedAt}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-mint-600" />
                    {selectedBlog.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm bg-neutral-100">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content formatted beautifully */}
            <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-6">
              {selectedBlog.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={pIdx} className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white pt-4">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith('-')) {
                  const items = paragraph.split('\n').filter(item => item.trim() !== '');
                  return (
                    <ul key={pIdx} className="space-y-2 list-disc pl-5">
                      {items.map((item, i) => (
                        <li key={i} className="text-sm">
                          {item.replace(/^-|\*|\[|\]/g, '').replace(/\*\*([^*]+)\*\*/g, '$1').trim()}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('1.')) {
                  const items = paragraph.split('\n').filter(item => item.trim() !== '');
                  return (
                    <ol key={pIdx} className="space-y-3 list-decimal pl-5">
                      {items.map((item, i) => (
                        <li key={i} className="text-sm">
                          {item.replace(/^\d+\.|\*|\[|\]/g, '').replace(/\*\*([^*]+)\*\*/g, '$1').trim()}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={pIdx} className="text-sm sm:text-base">
                    {paragraph.replace(/\*\*([^*]+)\*\*/g, '$1')}
                  </p>
                );
              })}
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-neutral-100 dark:border-neutral-850">
              {selectedBlog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 px-2.5 py-1 rounded-md"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Health Disclaimer panel */}
            <div className="p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40 text-xs text-neutral-500 leading-normal">
              <strong>Disclaimer:</strong> The medical and wellness instructions contained in this article are formulated from traditional Ayurvedic texts and intended purely for general healthy lifestyle support. They do not constitute professional diagnosis or customized clinical recommendations. Always seek consultation with a registered BAMS/MD physician prior to beginning new herbal regimens.
            </div>

            {/* End Navigation Action */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider focus:outline-none"
              >
                Back to health list
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
