'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { getBlogById } from '@/services/blogService';
import { Blog } from '@/types/blog';
import { useCms } from '@/lib/cmsContext';
import { Loader } from '@/components/common/Loader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { dataVersion } = useCms();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getBlogById(id);
      setBlog(data);
      setLoading(false);
    }
    load();
  }, [id, dataVersion]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-28 pb-20 text-center space-y-6">
        <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white">
          Article Not Found
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          The article you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/blogs"
          className="text-mint-600 hover:underline font-bold text-xs uppercase tracking-wider"
        >
          Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
      {/* Back Button */}
      <Link
        href="/blogs"
        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Articles
      </Link>

      {/* Article Headings */}
      <div className="space-y-4">
        <span className="inline-block bg-mint-50 dark:bg-mint-950/40 border border-mint-100 dark:border-mint-900/30 text-mint-700 dark:text-mint-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
          {blog.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
          {blog.title}
        </h1>

        {/* Author & Info bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-neutral-100 dark:border-neutral-850 py-4 text-xs font-medium text-neutral-500">
          <div className="flex items-center space-x-3">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="h-10 w-10 rounded-full object-cover bg-neutral-100"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block font-bold text-neutral-900 dark:text-white">
                Written by {blog.author.name}
              </span>
              <span className="block text-[10px] text-neutral-400 font-semibold uppercase">
                {blog.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-mint-600" />
              Published: {blog.publishedAt}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-mint-600" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Featured Image */}
      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm bg-neutral-100">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      {/* Article Content formatted beautifully */}
      <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-6">
        {blog.content.split('\n\n').map((paragraph, pIdx) => {
          if (paragraph.startsWith('###')) {
            return (
              <h3
                key={pIdx}
                className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white pt-4"
              >
                {paragraph.replace('###', '').trim()}
              </h3>
            );
          }
          if (paragraph.startsWith('-')) {
            const items = paragraph.split('\n').filter((item) => item.trim() !== '');
            return (
              <ul key={pIdx} className="space-y-2 list-disc pl-5">
                {items.map((item, i) => (
                  <li key={i} className="text-sm">
                    {item
                      .replace(/^-|\*|\[|\]/g, '')
                      .replace(/\*\*([^*]+)\*\*/g, '$1')
                      .trim()}
                  </li>
                ))}
              </ul>
            );
          }
          if (paragraph.startsWith('1.')) {
            const items = paragraph.split('\n').filter((item) => item.trim() !== '');
            return (
              <ol key={pIdx} className="space-y-3 list-decimal pl-5">
                {items.map((item, i) => (
                  <li key={i} className="text-sm">
                    {item
                      .replace(/^\d+\.|\*|\[|\]/g, '')
                      .replace(/\*\*([^*]+)\*\*/g, '$1')
                      .trim()}
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
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-[10px] font-bold text-neutral-505 dark:text-neutral-400 px-2.5 py-1 rounded-md"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {/* Health Disclaimer panel */}
      <div className="p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40 text-xs text-neutral-500 leading-normal">
        <strong>Disclaimer:</strong> The medical and wellness instructions contained in this article are
        formulated from traditional Ayurvedic texts and intended purely for general healthy lifestyle support.
        They do not constitute professional diagnosis or customized clinical recommendations. Always seek
        consultation with a registered BAMS/MD physician prior to beginning new herbal regimens.
      </div>

      {/* End Navigation Action */}
      <div className="flex justify-between items-center pt-4">
        <Link
          href="/blogs"
          className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider focus:outline-none"
        >
          Back to health list
        </Link>
      </div>
    </div>
  );
}
