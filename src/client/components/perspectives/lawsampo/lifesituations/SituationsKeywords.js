import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import intl from 'react-intl-universal'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import purple from '@material-ui/core/colors/purple'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { findIndex } from 'lodash'
import SortableTree from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Typography from '@material-ui/core/Typography'

import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import { Radio, RadioGroup } from '@material-ui/core'



const styles = theme => ({
  
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
    margin: theme.spacing(0.5),
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
        anchorEl: null
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
    this.props.addSituationKeyword({keyword: treeObj.node})
    this.props.fetchSituationResults()
  }

  handleChange = treeObj => event => {
    const deletedKeywords = this.state.deletedKeywords;        
    // remove from history if added again
    const historyIndex = findIndex(deletedKeywords, { id: treeObj.node.uri})
    if(historyIndex >= 0) {
      deletedKeywords.splice(historyIndex, 1)    
      
    }
    this.setState({selectedKeyword: treeObj.node, deletedKeywords})
    this.props.addSituationKeyword({keyword: treeObj.node})
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
  const { node } = treeObj

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

  handleDelete(item, index) {
    const deletedKeywords = this.state.deletedKeywords;        
    // only add if not already there 
    const historyIndex = findIndex(deletedKeywords, { id: item.uri})
    if(historyIndex < 0) {
      deletedKeywords.push(item)    
      if(deletedKeywords.length > 10) {
        deletedKeywords.splice(10, 1)
      }    
      this.setState({deletedKeywords})  
    }
    this.props.removeSituationKeyword({facetClass: this.props.facetClass, keyword: item, keywordIndex: index})
    this.props.fetchSituationResults()    
  }

  getDeletedKeywordButtons = () => {
    return this.state.deletedKeywords.map( (item, index) => {
     return  (
      <MenuItem key={item.uri} onClick={ e => { this.addKeywordFromHistory(item, index)}}>
        {item.prefLabel}
      </MenuItem>
    )
    })
  }

  addKeywordFromHistory = (item, index) => {
    const deletedKeywords = this.state.deletedKeywords;
    // remove from list 
    deletedKeywords.splice(index, 1)
    this.setState({
      anchorEl: null,
      deletedKeywords: deletedKeywords
    })
    this.props.addSituationKeyword({keyword: item})
    this.props.fetchSituationResults()
  }
  handleMenuButtonClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {    
    const {selectedKeywords, isFetching, classes, perspective} = this.props
    const {selectedKeyword, deletedKeywords, anchorEl} = this.state    
    const deletedKeywordsOpen = Boolean(anchorEl)
    return (
      <>
      {isFetching ? (
        <div className={classes.spinnerContainer}>
          <CircularProgress style={{ color: purple[500] }} thickness={5} />
        </div>
      ) : (
          <>                      

              <div className={''}>
                {selectedKeywords !== null && selectedKeywords.map( (item, index) => {
                  const key = item
                  return (
                      <Chip
                        key={key.uri}
                        //icon={icon}
                        label={key.prefLabel}
                        className={classes.chip}
                       onDelete={ () => this.handleDelete(item, index)}
                        color='primary'
                      />
                  )
                })}
              {deletedKeywords.length > 0 &&
              <>
                <Tooltip disableFocusListener title={intl.get(`perspectives.${perspective.id}.removedKeywords`)}>
                  <IconButton
                    aria-label={'test'}
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
               <FormControl>
               <RadioGroup value={selectedKeyword === null ? null : selectedKeyword.uri}>
                <SortableTree
                  treeData={this.state.treeData}
                  onChange={treeData => this.setState({ treeData })}
                  canDrag={false}
                  rowHeight={30}
                  onlyExpandSearchedNodes
                  theme={FileExplorerTheme}
                  generateNodeProps={this.generateNodeProps}
                  isVirtualized={false}
                />
                </RadioGroup>
              </FormControl>
      </>

    )}
  </>
    )}
}

export default withStyles(styles)(SituationsKeywords)
