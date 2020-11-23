import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import sections from './lawsampo/sections'
import statutes from './lawsampo/statutes'
// import legislation from './lawsampo/legislation'
import caselaw from './lawsampo/caselaw'
import sectionsFacets from './lawsampo/sectionsFacets'
import sectionsFacetsConstrainSelf from './lawsampo/sectionsFacetsConstrainSelf'
import statutesFacets from './lawsampo/statutesFacets'
import statutesFacetsConstrainSelf from './lawsampo/statutesFacetsConstrainSelf'
// import legislationFacets from './lawsampo/legislationFacets'
// import legislationFacetsConstrainSelf from './lawsampo/legislationFacetsConstrainSelf'
import caselawFacets from './lawsampo/caselawFacets'
import caselawFacetsConstrainSelf from './lawsampo/caselawFacetsConstrainSelf'

const reducer = combineReducers({
  sections,
  statutes,
  // legislation,
  caselaw,
  sectionsFacets,
  sectionsFacetsConstrainSelf,
  statutesFacets,
  statutesFacetsConstrainSelf,
  // legislationFacets,
  // legislationFacetsConstrainSelf,
  caselawFacets,
  caselawFacetsConstrainSelf,
  leafletMap,
  animation,
  options,
  error,
  toastr: toastrReducer
})

export default reducer
