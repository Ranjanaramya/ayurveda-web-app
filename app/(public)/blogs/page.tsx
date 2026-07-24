'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, Clock, Search, Tag } from 'lucide-react';
import { getBlogsList } from '@/services/blogService'; // 👈 உங்கள் Blog Service-ஐ Import செய்யவும்
import { Blog } from '@/types/blog'; // 👈 உங்கள் Blog Type-ஐ Import செய்யவும்
import { useCms } from '@/lib/cmsContext';

export default function BlogsPage() {
  const { dataVersion } = useCms();
  
  // 1. Sanity-இல் இருந்து வரும் Blog-களைச் சேமிக்க State
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'All' | 'Nutrition' | 'Yoga' | 'Herbal Medicine' | 'Lifestyle'
  >('All');

  const categories: ('All' | 'Nutrition' | 'Yoga' | 'Herbal Medicine' | 'Lifestyle')[] = [
    'All',
    'Lifestyle',
    'Nutrition',
    'Herbal Medicine',
  ];

  // 2. Sanity-இல் இருந்து Dynamic-ஆக Blogs Fetch செய்யும் Effect
  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      const fetchedBlogs = await getBlogsList();
      setBlogs(fetchedBlogs || []);
      setLoading(false);
    }
    loadBlogs();
  }, [dataVersion]); // CMS Data மாறினால் Auto Refresh ஆகும்

  // Search & Category Filter
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || blog.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-mint-600 dark:text-mint-405 uppercase tracking-widest block">
          Ayurveda Health Resource
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Holistic Blogs & Ayurvedic Health Tips
        </h1>
        <p className="text-neutral-600 dark:text-neutral-350 text-sm max-w-xl mx-auto leading-relaxed">
          Nourish your intelligence with clinical lifestyle wisdom, organic wellness regimens, and
          traditional dietary practices.
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-mint-600 text-white shadow-sm dark:bg-mint-500'
                  : 'bg-neutral-105 text-neutral-600 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700/80'
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
            className="w-full bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-mint-500 text-neutral-850 dark:text-neutral-200"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-mint-600 border-r-transparent"></div>
          <p className="mt-2 text-xs font-semibold text-neutral-400">Loading blogs from Sanity...</p>
        </div>
      ) : filteredBlogs.length > 0 ? (
        /* Blogs Previews Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group cursor-pointer rounded-2xl bg-mint-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Blog Header Image */}
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src={blog.image || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {blog.category && (
                    <span className="absolute top-4 left-4 bg-mint-200/95 dark:bg-neutral-950/95 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-mint-700 dark:text-mint-405 uppercase tracking-widest shadow-sm">
                      {blog.category}
                    </span>
                  )}
                </div>

                {/* Blog Preview Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {blog.publishedAt && (
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-mint-600 dark:text-mint-405" />
                        {blog.publishedAt}
                      </span>
                    )}
                    {blog.readTime && (
                      <span className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-mint-600 dark:text-mint-405" />
                        {blog.readTime}
                      </span>
                    )}
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
              {blog.author && (
                <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 mt-4">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={blog.author.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(blog.author.name || 'Author')}`}
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
              )}
            </Link>
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
            className="px-4 py-2 text-xs font-bold text-mint-600 hover:underline cursor-pointer"
          >
            Clear search filters
          </button>
        </div>
      )}
    </div>
  );
}