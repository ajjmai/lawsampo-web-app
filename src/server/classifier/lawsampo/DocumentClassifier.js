import axios from 'axios'

const baseUrl = 'https://zeroshot.test.lakisampo.fi/'
//const baseUrl = 'http://localhost:5000/'

export const fetchClassifierCategories = async () => {
  const response = await axios.get(baseUrl + 'categories')
  return {
    situations: response.data
  }
}
export const fetchClassifierResults = async (resultType, query, keywords, category) => {
  try {
    if (resultType === 'statutes') {
      const response = await axios.post(baseUrl + 'statutes', {
        query: query,
        selected_keywords: keywords,
        category: category
      })
      // handle statutes field for results tables
      const responseData = response.data
      const results = responseData.results
      const formattedResults = results.map(obj => {
        return {
          ...obj,
          statute: {
            id: obj.prefLabel,
            prefLabel: obj.statute,
            dataProviderUrl: '/statutes/page/' + obj.id
          }
        }
      })
      responseData.results = formattedResults
      return responseData
    } else {
      const response = await axios.post(baseUrl + 'cases', {
        query: query,
        selected_keywords: keywords,
        category: category
      })
      const responseData = response.data
      const results = responseData.results
      const formattedResults = results.map(obj => {
        return {
          ...obj,
          prefLabel: {
            id: obj.prefLabel,
            prefLabel: obj.prefLabel,
            dataProviderUrl: '/caselaw/page/' + obj.id
          }
        }
      })
      responseData.results = formattedResults
      return response.data
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}
