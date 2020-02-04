import { runSelectQuery } from './SparqlApi'
import { prefixes } from './lawsampo/SparqlQueriesPrefixes'
import {
  countQuery,
  facetResultSetQuery,
  instanceQuery
} from './SparqlQueriesGeneral'
import { statutesProperties } from './lawsampo/SparqlQueriesStatutes'
import { caselawProperties } from './lawsampo/SparqlQueriesCaselaw'
import { facetConfigs, endpoint } from './lawsampo/FacetConfigsLawSampo'
import { mapCount } from './Mappers'
import { makeObjectList } from './SparqlObjectMapper'
import { generateConstraintsBlock } from './Filters'

export const getPaginatedResults = async ({
  resultClass,
  page,
  pagesize,
  constraints,
  sortBy,
  sortDirection,
  resultFormat
}) => {
  const response = await getPaginatedData({
    resultClass,
    page,
    pagesize,
    constraints,
    sortBy,
    sortDirection,
    resultFormat
  })
  if (resultFormat === 'json') {
    return {
      resultClass: resultClass,
      page: page,
      pagesize: pagesize,
      data: response.data,
      sparqlQuery: response.sparqlQuery
    }
  } else {
    return response
  }
}

// export const getAllResults = ({
//   resultClass,
//   facetClass,
//   constraints,
//   resultFormat
// }) => {
//   let q = ''
//   let filterTarget = ''
//   let mapper = makeObjectList
//   switch (resultClass) {
//     case 'placesMsProduced':
//       q = productionPlacesQuery
//       filterTarget = 'manuscripts'
//       mapper = mapPlaces
//       break
//   }
//   if (constraints == null) {
//     q = q.replace('<FILTER>', '# no filters')
//   } else {
//     q = q.replace('<FILTER>', generateConstraintsBlock({
//       resultClass: resultClass,
//       facetClass: facetClass,
//       constraints: constraints,
//       filterTarget: filterTarget,
//       facetID: null
//     }))
//   }
//   // console.log(prefixes + q)
//   return runSelectQuery({
//     query: prefixes + q,
//     endpoint,
//     resultMapper: mapper,
//     resultFormat
//   })
// }

export const getResultCount = async ({
  resultClass,
  constraints,
  resultFormat
}) => {
  let q = countQuery
  q = q.replace('<FACET_CLASS>', facetConfigs[resultClass].facetClass)
  if (constraints == null) {
    q = q.replace('<FILTER>', '# no filters')
  } else {
    q = q.replace('<FILTER>', generateConstraintsBlock({
      resultClass: resultClass,
      facetClass: resultClass,
      constraints: constraints,
      filterTarget: 'id',
      facetID: null
    }))
  }
  const response = await runSelectQuery({
    query: prefixes + q,
    endpoint,
    resultMapper: mapCount,
    resultFormat
  })
  return ({
    resultClass: resultClass,
    data: response.data,
    sparqlQuery: response.sparqlQuery
  })
}

const getPaginatedData = ({
  resultClass,
  page,
  pagesize,
  constraints,
  sortBy,
  sortDirection,
  resultFormat
}) => {
  let q = facetResultSetQuery
  const facetConfig = facetConfigs[resultClass]
  if (constraints == null) {
    q = q.replace('<FILTER>', '# no filters')
  } else {
    q = q.replace('<FILTER>', generateConstraintsBlock({
      resultClass: resultClass,
      facetClass: resultClass,
      constraints: constraints,
      filterTarget: 'id',
      facetID: null
    }))
  }
  q = q.replace('<FACET_CLASS>', facetConfig.facetClass)
  if (sortBy == null) {
    q = q.replace('<ORDER_BY_TRIPLE>', '')
    q = q.replace('<ORDER_BY>', '# no sorting')
  } else {
    let sortByPredicate = ''
    if (sortBy.endsWith('Timespan')) {
      sortByPredicate = sortDirection === 'asc'
        ? facetConfig[sortBy].sortByAscPredicate
        : facetConfig[sortBy].sortByDescPredicate
    } else {
      sortByPredicate = facetConfig[sortBy].labelPath
    }
    q = q.replace('<ORDER_BY_TRIPLE>',
      `OPTIONAL { ?id ${sortByPredicate} ?orderBy }`)
    q = q.replace('<ORDER_BY>',
      `ORDER BY (!BOUND(?orderBy)) ${sortDirection}(?orderBy)`)
  }
  q = q.replace('<PAGE>', `LIMIT ${pagesize} OFFSET ${page * pagesize}`)
  let resultSetProperties
  switch (resultClass) {
    case 'statutes':
      resultSetProperties = statutesProperties
      break
    case 'caselaw':
      resultSetProperties = caselawProperties
      break
    default:
      resultSetProperties = ''
  }
  q = q.replace('<RESULT_SET_PROPERTIES>', resultSetProperties)
  // console.log(prefixes + q);
  return runSelectQuery({
    query: prefixes + q,
    endpoint,
    resultMapper: makeObjectList,
    resultFormat
  })
}

export const getByURI = ({
  resultClass,
  facetClass,
  constraints,
  uri,
  resultFormat
}) => {
  let q
  switch (resultClass) {
    case 'statutes':
      q = instanceQuery
      q = q.replace('<PROPERTIES>', statutesProperties)
      q = q.replace('<RELATED_INSTANCES>', '')
      break
    case 'caselaw':
      q = instanceQuery
      q = q.replace('<PROPERTIES>', caselawProperties)
      q = q.replace('<RELATED_INSTANCES>', '')
      break
  }
  if (constraints == null) {
    q = q.replace('<FILTER>', '# no filters')
  } else {
    q = q.replace('<FILTER>', generateConstraintsBlock({
      resultClass: resultClass,
      facetClass: facetClass,
      constraints: constraints,
      filterTarget: 'related__id',
      facetID: null
    }))
  }
  q = q.replace('<ID>', `<${uri}>`)
  // console.log(prefixes + q)
  return runSelectQuery({
    query: prefixes + q,
    endpoint,
    resultMapper: makeObjectList,
    resultFormat
  })
}
