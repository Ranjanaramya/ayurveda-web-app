import { defineField, defineType } from 'sanity';

export const inquiry = defineType({
  name: 'patientInquiry',
  title: 'Patient Inquiry Records',
  type: 'document',
  readOnly: true, // Auto-logged from frontend form
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
      name: 'doctorId',
      title: 'Requested Doctor Ref',
      type: 'string',
    }),
    defineField({
      name: 'treatmentId',
      title: 'Requested Treatment Ref',
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
        list: ['Pending', 'Confirmed', 'Completed'],
      },
    }),
  ],
});
