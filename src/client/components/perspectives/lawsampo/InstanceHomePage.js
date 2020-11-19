import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import InstanceHomePageTable from '../../main_layout/InstanceHomePageTable'
// import Network from '../../facet_results/Network'
import Export from '../../facet_results/Export'
// import { coseLayout, cytoscapeStyle, preprocess } from '../../../configs/lawsampo/Cytoscape.js/NetworkConfig'
// import { createMultipleLineChartData } from '../../../configs/lawsampo/ApexCharts/LineChartConfig'
import { Route, Redirect } from 'react-router-dom'
import { has } from 'lodash'
// import { arrayToObject } from '../../../helpers/helpers'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%',
    height: 'calc(100% - 72px)',
    overflow: 'auto'
  },
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
      localID: []
    }
  }

  componentDidMount = () => this.fetchData()

  componentDidUpdate = prevProps => {
    if (prevProps.routeProps.location !== this.props.routeProps.location) {
      this.fetchData()
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

  // mapDocuments = documents => {
  //   return documents.map(doc => {
  //     doc.prefLabel = doc.ecli.replace('ECLI:FI:', '')
  //     let caselawUrl = '/caselaw/page/' + doc.sf_link.replace('https://data.finlex.fi/ecli/', '')
  //     caselawUrl = caselawUrl.replace('.html', '')
  //     doc.dataProviderUrl = caselawUrl // Link to semantic finlex: doc.sf_link
  //     return doc
  //   })
  // }

  // if (has(data, 'referencedTerm') && Array.isArray(data.referencedTerm)) {
  //   referencedTerm = arrayToObject({ array: data.referencedTerm, keyField: 'id' })
  // }

  fetchData = () => {
    const locationArr = this.props.routeProps.location.pathname.split('/')
    let localID = locationArr.pop()
    this.props.tabs.map(tab => {
      if (localID === tab.id) {
        localID = locationArr.pop() // pop again if tab id
      }
    })
    this.setState({ localID })
    const base = 'http://ldf.fi/lawsampo'
    const uri = `${base}/${localID}`
    this.props.fetchByURI({
      resultClass: this.props.resultClass,
      facetClass: null,
      variant: null,
      uri: uri
    })
  }

  getVisibleRows = rows => {
    const visibleRows = []
    const instanceClass = this.props.tableData.type ? this.props.tableData.type.id : ''
    rows.map(row => {
      if ((has(row, 'onlyForClass') && row.onlyForClass === instanceClass) ||
       !has(row, 'onlyForClass')) {
        visibleRows.push(row)
      }
    })
    return visibleRows
  }

  render = () => {
    const { classes, tableData, isLoading, resultClass, rootUrl } = this.props
    const hasTableData = tableData !== null && Object.values(tableData).length >= 1
    return (
      <div className={classes.root}>
        <PerspectiveTabs
          routeProps={this.props.routeProps}
          tabs={this.props.tabs}
          screenSize={this.props.screenSize}
        />
        <Paper className={classes.content}>
          {isLoading &&
            <div className={classes.spinnerContainer}>
              <CircularProgress style={{ color: purple[500] }} thickness={5} />
            </div>}
          {!hasTableData &&
            <>
              <Typography variant='h6'>
                No data found for id: <span style={{ fontStyle: 'italic' }}>{this.state.localID}</span>
              </Typography>
            </>}
          {/* make sure that tableData exists before rendering any components */}
          {hasTableData &&
            <>
              <Route
                exact path={`${rootUrl}/${resultClass}/page/${this.state.localID}`}
                render={() => <Redirect to={`${rootUrl}/${resultClass}/page/${this.state.localID}/table`} />}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/table`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <InstanceHomePageTable
                    resultClass={resultClass}
                    data={tableData}
                    properties={this.getVisibleRows(this.props.properties)}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/export`}
                render={() =>
                  <Export
                    sparqlQuery={this.props.sparqlQuery}
                    pageType='instancePage'
                    id={tableData.id}
                  />}
              />
            </>}
        </Paper>
      </div>
    )
  }
}

InstanceHomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchByURI: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  resultClass: PropTypes.string.isRequired,
  tableData: PropTypes.object,
  tableExternalData: PropTypes.array,
  results: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  resultUpdateID: PropTypes.number.isRequired,
  sparqlQuery: PropTypes.string,
  properties: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  routeProps: PropTypes.object.isRequired,
  screenSize: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired,
  fetchGeoJSONLayers: PropTypes.func.isRequired,
  fetchGeoJSONLayersBackend: PropTypes.func.isRequired,
  clearGeoJSONLayers: PropTypes.func.isRequired,
  leafletMap: PropTypes.object.isRequired,
  showError: PropTypes.func.isRequired,
  fetchSimilarDocumentsById: PropTypes.func.isRequired
}

export default withStyles(styles)(InstanceHomePage)
