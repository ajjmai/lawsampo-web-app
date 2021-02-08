import { handleDataFetchingAction } from '../general/results'
import { FETCH_SIMILAR_DOCUMENTS_BY_ID_FAILED } from '../../actions'

export const INITIAL_STATE = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  resultCount: 0,
  page: -1,
  pagesize: 20,
  sortBy: 'decisionDate',
  sortDirection: 'desc',
  fetching: false,
  fetchingResultCount: false,
  facetedSearchHeaderExpanded: true,
  instancePageHeaderExpanded: true,
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
      numberedList: false
    },
    {
      id: 'ecli',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'abstract',
      valueType: 'string',
      collapsedMaxWords: 6,
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 300
    },
    {
      id: 'court',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'typeOfSourceData',
      onlyOnInstancePage: true,
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'judge',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'decisionDate',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'subjectCategory',
      onlyOnInstancePage: true,
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'situationCategory',
      onlyOnInstancePage: true,
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'similarCourtDecicions',
      onlyOnInstancePage: true,
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false
    },
    {
      id: 'finlexLink',
      valueType: 'object',
      onlyOnInstancePage: true,
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false
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
    {
      id: 'contentHTMLAnnotated',
      valueType: 'string',
      onlyOnInstancePage: true,
      renderAsHTML: true,
      HTMLParserTask: 'addAnnotationTooltips',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false
    }
  ]
}

const resultClasses = new Set([
  'caselaw',
  'courtDecisionsByYear',
  'caselawInstancePageNetwork'
])

const caselaw = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    if (action.type === FETCH_SIMILAR_DOCUMENTS_BY_ID_FAILED) {
      return {
        ...state,
        instanceTableExternalData: []
      }
    }
    return handleDataFetchingAction(state, action)
  } else return state
}

export default caselaw
