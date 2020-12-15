import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {
  mergeMap,
  map,
  withLatestFrom,
  catchError
} from 'rxjs/operators'
import {
  FETCH_FACET_FAILED
} from '../actions'
import {
  backendErrorText
} from '../configs/lawsampo/GeneralConfig'

import { updateSituationResults, updateSituations } from '../reducers/lawsampo/situationsFacets'
const apiUrl = process.env.API_URL

export const fetchSituations = (action$, state$) => action$.pipe(
  ofType('FETCH_SITUATIONS'),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
    const requestUrl = `${apiUrl}/classifier/categories`
    return ajax({
      url: requestUrl,
      method: 'GET'
    }).pipe(
      map(ajaxResponse => {
        return updateSituations({
          situations: ajaxResponse.response.situations
        })
      }),
      catchError(error => of({
        type: FETCH_FACET_FAILED,
        facetClass: '',
        facetID: '',
        error: error,
        message: {
          text: backendErrorText,
          title: 'Error'
        }
      }))
    )
  })
)

export const fetchSituationResults = (action$, state$) => action$.pipe(
  ofType('FETCH_SITUATION_RESULTS'),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
    const { query, selectedKeywords, selectedSituation, resultType } = state.situationsFacets
    const { facetClass, facetID } = action    
    let body = {
      resultType: resultType,
      query: query,
      selected_keywords: selectedKeywords
    }
    if (selectedSituation != null) {
      body = {
        resultType: resultType,
        query: query,
        selected_keywords: selectedKeywords,
        selected_category: selectedSituation
      }
    }

    const requestUrl = `${apiUrl}/classifier`
    return ajax({
      url: requestUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).pipe(
      map(ajaxResponse => {
        const { results, suggested_keywords, suggested_categories } = ajaxResponse.response
        return updateSituationResults({
          resultClass: 'situations',
          suggestedKeywords: suggested_keywords,
          suggestedCategories: suggested_categories,
          results: results
        })
      }),
      catchError(error => of({
        type: FETCH_FACET_FAILED,
        facetClass,
        facetID,
        error: error,
        message: {
          text: backendErrorText,
          title: 'Error'
        }
      }))
    )
  })
)
