import { useState, useEffect } from 'react';
import { getDoctorsList } from '../services/doctorService';
import { Doctor } from '../types/doctor';
import { useCms } from '../lib/cmsContext';

export function useDoctors() {
  const { dataVersion } = useCms();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getDoctorsList();
      setDoctors(data);
      setLoading(false);
    }
    load();
  }, [dataVersion]);

  return { doctors, loading };
}
