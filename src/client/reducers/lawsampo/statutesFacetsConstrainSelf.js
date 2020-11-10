import { handleFacetConstrainSelfAction } from '../general/facetsConstrainSelf'

export const INITIAL_STATE = {
  updatedFacet: null,
  facetUpdateID: 0,
  updatedFilter: null,
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
      sortButton: false,
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

const statutesFacetsConstrainself = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'statutes') {
    return handleFacetConstrainSelfAction(state, action, INITIAL_STATE)
  } else return state
}

export default statutesFacetsConstrainself
