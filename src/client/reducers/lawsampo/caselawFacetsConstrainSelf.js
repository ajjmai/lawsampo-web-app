import { handleFacetConstrainSelfAction } from '../general/facetsConstrainSelf'

export const INITIAL_STATE = {
  updatedFacet: null,
  facetUpdateID: 0,
  updatedFilter: null,
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

const caselawFacetsConstrainself = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'caselaw') {
    return handleFacetConstrainSelfAction(state, action, INITIAL_STATE)
  } else return state
}

export default caselawFacetsConstrainself
