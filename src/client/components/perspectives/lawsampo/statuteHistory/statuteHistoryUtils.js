import { concat, groupBy, isArray, isEmpty } from 'lodash'

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

// haetaan pykälän sisältä vain yhteen versioon kuuluvat osat
const findPartsByVersionNumber = (data, targetVersionNumber) => {
  if (!data) {
    return null
  }

  if (data.sections) {
    const { sections, ...restOfData } = data
    const parts = isArray(sections)
      ? sections.map(section => findPartsByVersionNumber(section, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
      : findPartsByVersionNumber(sections, targetVersionNumber)

    const partToKeep = isArray(parts) ? parts.sort((a, b) => b.versionNumber - a.versionNumber)[0] : parts

    if (partToKeep && partToKeep.subsections && partToKeep.content) {
      const { content, subsections, ...rest } = partToKeep
      return { ...restOfData, sections: { ...rest, subsections } }
    } else {
      return { ...restOfData, sections: partToKeep }
    }
  }

  if (data.subsections) {
    const { subsections, ...restOfData } = data
    const parts = isArray(subsections)
      ? subsections.map(subsection => findPartsByVersionNumber(subsection, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
      : findPartsByVersionNumber(subsections, targetVersionNumber)

    const partsArray = isArray(parts) ? parts : [parts]
    const groupedParts = Object.values(groupBy(partsArray, 'number')).map(group => group.length > 1 ? group.find(part => part.versionNumber === targetVersionNumber) : group[0]).filter(Boolean)

    return groupedParts?.[0] ? { ...restOfData, subsections: groupedParts } : null
  }

  if (data.paragraphs) {
    const { paragraphs, ...restOfData } = data
    const parts = isArray(paragraphs)
      ? paragraphs.map(paragraph => findPartsByVersionNumber(paragraph, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
      : findPartsByVersionNumber(paragraphs, targetVersionNumber)

    const partsArray = isArray(parts) ? parts : [parts]
    const groupedParts = Object.values(groupBy(partsArray, 'number')).map(group => group.length > 1 ? group.find(part => part.versionNumber === targetVersionNumber) : group[0]).filter(Boolean)

    return groupedParts?.[0] ? { ...restOfData, paragraphs: groupedParts } : null
  }

  if (data.subparagraphs) {
    const { subparagraphs, ...restOfData } = data

    const parts = isArray(subparagraphs)
      ? subparagraphs.map(subparagraph => findPartsByVersionNumber(subparagraph, targetVersionNumber)).filter(Boolean).sort((a, b) => a.number - b.number)
      : findPartsByVersionNumber(subparagraphs, targetVersionNumber)

    const partsArray = isArray(parts) ? parts : [parts]

    return partsArray?.[0] ? { ...restOfData, subparagraphs: partsArray } : null
  }

  const versionsArray = isArray(data.partOfVersions) ? data.partOfVersions : [data.partOfVersions]

  if (data.content && (data.versionNumber === targetVersionNumber)) {
    const number = data.number === 'intro' ? '0' : data.number
    const content = isArray(data.content) ? data.content[0] : data.content
    return { ...data, content, number }
  }
  return null
}

// säädöksen eri versioiden tiedot
const getStatuteVersionsInfo = (statuteVersions) => (
  statuteVersions.reduce((map, it) => {
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
  }, {}))

// yhdistetään vanha ja uusi versio
const mergeVersions = (oldVersion, newVersion) => {
  if (oldVersion === null) return newVersion

  if (oldVersion && newVersion) {
    const { sections, ...rest } = newVersion

    // * SECTIONS * //
    let mergedSections = null
    // molemmissa pitäisi lähtökohtaisesti olla sections, mutta tarkistetaan silti
    if (newVersion.sections && oldVersion.sections) {
      const mergedSubsections = mergeSubsections(oldVersion.sections.subsections, newVersion.sections.subsections)

      if (newVersion.sections.content && !newVersion.sections.subsections) {
        mergedSections = { ...newVersion.sections }
      } else if (!isEmpty(mergedSubsections)) {
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

const mergeSubsections = (oldVersions, newVersions) => {
  if (!oldVersions && !newVersions) return null
  if (!oldVersions) return newVersions
  if (!newVersions) return oldVersions

  const all = Object.values(groupBy(concat(oldVersions, newVersions), 'number'))
  const merged = []

  for (const item of all) {
    if (item.length > 1) {
      const sorted = item.sort((a, b) => a.versionNumber - b.versionNumber)
      const oldVersion = sorted[0]
      const newVersion = sorted[1]

      if (newVersion.content && !newVersion.paragraphs) {
        merged.push({ ...newVersion })
      } else if (oldVersion.paragraphs && newVersion.paragraphs) {
        const mergedParagraphs = mergeParagraphs(oldVersion.paragraphs, newVersion.paragraphs)
        merged.push({ ...newVersion, paragraphs: mergedParagraphs.sort((a, b) => a.number - b.number) })
      } else {
        merged.push({ ...newVersion })
      }
    } else {
      merged.push(...item)
    }
  }
  return merged
}

const mergeParagraphs = (oldVersions, newVersions) => {
  if (!oldVersions && !newVersions) return null
  if (!oldVersions) return newVersions
  if (!newVersions) return oldVersions

  const all = Object.values(groupBy(concat(oldVersions, newVersions), 'number'))
  const merged = []

  for (const item of all) {
    if (item.length > 1) {
      const sorted = item.sort((a, b) => a.versionNumber - b.versionNumber)
      const oldVersion = sorted[0]
      const newVersion = sorted[1]

      if (newVersion.content && !newVersion.subparagraphs) {
        merged.push({ ...newVersion })
      } else if (oldVersion.subparagraphs && newVersion.subparagraphs) {
        const mergedSubParagraphs = mergeSubParagraphs(oldVersion.subparagraphs, newVersion.subparagraphs)
        merged.push({ ...newVersion, subparagraphs: mergedSubParagraphs.sort((a, b) => a.number - b.number) })
      } else {
        merged.push({ ...newVersion })
      }
    } else {
      merged.push(...item)
    }
  }
  return merged
}

const mergeSubParagraphs = (oldVersions, newVersions) => {
  if (!oldVersions && !newVersions) return null
  if (!oldVersions) return newVersions
  if (!newVersions) return oldVersions

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

// koostetaan yhden pykälän kaikki versiot yhteen ja lisätään säädösversion tiedot
const parseVersions = (data, statuteVersions) => {
  const sectionVersions = getSectionVersionNumbers(data)
  const versions = []
  let previousVersion = null

  for (const version of sectionVersions) {
    const parts = findPartsByVersionNumber(data, version)
    const mergedParts = mergeVersions(previousVersion, parts)
    const statuteVersionsInfo = getStatuteVersionsInfo(statuteVersions)
    const versionInfo = statuteVersionsInfo[version]
    previousVersion = mergedParts

    if (mergedParts != null) {
      versions.push({ ...versionInfo, hasParts: mergedParts })
    }
  }
  return versions
}

// käydään läpi kaikki pykälät ja koostetaan niiden sisältämät versiot
export const parseSections = (data, statuteVersions) => {
  return data.reduce((map, section) => {
    const versions = parseVersions(section, statuteVersions)
    map[section.idShort] = versions
    return map
  }, {})
}
