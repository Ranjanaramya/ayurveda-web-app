import { useState, useEffect } from 'react';
import { getTreatmentsList } from '../services/treatmentService';
import { Treatment } from '../types/treatment';
import { useCms } from '../lib/cmsContext';

export function useTreatments() {
  const { dataVersion } = useCms();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getTreatmentsList();
      setTreatments(data);
      setLoading(false);
    }
    load();
  }, [dataVersion]);

  return { treatments, loading };
}
