import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Hospital Content CMS')
    .items([
      S.documentTypeListItem('doctor').title('Doctors'),
      S.documentTypeListItem('treatment').title('Treatments'),
      S.documentTypeListItem('blog').title('Blog Posts'),
      S.documentTypeListItem('patientInquiry').title('Patient Inquiries'),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['doctor', 'treatment', 'blog', 'patientInquiry'].includes(item.getId()!)
      ),
    ]);
