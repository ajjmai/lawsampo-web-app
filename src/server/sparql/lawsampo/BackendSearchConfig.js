import { sectionsPerspectiveConfig } from './perspective_configs/SectionsPerspectiveConfig'
import { statutesPerspectiveConfig } from './perspective_configs/StatutesPerspectiveConfig'
// import { legislationPerspectiveConfig } from './perspective_configs/LegislationPerspectiveConfig'
import { caselawPerspectiveConfig } from './perspective_configs/CaselawPerspectiveConfig'
import {
  knowledgeGraphMetadataQuery
// statutesByYearQuery
// statuteProperties
} from './sparql_queries/SparqlQueriesLegislation'
import {
  judgementsByYearQuery,
  judgementNetworkLinksQuery,
  judgementNetworkNodesQuery
} from './sparql_queries/SparqlQueriesCaselaw'
import { makeObjectList } from '../SparqlObjectMapper'
import { mapLineChart } from '../Mappers'

export const backendSearchConfig = {
  sections: sectionsPerspectiveConfig,
  statutes: statutesPerspectiveConfig,
  caselaw: caselawPerspectiveConfig,
  lawSampoKnowledgeGraphMetadata: {
    perspectiveID: 'statutes',
    q: knowledgeGraphMetadataQuery,
    resultMapper: makeObjectList
  },
  // statuteYearLineChart: {
  //   perspectiveID: 'statutes',
  //   q: statutesByYearQuery,
  //   filterTarget: 'instance',
  //   resultMapper: mapLineChart
  // },
  courtDecisionsByYear: {
    perspectiveID: 'caselaw',
    q: judgementsByYearQuery,
    filterTarget: 'judgement',
    resultMapper: mapLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  caselawInstancePageNetwork: {
    perspectiveID: 'caselaw',
    q: judgementNetworkLinksQuery,
    nodes: judgementNetworkNodesQuery,
    useNetworkAPI: true
  }
}
