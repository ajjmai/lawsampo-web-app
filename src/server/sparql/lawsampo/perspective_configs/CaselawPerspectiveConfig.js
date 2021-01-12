import {
  judgementPropertiesFacetResults,
  judgementPropertiesInstancePage
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
  langTagSecondary: 'sv',
  includeInSitemap: true,
  paginatedResults: {
    properties: judgementPropertiesFacetResults
  },
  instance: {
    properties: judgementPropertiesInstancePage,
    relatedInstances: ''
  },
  facets: {
    jenaText: {
      id: 'jenaText',
      textQueryPredicate: 'lss:isRealizedBy',
      textQueryProperty: '',
      type: 'text'
    },
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'lss:isRealizedBy/skos:prefLabel'
    },
    ecli: {
      id: 'ecli',
      labelPath: 'dcterms:isVersionOf'
    },
    abstract: {
      id: 'abstract',
      labelPath: 'lss:isRealizedBy/dcterms:abstract'
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
    decisionDate: {
      id: 'decisionDate',
      facetValueFilter: `
      `,
      predicate: 'lss:timespan',
      labelPath: 'dcterms:issued',
      type: 'hierarchical',
      parentPredicate: 'lss:timespan/skos:broader+',
      parentProperty: 'skos:broader'
    },
    typeOfSourceData: {
      id: 'typeOfSourceData',
      facetValueFilter: '',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = '<LANG>')
      `,
      labelPath: 'lss:material_type/skos:prefLabel',
      predicate: 'lss:material_type',
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
    subjectCategory: {
      id: 'subjectCategory',
      facetValueFilter: `
       
      `,
      labelPath: 'lss:subject_category/skos:prefLabel',
      predicate: 'lss:subject_category',
      type: 'list'
      // type: 'hierarchical',
      // parentPredicate: 'lss:subject_category/skos:broader',
      // parentProperty: 'skos:broader'
    },
    situationCategory: {
      id: 'situationCategory',
      facetValueFilter: `
       
      `,
      labelPath: 'lss:situation_category/skos:prefLabel',
      predicate: 'lss:situation_category',
      type: 'list'
    },
    referencedStatute: {
      id: 'referencedStatute',
      facetValueFilter: '',
      labelPath: 'lss:referenceToStatute/skos:prefLabel',
      predicate: 'lss:referenceToStatute',
      type: 'hierarchical',
      parentPredicate: 'lss:referenceToStatute/eli:type_document',
      parentProperty: 'eli:type_document',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = '<LANG>')
      `
    },
    language: {
      id: 'language',
      facetValueFilter: '',
      labelPath: 'lss:isRealizedBy/dcterms:language',
      predicate: 'lss:isRealizedBy/dcterms:language',
      type: 'list',
      literal: true
    }
  }
}
