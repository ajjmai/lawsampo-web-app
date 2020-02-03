import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ResultTableCell from '../../facet_results/ResultTableCell'

const styles = theme => ({
  root: {
    overflow: 'auto',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    padding: theme.spacing(1),
    minWidth: 800,
    maxWidth: 1200
  },
  labelCell: {
    width: 240
  }
})

class CaselawPageTable extends React.Component {
  mapDocuments = documents => {
    return documents.map(doc => {
      doc.prefLabel = doc.ecli.replace('ECLI:FI:', '')
      doc.dataProviderUrl = doc.sf_link
      return doc
    })
  }

  render = () => {
    const { classes, data, relatedData } = this.props
    // console.log(relatedData)
    return (
      <Table className={classes.table}>
        <TableBody>
          <TableRow key='judge'>
            <TableCell className={classes.labelCell}>Judge</TableCell>
            <ResultTableCell
              columnId='judge'
              data={data.judge}
              valueType='object'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='court'>
            <TableCell className={classes.labelCell}>Court</TableCell>
            <ResultTableCell
              columnId='court'
              data={data.court}
              valueType='object'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='decisionDate'>
            <TableCell className={classes.labelCell}>Decision date</TableCell>
            <ResultTableCell
              columnId='decisionDate'
              data={data.decisionDate}
              valueType='string'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='keywords'>
            <TableCell className={classes.labelCell}>Keywords</TableCell>
            <ResultTableCell
              columnId='keywords'
              data={data.keywords}
              valueType='object'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='ecli'>
            <TableCell className={classes.labelCell}>ECLI</TableCell>
            <ResultTableCell
              columnId='ecli'
              data={data.ecli}
              valueType='string'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='uri'>
            <TableCell className={classes.labelCell}>URI</TableCell>
            <ResultTableCell
              columnId='uri'
              data={data.uri}
              valueType='object'
              makeLink
              externalLink
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          {relatedData !== null &&
            <TableRow key='related'>
              <TableCell className={classes.labelCell}>Similar court decisions</TableCell>
              <ResultTableCell
                columnId='related'
                data={this.mapDocuments(relatedData)}
                valueType='object'
                makeLink
                externalLink
                sortValues={false}
                numberedList={false}
                minWidth={150}
                container='cell'
                expanded
              />
            </TableRow>}
        </TableBody>
      </Table>
    )
  }
}

CaselawPageTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  relatedData: PropTypes.array
}

export default withStyles(styles)(CaselawPageTable)
