import { handleDataFetchingAction } from '../general/results'

// const statuteProperties = [
//   {
//     id: 'prefLabel',
//     valueType: 'object',
//     makeLink: true,
//     externalLink: false,
//     sortValues: false,
//     numberedList: false,
//     minWidth: 230
//   },
//   {
//     id: 'documentType',
//     valueType: 'string',
//     makeLink: false,
//     externalLink: false,
//     sortValues: false,
//     numberedList: false,
//     minWidth: 160
//   },
//   {
//     id: 'statuteYear',
//     valueType: 'string',
//     makeLink: false,
//     externalLink: false,
//     sortValues: false,
//     numberedList: false,
//     minWidth: 140
//   },
//   {
//     id: 'euDirective',
//     valueType: 'object',
//     makeLink: true,
//     externalLink: true,
//     sortValues: false,
//     numberedList: false,
//     minWidth: 150
//   }
//   // {
//   //   id: 'version',
//   //   valueType: 'object',
//   //   makeLink: true,
//   //   externalLink: true,
//   //   linkAsButton: true,
//   //   sortValues: true,
//   //   numberedList: false,
//   //   minWidth: 250
//   // }
// ]

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
      id: 'identifier',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 160
    },
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
      minWidth: 250
    },
    // {
    //   id: 'section',
    //   valueType: 'string',
    //   makeLink: false,
    //   externalLink: false,
    //   sortValues: false,
    //   numberedList: false,
    //   minWidth: 160
    // },
    {
      id: 'subjectCategory',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'situationCategory',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    }
  ]
}

const resultClasses = new Set([
  'legislation',
  'statuteYearLineChart'
])

const legislation = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action)
  } else return state
}

export default legislation
