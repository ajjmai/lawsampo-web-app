import React from 'react'
import intl from 'react-intl-universal'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import ResultTableCell from '../../../facet_results/ResultTableCell'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ResultTableHead from '../../../facet_results/ResultTableHead'
import TablePagination from '@mui/material/TablePagination'
import has from 'lodash'
import { Typography } from '@mui/material'

const styles = theme => ({
  infoContainer: {
    padding: '40px',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  tableContainer: {
    overflow: 'auto',
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 126px)'
    },
    backgroundColor: theme.palette.background.paper,
    borderTop: '1px solid rgba(224, 224, 224, 1);'
  },
  paginationRoot: {
    display: 'flex',
    backgroundColor: '#fff',
    borderTop: '1px solid rgba(224, 224, 224, 1);'
  },
  paginationCaption: {

  },
  paginationActions: {
    display: 'none'
  },
  paginationToolbar: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'wrap',
      height: 100
    }
  },
  progressContainer: {
    width: '100%',
    height: 'calc(100% - 72px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  expandCell: {
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

/**
 * A component for showing facet results as paginated table.
 * Based on Material-UI's Table component.
 */
class SituationsResultTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedRows: new Set()
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.results !== this.props.results) {
      this.setState({ expandedRows: new Set() })
    }
  }

  handleExpandRow = rowId => () => {
    const expandedRows = this.state.expandedRows
    if (expandedRows.has(rowId)) {
      expandedRows.delete(rowId)
    } else {
      expandedRows.add(rowId)
    }
    this.setState({ expandedRows })
  }

  handleSortBy = sortBy => event => {
    if (event != null) {
      this.props.sortResults(this.props.resultClass, sortBy)
    }
  }

  rowRenderer = (row, index) => {
    const { classes } = this.props
    const expanded = this.state.expandedRows.has(index)
    let hasExpandableContent = false
    const dataCells = this.props.columns.map(column => {
      if (column.onlyOnInstancePage) { return null }
      let columnData = row[column.id] == null ? '-' : row[column.id]
      let isArray = Array.isArray(columnData)
      if (isArray) {
        hasExpandableContent = true
      }
      if (isArray && column.id === 'text') {
        columnData = columnData[0]
        isArray = false
      }
      if (!isArray &&
        columnData !== '-' &&
        column.valueType === 'string' &&
        column.collapsedMaxWords &&
        columnData.split(' ').length > column.collapsedMaxWords
      ) {
        hasExpandableContent = true
      }
      return (
        <ResultTableCell
          key={column.id}
          columnId={column.id}
          data={columnData}
          valueType={column.valueType}
          makeLink={column.makeLink}
          externalLink={column.externalLink}
          sortValues={column.sortValues}
          sortBy={column.sortBy}
          numberedList={column.numberedList}
          minWidth={column.minWidth}
          previewImageHeight={column.previewImageHeight}
          container='cell'
          expanded={expanded}
          linkAsButton={has(column, 'linkAsButton')
            ? column.linkAsButton
            : null}
          collapsedMaxWords={has(column, 'collapsedMaxWords')
            ? column.collapsedMaxWords
            : null}
          shortenLabel={false}
          renderAsHTML={has(column, 'renderAsHTML')
            ? column.renderAsHTML
            : null}
        />
      )
    })
    return (
      <TableRow key={index}>
        <TableCell className={classes.expandCell}>
          {hasExpandableContent &&
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={this.handleExpandRow(index)}
              aria-expanded={expanded}
              aria-label='Show more'
            >
              <ExpandMoreIcon />
            </IconButton>}
        </TableCell>
        {dataCells}
      </TableRow>
    )
  }

  handleOnChangeRowsPerPage = event => {
    const rowsPerPage = event.target.value
    if (rowsPerPage !== this.props.data.pagesize) {
      this.props.updateRowsPerPage(this.props.resultClass, rowsPerPage)
    }
  }

  render () {
    const { classes, isFetching, results, perspective } = this.props
    const { pagesize } = this.props.data
    return (
      <>
        <TablePagination
          component='div'
          classes={{
            root: classes.paginationRoot,
            caption: classes.paginationCaption,
            toolbar: classes.paginationToolbar,
            actions: classes.paginationActions
          }}
          labelDisplayedRows={() => ''}
          count={pagesize}
          rowsPerPage={pagesize}
          page={0}
          onPageChange={() => {}}
          labelRowsPerPage={intl.get('table.rowsPerPage')}
          rowsPerPageOptions={[25]}
          onRowsPerPageChange={this.handleOnChangeRowsPerPage}
        />
        <div className={classes.tableContainer}>
          {isFetching
            ? (
              <div className={classes.progressContainer}>
                <CircularProgress />
              </div>
              )
            : (
              <>
                {results.length > 0
                  ? (
                    <Table size='small'>
                      <ResultTableHead
                        resultClass={this.props.resultClass}
                        columns={this.props.columns}
                        onSortBy={() => {}}
                        // sortBy={sortBy}
                        // sortDirection={sortDirection}
                        routeProps={this.props.routeProps}
                      />
                      <TableBody>
                        {results.map((row, index) => this.rowRenderer(row, index))}
                      </TableBody>
                    </Table>
                    )
                  : (
                    <div className={classes.infoContainer}>
                      <Typography variant='body1'>{intl.get(`perspectives.${perspective.id}.initialResults`)}</Typography>
                    </div>
                    )}
              </>
              )}
        </div>
      </>
    )
  }
}

export default withStyles(styles)(SituationsResultTable)
