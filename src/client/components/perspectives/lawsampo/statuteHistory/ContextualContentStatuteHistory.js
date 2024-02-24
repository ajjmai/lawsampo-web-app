import React, { useState } from 'react'

// import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import SectionOfALawListCollapsible from './SectionOfALawListCollapsible'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'
import StatuteHistoryDetails from './StatuteHistoryDetails'
import { concat, groupBy, isArray, isEmpty } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#bdbdbd'
  },
  mainContainer: props => ({
    margin: 0,
    maxWidth: 1600,
    marginTop: theme.spacing(0.5),
    flexWrap: 'wrap',
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: `calc(100% - ${theme.spacing(0.5)}`
    }
  }),
  gridItem: props => ({
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%'
    },
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  }),
  textOuterContainer: props => ({
    height: 1000,
    overflow: 'auto',
    marginTop: 5,
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%',
      marginTop: 'initial'
    }
  }),
  textInnerContainer: {
    padding: theme.spacing(2)
  },
  tableOfContents: props => ({
    padding: theme.spacing(2),
    overflow: 'auto',
    height: 200,
    top: theme.spacing(0.5),
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%'
    }
  }),
  tooltip: {
    maxWidth: 500
  },
  tooltipContent: {
    padding: theme.spacing(1)
  },
  tooltipList: {
    listStylePosition: 'inside',
    paddingLeft: 0
  },
  statuteHistoryItem: {
    padding: theme.spacing(1)
  },
  metaDataContainer: {
    backgroundColor: '#dfdfdf',
    overflow: 'hidden',
    padding: theme.spacing(1)
  }
}))

const ContextualContentStatuteHistory = props => {
  const classes = useStyles(props)
  const { data, statuteVersions } = props
  const { tableOfContents, hasParts, hasChapters } = props
  const {
    sortBy, columnId, linkAsButton, showSource, sourceExternalLink
  } = props.tableOfContentsConfig || {}
  const [selectedSection, setSelectedSection] = useState(null)

  // yhden pykälän sisältämät eri versionumerot
  const getSectionVersionNumbers = (data) => {
    const versions = []

    if (data.versionNumber) {
      versions.push(data.versionNumber)
    }
    if (isArray(data)) {
      data.forEach(it => versions.push(...getSectionVersionNumbers(it)))
    }
    if (data.sections) {
      versions.push(...getSectionVersionNumbers(data.sections))
    }
    if (data.subsections) {
      versions.push(...getSectionVersionNumbers(data.subsections))
    }
    if (data.paragraphs) {
      versions.push(...getSectionVersionNumbers(data.paragraphs))
    }
    if (data.subparagraphs) {
      versions.push(...getSectionVersionNumbers(data.subparagraphs))
    }
    return [...new Set(versions)].sort()
  }

  // säädöksen eri versioiden tiedot
  const statuteVersionsInfo = statuteVersions.reduce((map, it) => {
    const he = isArray(it.he) ? it.he.find(he => he.id.toLowerCase().includes('he')) : it.he
    const versionNumber = it.versionNumber

    map[versionNumber] = {
      id: it.identifier || it.version,
      he: he ? he.id : null,
      heUrl: he ? he.url : null,
      entryIntoForce: it.entryIntoForceDate || null,
      version: it.version,
      versionNumber,
      finlexUrl: it.finlexUrl || null,
      noLongerInForce: null
    }

    return map
  }, {})

  // haetaan pykälän sisältä vain yhteen versioon kuuluvat osat
  const findPartsByVersionNumber = (data, targetVersionNumber) => {
    if (!data) {
      return null
    }

    // console.log(data.id);
    // console.log(data);

    if (data.sections) {
      const { sections, ...restOfData } = data
      const parts = isArray(sections)
        ? sections.map(section => findPartsByVersionNumber(section, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
        : findPartsByVersionNumber(sections, targetVersionNumber)

      const partToKeep = isArray(parts) ? parts.sort((a, b) => b.versionNumber - a.versionNumber)[0] : parts
      // console.log('partToKeep', partToKeep);

      if (partToKeep && partToKeep.subsections && partToKeep.content) {
        const { content, subsections, ...rest } = partToKeep
        return { ...restOfData, sections: { ...rest, subsections } }
      } else if (partToKeep && partToKeep.subsections) {
        return { ...restOfData, sections: partToKeep }
      } else if (partToKeep && partToKeep.content) {
        return { ...restOfData, content: partToKeep.content }
      }
    }

    if (data.subsections) {
      const { subsections, ...restOfData } = data
      const parts = isArray(subsections)
        ? subsections.map(subsection => findPartsByVersionNumber(subsection, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
        : findPartsByVersionNumber(subsections, targetVersionNumber)

      const partsArray = isArray(parts) ? parts : [parts]

      return partsArray?.[0] ? { ...restOfData, subsections: partsArray } : null
    }

    if (data.paragraphs) {
      const { paragraphs, ...restOfData } = data
      const parts = isArray(paragraphs)
        ? paragraphs.map(paragraph => findPartsByVersionNumber(paragraph, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
        : findPartsByVersionNumber(paragraphs, targetVersionNumber)

      const partsArray = isArray(parts) ? parts : [parts]

      return partsArray?.[0] ? { ...restOfData, paragraphs: partsArray } : null
    }

    if (data.subparagraphs) {
      const { subparagraphs, ...restOfData } = data

      const parts = isArray(subparagraphs)
        ? subparagraphs.map(subparagraph => findPartsByVersionNumber(subparagraph, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
        : findPartsByVersionNumber(subparagraphs, targetVersionNumber)

      const partsArray = isArray(parts) ? parts : [parts]

      return partsArray?.[0] ? { ...restOfData, subparagraphs: partsArray } : null
    }

    if (data.content && data.versionNumber === targetVersionNumber) {
      const number = data.number === 'intro' ? '0' : data.number
      const content = isArray(data.content) ? data.content[0] : data.content
      return { ...data, content, number }
    }

    return null
  }

  const mergeSubParagraphs = (oldVersions, newVersions) => {
    if (oldVersions === null) return newVersions
    if (newVersions === null) return oldVersions

    const all = Object.values(groupBy(concat(oldVersions, newVersions), 'number'))
    const merged = []

    for (const item of all) {
      if (item.length > 1) {
        const sorted = item.sort((a, b) => a.versionNumber - b.versionNumber)
        const newVersion = sorted[1]
        merged.push({ ...newVersion })
      } else {
        merged.push(...item)
      }
    }
    return merged
  }

  const mergeVersions = (oldVersion, newVersion) => {
    if (oldVersion === null) return newVersion

    if (oldVersion && newVersion) {
      const { sections, ...rest } = newVersion

      // * SECTIONS * //
      let mergedSections = null
      // molemmissa pitäisi lähtökohtaisesti olla sections, mutta tarkistetaan silti
      if (newVersion.sections && oldVersion.sections) {
        // * SUBSECTIONS * //
        let mergedSubsections = []

        // jos molemmissa on subsections, vertaillaan ne läpi, subsections on aina lista
        if (newVersion.sections.subsections && oldVersion.sections.subsections) {
          const oldSubSections = oldVersion.sections.subsections || []
          const newSubSections = newVersion.sections.subsections || []

          // yhdistetään kaikki subsectionit ja järjestetään ne versionumeron mukaan
          const allSubSections = Object.values(groupBy(concat(newSubSections, oldSubSections), 'number'))
          // käydään läpi kaikki subsectionit
          for (const subSection of allSubSections) {
            // SUBSECTION: jos subsectionista on kaksi versiota, niin vertaillaan ne tarkemmin
            if (subSection.length > 1) {
              const sortedSubSections = subSection.sort((a, b) => a.versionNumber - b.versionNumber)
              const oldSubSection = sortedSubSections[0]
              const newSubSections = sortedSubSections[1]

              // * PARAGRAPHS * //
              // PARAGRAPH: jos molemmissa on paragraphs, vertaillaan ne läpi, paragraphs on aina lista
              let mergedParagraphs = []
              if (oldSubSection.paragraphs && newSubSections.paragraphs) {
                const oldParagraphs = oldSubSection.paragraphs || []
                const newParagraphs = newSubSections.paragraphs || []

                const allParagraphs = Object.values(groupBy(concat(oldParagraphs, newParagraphs), 'number'))
                for (const paragraph of allParagraphs) {
                  // PARAGRAPH: jos kohdasta on kaksi versiota, niin vertaillaan ne tarkemmin
                  if (paragraph.length > 1) {
                    const sortedParagraphs = paragraph.sort((a, b) => a.versionNumber - b.versionNumber)
                    const oldParagraph = sortedParagraphs[0]
                    const newParagraph = sortedParagraphs[1]

                    // * SUBPARAGRAPHS * //
                    // SUBPARAGRAPH: jos molemmissa on subparagraphs, vertaillaan ne läpi, subparagraphs on aina lista
                    let mergedSubParagraphs = []
                    if (oldParagraph.subparagraphs && newParagraph.subparagraphs) {
                      const oldSubParagraphs = oldParagraph.subparagraphs || []
                      const newSubParagraphs = newParagraph.subparagraphs || []

                      const allSubParagraphs = Object.values(groupBy(concat(oldSubParagraphs, newSubParagraphs), 'number'))

                      for (const subParagraph of allSubParagraphs) {
                        if (subParagraph.length > 1) {
                          const sortedSubParagraphs = subParagraph.sort((a, b) => a.versionNumber - b.versionNumber)
                          const newSubParagraph = sortedSubParagraphs[1]
                          mergedSubParagraphs.push({ ...newSubParagraph })
                        } else {
                          mergedSubParagraphs.push(...subParagraph)
                        }
                      }
                    } else {
                      mergedSubParagraphs = newParagraph.subparagraphs || oldParagraph.subparagraphs
                    }
                    // * SUBPARAGRAPHS END * //

                    if (isEmpty(mergedSubParagraphs)) {
                      mergedParagraphs.push({ ...newParagraph })
                    } else {
                      mergedParagraphs.push({ ...newParagraph, subparagraphs: mergedSubParagraphs.sort((a, b) => a.number - b.number) })
                    }
                  } else {
                    mergedParagraphs.push(...paragraph)
                  }
                }
              } else {
                mergedParagraphs = newSubSections.paragraphs || oldSubSection.paragraphs
              }
              // * PARAGRAPHS END * //
              if (!isEmpty(mergedParagraphs)) {
                mergedSubsections.push({ ...newSubSections, paragraphs: mergedParagraphs.sort((a, b) => a.number - b.number) })
              } else {
                mergedSubsections.push({ ...newSubSections })
              }
              // SUBSECTIONS: muuten pidetään ainoa subsection
            } else {
              mergedSubsections.push(...subSection)
            }
          }
        } else {
          mergedSubsections = newVersion.sections.subsections || oldVersion.sections.subsections
        }
        // * SUBSECTIONS END * //

        if (!isEmpty(mergedSubsections)) {
          mergedSections = { ...newVersion.sections, subsections: mergedSubsections.sort((a, b) => a.number - b.number) }
        } else {
          mergedSections = { ...newVersion.sections }
        }
      } else {
        mergedSections = newVersion.sections || oldVersion.sections
      }
      // * SECTIONS END * //

      return { ...rest, sections: mergedSections }
    }
    return oldVersion
  }

  // koostetaan yhden pykälän kaikki versiot yhteen ja lisätään säädösversion tiedot
  const parseVersions = (data) => {
    const sectionVersions = getSectionVersionNumbers(data)
    const versions = []
    let previousVersion = null

    for (const version of sectionVersions) {
      const parts = findPartsByVersionNumber(data, version)
      const mergedParts = mergeVersions(previousVersion, parts)
      const versionInfo = statuteVersionsInfo[version]
      previousVersion = mergedParts

      if (mergedParts != null) {
        versions.push({ ...versionInfo, hasParts: mergedParts })
      }
    }
    return versions
  }

  // käydään läpi kaikki pykälät ja koostetaan niiden sisältämät versiot
  const parseSections = (data) => {
    return data.reduce((map, section) => {
      const versions = parseVersions(section)
      map[section.idShort] = versions
      return map
    }, {})
  }

  const sections = parseSections(data)

  return (
    <div className={classes.root}>
      <Grid className={classes.mainContainer} container spacing={1}>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={4}>
          {tableOfContents &&
            <Paper className={classes.tableOfContents}>
              <>
                <Typography variant='h6' component='h2'>Voimassa olevat pykälät</Typography>
                <SectionOfALawListCollapsible
                  data={tableOfContents}
                  hasParts={hasParts === 'true'}
                  hasChapters={hasChapters === 'true'}
                  makeLink={false}
                  externalLink={false}
                  sortValues={false}
                  sortBy={sortBy}
                  numberedList={false}
                  columnId={columnId}
                  expanded
                  linkAsButton={linkAsButton}
                  showSource={showSource}
                  sourceExternalLink={sourceExternalLink}
                  collapsible={false}
                  onlyHashLinks
                  setSelectedSection={setSelectedSection}
                />
              </>
            </Paper>}
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={8}>
          <Paper className={classes.textOuterContainer}>
            {selectedSection
              ? <StatuteHistoryDetails sectionInfo={selectedSection} data={sections[selectedSection.key]} layoutConfig={props.layoutConfig} HTMLParserTask={props.HTMLParserTask} />
              : (
                <div className={classes.textInnerContainer}>
                  <Typography variant='h6' component='p'>Valitse näytettävä pykälä sisällysluettelosta.</Typography>
                </div>
              )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContextualContentStatuteHistory
