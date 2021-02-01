import axios from 'axios'

const baseUrl = 'https://contextualsearcher.test.lakisampo.fi/'
//const baseUrl = 'http://localhost:5000/'

export const fetchClassifierCategories = async () => {
  const response = await axios.get(baseUrl + 'categories')
  return {
    situations: response.data
  }
}
export const fetchClassifierResults = async (resultType, size, query, keywords, selectedNegativeKeywords, selectedPositiveKeywords, category) => {
  
  try {
    if (resultType === 'statutes') {
      const b = {
        size: size,
        query: query,
        selected_keywords: keywords,
        selected_category: category,
        selected_negative_keywords: selectedNegativeKeywords,
        selected_positive_keywords: selectedPositiveKeywords
      }
      const response = await axios.post(baseUrl + 'statutes', b)
      // handle statutes field for results tables
      const responseData = response.data
      const results = responseData.docs
      const formattedResults = results.map(obj => {
        let hashbang = 'section_' + obj.section_number
        if (obj.chapter_number !== '') {
          hashbang = 'chapter_' + obj.chapter_number + '_' + hashbang
        }

        return {
          ...obj,
          statute: {
            prefLabel: obj.statute,
            dataProviderUrl: '/statutes/page/' + obj.id
          },
          prefLabel: {
            prefLabel: obj.prefLabel,
            dataProviderUrl: '/statutes/page/' + obj.id + '#' + hashbang
          }
        }
      })
      responseData.results = formattedResults
      return responseData
    } else {
      const response = await axios.post(baseUrl + 'cases', {
        size: size,
        query: query,
        selected_keywords: keywords,
        selected_category: category,
        selected_negative_keywords: selectedNegativeKeywords,
        selected_positive_keywords: selectedPositiveKeywords

      })
      const responseData = response.data
      const results = responseData.docs
      const formattedResults = results.map(obj => {
        return {
          ...obj,
          case: {
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
