import {
  statuteProperties
} from '../sparql_queries/SparqlQueriesStatutes'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const statutesPerspectiveConfig = {
  endpoint: {
    url: 'https://ldf.fi/lawsampo/sparql',
    // url: 'http://localhost:3030/ds/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'lss:Statute',
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
      labelPath: 'eli:type_document/skos:prefLabel',
      predicate: 'eli:type_document',
      type: 'list'
    },
    statuteYear: {
      id: 'statuteYear',
      facetValueFilter: `
      `,
      predicate: 'lss:timespan',
      labelPath: 'lss:timespan/skos:prefLabel',
      type: 'hierarchical',
      parentPredicate: 'lss:timespan/skos:broader+',
      parentProperty: 'skos:broader'
    },
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel'
    },
    euDirective: {
      id: 'euDirective',
      facetValueFilter: '',
      labelPath: 'eli:transposes/skos:prefLabel',
      predicate: 'eli:transposes',
      type: 'list'
    }
  }
}
