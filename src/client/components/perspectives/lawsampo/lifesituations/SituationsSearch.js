import React from 'react'
import { withStyles } from '@mui/styles'
import intl from 'react-intl-universal'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import SortableTree from '@nosferatu500/react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Typography from '@mui/material/Typography'
import { FormControlLabel } from '@mui/material'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%'
  },
  textSearch: {
    margin: theme.spacing(0)
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
  }
})

class SituationsSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: props.query,
      selectedSituation: props.selectedSituation,
      treeData: props.situations
    }
  }

  componentDidUpdate = prevProps => {
    // console.log(prevProps)
    // console.log(this.props)

    if (prevProps.situations !== this.props.situations) {
      this.setState(
        {
          treeData: this.props.situations
        }
      )
    }
  }

    handleSituationChange = treeObj => event => {
      this.props.updateSituationSelected({ selectedSituation: treeObj.node })
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
                onChange={this.handleSituationChange(treeObj)}
              />
            }
            value={treeObj.node.uri}
            label={this.generateLabel(treeObj.node)}
          />
        )
      }
    }

      handleQueryChange = (event) => {
        this.setState({ query: event.target.value })
      };

      handleMouseDown = (event) => {
        event.preventDefault()
      };

      handleOnKeyDown = (event) => {
        if (event.key === 'Enter' && this.hasValidQuery()) {
          this.props.updateSituationQuery({ query: this.state.query })
          this.props.fetchSituationResults()
          this.setState({ query: '' })
        }
      };

      handleSearchClick = () => {
        if (this.hasValidQuery()) {
          this.props.updateSituationQuery({ query: this.state.query })
          this.props.fetchSituationResults()
          this.setState({ query: '' })
        }
      };

      hasValidQuery = () => {
        return this.state.query.length > 2
      }

      render () {
        const { classes, selectedSituation, perspective } = this.props
        const searchButton = (
          <IconButton
            aria-label='Search'
            onClick={this.handleSearchClick}
            onMouseDown={this.handleMouseDown}
          >
            <SearchIcon />
          </IconButton>
        )

        return (
          <div>
            <div className={classes.root}>
              <div className={classes.headingContainer}>
                <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.facetBar.query`)}</Typography>
              </div>
              <FormControl className={classes.textSearch}>

                <Input
                  id='adornment-search'
                  type='text'
                  value={this.state.query}
                  onChange={this.handleQueryChange}
                  onKeyDown={this.handleOnKeyDown}
                  endAdornment={
                    <InputAdornment position='end'>
                      {searchButton}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className={classes.root}>
              <div className={classes.headingContainer}>
                <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.facetBar.mainCategory`)}</Typography>
              </div>

              <FormControl>
                <RadioGroup value={selectedSituation === null ? null : selectedSituation.uri}>
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
            </div>

          </div>

        )
      }
}

export default withStyles(styles)(SituationsSearch)
