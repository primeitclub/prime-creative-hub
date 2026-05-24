import type { StructureResolver } from 'sanity/structure'

const SINGLETONS: Array<{ id: string; type: string; title: string }> = [
  { id: 'siteSettings', type: 'siteSettings', title: 'Site Settings' },
  { id: 'siteNavigation', type: 'siteNavigation', title: 'Site Navigation' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem('post').title('Blog Posts'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('teamCohort').title('Team Cohorts'),
      S.documentTypeListItem('historyEvent').title('History Events'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('category').title('Categories'),
    ])
