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
      id: 'statute',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'uri',
      valueType: 'object',
      onlyOnInstancePage: true,
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false
    },
    // {
    //   id: 'identifier',
    //   valueType: 'string',
    //   makeLink: false,
    //   externalLink: false,
    //   sortValues: false,
    //   numberedList: false,
    //   minWidth: 160
    // },
    {
      id: 'text',
      valueType: 'string',
      collapsedMaxWords: 6,
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'enforcementDate',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 170
    },
    {
      id: 'subjectCategory',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 170
    },
    {
      id: 'situationCategory',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 170
    }
  ]
}

const resultClasses = new Set([
  'sections'
])

const sections = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action)
  } else return state
}

export default sections
