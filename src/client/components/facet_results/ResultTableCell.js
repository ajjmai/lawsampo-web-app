import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@mui/material/TableCell'
import ObjectListCollapsible from './ObjectListCollapsible'
import SectionOfALawListCollapsible from './SectionOfALawListCollapsible'
import StringList from './StringList'
import SimpleReactLightbox from 'simple-react-lightbox'
import ImageGallerySRL from '../main_layout/ImageGallerySRL'
import Wordcloud from './WordCloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

const ResultTableCell = props => {
  const {
    data, tableData, valueType, makeLink, externalLink, sortValues, sortBy, numberedList, minWidth,
    height, container, columnId, expanded, linkAsButton, collapsedMaxWords, showSource,
    sourceExternalLink, renderAsHTML, HTMLParserTask, referencedTerm, previewImageHeight,
    onExpandClick, rowId, shortenLabel, maxWords, hasParts, hasChapters
  } = props
  let cellContent = null
  const cellStyle = {
    ...(height && { height }),
    ...(minWidth && { minWidth })
  }
  switch (valueType) {
    case 'object':
      cellContent = (
        <ObjectListCollapsible
          data={data}
          tableData={tableData}
          makeLink={makeLink}
          externalLink={externalLink}
          sortValues={sortValues}
          sortBy={sortBy}
          numberedList={numberedList}
          rowId={rowId}
          columnId={columnId}
          expanded={expanded}
          onExpandClick={onExpandClick}
          collapsedMaxWords={collapsedMaxWords}
          shortenLabel={shortenLabel}
          linkAsButton={linkAsButton}
          showSource={showSource}
          sourceExternalLink={sourceExternalLink}
        />
      )
      break
    case 'sectionOfALaw':
      cellContent = (
        <SectionOfALawListCollapsible
          data={data}
          hasParts={hasParts === 'true'}
          hasChapters={hasChapters === 'true'}
          makeLink={makeLink}
          externalLink={externalLink}
          sortValues={sortValues}
          sortBy={sortBy}
          numberedList={numberedList}
          columnId={columnId}
          collapsible
          expanded={expanded}
          linkAsButton={linkAsButton}
          showSource={showSource}
          sourceExternalLink={sourceExternalLink}
          maxHeight={200}
        />
      )
      break
    case 'string':
      cellContent = (
        <StringList
          data={data}
          tableData={tableData}
          expanded={expanded}
          onExpandClick={onExpandClick}
          rowId={rowId}
          collapsedMaxWords={collapsedMaxWords}
          shortenLabel={shortenLabel}
          renderAsHTML={renderAsHTML}
          HTMLParserTask={HTMLParserTask}
          referencedTerm={referencedTerm}
          numberedList={numberedList}
        />
      )
      break
    case 'image':
      cellContent = data && data !== '-'
        ? <SimpleReactLightbox><ImageGallerySRL data={data} previewImageHeight={previewImageHeight} /></SimpleReactLightbox>
        : ''
      break
    case 'wordcloud':
      cellContent = data && data !== '-'
        ? <Wordcloud data={data} maxWords={maxWords} />
        : '-'
      break
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
  makeLink: PropTypes.bool,
  externalLink: PropTypes.bool,
  sortValues: PropTypes.bool,
  sortBy: PropTypes.string,
  numberedList: PropTypes.bool,
  expanded: PropTypes.bool.isRequired,
  collapsedMaxWords: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  previewImageHeight: PropTypes.number,
  showSource: PropTypes.bool,
  sourceExternalLink: PropTypes.bool
}

export default ResultTableCell
