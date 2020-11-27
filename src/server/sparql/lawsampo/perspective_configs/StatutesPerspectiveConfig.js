import {
  statutePropertiesFacetResults,
  statutePropertiesInstancePage
  // sectionProperties
} from '../sparql_queries/SparqlQueriesLegislation'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const statutesPerspectiveConfig = {
  endpoint: {
    url: 'https://ldf.fi/lawsampo/sparql',
    // url: 'http://localhost:3030/ds/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'lss:Statute',
  langTag: 'fi',
  paginatedResults: {
    properties: statutePropertiesFacetResults
  },
  instance: {
    properties: statutePropertiesInstancePage,
    relatedInstances: ''
  },
  facets: {
    jenaText: {
      id: 'jenaText',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: '',
      type: 'text'
    },
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel'
    },
    identifier: {
      id: 'identifier',
      labelPath: 'lss:sf_identifier'
    },
    statuteType: {
      id: 'statuteType',
      facetValueFilter: '',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = '<LANG>')
      `,
      labelPath: 'eli:type_document/skos:prefLabel',
      predicate: 'eli:type_document',
      type: 'list'
    },
    enforcementDate: {
      id: 'statuteYear',
      facetValueFilter: '',
      predicate: 'lss:timespan',
      labelPath: 'lss:timespan/skos:prefLabel',
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
    section: {
      id: 'section',
      labelPath: 'lss:section/skos:prefLabel'
    },
    euDirective: {
      id: 'euDirective',
      facetValueFilter: `
       
      `,
      labelPath: 'eli:transposes/skos:prefLabel',
      predicate: 'eli:transposes',
      type: 'list'
    }
  }
}
