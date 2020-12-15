import React, { useRef, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import SectionOfALawListCollapsible from '../facet_results/SectionOfALawListCollapsible'
import HTMLParser from '../../helpers/HTMLParser'
import Wordcloud from '../facet_results/WordCloud'
import { Typography } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { has } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#bdbdbd'
  },
  mainContainer: {
    marginTop: theme.spacing(0.25),
    height: 'calc(100% - 30px)',
    maxWidth: 1600
  },
  gridItem: {
    height: '100%'
  },
  text: {
    padding: theme.spacing(2),
    height: '100%',
    overflow: 'auto'
  },
  tableOfContents: {
    padding: theme.spacing(2),
    height: 'calc(60% - 24px)',
    overflow: 'auto'
  },
  wordCloud: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    height: 'calc(40% - 16px)'
  },
  wordCloudContainer: {
    width: '100%'
  },
  tooltip: {
    maxWidth: 500
  },
  tooltipContent: {
    padding: theme.spacing(1)
  },
  tooltipList: {
    listStylePosition: 'inside',
    paddingLeft: 0
  }
}))

const ContextualContent = props => {
  const classes = useStyles()
  let { data } = props
  const { tableOfContents, hasParts, hasChapters, wordcloudData, wordcloudMaxWords } = props
  const {
    makeLink, externalLink, sortValues, sortBy, numberedList, columnId, linkAsButton,
    showSource, sourceExternalLink
  } = props.tableOfContentsConfig
  const location = useLocation()
  const sectionRefs = useRef({})

  // Fuseki splits long HTML texts, combine them here
  if (Array.isArray(data)) {
    data = data.join('')
    data = false
  }
  const parser = new HTMLParser({ ...props, classes, sectionRefs })
  data = parser.parseHTML(data)

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const ref = sectionRefs.current
        if (has(ref, location.hash)) {
          ref[location.hash].scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }, [location.hash])

  return (
    <div className={classes.root}>
      <Grid className={classes.mainContainer} container spacing={1}>
        <Grid className={classes.gridItem} item xs={8}>
          <Paper className={classes.text}>
            {data}
          </Paper>
        </Grid>
        <Grid className={classes.gridItem} item xs={4}>
          <Paper className={classes.tableOfContents}>
            <Typography variant='h6' component='h2'>Voimassa olevat pykälät</Typography>
            <SectionOfALawListCollapsible
              data={tableOfContents}
              hasParts={hasParts === 'true'}
              hasChapters={hasChapters === 'true'}
              makeLink={makeLink}
              externalLink={externalLink}
              sortValues={sortValues}
              sortBy={sortBy}
              numberedList={numberedList}
              columnId={columnId}
              expanded
              linkAsButton={linkAsButton}
              showSource={showSource}
              sourceExternalLink={sourceExternalLink}
              collapsible={false}
              onlyHashLinks
            />
          </Paper>
          <Paper className={classes.wordCloud}>
            <Typography variant='h6' component='h2'>Käsitepilvi</Typography>
            <div className={classes.wordCloudContainer}>
              <Wordcloud data={wordcloudData} maxWords={wordcloudMaxWords} />
            </div>
          </Paper>
        </Grid>
      </Grid>

    </div>
  )
}

export default ContextualContent
