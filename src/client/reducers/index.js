import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import error from './error'
import options from './options'
import statutes from './lawsampo/statutes'
import caselaw from './lawsampo/caselaw'
import statutesFacets from './lawsampo/statutesFacets'
import caselawFacets from './lawsampo/caselawFacets'
import animation from './mmm/animation'
import clientSideFacetedSearch from './sampo/clientSideFacetedSearch'

const reducer = combineReducers({
  statutes,
  caselaw,
  statutesFacets,
  caselawFacets,
  animation,
  options,
  error,
  clientSideFacetedSearch,
  toastr: toastrReducer
})

export default reducer
