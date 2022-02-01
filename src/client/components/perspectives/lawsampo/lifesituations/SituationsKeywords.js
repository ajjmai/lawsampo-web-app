import React from 'react'
import { withStyles } from '@mui/styles'
import intl from 'react-intl-universal'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { findIndex } from 'lodash'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { Button, List, ListItem, ListItemIcon, ListItemText, Radio } from '@mui/material'
import Link from '@mui/material/Link'

const styles = theme => ({
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%'
  },
  selectedKeyword: {
    backgroundColor: '#3f51b5',
    color: '#ffffff'
  },
  selectedNegativeKeyword: {
    backgroundColor: '#f50057',
    color: '#ffffff'
  },
  facetSearchContainer: {
    width: '100%',
    height: 44,
    display: 'flex',
    alignItems: 'center'
  },
  facetSearchIconButton: {
    padding: 10
  },
  treeContainer: {
    flex: 1
  },
  treeContainerWithSearchField: {
    width: '100%',
    flex: 1
  },
  spinnerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkbox: {
    padding: 0,
    marginLeft: 6,
    marginRight: 4
  },
  searchMatch: {
    boxShadow: '0 2px 0 #673ab7'
  },
  facetLink: {
    textDecoration: 'inherit'
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  keywordLink: {
    color: '#000000'
  }
})

/**
 * A component for text search in client-side faceted search architecture.
 */
class SituationsKeywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      treeData: this.props.keywords,
      selectedKeyword: null,
      deletedKeywords: [],
      anchorEl: null,
      itemState: []
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.keywords !== this.props.keywords ||
      prevProps.isFetching !== this.props.isFetching) {
      this.setState({
        selectedKeyword: null,
        treeData: this.props.keywords
      })
    }
  }

  handleCheckboxChange = treeObj => event => {
    this.props.addSituationKeyword({ keyword: treeObj.node })
    this.props.fetchSituationResults()
  }

  handleChange = treeObj => event => {
    const deletedKeywords = this.state.deletedKeywords
    // remove from history if added again
    const historyIndex = findIndex(deletedKeywords, { id: treeObj.node.uri })
    if (historyIndex >= 0) {
      deletedKeywords.splice(historyIndex, 1)
    }
    this.setState({ selectedKeyword: treeObj.node, deletedKeywords })
    this.props.addSituationKeyword({ keyword: treeObj.node })
    this.props.fetchSituationResults()
  }

  generateLabel = node => {
    return (
      <>
        <Typography variant='body2'>
          {node.prefLabel}
        </Typography>
      </>
    )
  }

 generateNodeProps = treeObj => {
   // const { node } = treeObj

   return {
     title: (
       <FormControlLabel
         control={
           <Radio
             onChange={this.handleChange(treeObj)}
           />
         }
         value={treeObj.node.uri}
         label={this.generateLabel(treeObj.node)}
       />
     )
   }
 }

  getUpdateButton = () => {
    // filter doesn't include holes from the sparse array
    const { perspective } = this.props
    const isDisabled = this.state.itemState.filter(x => true).length === 0
    return (
      <FormControl>
        <Button
          onClick={this.handleAddKeywords}
          disabled={isDisabled}
          variant='contained'
          color='primary'
          size='small'
        >{intl.get(`perspectives.${perspective.id}.facetBar.addToSelected`)}
        </Button>
      </FormControl>
    )
  }

  getKeywordListItem = (e, index) => {
    const { classes } = this.props
    // const item = null
    let rootClassPositive = ''
    let rootClassNegative = ''
    const itemState = this.state.itemState[index]
    if (itemState !== undefined) {
      if (itemState === 0) {
        rootClassNegative = classes.selectedNegativeKeyword
      } else {
        rootClassPositive = classes.selectedKeyword
      }
    }

    return (
      <ListItem key={e.uri}>
        <ListItemIcon
          edge='start'
        >
          <AddIcon classes={{ root: rootClassPositive }} onClick={(event) => this.togglePending(e, index, 1)} />
        </ListItemIcon>
        <ListItemText>
          <Link href={e.uri} target='_blank' classes={{ root: classes.keywordLink }} rel='noreferrer'>
            {e.prefLabel}
          </Link>
          <sub>({e.weight.toFixed(2)})</sub>
        </ListItemText>
        <ListItemIcon
          edge='end'
        >
          <RemoveIcon classes={{ root: rootClassNegative }} onClick={(event) => this.togglePending(e, index, 0)} />
        </ListItemIcon>
      </ListItem>
    )
  }

  handleDelete (item, index) {
    const deletedKeywords = this.state.deletedKeywords
    // only add if not already there
    const historyIndex = findIndex(deletedKeywords, { id: item.uri })
    if (historyIndex < 0) {
      deletedKeywords.push(item)
      if (deletedKeywords.length > 10) {
        deletedKeywords.splice(10, 1)
      }
      this.setState({ deletedKeywords })
    }
    this.props.removeSituationKeyword({ facetClass: this.props.facetClass, keyword: item, keywordIndex: index })
    this.props.fetchSituationResults()
  }

  getDeletedKeywordButtons = () => {
    return this.state.deletedKeywords.map((item, index) => {
      return (
        <MenuItem key={item.uri} onClick={e => { this.addKeywordFromHistory(item, index) }}>
          {item.prefLabel}
        </MenuItem>
      )
    })
  }

  togglePending = (item, index, type) => {
    const itemState = this.state.itemState
    const currentState = itemState[index]
    if (currentState !== undefined) {
      if (type === currentState) {
        delete itemState[index]
      } else {
        itemState[index] = +!currentState
      }
    } else {
      itemState[index] = type
    }
    this.setState({ itemState })
  }

  addKeywordFromHistory = (item, index) => {
    const deletedKeywords = this.state.deletedKeywords
    // remove from list
    deletedKeywords.splice(index, 1)
    this.setState({
      anchorEl: null,
      deletedKeywords: deletedKeywords
    })
    // always adding as positive for now
    const negativeKeywords = this.props.facetData.selectedNegativeKeywords
    const positiveKeywords = this.props.facetData.selectedPositiveKeywords
    positiveKeywords.push(item)
    this.props.setSituationKeywords({ positiveKeywords, negativeKeywords })
    this.props.fetchSituationResults()
  }

  handleMenuButtonClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleAddKeywords = e => {
    // map includes "holes" from the sparse array
    const positiveKeywords = this.props.facetData.selectedPositiveKeywords
    const negativeKeywords = this.props.facetData.selectedNegativeKeywords
    this.state.itemState.forEach((i, index) => {
      if (i !== undefined) {
        if (i === 1) {
          positiveKeywords.push(this.state.treeData[index])
        } else {
          negativeKeywords.push(this.state.treeData[index])
        }
      }
    })
    this.setState({ itemState: [] })
    this.props.setSituationKeywords({ positiveKeywords, negativeKeywords })
    this.props.fetchSituationResults()
  }

  render () {
    const { isFetching, classes, perspective, facetData } = this.props
    const { deletedKeywords, anchorEl, treeData } = this.state
    const deletedKeywordsOpen = Boolean(anchorEl)
    return (
      <>
        {isFetching
          ? (
            <div className={classes.spinnerContainer}>
              <CircularProgress />
            </div>
            )
          : (
            <>
              <div className={classes.headingContainer}>
                <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.facetBar.selected`)}:</Typography>
                {deletedKeywords.length > 0 &&
                  <>
                    <Tooltip disableFocusListener title={intl.get(`perspectives.${perspective.id}.removedKeywords`)}>
                      <IconButton
                        aria-label='test'
                        aria-owns={deletedKeywordsOpen ? 'facet-option-menu' : undefined}
                        aria-haspopup='true'
                        onClick={this.handleMenuButtonClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id='facet-option-menu'
                      anchorEl={anchorEl}
                      open={deletedKeywordsOpen}
                      onClose={this.handleMenuClose}
                    >
                      {this.getDeletedKeywordButtons()}
                    </Menu>
                  </>}
              </div>
              <div>
                {facetData.selectedPositiveKeywords.map((item, index) => {
                // const key = item
                  const icon = <AddIcon />
                  return (
                    <Chip
                      key={item.uri}
                      icon={icon}
                      label={item.prefLabel}
                      className={classes.chip}
                      onDelete={() => this.handleDelete(item)}
                      color='primary'
                    />
                  )
                })}
                {facetData.selectedNegativeKeywords.map((item, index) => {
                // const key = item
                  const icon = <RemoveIcon />
                  return (
                    <Chip
                      key={item.uri}
                      icon={icon}
                      label={item.prefLabel}
                      className={classes.chip}
                      onDelete={() => this.handleDelete(item)}
                      color='secondary'
                    />
                  )
                })}
              </div>
              <div>
                <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.facetBar.suggested`)}:</Typography>
                <div>
                  {this.getUpdateButton()}
                </div>
                <List>
                  {treeData.map((e, index) => {
                    return this.getKeywordListItem(e, index)
                  })}
                </List>
              </div>
            </>
            )}
      </>
    )
  }
}

export default withStyles(styles)(SituationsKeywords)
