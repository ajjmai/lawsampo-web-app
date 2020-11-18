import {
  statuteProperties,
  sectionProperties
} from '../sparql_queries/SparqlQueriesLegislation'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const legislationPerspectiveConfig = {
  endpoint: {
    url: 'https://ldf.fi/lawsampo/sparql',
    // url: 'http://localhost:3030/ds/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'lss:Section',
  paginatedResults: {
    properties: sectionProperties
  },
  instance: {
    properties: statuteProperties,
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
      parentPredicate: 'eli:type_document',
      parentProperty: 'eli:type_document',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = 'fi')
      `
    },
    enforcementDate: {
      id: 'statuteYear',
      facetValueFilter: `
      `,
      predicate: 'lss:timespan',
      labelPath: 'lss:timespan/skos:prefLabel',
      type: 'hierarchical',
      parentPredicate: 'lss:timespan/skos:broader+',
      parentProperty: 'skos:broader'
    },
    // documentType: {
    //   id: 'documentType',
    //   facetValueFilter: `
    //     FILTER(lang(?prefLabel_) = 'fi')
    //   `,
    //   labelPath: 'eli:type_document/skos:prefLabel',
    //   predicate: 'eli:type_document',
    //   type: 'list'
    // },

    // euDirective: {
    //   id: 'euDirective',
    //   facetValueFilter: '',
    //   labelPath: 'eli:transposes/skos:prefLabel',
    //   predicate: 'eli:transposes',
    //   type: 'list'
    // },
    text: {
      id: 'text',
      labelPath: 'lss:text'
    }
  }
}
