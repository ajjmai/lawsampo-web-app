import {
  statuteProperties
} from '../sparql_queries/SparqlQueriesStatutes'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const statutesPerspectiveConfig = {
  endpoint: {
    url: 'http://ldf.fi/lawsampo/sparql',
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
      labelPath: 'lss:timespan/skos:prefLabel',
      predicate: 'lss:timespan',
      type: 'list'
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
