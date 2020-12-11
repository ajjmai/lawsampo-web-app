import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import ObjectListItem from './ObjectListItem'
// import { has } from 'lodash'
import { Link } from 'react-router-dom'

const styles = () => ({
  valueList: {
    paddingLeft: 20,
    maxHeight: 200,
    overflow: 'auto'
  },
  valueListNoBullets: {
    listStyle: 'none',
    // paddingLeft: 0,
    maxHeight: 200,
    overflow: 'auto'
  },
  numberedList: {
    maxHeight: 200,
    overflow: 'auto'
  },
  dateContainer: {
    width: 180,
    display: 'inline-block'
  }
})

const SectionListCollapsible = props => {
  const { classes, data } = props

  const renderItem = ({ collapsed, itemData, isFirstValue = false }) => {
    if (isFirstValue && itemData.prefLabel === '') {
      itemData = {
        ...itemData,
        prefLabel: `${itemData.sectionNumber} §`
      }
    }
    return (
      <>
        <ObjectListItem
          data={itemData}
          makeLink={false}
          externalLink={false}
        />
        {collapsed && <span> ...</span>}
      </>
    )
  }

  const renderThreeLevelSectionListing = data => {
    let firstLevel = Array.isArray(data) ? data : [data]
    firstLevel = firstLevel.sort((a, b) => a.integer - b.integer || a.id - b.id)
    return (
      <ul className={classes.valueListNoBullets}>
        {firstLevel.map((firstLevelItem, index) => {
          let secondLevel = Array.isArray(firstLevelItem.secondLevel) ? firstLevelItem.secondLevel : [firstLevelItem.secondLevel]
          secondLevel = secondLevel.sort((a, b) => a.integer - b.integer || a.id - b.id)
          return (
            <li key={index}>
              {firstLevelItem.prefLabel}
              <ul>
                {secondLevel.map((secondLevelItem, index) => {
                  let sections = Array.isArray(secondLevelItem.section) ? secondLevelItem.section : [secondLevelItem.section]
                  sections = sections.sort((a, b) => a.sectionNumberInt - b.sectionNumberInt || a.sectionNumber - b.sectionNumber)
                  return (
                    <li key={index}>
                      {secondLevelItem.prefLabel}
                      <ul>
                        {sections.map((section, index) =>
                          <li key={index}>
                            <Link to={section.dataProviderUrl}>
                              {section.sectionNumber} § {section.prefLabel}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  )
                }
                )}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderTwoLevelSectionListing = (data, orphanSections) => {
    let firstLevel = Array.isArray(data) ? data : [data]
    firstLevel = firstLevel.sort((a, b) => a.integer - b.integer || a.id - b.id)
    return (
      <ul className={classes.valueListNoBullets}>
        {firstLevel.map((firstLevelItem, index) => {
          let sections = Array.isArray(firstLevelItem.section) ? firstLevelItem.section : [firstLevelItem.section]
          sections = sections.sort((a, b) => a.sectionNumberInt - b.sectionNumberInt || a.sectionNumber - b.sectionNumber)
          return (
            <li key={index}>
              {firstLevelItem.prefLabel}
              <ul>
                {sections.map((section, index) =>
                  <li key={index}>
                    <Link to={section.dataProviderUrl}>
                      {section.sectionNumber} § {section.prefLabel}
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          )
        })}
        {orphanSections &&
          <li key='ei_lukua'>
            Pykälät ilman lukua
            <ul>
              {orphanSections.map((section, index) =>
                <li key={index}>
                  <Link to={section.dataProviderUrl}>
                    {section.sectionNumber} § {section.prefLabel}
                  </Link>
                </li>
              )}
            </ul>
          </li>}
      </ul>
    )
  }

  const renderSectionListing = data => {
    let firstLevel = Array.isArray(data) ? data : [data]
    const orphanSections = []
    let hasChapters = false
    // check for mixed chapters and sections
    firstLevel.map(item => {
      if (item.section) {
        hasChapters = true
      }
    })
    if (hasChapters) {
      firstLevel = firstLevel.filter(item => {
        if (!item.section) {
          orphanSections.push(item)
          return false
        }
        return true
      })
      return renderTwoLevelSectionListing(firstLevel, orphanSections)
    }
    firstLevel = firstLevel.sort((a, b) => a.sectionNumberInt - b.sectionNumberInt || a.sectionNumber - b.sectionNumber)
    return (
      <ul className={classes.valueList}>
        {firstLevel.map((section, index) =>
          <li key={index}>
            <Link to={section.dataProviderUrl || ''}>
              {section.sectionNumber} § {section.prefLabel}
            </Link>
          </li>
        )}
      </ul>
    )
  }

  if (data == null || data === '-') {
    return '-'
  } else if (Array.isArray(data)) {
    return (
      <>
        {!props.expanded && renderItem({ collapsed: true, itemData: data.sort((a, b) => a.integer - b.integer)[0], isFirstValue: true })}
        <Collapse in={props.expanded} timeout='auto' unmountOnExit>
          {props.hasParts && renderThreeLevelSectionListing(data)}
          {!props.hasParts && props.hasChapters && renderTwoLevelSectionListing(data)}
          {!props.hasParts && !props.hasChapters && renderSectionListing(data)}
        </Collapse>
      </>
    )
  } else {
    return renderItem({ collapsed: false, itemData: data, isFirstValue: true })
  }
}

SectionListCollapsible.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  makeLink: PropTypes.bool.isRequired,
  externalLink: PropTypes.bool.isRequired,
  sortValues: PropTypes.bool.isRequired,
  numberedList: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  columnId: PropTypes.string.isRequired,
  linkAsButton: PropTypes.bool,
  showSource: PropTypes.bool
}

export default withStyles(styles)(SectionListCollapsible)
