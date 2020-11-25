import {
  judgementProperties
} from '../sparql_queries/SparqlQueriesCaselaw'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const caselawPerspectiveConfig = {
  endpoint: {
    url: 'https://ldf.fi/lawsampo/sparql',
    // url: 'http://localhost:3030/ds/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'lss:Judgment',
  langTag: 'fi',
  paginatedResults: {
    properties: judgementProperties
  },
  instance: {
    properties: judgementProperties,
    relatedInstances: ''
  },
  facets: {
    jenaText: {
      id: 'jenaText',
      textQueryPredicate: 'lss:isRealizedBy',
      textQueryProperty: '',
      type: 'text'
    },
    court: {
      id: 'court',
      facetValueFilter: '',
      labelPath: 'dcterms:creator/skos:prefLabel',
      predicate: 'dcterms:creator',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = '<LANG>')
      `,
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
    typeOftheMatter: {
      id: 'typeOftheMatter',
      facetValueFilter: `
      `,
      labelPath: 'dcterms:subject/skos:prefLabel',
      predicate: 'dcterms:subject',
      type: 'list'
    },
    decisionDate: {
      id: 'decisionDate',
      facetValueFilter: `
      `,
      predicate: 'lss:timespan',
      labelPath: 'lss:timespan/skos:prefLabel',
      type: 'hierarchical',
      parentPredicate: 'lss:timespan/skos:broader+',
      parentProperty: 'skos:broader'
    },
    referencedLegislation: {
      id: 'referencedLegislation',
      facetValueFilter: '',
      labelPath: 'lss:referenceToLegislation/skos:prefLabel',
      predicate: 'lss:referenceToLegislation',
      type: 'hierarchical',
      parentPredicate: 'eli:type_document',
      parentProperty: 'eli:type_document',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = '<LANG>')
      `
    },
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'dcterms:title'
    }
  }
}
