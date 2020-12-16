import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MainCard from '../../main_layout/MainCard'
import bannerImage from '../../../img/lawsampo/lawsampo-banner-3000px.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px)',
      overflow: 'auto'
    }
  },
  banner: {
    background: `linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(${bannerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    height: 225,
    [theme.breakpoints.up('xl')]: {
      height: 400
    },
    width: '100%',
    boxShadow: '0 -15px 15px 0px #bdbdbd inset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerContent: {
    display: 'inline-block',
    color: '#fff'
  },
  bannerHeading: {
    display: 'flex',
    justifyContent: 'center'
  },
  bannerSubheading: {
    marginTop: theme.spacing(1.5),
    display: 'flex'
    // '& div': {
    //   flexGrow: 1,
    //   width: 0
    // }
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1280 + theme.spacing(6))]: {
      maxWidth: 1280,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  heroContent: {
    // paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  },
  licenceText: {
    marginTop: theme.spacing(0.5),
    fontSize: '0.7em'
  },
  lowerRow: {
    marginTop: theme.spacing(1)
  },
  selectInternalPerspective: {
    marginBottom: theme.spacing(1)
  },
  selectExternalPerspective: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  licenceTextContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
}))

const Main = props => {
  const { perspectives, screenSize } = props
  const internalPerspectives = []
  const externalPerspectives = []
  perspectives.map(perspective => {
    if (perspective.externalUrl) {
      externalPerspectives.push(perspective)
    } else {
      internalPerspectives.push(perspective)
    }
  })

  const classes = useStyles(props)
  let headingVariant = 'h5'
  let subheadingVariant = 'body1'
  let descriptionVariant = 'body1'
  switch (screenSize) {
    case 'xs':
      headingVariant = 'h5'
      subheadingVariant = 'body1'
      descriptionVariant = 'body1'
      break
    case 'sm':
      headingVariant = 'h4'
      subheadingVariant = 'h6'
      descriptionVariant = 'h6'
      break
    case 'md':
      headingVariant = 'h3'
      subheadingVariant = 'h6'
      descriptionVariant = 'h6'
      break
    case 'lg':
      headingVariant = 'h2'
      subheadingVariant = 'h5'
      descriptionVariant = 'h6'
      break
    case 'xl':
      headingVariant = 'h1'
      subheadingVariant = 'h4'
      descriptionVariant = 'h6'
      break
  }

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <div className={classes.bannerContent}>
          <div className={classes.bannerHeading}>
            <Typography component='span' variant={headingVariant} align='center'>
              {intl.getHTML('appTitle.long')}
            </Typography>
          </div>
          <div className={classes.bannerSubheading}>
            <div>
              <Typography component='h2' variant={subheadingVariant} align='center'>
                {intl.getHTML('appTitle.subheading')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.layout}>
        <Typography className={classes.selectInternalPerspective} variant={descriptionVariant} align='center' color='textPrimary'>
          {intl.get('selectPerspective')}
        </Typography>
        <Grid
          container spacing={screenSize === 'sm' ? 2 : 1}
          justify='center'
        >
          {internalPerspectives.map(perspective =>
            <MainCard
              key={perspective.id}
              perspective={perspective}
              cardHeadingVariant='h4'
              rootUrl={props.rootUrl}
            />)}
        </Grid>
        <Typography className={classes.selectExternalPerspective} variant={descriptionVariant} align='center' color='textPrimary'>
          {intl.get('selectPerspectiveExternal')}
        </Typography>
        <Grid
          container spacing={screenSize === 'sm' ? 2 : 1}
          justify='center'
        >
          {externalPerspectives.map(perspective =>
            <MainCard
              key={perspective.id}
              perspective={perspective}
              cardHeadingVariant='h4'
              rootUrl={props.rootUrl}
            />)}
        </Grid>
        <div className={classes.licenceTextContainer}>
          <Typography className={classes.licenceText}>{intl.getHTML('mainPageImageLicence')}</Typography>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {
  perspectives: PropTypes.array.isRequired,
  screenSize: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default Main
