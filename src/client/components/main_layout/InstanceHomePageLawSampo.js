import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'
import StatutesPageTable from '../perspectives/lawsampo/StatutesPageTable'
import CaselawPageTable from '../perspectives/lawsampo/CaselawPageTable'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    padding: theme.spacing(1),
    width: '100%',
    overflowY: 'auto'
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  sahaButton: {
    marginTop: theme.spacing(2)
  },
  spinnerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class InstanceHomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      localID: []
    }
  }

  componentDidMount = () => {
    const localID = this.props.routeProps.location.pathname.replace(`${this.props.rootUrl}/${this.props.resultClass}/page/`, '')
    this.setState({ localID })
    let base = ''
    switch (this.props.resultClass) {
      case 'statutes':
        base = 'http://data.finlex.fi/eli/sd'
        break
      case 'caselaw':
        base = 'http://data.finlex.fi/ecli'
        break
    }
    const uri = `${base}/${localID}`
    this.props.fetchByURI({
      resultClass: this.props.resultClass,
      facetClass: null,
      variant: null,
      uri: uri
    })
  }

  componentDidUpdate = () => {
    if (this.props.resultClass === 'caselaw') {
      const hasData = this.props.data !== null && Object.values(this.props.data).length >= 1
      if (hasData && this.props.relatedData == null) {
        this.props.fetchSimilarDocumentsById({
          resultClass: this.props.resultClass,
          id: this.props.data.ecli,
          modelName: 'ensemble',
          resultSize: 10
        })
      }
    }
  }

  renderTable = () => {
    let tableEl = null
    switch (this.props.resultClass) {
      case 'statutes':
        tableEl =
          <StatutesPageTable
            data={this.props.data}
          />
        break
      case 'caselaw':
        tableEl =
          <CaselawPageTable
            data={this.props.data}
            relatedData={this.props.relatedData}
          />
        break
      default:
        tableEl = <div />
    }
    return tableEl
  }

  render = () => {
    const { classes, data, isLoading } = this.props
    const hasData = data !== null && Object.values(data).length >= 1
    return (
      <div className={classes.root}>
        <Paper className={classes.content}>
          {isLoading &&
            <div className={classes.spinnerContainer}>
              <CircularProgress style={{ color: purple[500] }} thickness={5} />
            </div>}
          {!hasData &&
            <>
              <Typography variant='h4'>{this.state.instanceHeading}</Typography>
              <Divider className={classes.divider} />
              <Typography variant='h6'>
                No data found for id: <span style={{ fontStyle: 'italic' }}>{this.state.localID}</span>
              </Typography>
            </>}
          {hasData && this.renderTable()}
        </Paper>
      </div>
    )
  }
}

InstanceHomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchByURI: PropTypes.func.isRequired,
  fetchSimilarDocumentsById: PropTypes.func.isRequired,
  resultClass: PropTypes.string.isRequired,
  data: PropTypes.object,
  relatedData: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  routeProps: PropTypes.object.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default withStyles(styles)(InstanceHomePage)
