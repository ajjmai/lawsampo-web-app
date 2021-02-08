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
import { mapLineChartFillEmptyValues } from '../Mappers'

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
  //   resultMapper: mapLineChartFillEmptyValues
  // },
  courtDecisionsByYear: {
    perspectiveID: 'caselaw',
    q: judgementsByYearQuery,
    filterTarget: 'judgement',
    resultMapper: mapLineChartFillEmptyValues
  },
  caselawInstancePageNetwork: {
    perspectiveID: 'caselaw',
    q: judgementNetworkLinksQuery,
    nodes: judgementNetworkNodesQuery,
    useNetworkAPI: true
  }
}
