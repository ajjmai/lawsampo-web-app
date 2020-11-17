import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import ObjectListCollapsible from './ObjectListCollapsible'
import StringList from './StringList'
import SimpleReactLightbox from 'simple-react-lightbox'
import ImageGallerySRL from '../main_layout/ImageGallerySRL'

const ResultTableCell = props => {
  const {
    data, valueType, makeLink, externalLink, sortValues, sortBy, numberedList, minWidth,
    container, columnId, expanded, linkAsButton, collapsedMaxWords, showSource,
    sourceExternalLink, renderAsHTML, HTMLParserTask, annotationData, previewImageHeight
  } = props
  let cellContent = null
  const cellStyle = minWidth == null ? {} : { minWidth: minWidth }
  switch (valueType) {
    case 'object':
      cellContent =
        <ObjectListCollapsible
          data={data}
          makeLink={makeLink}
          externalLink={externalLink}
          sortValues={sortValues}
          sortBy={sortBy}
          numberedList={numberedList}
          columnId={columnId}
          expanded={expanded}
          linkAsButton={linkAsButton}
          showSource={showSource}
          sourceExternalLink={sourceExternalLink}
        />
      break
    case 'string':
      cellContent =
        <StringList
          data={data}
          expanded={expanded}
          collapsedMaxWords={collapsedMaxWords}
          renderAsHTML={renderAsHTML}
          HTMLParserTask={HTMLParserTask}
          annotationData={annotationData}
          numberedList={numberedList}
        />
      break
    case 'image':
      cellContent = data && data !== '-'
        ? <SimpleReactLightbox><ImageGallerySRL data={data} previewImageHeight={previewImageHeight} /></SimpleReactLightbox>
        : ''
  }
  if (container === 'div') {
    return (
      <div>
        {cellContent}
      </div>
    )
  }
  if (container === 'cell') {
    return (
      <TableCell style={cellStyle}>
        {cellContent}
      </TableCell>
    )
  }
}

ResultTableCell.propTypes = {
  columnId: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  valueType: PropTypes.string.isRequired,
  makeLink: PropTypes.bool.isRequired,
  externalLink: PropTypes.bool.isRequired,
  sortValues: PropTypes.bool.isRequired,
  sortBy: PropTypes.string,
  numberedList: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  collapsedMaxWords: PropTypes.number,
  minWidth: PropTypes.number,
  previewImageHeight: PropTypes.number,
  showSource: PropTypes.bool,
  sourceExternalLink: PropTypes.bool
}

export default ResultTableCell
