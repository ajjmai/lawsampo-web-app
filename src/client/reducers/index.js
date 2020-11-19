import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import legislation from './lawsampo/legislation'
import statutes from './lawsampo/statutes'
import caselaw from './lawsampo/caselaw'
import legislationFacets from './lawsampo/legislationFacets'
import legislationFacetsConstrainSelf from './lawsampo/legislationFacetsConstrainSelf'
import caselawFacets from './lawsampo/caselawFacets'
import caselawFacetsConstrainSelf from './lawsampo/caselawFacetsConstrainSelf'

const reducer = combineReducers({
  legislation,
  statutes,
  caselaw,
  legislationFacets,
  legislationFacetsConstrainSelf,
  caselawFacets,
  caselawFacetsConstrainSelf,
  leafletMap,
  animation,
  options,
  error,
  toastr: toastrReducer
})

export default reducer
