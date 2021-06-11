import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import InstanceHomePageTable from '../../main_layout/InstanceHomePageTable'
// import Network from '../../facet_results/Network'
// import ApexChart from '../../facet_results/ApexChart'
import Export from '../../facet_results/Export'
// import Recommendations from './Recommendations'
// import { coseLayout, cytoscapeStyle, preprocess } from '../../../configs/lawsampo/Cytoscape.js/NetworkConfig'
// import { createMultipleLineChartData } from '../../../configs/lawsampo/ApexCharts/LineChartConfig'
import { Route, Redirect } from 'react-router-dom'
// import { has } from 'lodash'
import ContextualContent from '../../main_layout/ContextualContent'

const styles = () => ({
  root: {
    width: '100%',
    height: '100%'
  },
  content: props => ({
    padding: 0,
    width: '100%',
    height: `calc(100% - ${props.layoutConfig.tabHeight}px)`,
    overflow: 'auto'
  }),
  spinnerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

/**
 * A component for generating a landing page for a single entity.
 * Customized for Semantic Finlex data
 */
class InstanceHomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      localID: null
    }
  }

  componentDidMount = () => this.fetchTableData()

  componentDidUpdate = prevProps => {
    // handle the case when the TABLE tab was not originally active
    const prevPathname = prevProps.routeProps.location.pathname
    const currentPathname = this.props.routeProps.location.pathname
    if (!this.hasTableData() && prevPathname !== currentPathname && currentPathname.endsWith('table')) {
      this.fetchTableData()
    }
    // handle browser's back button
    const localID = this.getLocalIDFromURL()
    if (this.state.localID !== localID) {
      this.fetchTableData()
    }
    if (this.props.resultClass === 'caselaw') {
      const hasData = this.props.tableData !== null && Object.values(this.props.tableData).length >= 1
      if (hasData && this.props.tableExternalData == null) {
        this.props.fetchSimilarDocumentsById({
          resultClass: this.props.resultClass,
          id: this.props.tableData.ecli,
          modelName: 'ensemble',
          resultSize: 10
        })
      }
    }
  }

  hasTableData = () => {
    const { instanceTableData } = this.props.perspectiveState
    return instanceTableData !== null && Object.values(instanceTableData).length >= 1
  }

  // getLocalIDFromSemanticFinlexURI = () => {
  //   // Special treatment, because there are slashes in the localID of Semantic Finlex URI
  //   let localID = this.props.routeProps.location.pathname.replace(`${this.props.rootUrl}/${this.props.resultClass}/page/`, '')
  //   var lastSlash = localID.lastIndexOf('/')
  //   // remove tab id from localID
  //   this.props.tabs.map(tab => {
  //     if (localID.substring(lastSlash + 1) === tab.id) {
  //       localID = localID.substring(0, lastSlash)
  //     }
  //   })
  // }

  mapDocuments = documents => {
    return documents.map(doc => {
      doc.prefLabel = doc.ecli.replace('ECLI:FI:', '')
      const lawSampoLocalId = doc.ecli.replace('ECLI:FI:', '').replace(/:/g, '_').toLowerCase()
      const instancePageLink = `/caselaw/page/caselaw_ecli_${lawSampoLocalId}`
      doc.dataProviderUrl = instancePageLink
      return doc
    })
  }

  fetchTableData = () => {
    const { perspectiveConfig } = this.props
    const localID = this.getLocalIDFromURL()
    this.setState({ localID })
    let uri = ''
    const base = 'http://ldf.fi/lawsampo'
    const resultClass = perspectiveConfig.id
    uri = `${base}/${localID}`
    this.props.fetchByURI({
      resultClass,
      facetClass: null,
      variant: null,
      uri: uri
    })
  }

  getLocalIDFromURL = () => {
    const locationArr = this.props.routeProps.location.pathname.split('/')
    let localID = locationArr.pop()
    this.props.perspectiveConfig.instancePageTabs.map(tab => {
      if (localID === tab.id) {
        localID = locationArr.pop() // pop again if tab id
      }
    })
    return localID
  }

  getVisibleRows = rows => {
    // const instanceClass = this.props.tableData.type ? this.props.tableData.type.id : ''
    const skipRows = new Set(['contentHTMLAnnotated', 'wordcloud', 'firstLevel'])
    rows = rows.filter(row => !skipRows.has(row.id))
    return rows
  }

  render = () => {
    const { classes, perspectiveState, perspectiveConfig, rootUrl, screenSize, layoutConfig } = this.props
    const { fetching, instanceTableExternalData } = perspectiveState
    let { instanceTableData } = perspectiveState
    const resultClass = perspectiveConfig.id
    const defaultInstancePageTab = perspectiveConfig.defaultInstancePageTab
      ? perspectiveConfig.defaultInstancePageTab : 'table'
    let hasTableData = this.hasTableData()
    if (this.props.resultClass === 'caselaw') {
      // Wait until results from SPARQL endpoint AND external API have arrived
      hasTableData = this.hasTableData() && instanceTableExternalData
      if (hasTableData) {
        instanceTableData.similarCourtDecicions = instanceTableExternalData.length > 0 ? this.mapDocuments(instanceTableExternalData) : '-'
      }
    }
    if (resultClass === 'caselaw' && hasTableData) {
      const abstractData = instanceTableData.abstract
      let abstractText
      if (Array.isArray(abstractData)) {
        if (abstractData[0].id) {
          const primary = abstractData.find(abstract => abstract.id === 'abstractPrimary')
          const secondary = abstractData.find(abstract => abstract.id === 'abstractSecondary')
          abstractText = [primary.text, secondary.text]
        }
      } else {
        if (abstractData.id) {
          abstractText = abstractData.text
        }
      }
      if (abstractText) {
        instanceTableData = { ...instanceTableData, abstract: abstractText }
      }
    }
    return (
      <div className={classes.root}>
        <PerspectiveTabs
          routeProps={this.props.routeProps}
          tabs={perspectiveConfig.instancePageTabs}
          screenSize={screenSize}
          layoutConfig={layoutConfig}
        />
        <Paper square className={classes.content}>
          {fetching && !hasTableData &&
            <div className={classes.spinnerContainer}>
              <CircularProgress style={{ color: purple[500] }} thickness={5} />
            </div>}
          {!hasTableData &&
            <>
              {/* <Typography variant='h6'>
                No data found for id: <span style={{ fontStyle: 'italic' }}>{this.state.localID}</span>
              </Typography> */}
            </>}
          {/* make sure that tableData exists before rendering any components */}
          {hasTableData &&
            <>
              <Route
                exact path={`${rootUrl}/${resultClass}/page/${this.state.localID}`}
                render={routeProps =>
                  <Redirect
                    to={{
                      pathname: `${rootUrl}/${resultClass}/page/${this.state.localID}/${defaultInstancePageTab}`,
                      hash: routeProps.location.hash
                    }}
                  />}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/content`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <ContextualContent
                    data={instanceTableData.contentHTMLAnnotated}
                    tableOfContents={instanceTableData.firstLevel}
                    tableOfContentsConfig={perspectiveState.properties.find(item => item.id === 'firstLevel')}
                    hasParts={instanceTableData.hasParts}
                    hasChapters={instanceTableData.hasChapters}
                    HTMLParserTask='addAnnotationTooltips'
                    referencedTerm={instanceTableData.referencedTerm}
                    wordcloudData={instanceTableData.referencedTerm}
                    wordcloudMaxWords={40}
                  />}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/table`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <InstanceHomePageTable
                    resultClass={resultClass}
                    data={instanceTableData}
                    properties={this.getVisibleRows(perspectiveState.properties)}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/export`}
                render={() =>
                  <Export
                    sparqlQuery={this.props.sparqlQuery}
                    pageType='instancePage'
                    id={instanceTableData.id}
                    layoutConfig={layoutConfig}
                  />}
              />
            </>}
        </Paper>
      </div>
    )
  }
}

InstanceHomePage.propTypes = {
  /**
   * Faceted search configs and results of this perspective.
   */
  perspectiveState: PropTypes.object.isRequired,
  /**
    * Leaflet map config and external layers.
    */
  leafletMapState: PropTypes.object.isRequired,
  /**
    * Redux action for fetching paginated results.
    */
  fetchPaginatedResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching all results.
    */
  fetchResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching facet values for statistics.
    */
  fetchFacetConstrainSelf: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers.
    */
  fetchGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers via backend.
    */
  fetchGeoJSONLayersBackend: PropTypes.func.isRequired,
  /**
    * Redux action for clearing external GeoJSON layers.
    */
  clearGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for fetching information about a single entity.
    */
  fetchByURI: PropTypes.func.isRequired,
  /**
    * Redux action for updating the page of paginated results.
    */
  updatePage: PropTypes.func.isRequired,
  /**
    * Redux action for updating the rows per page of paginated results.
    */
  updateRowsPerPage: PropTypes.func.isRequired,
  /**
    * Redux action for sorting the paginated results.
    */
  sortResults: PropTypes.func.isRequired,
  /**
    * Redux action for updating the active selection or config of a facet.
    */
  showError: PropTypes.func.isRequired,
  /**
    * Redux action for showing an error
    */
  updateFacetOption: PropTypes.func.isRequired,
  /**
    * Routing information from React Router.
    */
  routeProps: PropTypes.object.isRequired,
  /**
    * Perspective config.
    */
  perspective: PropTypes.object.isRequired,
  /**
    * State of the animation, used by TemporalMap.
    */
  animationValue: PropTypes.array.isRequired,
  /**
    * Redux action for animating TemporalMap.
    */
  animateMap: PropTypes.func.isRequired,
  /**
    * Current screen size.
    */
  screenSize: PropTypes.string.isRequired,
  /**
    * Root url of the application.
    */
  rootUrl: PropTypes.string.isRequired,
  layoutConfig: PropTypes.object.isRequired
}

export const InstanceHomePageComponent = InstanceHomePage

export default withStyles(styles)(InstanceHomePage)
