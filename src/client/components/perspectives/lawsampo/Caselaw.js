import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Route, Redirect } from 'react-router-dom'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import ResultTable from '../../facet_results/ResultTable'
import ApexChart from '../../facet_results/ApexChart'
import Export from '../../facet_results/Export'
import { createSingleLineChartData } from '../../../configs/lawsampo/ApexCharts/LineChartConfig'

const processAbstracts = results => {
  results.forEach(item => {
    let abstractText
    if (Array.isArray(item.abstract)) {
      if (item.abstract[0].id) {
        const primary = item.abstract.find(abstract => abstract.id === 'abstractPrimary')
        const secondary = item.abstract.find(abstract => abstract.id === 'abstractSecondary')
        abstractText = [primary.text, secondary.text]
      }
    } else {
      if (item.abstract.id) {
        abstractText = item.abstract.text
      }
    }
    if (abstractText) {
      item.abstract = abstractText
    }
  })
  return results
}

const Caselaw = props => {
  const { rootUrl, perspective } = props
  let modifiedPaginatedResults = props.facetResults.paginatedResults
  if (props.facetResults.paginatedResults.length > 0) {
    modifiedPaginatedResults = processAbstracts(props.facetResults.paginatedResults)
  }
  const modifiedResults = { ...props.facetResults, paginatedResults: modifiedPaginatedResults }

  return (
    <>
      <PerspectiveTabs
        routeProps={props.routeProps}
        tabs={props.perspective.tabs}
        screenSize={props.screenSize}
      />
      <Route
        exact path={`${rootUrl}/${perspective.id}/faceted-search`}
        render={() => <Redirect to={`${rootUrl}/${perspective.id}/faceted-search/table`} />}
      />
      <Route
        path={`${rootUrl}/${perspective.id}/faceted-search/table`}
        render={routeProps =>
          <ResultTable
            data={modifiedResults}
            facetUpdateID={props.facetData.facetUpdateID}
            resultClass='caselaw'
            facetClass='caselaw'
            fetchPaginatedResults={props.fetchPaginatedResults}
            updatePage={props.updatePage}
            updateRowsPerPage={props.updateRowsPerPage}
            sortResults={props.sortResults}
            routeProps={routeProps}
            rootUrl={rootUrl}
          />}
      />
      <Route
        path={`${rootUrl}/${perspective.id}/faceted-search/by_year`}
        render={routeProps =>
          <ApexChart
            pageType='facetResults'
            rawData={props.facetResults.results}
            rawDataUpdateID={props.facetResults.resultUpdateID}
            facetUpdateID={props.facetData.facetUpdateID}
            fetching={props.facetResults.fetching}
            fetchData={props.fetchResults}
            createChartData={createSingleLineChartData}
            title={intl.get(`perspectives.${perspective.id}.courtDecisionsByYear.title`)}
            xaxisTitle={intl.get(`perspectives.${perspective.id}.courtDecisionsByYear.xaxisTitle`)}
            yaxisTitle={intl.get(`perspectives.${perspective.id}.courtDecisionsByYear.yaxisTitle`)}
            seriesTitle={intl.get(`perspectives.${perspective.id}.courtDecisionsByYear.seriesTitle`)}
            resultClass='courtDecisionsByYear'
            facetClass='caselaw'
          />}
      />
      <Route
        path={`${rootUrl}/${perspective.id}/faceted-search/export`}
        render={() =>
          <Export
            data={props.facetResults}
            resultClass='caselaw'
            facetClass='caselaw'
            pageType='facetResults'
            fetchPaginatedResults={props.fetchPaginatedResults}
            updatePage={props.updatePage}
          />}
      />
    </>
  )
}

Caselaw.propTypes = {
  facetResults: PropTypes.object.isRequired,
  placesResults: PropTypes.object,
  leafletMapLayers: PropTypes.object.isRequired,
  facetData: PropTypes.object.isRequired,
  fetchResults: PropTypes.func.isRequired,
  fetchGeoJSONLayers: PropTypes.func.isRequired,
  fetchPaginatedResults: PropTypes.func.isRequired,
  fetchByURI: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  updateRowsPerPage: PropTypes.func.isRequired,
  sortResults: PropTypes.func.isRequired,
  routeProps: PropTypes.object.isRequired,
  updateFacetOption: PropTypes.func.isRequired,
  perspective: PropTypes.object.isRequired,
  animationValue: PropTypes.array.isRequired,
  animateMap: PropTypes.func.isRequired,
  screenSize: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default Caselaw
