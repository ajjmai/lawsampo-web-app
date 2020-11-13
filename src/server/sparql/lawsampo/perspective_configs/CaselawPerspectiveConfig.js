import {
  judgementProperties
} from '../sparql_queries/SparqlQueriesCaselaw'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const caselawPerspectiveConfig = {
  endpoint: {
    url: 'https://ldf.fi/lawsampo/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'lss:Judgment',
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
      facetValueFilter: '',
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
    keyword: {
      id: 'keyword',
      facetValueFilter: '',
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
