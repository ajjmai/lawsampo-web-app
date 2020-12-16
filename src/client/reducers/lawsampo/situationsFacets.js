import { findIndex } from 'lodash'

export const updateSituationQuery = ({ query }) => (
  {
    type: 'UPDATE_SITUATION_QUERY',
    query
  }
)
export const updateSituationSelected = ({ selectedSituation }) => (
  {
    type: 'UPDATE_SITUATION_SELECTED',
    selectedSituation
  }
)

export const updateResultType = ({ resultType }) => (
  {
    type: 'UPDATE_RESULT_TYPE',
    resultType
  }
)

export const addSituationKeyword = ({ keyword }) => (
  {
    type: 'ADD_SITUATION_KEYWORD',
    keyword
  }
)

export const setSituationKeywords = ({ positiveKeywords, negativeKeywords }) => (
  {
    type: 'SET_SITUATION_KEYWORDS',
    positiveKeywords,
    negativeKeywords
  }
)

export const removeSituationKeyword = ({ keyword, keywordIndex }) => (
  {
    type: 'REMOVE_SITUATION_KEYWORD',
    keyword,
    keywordIndex
  }
)

export const addSituationCategory = ({ value }) => (
  {
    type: 'ADD_SITUATION_CATEGORY',
    value
  }
)

export const removeSituationCategory = (value) => (
  {
    type: 'REMOVE_SITUATION_CATEGORY',
    value
  }
)

export const clearAllSituations = () => (
  {
    type: 'CLEAR_ALL'
  }
)

export const fetchSituationResults = () => (
  {
    type: 'FETCH_SITUATION_RESULTS'
  }
)

export const updateSituationResults = ({ suggestedKeywords, suggestedCategories, results }) => (
  {
    type: 'UPDATE_SITUATION_RESULTS',
    suggestedKeywords,
    suggestedCategories,
    results
  }
)

export const fetchSituations = () => (
  {
    type: 'FETCH_SITUATIONS'
  }
)

export const updateSituations = ({ situations }) => (
  {
    type: 'UPDATE_SITUATIONS',
    situations
  }
)

export const INITIAL_STATE = {
  facetedSearchHeaderExpanded: false,
  facetUpdateID: 0,

  isFetching: false,
  query: '',
  selectedSituation: null,
  situations: [],
  keywords: [],
  selectedKeywords: [],
  selectedPositiveKeywords: [],
  selectedNegativeKeywords: [],
  categories: [],
  resultType: 'statutes'

}

const situationsFacets = (state = INITIAL_STATE, action) => {
  // console.log(action)
  const k = state.selectedKeywords
  switch (action.type) {
    case 'UPDATE_RESULT_TYPE':
      return {
        ...state,
        resultType: action.resultType
      }
    case 'UPDATE_SITUATION_QUERY':
      return {
        ...state,
        query: action.query
      }
    case 'UPDATE_SITUATION_SELECTED':
      return {
        ...state,
        selectedSituation: action.selectedSituation
      }

    case 'ADD_SITUATION_KEYWORD':
      if (Array.isArray(k)) {
        k.push(action.keyword)
      }

      return {
        ...state,
        selectedKeywords: k

      }
    case 'SET_SITUATION_KEYWORDS':
      return {
        ...state,
        selectedPositiveKeywords: action.positiveKeywords,
        selectedNegativeKeywords: action.negativeKeywords
      }
    case 'REMOVE_SITUATION_KEYWORD':
      const pos = state.selectedPositiveKeywords
      const neg = state.selectedNegativeKeywords
      let itemIndex = findIndex(pos, { uri: action.keyword.uri })
      if(itemIndex >= 0) {
        pos.splice(itemIndex, 1)
      } 
      else {
        itemIndex = findIndex(neg, { uri: action.keyword.uri })
        if(itemIndex >= 0) {
          neg.splice(itemIndex, 1)
        }
      }

      return {
        ...state,
        selectedPositiveKeywords: pos,
        selectedNegativeKeywords: neg
      }
    case 'CLEAR_ALL':
      return {
        ...state,
        query: '',
        categories: [],
        keywords: [],
        selectedSituation: null,
        selectedKeywords: [],
        selectedCategories: [],
        selectedPositiveKeywords: [],
        selectedNegativeKeywords: []
      }
    case 'FETCH_SITUATION_RESULTS':
      return {
        ...state,
        isFetching: true,
        keywords: [],
        categories: []

      }
    case 'UPDATE_SITUATION_RESULTS':
      return {
        ...state,
        keywords: action.suggestedKeywords,
        categories: action.suggestedCategories,
        isFetching: false

      }
    case 'FETCH_SITUATIONS':
      return {
        ...state,
        isFetching: true
      }
    case 'UPDATE_SITUATIONS':
      return {
        ...state,
        situations: action.situations,
        isFetching: false

      }
    default:
      return state
  }
}

export default situationsFacets
