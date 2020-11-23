import { handleDataFetchingAction } from '../general/results'

export const INITIAL_STATE = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  resultCount: 0,
  page: -1,
  pagesize: 10,
  sortBy: null,
  sortDirection: null,
  fetching: false,
  fetchingResultCount: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: false,
  instanceTableData: null,
  instanceTableExternalData: null,
  instanceSparqlQuery: null,
  properties: [
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 120
    },
    {
      id: 'uri',
      valueType: 'object',
      onlyOnInstancePage: true,
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 230
    },
    {
      id: 'abstract',
      valueType: 'string',
      collapsedMaxWords: 6,
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'court',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'judge',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    // {
    //   id: 'keyword',
    //   valueType: 'object',
    //   makeLink: false,
    //   externalLink: false,
    //   sortValues: false,
    //   numberedList: false,
    //   minWidth: 150
    // },
    {
      id: 'decisionDate',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 160
    },
    {
      id: 'contentHTML',
      valueType: 'string',
      onlyOnInstancePage: true,
      renderAsHTML: true,
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 160
    },
    {
      id: 'contentHTMLAnnotated',
      valueType: 'string',
      onlyOnInstancePage: true,
      renderAsHTML: true,
      HTMLParserTask: 'addAnnotationTooltips',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 160
    }
  ]
}

const resultClasses = new Set([
  'caselaw',
  'caselawByYear',
  'caselawInstancePageNetwork'
])

const caselaw = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action)
  } else return state
}

export default caselaw
