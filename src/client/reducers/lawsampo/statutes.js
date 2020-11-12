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
      minWidth: 230
    },
    {
      id: 'documentType',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 160
    },
    {
      id: 'statuteType',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 140
    },
    {
      id: 'statuteYear',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 140
    },
    {
      id: 'euDirective',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'version',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      linkAsButton: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    }
  ]
}

const resultClasses = new Set([
  'statutes',
  'statuteYearLineChart'
])

const statutes = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action)
  } else return state
}

export default statutes
