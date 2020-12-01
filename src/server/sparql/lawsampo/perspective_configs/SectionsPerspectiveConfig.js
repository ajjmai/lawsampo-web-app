import {
  // statuteProperties,
  sectionProperties
} from '../sparql_queries/SparqlQueriesLegislation'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const sectionsPerspectiveConfig = {
  endpoint: {
    url: 'https://ldf.fi/lawsampo/sparql',
    // url: 'http://localhost:3030/ds/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'lss:Section',
  langTag: 'fi',
  paginatedResults: {
    properties: sectionProperties
  },
  instance: {
    properties: sectionProperties,
    relatedInstances: ''
  },
  facets: {
    jenaText: {
      id: 'jenaText',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: '',
      type: 'text'
    },
    statute: {
      id: 'statute',
      facetValueFilter: '',
      labelPath: 'lss:statute/skos:prefLabel',
      predicate: 'lss:statute',
      type: 'hierarchical',
      parentPredicate: 'lss:statute/eli:type_document',
      parentProperty: 'eli:type_document',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = '<LANG>')
      `
    },
    enforcementDate: {
      id: 'statuteYear',
      facetValueFilter: `
      `,
      predicate: 'lss:statute_timespan',
      labelPath: 'lss:section_statute_date',
      type: 'hierarchical',
      parentPredicate: 'lss:timespan/skos:broader+',
      parentProperty: 'skos:broader'
    },
    subjectCategory: {
      id: 'subjectCategory',
      facetValueFilter: `
       
      `,
      labelPath: 'lss:subject_category/skos:prefLabel',
      predicate: 'lss:subject_category',
      type: 'list'
    },
    situationCategory: {
      id: 'situationCategory',
      facetValueFilter: `
       
      `,
      labelPath: 'lss:situation_category/skos:prefLabel',
      predicate: 'lss:situation_category',
      type: 'list'
    },
    euDirective: {
      id: 'euDirective',
      facetValueFilter: `
       
      `,
      labelPath: 'eli:transposes/skos:prefLabel',
      predicate: 'eli:transposes',
      type: 'list'
    },
    text: {
      id: 'text',
      labelPath: 'lss:text'
    },
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel'
    }
  }
}
