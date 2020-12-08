export const INITIAL_STATE = {
  facetedSearchHeaderExpanded: false,
  facetUpdateID: 0,
  fetchingResultCount: false,
  resultType: 'statutes',
  caseProperties: [

    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 120
    },
    {
      id: 'uri',
      valueType: 'string',
      onlyOnInstancePage: true,
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 230
    },
    {
      id: 'abstract',
      valueType: 'string',
      collapsedMaxWords: 6,
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'court',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150
    },
    {
      id: 'decisionDate',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 160
    }

  ],
  statutesProperties: [
    {
      id: 'statute',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 230
    },
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 230
    },
    {
      id: 'uri',
      valueType: 'string',
      onlyOnInstancePage: true,
      makeLink: true,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 230
    },
    {
      id: 'text',
      valueType: 'string',
      collapsedMaxWords: 6,
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'enforcementDate',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 170
    }
  ],
  isFetching: false,
  statutesResults: [],
  casesResults: []

}

const situations = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_RESULT_TYPE':
      return {
        ...state,
        resultType: action.resultType
      }
    case 'FETCH_SITUATION_RESULTS':
      return {
        ...state,
        isFetching: true
      }
    case 'UPDATE_SITUATION_RESULTS':
      if (state.resultType === 'cases') {
        return {
          ...state,
          casesResults: action.results,
          statutesResults: [],
          isFetching: false
        }
      }
      if (state.resultType === 'statutes') {
        return {
          ...state,
          statutesResults: action.results,
          casesResults: [],
          isFetching: false
        }
      }
      return state
    case 'CLEAR_ALL':
      return {
        ...state,
        casesResults: [],
        statutesResults: []

      }
    default:
      return state
  }
}

export default situations
