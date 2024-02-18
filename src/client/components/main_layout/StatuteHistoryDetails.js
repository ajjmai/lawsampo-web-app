import React, { useRef } from 'react'

import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import HTMLParser from '../../helpers/HTMLParser'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { Box, Stack } from '@mui/material'
import Link from '@mui/material/Link'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#bdbdbd'
  },
  gridItem: props => ({
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%'
    },
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  }),
  textOuterContainer: props => ({
    height: 400,
    overflow: 'auto',
    marginTop: -8,
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%',
      marginTop: 'initial'
    }
  }),
  textInnerContainer: {
    padding: theme.spacing(2)
  },
  statuteHistoryItem: {
    padding: theme.spacing(1)
  },
  metaDataContainer: {
    backgroundColor: '#dfdfdf',
    overflow: 'hidden',
    padding: theme.spacing(1)
  }
}))

const StatuteHistoryDetails = props => {
  const classes = useStyles(props)
  const { testData } = props
  const sectionRefs = useRef({})
  const parser = new HTMLParser({ ...props, classes, sectionRefs })
  console.log(testData)

  const parseContent = (data, versionNumber) => {
    return Object.keys(data).reduce((result, key) => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        return result + parseContent(data[key], versionNumber)
      }
      if (key === 'content') {
        let content = data.content
        if (['paragraph', 'subparagraph'].includes(data.type) && data.number !== 0) {
          content = `${data.number}) ${content}`
        }
        if (data.versionNumber === versionNumber) {
          content = `<strong>${content}</strong>`
        }
        return result + `<p>${content}</p>`
      }
      return result
    }, '')
  }

  return (
    <Grid className={classes.gridItem} item xs={12} sm={12} md={8}>
      <Paper className={classes.textOuterContainer}>
        <div className={classes.textInnerContainer}>
          <Typography variant='h6' component='h1'>{props.sectionNumber} §</Typography>
          <Stack spacing={3}>
            {testData.map(item => (
              <Paper key={item.id} variant='outlined'>
                <Box className={classes.metaDataContainer}>
                  <Grid container spacing={4}>
                    <Grid item>
                      <Typography variant='body2'>Versio: <Link href={item.finlexUrl} target='_blank' rel='noreferrer'>{item.id}</Link> {item.version === 'Original' && '(ALKUPERÄINEN)'}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='body2'>Voimaantulo:
                        {item.entryIntoForce ? <strong> {format(new Date(item.entryIntoForce), 'dd.MM.yyyy')}</strong> : '-'}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='body2'>Esityöt: {item.he ? <Link href={item.heUrl} target='_blank' rel='noreferrer'>{item.he}</Link> : '-'}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <div className={classes.statuteHistoryItem}>
                  {parser.parseHTML(parseContent(item.hasParts, item.versionNumber))}
                </div>
              </Paper>
            ))}
          </Stack>
        </div>
      </Paper>
    </Grid>
  )
}

export default StatuteHistoryDetails
