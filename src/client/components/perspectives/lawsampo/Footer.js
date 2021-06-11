import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import aaltoLogo from '../../../img/logos/Aalto_SCI_EN_13_BLACK_2_cropped.png'
import hyLogo from '../../../img/logos/university-of-helsinki-logo-transparent-black.png'
import heldigLogo from '../../../img/logos/heldig-logo-transparent-black.png'

import omLogo from '../../../img/lawsampo/om-logo_eng.png'
import vmLogo from '../../../img/lawsampo/vmlogo_en.png'
import anoppiLogo from '../../../img/lawsampo/Anoppi-logo-cropped.jpg'
import editaLogo from '../../../img/lawsampo/edita-logo-transparent.png'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    boxShadow: '0 -20px 20px -20px #333',
    borderRadius: 0
  },
  layout: props => ({
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: props.layoutConfig.footer.reducedHeight
      // height: 115, for two row footer
    },
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: props.layoutConfig.footer.defaultHeight
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1500 + theme.spacing(6))]: {
      width: 1500,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }),
  gridContainer: {
    height: '100%',
    marginTop: 0,
    marginBottom: 0
  },
  gridItem: props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '6px !important',
    paddingBottom: '6px !important',
    [theme.breakpoints.between('sm', props.layoutConfig.reducedHeightBreakpoint)]: {
      paddingTop: '0px !important',
      paddingBottom: '0px !important'
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '12px !important',
      paddingBottom: '12px !important'
    }
  }),
  link: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: props => ({
    height: 40,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: 40
    }
  }),
  aaltoLogo: props => ({
    height: 29,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: 34
    }
  }),
  hyLogo: props => ({
    height: 42,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: 45
    }
  }),
  heldigLogo: props => ({
    height: 30,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: 33
    }
  }),
  omLogo: props => ({
    height: 30,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      marginTop: -3,
      height: 42
    }
  }),
  vmLogo: props => ({
    height: 30,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: 45
    }
  }),
  editaLogo: props => ({
    marginRight: 39,
    height: 30,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: 33
    }
  }),
  anoppiLogo: props => ({
    height: 30,
    [theme.breakpoints.up(props.layoutConfig.reducedHeightBreakpoint)]: {
      height: 33
    }
  })

}))

/**
 * A component for creating a footer. The logos are imported inside this component.
 */
const Footer = props => {
  const classes = useStyles(props)
  return (
    <Paper className={classes.root}>
      <div className={classes.layout}>
        <Grid className={classes.gridContainer} container spacing={3}>
          <Grid item xs className={classes.gridItem}>
            <a className={classes.link} href='https://www.aalto.fi/en/school-of-science' target='_blank' rel='noopener noreferrer'>
              <img className={classes.aaltoLogo} src={aaltoLogo} alt='logo' />
            </a>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <a className={classes.link} href='https://oikeusministerio.fi/en' target='_blank' rel='noopener noreferrer'>
              <img className={classes.omLogo} src={omLogo} alt='logo' />
            </a>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <a className={classes.link} href='https://vm.fi/en' target='_blank' rel='noopener noreferrer'>
              <img className={classes.vmLogo} src={vmLogo} alt='logo' />
            </a>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <a className={classes.link} href='https://www.editapublishing.fi' target='_blank' rel='noopener noreferrer'>
              <img className={classes.editaLogo} src={editaLogo} alt='logo' />
            </a>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <a className={classes.link} href='https://www.helsinki.fi/en' target='_blank' rel='noopener noreferrer'>
              <img className={classes.hyLogo} src={hyLogo} alt='logo' />
            </a>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <a className={classes.link} href='https://www.helsinki.fi/en/helsinki-centre-for-digital-humanities' target='_blank' rel='noopener noreferrer'>
              <img className={classes.heldigLogo} src={heldigLogo} alt='logo' />
            </a>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <a className={classes.link} href='http://seco.cs.aalto.fi/projects/anoppi' target='_blank' rel='noopener noreferrer'>
              <img className={classes.logo} src={anoppiLogo} alt='logo' />
            </a>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

Footer.propTypes = {
  layoutConfig: PropTypes.object.isRequired
}

export default Footer
