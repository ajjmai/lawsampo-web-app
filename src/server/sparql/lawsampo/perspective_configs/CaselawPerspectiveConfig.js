import {
  judgementProperties
} from '../sparql_queries/SparqlQueriesCaselaw'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const caselawPerspectiveConfig = {
  endpoint: {
    url: 'http://data.finlex.fi/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'sfcl:Judgment',
  paginatedResults: {
    properties: judgementProperties
  },
  instance: {
    properties: judgementProperties,
    relatedInstances: ''
  },
  facets: {
    court: {
      id: 'court',
      facetValueFilter: `
      FILTER(lang(?prefLabel_) = 'fi')
      `,
      labelPath: 'dcterms:creator/skos:prefLabel',
      predicate: 'dcterms:creator',
      type: 'list'
    },
    judge: {
      id: 'judge',
      facetValueFilter: `
      `,
      labelPath: 'dcterms:contributor/skos:prefLabel',
      predicate: 'dcterms:contributor',
      type: 'list'
    },
    keywords: {
      id: 'keywords',
      facetValueFilter: `
      FILTER(lang(?prefLabel_) = 'fi')
      `,
      labelPath: 'dcterms:description/skos:prefLabel',
      predicate: 'dcterms:description',
      type: 'list'
    },
    decisionDate: {
      id: 'decisionDate',
      facetValueFilter: `
      `,
      labelPath: '',
      predicate: 'dcterms:date',
      type: 'list'
    },
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'dcterms:title'
    }
  }
}
