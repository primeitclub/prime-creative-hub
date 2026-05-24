import { category } from './category'
import { faq } from './faq'
import { historyEvent } from './historyEvent'
import { post } from './post'
import { project } from './project'
import { teamCohort } from './teamCohort'
import { teamMember } from './teamMember'
import { richText } from './objects/richText'
import { seo } from './objects/seo'
import { siteNavigation } from './singletons/siteNavigation'
import { siteSettings } from './singletons/siteSettings'

export const schemaTypes = [
  // documents
  post,
  project,
  teamMember,
  teamCohort,
  historyEvent,
  faq,
  category,
  // singletons
  siteNavigation,
  siteSettings,
  // objects
  seo,
  richText,
]

export const singletonTypes = new Set(['siteNavigation', 'siteSettings'])
