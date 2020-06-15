import { statutesPerspectiveConfig } from './perspective_configs/StatutesPerspectiveConfig'
import { caselawPerspectiveConfig } from './perspective_configs/CaselawPerspectiveConfig'
import {
  statutesByYearQuery
} from './sparql_queries/SparqlQueriesStatutes'
import {
  judgementsByYearQuery,
  judgementNetworkLinksQuery,
  judgementNetworkNodesQuery
} from './sparql_queries/SparqlQueriesCaselaw'
import { mapLineChart } from '../Mappers'

export const backendSearchConfig = {
  statutes: statutesPerspectiveConfig,
  caselaw: caselawPerspectiveConfig,
  statuteYearLineChart: {
    perspectiveID: 'statutes',
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
    links: judgementNetworkLinksQuery,
    nodes: judgementNetworkNodesQuery,
    useNetworkAPI: true
  }
}
