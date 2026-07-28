import { defineField, defineType } from 'sanity';

export const inquiry = defineType({
  name: 'patientInquiry',
  title: 'Patient Inquiry Records',
  type: 'document',
  fields: [
    defineField({
      name: 'patientName',
      title: 'Patient Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'preferredDate',
      title: 'Preferred Date',
      type: 'date',
    }),
    defineField({
      name: 'preferredTime',
      title: 'Preferred Time Slot',
      type: 'string',
    }),
    defineField({
      name: 'doctorName',
      title: 'Requested Doctor',
      type: 'string',
    }),
    defineField({
      name: 'treatmentName',
      title: 'Requested Treatment',
      type: 'string',
    }),
    defineField({
      name: 'doctorId',
      title: 'Doctor ID Ref',
      type: 'string',
    }),
    defineField({
      name: 'treatmentId',
      title: 'Treatment ID Ref',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Symptoms Detail',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Approval', value: 'Pending' },
          { title: 'Confirmed Slot', value: 'Confirmed' },
          { title: 'Completed Visit', value: 'Completed' },
        ],
      },
      initialValue: 'Pending',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'patientName',
      doctor: 'doctorName',
      treatment: 'treatmentName',
      date: 'preferredDate',
      time: 'preferredTime',
      phone: 'phone',
      status: 'status',
    },
    prepare({ title, doctor, treatment, date, time, phone, status }) {
      const docStr = doctor || 'Any Specialist';
      const treatStr = treatment || 'General Consultation';
      return {
        title: title ? `${title} (${phone || 'No Phone'})` : 'Untitled Inquiry',
        subtitle: `${docStr} • ${treatStr} • ${date || 'Date TBD'} (${time || 'Time TBD'}) [${status || 'Pending'}]`,
      };
    },
  },
});
