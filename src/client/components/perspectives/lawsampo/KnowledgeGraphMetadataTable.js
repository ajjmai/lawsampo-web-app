import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3)
  },
  tableContainer: {
    maxWidth: 550
  }
}))

const KnowledgeGraphMetadataTable = props => {
  const classes = useStyles()

  useEffect(() => {
    if (props.fetchKnowledgeGraphMetadata) {
      const { resultClass } = props
      props.fetchKnowledgeGraphMetadata({ resultClass })
    }
  }, [])

  const data = props.knowledgeGraphMetadata ? props.knowledgeGraphMetadata : null

  console.log(data)

  return (
    <div className={classes.root}>
      {data &&
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Database</TableCell>
                <TableCell>Data dump date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={data.id}>
                <TableCell component='th' scope='row'>
                  <a
                    target='_blank' rel='noopener noreferrer'
                    href={data.page}
                  >
                    {data.prefLabel}
                  </a>
                </TableCell>
                <TableCell>{data.modified}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>}

    </div>
  )
}

KnowledgeGraphMetadataTable.propTypes = {
  fetchKnowledgeGraphMetadata: PropTypes.func,
  knowledgeGraphMetadata: PropTypes.object,
  resultClass: PropTypes.string
}

export default KnowledgeGraphMetadataTable
