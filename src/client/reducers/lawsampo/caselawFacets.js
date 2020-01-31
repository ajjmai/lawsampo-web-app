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
    court: {
      id: 'court',
      label: 'Court',
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
      containerClass: 'five',
      filterType: 'uriFilter',
      uriFilter: null
    },
    judge: {
      id: 'judge',
      label: 'Judge',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    },
    keywords: {
      id: 'keywords',
      label: 'Keywords',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    }
    // decisionDate: {
    //   id: 'decisionDate',
    //   label: 'Date',
    //   // predicate: defined in backend
    //   distinctValueCount: 0,
    //   values: [],
    //   flatValues: [],
    //   sortBy: 'instanceCount',
    //   sortDirection: 'desc',
    //   sortButton: true,
    //   spatialFilterButton: false,
    //   isFetching: false,
    //   searchField: false,
    //   containerClass: 'three',
    //   type: 'integer',
    //   filterType: 'integerFilter',
    //   integerFilter: null,
    // },
  }
}

const caselawFacets = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'caselaw') {
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

export default caselawFacets
