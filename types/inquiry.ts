export interface PatientInquiry {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  doctorId: string;
  treatmentId: string;
  doctorName?: string;
  treatmentName?: string;
  message: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
}
