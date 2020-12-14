import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import { arrayToObject } from './helpers'
import { findAll } from 'domutils'

export default class HTMLParser {
  constructor (props) {
    this.props = props
    this.referencedTermsObj = null
  }

  parseHTML (html) {
    let transform
    let preprocessNodes
    switch (this.props.HTMLParserTask) {
      case 'addReactRouterLinks':
        transform = this.addReactRouterLinks
        break
      case 'addAnnotationTooltips':
        this.processReferencedTerms()
        transform = this.addAnnotationTooltips
        preprocessNodes = this.preprocessNodes
        break
      default:
        transform = null
    }
    return ReactHtmlParser(html, { transform, preprocessNodes })
  }

  preprocessNodes (nodes) {
    // Add ids for section divs
    const sectionDivs = findAll((node) => (node.attribs.class === 'section'), nodes)
    sectionDivs.map(node => {
      let chapterNumber
      if (node.parent.attribs.class === 'entry-into-force' && node.parent.parent.attribs.class === 'chapter') {
        chapterNumber = node.parent.parent.children[0].children[0].data
        chapterNumber = `chapter_${chapterNumber.replace(' luku', '')}_`
        chapterNumber = chapterNumber.replace(/\s/g, '')
      } else if (node.parent.attribs.class === 'chapter') {
        chapterNumber = node.parent.children[0].children[0].data
        chapterNumber = `chapter_${chapterNumber.replace(' luku', '')}_`
        chapterNumber = chapterNumber.replace(/\s/g, '')
      } else {
        chapterNumber = ''
      }
      let sectionNumber = node.children[0].children[0].data
      sectionNumber = sectionNumber.replace(/\s/g, '').replace('§', '')
      node.attribs.id = `#${chapterNumber}section_${sectionNumber}`
    })
    return nodes
  }

  addReactRouterLinks (node, index) {
    if (node.type === 'tag' && node.name === 'a') {
      const href = node.attribs.href
      const text = node.children[0].data
      return <Link key={index} to={href}>{text}</Link>
    }
  }

  processReferencedTerms = () => {
    const { referencedTerm } = this.props
    if (Array.isArray(referencedTerm)) {
      this.referencedTermsObj = arrayToObject({ array: referencedTerm, keyField: 'id' })
    }
  }

  addAnnotationTooltips = (node, index) => {
    const props = this.props

    // Section divs: add refs based on id
    if (node.parent && node.parent.attribs && node.parent.attribs.class === 'section' && node.name === 'h4' && node.children[0].data && node.children[0].data.includes('§')) {
      const id = node.parent.attribs.id
      return (
        <React.Fragment key={index}>
          <div className='ref' ref={element => { this.props.sectionRefs.current[id] = element }} />
          <h4 className='item-identifier'>{node.children[0].data}</h4>
        </React.Fragment>
      )
    }

    // Add tooltips for showing automatic annnotations
    if (this.referencedTermsObj && node.type === 'tag' && node.name === 'span' &&
    node.attribs.name === 'namedentity' && node.attribs['data-link'] !== '') {
      const linkStr = node.attribs['data-link']
      let tooltipJSX
      if (linkStr.includes(',')) {
        const urisJSX = []
        let uris = linkStr.split(',')
        uris = uris.filter(uri => this.shouldAddAnnotation(uri))
        uris.map(uri => {
          urisJSX.push(this.renderAnnotation(uri))
        })
        tooltipJSX = (
          <div className={props.classes.tooltipContent}>
            {urisJSX}
          </div>
        )
      } else {
        const uri = linkStr
        if (!this.shouldAddAnnotation(uri)) { return }
        tooltipJSX = (
          <div className={props.classes.tooltipContent}>
            {this.renderAnnotation(uri)}
          </div>
        )
      }
      let text
      if (node.children.length > 1 && node.children[1].name === 'a') {
        const a = node.children[1]
        text = a.children[0].data
      } else {
        text = node.children[0].data
      }
      return (
        <Tooltip
          key={index}
          title={tooltipJSX}
          interactive
          placement='top'
          arrow
          classes={{
            tooltip: props.classes.tooltip
          }}
        >
          <span style={{ color: 'red', cursor: 'pointer' }}>{text}</span>
        </Tooltip>
      )
    }
  }

  shouldAddAnnotation = uri => uri.startsWith('http://fi.dbpedia.org/') || uri.startsWith('http://ldf.fi/ttp/')

  renderAnnotation = uri => {
    if (uri.startsWith('http://ldf.fi/ttp/')) {
      const localID = uri.replace('http://ldf.fi/ttp/', '')
      uri = `http://ldf.fi/ttp/${encodeURIComponent(localID)}`
    }
    const { prefLabel, description, externalLink } = this.referencedTermsObj[uri]
    let source
    if (uri.startsWith('http://ldf.fi/ttp/')) {
      source = 'Tieteen termipankki'
    }
    if (uri.startsWith('http://fi.dbpedia.org/')) {
      source = 'Wikipedia'
    }
    if (source === 'Wikipedia') {
      return (
        <React.Fragment key={uri}>
          <p>
            <a href={externalLink} target='_blank' rel='noopener noreferrer'>
              {prefLabel.charAt(0).toUpperCase() + prefLabel.slice(1)} ({source})
            </a>
          </p>
          <p>{description}</p>
        </React.Fragment>
      )
    }
    if (source === 'Tieteen termipankki') {
      return (
        <React.Fragment key={uri}>
          <p>
            <a href={externalLink} target='_blank' rel='noopener noreferrer'>
              {prefLabel.charAt(0).toUpperCase() + prefLabel.slice(1)} ({source})
            </a>
          </p>
        </React.Fragment>
      )
    }
  }
}
