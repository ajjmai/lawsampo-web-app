import {
  statuteProperties
} from '../sparql_queries/SparqlQueriesStatutes'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const statutesPerspectiveConfig = {
  endpoint: {
    url: 'http://data.finlex.fi/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'sfl:Statute',
  paginatedResults: {
    properties: statuteProperties
  },
  instance: {
    properties: statuteProperties,
    relatedInstances: ''
  },
  facets: {
    documentType: {
      id: 'documentType',
      facetValueFilter: `
      FILTER(lang(?prefLabel_) = 'fi')
      `,
      labelPath: 'eli:type_document/rdfs:label',
      predicate: 'eli:type_document',
      type: 'list'
    },
    statuteType: {
      id: 'statuteType',
      facetValueFilter: `
      FILTER(lang(?prefLabel_) = 'fi')
      `,
      labelPath: 'sfl:statuteType/rdfs:label',
      predicate: 'sfl:statuteType',
      type: 'list'
    },
    statuteYear: {
      id: 'statuteYear',
      facetValueFilter: `
      `,
      labelPath: 'sfl:year',
      predicate: 'sfl:year',
      type: 'integer'
    },
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'eli:title'
    },
    euDirective: {
      id: 'euDirective',
      facetValueFilter: '',
      labelPath: 'eli:has_member/eli:transposes',
      predicate: 'eli:has_member/eli:transposes',
      type: 'list'
    }
  }
}
