import { useState, useEffect } from 'react';
import { getBlogsList } from '../services/blogService';
import { Blog } from '../types/blog';
import { useCms } from '../lib/cmsContext';

export function useBlogs() {
  const { dataVersion } = useCms();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getBlogsList();
      setBlogs(data);
      setLoading(false);
    }
    load();
  }, [dataVersion]);

  return { blogs, loading };
}
