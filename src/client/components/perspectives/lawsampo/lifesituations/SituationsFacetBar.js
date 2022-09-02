import React from 'react'
import { withStyles } from '@mui/styles'
import SituationsSearch from './SituationsSearch'
import SituationsKeywords from './SituationsKeywords'
import SituationsCategory from './SituationsCategory'
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, IconButton, Tooltip, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import clsx from 'clsx'
import intl from 'react-intl-universal'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%'
  },
  facetInfoContainer: {
    padding: theme.spacing(1),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflowX: 'auto'
  },
  accordionDetails: {
    paddingTop: 0,
    paddingLeft: theme.spacing(1),
    flexDirection: 'column'
  },
  two: {
    height: 60
  },
  three: {
    height: 108
  },
  four: {
    height: 135
  },
  five: {
    height: 150
  },
  six: {
    height: 180
  },
  ten: {
    height: 357
  },
  accordionSummaryRoot: {
    paddingLeft: theme.spacing(1),
    cursor: 'default !important'
  },
  accordionSummaryContent: {
    flexDirection: 'column'
  },
  chip: {
    margin: theme.spacing(0.5)
  }
})

class SituationFacetBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      initialActive: true,
      keywordsDisabled: true,
      categoriesDisabled: true
    }
  }

  componentDidMount = () => {
    this.props.fetchSituations()
    const { pathname } = this.props.location
    let page = 'statutes'
    if (pathname.endsWith('cases')) { page = 'cases' }
    this.props.updateResultType({ resultType: page })
  }

  componentDidUpdate = prevProps => {
    if (prevProps.facetData.query !== this.props.facetData.query ||
      prevProps.facetData.selectedSituation !== this.props.facetData.selectedSituation) {
      let initialActive = true
      if (this.props.facetData.query !== '' || this.props.facetData.selectedSituation !== null) { initialActive = false }
      // console.log(this.props.facetData)
      // console.log((this.props.facetData.categories.length === 0))
      this.setState({
        initialActive: initialActive,
        keywordsDisabled: initialActive,
        categoriesDisabled: (this.props.facetData.query === '' && this.props.facetData.categories.length === 0)
      })
    }
    const newPath = this.props.location.pathname
    const oldPath = prevProps.location.pathname
    if (newPath !== oldPath) {
      let page = 'statutes'
      if (newPath.endsWith('cases')) { page = 'cases' }
      this.props.updateResultType({ resultType: page })
      if (this.props.facetData.query !== '' || this.props.facetData.selectedSituation != null) {
        this.props.fetchSituationResults()
      }
    }
  }

  handleInitialDelete = () => {
    this.props.clearAllSituations()
  }

  handleClearKeywords = () => {
    this.props.setSituationKeywords({ negativeKeywords: [], positiveKeywords: [] })
    this.props.fetchSituationResults()
  }

  getActiveInitialData = (initialActive) => {
    const { classes } = this.props
    if (!initialActive) {
      let label = ''
      if (this.props.facetData.query !== '') {
        label = this.props.facetData.query
      } else if (this.props.facetData.selectedSituation !== null) {
        label = this.props.facetData.selectedSituation.prefLabel
      }
      return (
        <Chip
          key='initial-chip'
          icon={null}
          label={label}
          className={classes.chip}
          onDelete={this.handleInitialDelete}
          color='primary'
        />
      )
    }
  }

  render () {
    const { classes, perspective } = this.props
    let initialActive = true
    if (this.props.facetData.query !== '' || this.props.facetData.selectedSituation !== null) { initialActive = false }
    const keywordsDisabled = initialActive
    const categoriesDisabled = (this.props.facetData.query === '' && this.props.facetData.categories.length === 0) || (this.props.facetData.query === '' && this.props.facetData.selectedSituation != null)
    const isKeywordsClearVisible = (this.props.facetData.selectedPositiveKeywords.length + this.props.facetData.selectedNegativeKeywords.length) > 0
    return (
      <>
        <Accordion
          key='initial'
          expanded={initialActive}
        >
          <AccordionSummary
            classes={{
              root: classes.accordionSummaryRoot,
              content: classes.accordionSummaryContent
            }}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <div className={classes.headingContainer}>
              <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.facetBar.searchTitle`)}</Typography>
              <Tooltip
                title={intl.get(`perspectives.${perspective.id}.facetBar.searchTitleInfo`)}
                enterDelay={300}
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              {this.getActiveInitialData(initialActive)}
            </div>

          </AccordionSummary>
          <AccordionDetails
            className={clsx(classes.accordionDetails)}
          >
            <div>
              <div className={classes.facetInfoContainer}>
                <SituationsSearch
                  perspective={this.props.perspective}
                  query={this.props.facetData.query}
                  selectedSituation={this.props.facetData.selectedSituation}
                  situations={this.props.facetData.situations}
                  updateSituationQuery={this.props.updateSituationQuery}
                  updateSituationSelected={this.props.updateSituationSelected}
                  fetchSituationResults={this.props.fetchSituationResults}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          key='extra-categories'
          expanded={!categoriesDisabled}
          disabled={categoriesDisabled}
        >
          <AccordionSummary
            classes={{
              root: classes.accordionSummaryRoot,
              content: classes.accordionSummaryContent
            }}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <div className={classes.headingContainer}>
              <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.facetBar.suggestedCategories`)}</Typography>
              <Tooltip
                title={intl.get(`perspectives.${perspective.id}.facetBar.suggestedCategoriesInfo`)}
                enterDelay={300}
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

            </div>
          </AccordionSummary>
          <AccordionDetails
            className={clsx(classes.root, classes.accordionDetails)}
          >
            <div>
              <div className={classes.facetInfoContainer}>
                <SituationsCategory
                  isFetching={this.props.facetData.isFetching}
                  fetchSituationResults={this.props.fetchSituationResults}
                  selectedSituation={this.props.facetData.selectedSituation}
                  categories={this.props.facetData.categories}
                  updateSituationSelected={this.props.updateSituationSelected}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          key='extra-keywords'
          expanded={!keywordsDisabled}
          disabled={keywordsDisabled}
        >
          <AccordionSummary
            classes={{
              root: classes.accordionSummaryRoot,
              content: classes.accordionSummaryContent
            }}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <div className={classes.headingContainer}>
              <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.facetBar.suggestedKeywords`)}</Typography>
              <Tooltip
                title={intl.get(`perspectives.${perspective.id}.facetBar.suggestedKeywordsInfo`)}
                enterDelay={300}
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              {isKeywordsClearVisible && (
                <Button
                  onClick={this.handleClearKeywords}
                  variant='contained'
                  color='secondary'
                  size='small'
                >{intl.get(`perspectives.${perspective.id}.facetBar.clear`)}
                </Button>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails
            className={clsx(classes.accordionDetails)}
          >
            <div>
              <div className={classes.facetInfoContainer}>
                <SituationsKeywords
                  perspective={this.props.perspective}
                  isFetching={this.props.facetData.isFetching}
                  fetchSituationResults={this.props.fetchSituationResults}
                  selectedKeywords={this.props.facetData.selectedKeywords}
                  facetData={this.props.facetData}
                  setSituationKeywords={this.props.setSituationKeywords}
                  keywords={this.props.facetData.keywords}
                  addSituationKeyword={this.props.addSituationKeyword}
                  removeSituationKeyword={this.props.removeSituationKeyword}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

      </>
    )
  }
}

export default withStyles(styles)(SituationFacetBar)
