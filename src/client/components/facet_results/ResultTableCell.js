import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import ObjectListCollapsible from './ObjectListCollapsible'
import StringList from './StringList'
import SimpleReactLightbox from 'simple-react-lightbox'
import ImageGallerySRL from '../main_layout/ImageGallerySRL'
import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

const words = [
  {
    text: 'told',
    value: 64
  },
  {
    text: 'mistake',
    value: 11
  },
  {
    text: 'thought',
    value: 16
  },
  {
    text: 'bad',
    value: 17
  },
  {
    text: 'correct',
    value: 10
  },
  {
    text: 'day',
    value: 54
  },
  {
    text: 'prescription',
    value: 12
  },
  {
    text: 'time',
    value: 77
  },
  {
    text: 'thing',
    value: 45
  },
  {
    text: 'left',
    value: 19
  },
  {
    text: 'pay',
    value: 13
  },
  {
    text: 'people',
    value: 32
  },
  {
    text: 'month',
    value: 22
  },
  {
    text: 'again',
    value: 35
  },
  {
    text: 'review',
    value: 24
  },
  {
    text: 'call',
    value: 38
  },
  {
    text: 'doctor',
    value: 70
  },
  {
    text: 'asked',
    value: 26
  },
  {
    text: 'finally',
    value: 14
  },
  {
    text: 'insurance',
    value: 29
  },
  {
    text: 'week',
    value: 41
  },
  {
    text: 'called',
    value: 49
  },
  {
    text: 'problem',
    value: 20
  },
  {
    text: 'going',
    value: 59
  },
  {
    text: 'help',
    value: 49
  },
  {
    text: 'felt',
    value: 45
  },
  {
    text: 'discomfort',
    value: 11
  },
  {
    text: 'lower',
    value: 22
  },
  {
    text: 'severe',
    value: 12
  },
  {
    text: 'free',
    value: 38
  },
  {
    text: 'better',
    value: 54
  },
  {
    text: 'muscle',
    value: 14
  },
  {
    text: 'neck',
    value: 41
  },
  {
    text: 'root',
    value: 24
  },
  {
    text: 'adjustment',
    value: 16
  },
  {
    text: 'therapy',
    value: 29
  },
  {
    text: 'injury',
    value: 20
  },
  {
    text: 'excruciating',
    value: 10
  },
  {
    text: 'chronic',
    value: 13
  },
  {
    text: 'chiropractor',
    value: 35
  },
  {
    text: 'treatment',
    value: 59
  },
  {
    text: 'tooth',
    value: 32
  },
  {
    text: 'chiropractic',
    value: 17
  },
  {
    text: 'dr',
    value: 77
  },
  {
    text: 'relief',
    value: 19
  },
  {
    text: 'shoulder',
    value: 26
  },
  {
    text: 'nurse',
    value: 17
  },
  {
    text: 'room',
    value: 22
  },
  {
    text: 'hour',
    value: 35
  },
  {
    text: 'wait',
    value: 38
  },
  {
    text: 'hospital',
    value: 11
  },
  {
    text: 'eye',
    value: 13
  },
  {
    text: 'test',
    value: 10
  },
  {
    text: 'appointment',
    value: 49
  },
  {
    text: 'medical',
    value: 19
  },
  {
    text: 'question',
    value: 20
  },
  {
    text: 'office',
    value: 64
  },
  {
    text: 'care',
    value: 54
  },
  {
    text: 'minute',
    value: 29
  },
  {
    text: 'waiting',
    value: 16
  },
  {
    text: 'patient',
    value: 59
  },
  {
    text: 'health',
    value: 49
  },
  {
    text: 'alternative',
    value: 24
  },
  {
    text: 'holistic',
    value: 19
  },
  {
    text: 'traditional',
    value: 20
  },
  {
    text: 'symptom',
    value: 29
  },
  {
    text: 'internal',
    value: 17
  },
  {
    text: 'prescribed',
    value: 26
  },
  {
    text: 'acupuncturist',
    value: 16
  },
  {
    text: 'pain',
    value: 64
  },
  {
    text: 'integrative',
    value: 10
  },
  {
    text: 'herb',
    value: 13
  },
  {
    text: 'sport',
    value: 22
  },
  {
    text: 'physician',
    value: 41
  },
  {
    text: 'herbal',
    value: 11
  },
  {
    text: 'eastern',
    value: 12
  },
  {
    text: 'chinese',
    value: 32
  },
  {
    text: 'acupuncture',
    value: 45
  },
  {
    text: 'prescribe',
    value: 14
  },
  {
    text: 'medication',
    value: 38
  },
  {
    text: 'western',
    value: 35
  },
  {
    text: 'sure',
    value: 38
  },
  {
    text: 'work',
    value: 64
  },
  {
    text: 'smile',
    value: 17
  },
  {
    text: 'teeth',
    value: 26
  },
  {
    text: 'pair',
    value: 11
  },
  {
    text: 'wanted',
    value: 20
  },
  {
    text: 'frame',
    value: 13
  },
  {
    text: 'lasik',
    value: 10
  },
  {
    text: 'amazing',
    value: 41
  },
  {
    text: 'fit',
    value: 14
  },
  {
    text: 'happy',
    value: 22
  },
  {
    text: 'feel',
    value: 49
  },
  {
    text: 'glasse',
    value: 19
  },
  {
    text: 'vision',
    value: 12
  },
  {
    text: 'pressure',
    value: 16
  },
  {
    text: 'find',
    value: 29
  },
  {
    text: 'experience',
    value: 59
  },
  {
    text: 'year',
    value: 70
  },
  {
    text: 'massage',
    value: 35
  },
  {
    text: 'best',
    value: 54
  },
  {
    text: 'mouth',
    value: 20
  },
  {
    text: 'staff',
    value: 64
  },
  {
    text: 'gum',
    value: 10
  },
  {
    text: 'chair',
    value: 12
  },
  {
    text: 'ray',
    value: 22
  },
  {
    text: 'dentistry',
    value: 11
  },
  {
    text: 'canal',
    value: 13
  },
  {
    text: 'procedure',
    value: 32
  },
  {
    text: 'filling',
    value: 26
  },
  {
    text: 'gentle',
    value: 19
  },
  {
    text: 'cavity',
    value: 17
  },
  {
    text: 'crown',
    value: 14
  },
  {
    text: 'cleaning',
    value: 38
  },
  {
    text: 'hygienist',
    value: 24
  },
  {
    text: 'dental',
    value: 59
  },
  {
    text: 'charge',
    value: 24
  },
  {
    text: 'cost',
    value: 29
  },
  {
    text: 'charged',
    value: 13
  },
  {
    text: 'spent',
    value: 17
  },
  {
    text: 'paying',
    value: 14
  },
  {
    text: 'pocket',
    value: 12
  },
  {
    text: 'dollar',
    value: 11
  },
  {
    text: 'business',
    value: 32
  },
  {
    text: 'refund',
    value: 10
  }
]

const options = {
  rotations: 0
}

const size = [500, 300]

const style = {
  marginLeft: -70
}

const ResultTableCell = props => {
  const {
    data, valueType, makeLink, externalLink, sortValues, sortBy, numberedList, minWidth,
    container, columnId, expanded, linkAsButton, collapsedMaxWords, showSource,
    sourceExternalLink, renderAsHTML, HTMLParserTask, referencedTerm, previewImageHeight
  } = props
  let cellContent = null
  const cellStyle = { minWidth }
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
          referencedTerm={referencedTerm}
          numberedList={numberedList}
        />
      break
    case 'image':
      cellContent = data && data !== '-'
        ? <SimpleReactLightbox><ImageGallerySRL data={data} previewImageHeight={previewImageHeight} /></SimpleReactLightbox>
        : ''
      break
    case 'wordCloud':
      cellContent = words && words !== '-'
        ? <ReactWordcloud style={style} options={options} size={size} words={words} />
        : ''
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
