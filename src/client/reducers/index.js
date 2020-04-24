import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './error'
import options from './options'
import animation from './animation'
import leafletMap from './leafletMap'
// portal spefic reducers:
import statutes from './lawsampo/statutes'
import caselaw from './lawsampo/caselaw'
import statutesFacets from './lawsampo/statutesFacets'
import caselawFacets from './lawsampo/caselawFacets'

const reducer = combineReducers({
  statutes,
  caselaw,
  statutesFacets,
  caselawFacets,
  leafletMap,
  animation,
  options,
  error,
  toastr: toastrReducer
})

export default reducer
