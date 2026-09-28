import {aboutPage} from './documents/aboutPage'
import {contactPage, enquiryLink} from './documents/contactPage'
import {narrative} from './documents/narrative'
import {source} from './documents/source'
import {comparativePatternRow} from './objects/comparativePatternRow'
import {contextSpecificElement} from './objects/contextSpecificElement'
import {narrativeCountryAppearance} from './objects/narrativeCountryAppearance'
import {paragraph} from './objects/paragraph'
import {party} from './objects/party'
import {relatedTopic} from './objects/relatedTopic'

export const schemaTypes = [
  narrative,
  source,
  aboutPage,
  contactPage,
  enquiryLink,
  party,
  paragraph,
  narrativeCountryAppearance,
  comparativePatternRow,
  contextSpecificElement,
  relatedTopic,
]
