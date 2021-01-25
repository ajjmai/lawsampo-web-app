import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import { Radio, RadioGroup } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import SortableTree from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Typography from '@material-ui/core/Typography'
import purple from '@material-ui/core/colors/purple'



const styles = (theme) => ({
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
  }
})

/**
 * A component for text search in client-side faceted search architecture.
 */
class SituationsCategory extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          treeData: this.props.categories,
          selectedCategory: null
        }
    }

    componentDidUpdate = prevProps => {    
      if(prevProps.isFetching !== this.props.isFetching ||
        prevProps.selectedSituation !== this.props.selectedSituation) {
      
        this.setState({
          treeData: this.props.categories,
          selectedCategory: this.props.selectedSituation
        })
      }  
    }

    handleChange = treeObj => event => {
      this.setState({selectedCategory: treeObj.node})
      this.props.updateSituationSelected({selectedSituation: treeObj.node})
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
          value={treeObj.node.uri}
          />
        }    
          
          label={this.generateLabel(treeObj.node)}
        />
      )      
    }
  }
  
  handleDelete = () => {
    this.setState({selectedCategory: null})
    this.props.updateSituationSelected({selectedSituation: null})
    this.props.fetchSituationResults()    
  }

  render () {    
    
    const {selectedCategory} = this.state
    const {isFetching, classes} =  this.props
    const treeData = this.props.categories
    
    return (
      <>
      {isFetching ? (
        <div className={classes.spinnerContainer}>
          <CircularProgress style={{ color: purple[500] }} thickness={5} />
        </div>
      ) : (      
            <>
              <div className={''}>
                {this.props.selectedSituation !== null &&
                  (
                    <Chip
                      key={this.props.selectedSituation.uri}
                      //icon={icon}
                      label={this.props.selectedSituation.prefLabel}
                      className={classes.chip}
                      onDelete={this.handleDelete}
                      color='primary'
                    />
                  )
                }
              </div>
              { !selectedCategory && (
              <FormControl>
               <RadioGroup value={selectedCategory === null ? null : selectedCategory.uri}>
                <SortableTree
                  treeData={treeData}
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
              )}
              </>

)}
</>
)}
}

export default withStyles(styles)(SituationsCategory)
