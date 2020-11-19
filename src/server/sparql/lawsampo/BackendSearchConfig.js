import { legislationPerspectiveConfig } from './perspective_configs/LegislationPerspectiveConfig'
import { caselawPerspectiveConfig } from './perspective_configs/CaselawPerspectiveConfig'
import {
  statutesByYearQuery,
  statuteProperties
} from './sparql_queries/SparqlQueriesLegislation'
import {
  judgementsByYearQuery,
  judgementNetworkLinksQuery,
  judgementNetworkNodesQuery
} from './sparql_queries/SparqlQueriesCaselaw'
import { mapLineChart } from '../Mappers'

export const backendSearchConfig = {
  legislation: legislationPerspectiveConfig,
  caselaw: caselawPerspectiveConfig,
  statutes: {
    perspectiveID: 'legislation',
    instance: {
      properties: statuteProperties,
      relatedInstances: ''
    }
  },
  statuteYearLineChart: {
    perspectiveID: 'legislation',
    q: statutesByYearQuery,
    filterTarget: 'instance',
    resultMapper: mapLineChart
  },
  caselawByYear: {
    perspectiveID: 'caselaw',
    q: judgementsByYearQuery,
    filterTarget: 'judgement',
    resultMapper: mapLineChart
  },
  caselawInstancePageNetwork: {
    perspectiveID: 'caselaw',
    q: judgementNetworkLinksQuery,
    nodes: judgementNetworkNodesQuery,
    useNetworkAPI: true
  }
}
