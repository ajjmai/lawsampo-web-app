import {
  FETCH_FACET,
  FETCH_FACET_FAILED,
  UPDATE_FACET_VALUES,
  UPDATE_FACET_OPTION
} from '../../actions'
import {
  fetchFacet,
  fetchFacetFailed,
  updateFacetValues,
  updateFacetOption
} from '../helpers'

export const INITIAL_STATE = {
  updatedFacet: null,
  facetUpdateID: 0,
  facets: {
    documentType: {
      id: 'documentType',
      label: 'Document type',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    },
    statuteType: {
      id: 'statuteType',
      label: 'Statute type',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'four',
      filterType: 'uriFilter',
      uriFilter: null
    },
    statuteYear: {
      id: 'statuteYear',
      label: 'Statute year',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'three',
      type: 'integer',
      filterType: 'integerFilter',
      integerFilter: null
    },
    euDirective: {
      id: 'euDirective',
      label: 'EU directive',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    }
  }
}

const statutesFacets = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'statutes') {
    switch (action.type) {
      case FETCH_FACET:
        return fetchFacet(state, action)
      case FETCH_FACET_FAILED:
        return fetchFacetFailed(state, action)
      case UPDATE_FACET_VALUES:
        return updateFacetValues(state, action)
      case UPDATE_FACET_OPTION:
        return updateFacetOption(state, action)
      default:
        return state
    }
  } else return state
}

export default statutesFacets
