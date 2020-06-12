import { statutesPerspectiveConfig } from './perspective_configs/StatutesPerspectiveConfig'
import { caselawPerspectiveConfig } from './perspective_configs/CaselawPerspectiveConfig'
import {
  judgementsByYearQuery,
  judgementNetworkLinksQuery,
  judgementNetworkNodesQuery
} from './sparql_queries/SparqlQueriesCaselaw'
import { mapLineChart } from '../Mappers'

export const backendSearchConfig = {
  statutes: statutesPerspectiveConfig,
  caselaw: caselawPerspectiveConfig,
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
