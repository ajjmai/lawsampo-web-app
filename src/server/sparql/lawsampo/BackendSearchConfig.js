import { sectionsPerspectiveConfig } from './perspective_configs/SectionsPerspectiveConfig'
import { statutesPerspectiveConfig } from './perspective_configs/StatutesPerspectiveConfig'
// import { legislationPerspectiveConfig } from './perspective_configs/LegislationPerspectiveConfig'
import { caselawPerspectiveConfig } from './perspective_configs/CaselawPerspectiveConfig'
import {
  statutesByYearQuery
  // statuteProperties
} from './sparql_queries/SparqlQueriesLegislation'
import {
  judgementsByYearQuery,
  judgementNetworkLinksQuery,
  judgementNetworkNodesQuery
} from './sparql_queries/SparqlQueriesCaselaw'
import { mapLineChart } from '../Mappers'

export const backendSearchConfig = {
  sections: sectionsPerspectiveConfig,
  statutes: statutesPerspectiveConfig,
  // legislation: legislationPerspectiveConfig,
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
    q: judgementNetworkLinksQuery,
    nodes: judgementNetworkNodesQuery,
    useNetworkAPI: true
  }
}
