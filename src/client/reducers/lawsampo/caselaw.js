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
      label: 'Label',
      desc: 'Label',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 120
    },
    {
      id: 'abstract',
      label: 'Abstract',
      desc: 'Abstract',
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
      label: 'Court',
      desc: 'Name of the court',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'judge',
      label: 'Judge',
      desc: 'Name(s) of the judge(s)',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'keywords',
      label: 'Keyword',
      desc: 'Keyword',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'decisionDate',
      label: 'Judgement date',
      desc: 'Judgement date',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 160
    }
    // {
    //   id: 'expression',
    //   label: 'Read',
    //   desc: 'Open court decision for reading',
    //   valueType: 'object',
    //   makeLink: true,
    //   externalLink: true,
    //   linkAsButton: true,
    //   sortValues: false,
    //   numberedList: false,
    //   minWidth: 150
    // }
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
