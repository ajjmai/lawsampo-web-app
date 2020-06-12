import {
  FETCH_RESULTS,
  FETCH_RESULT_COUNT,
  FETCH_RESULTS_FAILED,
  FETCH_PAGINATED_RESULTS,
  FETCH_PAGINATED_RESULTS_FAILED,
  FETCH_BY_URI,
  UPDATE_RESULT_COUNT,
  UPDATE_RESULTS,
  UPDATE_PAGINATED_RESULTS,
  UPDATE_INSTANCE,
  UPDATE_PAGE,
  UPDATE_ROWS_PER_PAGE,
  SORT_RESULTS,
  UPDATE_PERSPECTIVE_HEADER_EXPANDED,
  UPDATE_INSTANCE_NETWORK_DATA,
  UPDATE_INSTANCE_RELATED_DATA
} from '../../actions'
import {
  fetchResults,
  fetchResultsFailed,
  fetchResultCount,
  updateSortBy,
  updateResultCount,
  updateResults,
  updatePaginatedResults,
  updateInstance,
  updateInstanceNetworkData,
  updateInstanceRelatedData,
  updatePage,
  updateRowsPerPage,
  updateHeaderExpanded
} from '../helpers'

export const INITIAL_STATE = {
  results: [],
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  instance: null,
  instanceSparqlQuery: null,
  resultCount: 0,
  page: -1,
  pagesize: 10,
  sortBy: null,
  sortDirection: null,
  fetching: false,
  fetchingResultCount: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: false,
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
      valueType: 'string',
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

const statutes = (state = INITIAL_STATE, action) => {
  if (action.resultClass === 'statutes') {
    switch (action.type) {
      case FETCH_RESULTS:
      case FETCH_PAGINATED_RESULTS:
      case FETCH_BY_URI:
        return fetchResults(state)
      case FETCH_RESULT_COUNT:
        return fetchResultCount(state)
      case FETCH_RESULTS_FAILED:
      case FETCH_PAGINATED_RESULTS_FAILED:
        return fetchResultsFailed(state)
      case SORT_RESULTS:
        return updateSortBy(state, action)
      case UPDATE_RESULT_COUNT:
        return updateResultCount(state, action)
      case UPDATE_RESULTS:
        return updateResults(state, action)
      case UPDATE_PAGINATED_RESULTS:
        return updatePaginatedResults(state, action)
      case UPDATE_INSTANCE:
        return updateInstance(state, action)
      case UPDATE_INSTANCE_NETWORK_DATA:
        return updateInstanceNetworkData(state, action)
      case UPDATE_INSTANCE_RELATED_DATA:
        return updateInstanceRelatedData(state, action)
      case UPDATE_PAGE:
        return updatePage(state, action)
      case UPDATE_ROWS_PER_PAGE:
        return updateRowsPerPage(state, action)
      case UPDATE_PERSPECTIVE_HEADER_EXPANDED:
        return updateHeaderExpanded(state, action)
      default:
        return state
    }
  } else return state
}

export default statutes
