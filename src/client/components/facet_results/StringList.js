import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import ReactHtmlParser from 'react-html-parser'
// import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  valueList: {
    paddingLeft: 20,
    maxHeight: 200,
    overflow: 'auto'
  },
  valueListNoBullets: {
    listStyle: 'none',
    paddingLeft: 0
  },
  numberedList: {
    maxHeight: 200,
    overflow: 'auto'
  },
  noMaxWidth: {
    maxWidth: 'none'
  },
  tooltipContent: {
    padding: theme.spacing(1)
  },
  tooltipList: {
    listStylePosition: 'inside',
    paddingLeft: 0
  }
})

const StringList = props => {
  const createFirstValue = (data, isArray) => {
    let firstValue = isArray ? data[0] : data
    if (props.collapsedMaxWords) {
      const wordCount = firstValue.split(' ').length
      if (wordCount > props.collapsedMaxWords) {
        firstValue = firstValue.trim().split(' ').splice(0, props.collapsedMaxWords).join(' ')
        firstValue = `${firstValue}...`
      }
    } else if (isArray) {
      firstValue = `${firstValue}...`
    }
    return (
      <div className={props.classes.stringContainer}>{firstValue}</div>
    )
  }

  const createBasicList = data => {
    data = data.sort()
    if (props.numberedList) {
      return (
        <ol className={props.classes.numberedList}>
          {data.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      )
    } else {
      return (
        <ul className={props.classes.valueList}>
          {data.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    }
  }

  const transform = (node, index) => {
    // if (node.type === 'tag' && node.name === 'a') {
    //   const href = node.attribs.href
    //   const text = node.children[0].data
    //   return <Link key={index} to={href}>{text}</Link>
    // }
    if (node.type === 'tag' && node.name === 'span' && node.attribs.name === 'namedentity') {
      const linkStr = node.attribs['data-link']
      let tooltipJSX
      if (linkStr.includes(',')) {
        const links = linkStr.split(',')
        const listItemsJSX = []
        links.map((link, index) => {
          listItemsJSX.push(<li key={index}><a href={link} target='_blank' rel='noopener noreferrer'>{link}</a></li>)
        })
        tooltipJSX = (
          <div className={props.classes.tooltipContent}>
            <ul className={props.classes.tooltipList}>{listItemsJSX}</ul>
          </div>
        )
      } else {
        tooltipJSX = (
          <div className={props.classes.tooltipContent}>
            <a href={linkStr} target='_blank' rel='noopener noreferrer'>{linkStr}</a>
          </div>
        )
      }
      const a = node.children[1]
      const text = a.children[0].data
      return (
        <Tooltip
          key={a.attribs.id}
          title={tooltipJSX}
          interactive
          placement='top'
          arrow
          classes={{
            tooltip: props.classes.noMaxWidth
          }}
        >
          <span style={{ color: 'red', cursor: 'pointer' }}>{text}</span>
        </Tooltip>
      )
    }
  }

  const { renderAsHTML } = props
  let { data } = props
  if (data == null || data === '-') {
    return '-'
  }
  const isArray = Array.isArray(data)
  if (renderAsHTML) {
    data = ReactHtmlParser(data, { transform })
  }
  return (
    <>
      {!props.expanded && createFirstValue(data, isArray)}
      <Collapse in={props.expanded} timeout='auto' unmountOnExit>
        {isArray && createBasicList(data)}
        {!isArray && <div className={props.classes.stringContainer}>{data}</div>}
      </Collapse>
    </>
  )
}

StringList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  expanded: PropTypes.bool.isRequired,
  collapsedMaxWords: PropTypes.number,
  renderAsHTML: PropTypes.bool,
  numberedList: PropTypes.bool
}

export default withStyles(styles)(StringList)
