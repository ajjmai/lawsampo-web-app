export const endpoint = 'http://data.finlex.fi/sparql'
// export const endpoint = 'http://localhost:3040/semantic-finlex/sparql'

export const endpointUseAuth = false

export const facetConfigs = {
  statutes: {
    facetClass: 'sfl:Statute',
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
  },
  caselaw: {
    facetClass: 'sfcl:Judgment',
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
