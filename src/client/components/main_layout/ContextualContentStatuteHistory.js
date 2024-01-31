import React, { useRef, useEffect } from 'react'

// import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SectionOfALawListCollapsible from '../facet_results/SectionOfALawListCollapsible'
import HTMLParser from '../../helpers/HTMLParser'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { has } from 'lodash'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack } from '@mui/material'
import Link from '@mui/material/Link'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

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
    height: 400,
    overflow: 'auto',
    marginTop: -8,
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
  divider: {
    paddingBottom: theme.spacing(1)
  },
  metaDataContainer: {
    backgroundColor: '#dfdfdf',
    overflow: 'hidden',
    padding: theme.spacing(1)
  }
}))

const testData = [
  {
    id: '19931501',
    he: 'HE 88/93',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+88/1993',
    entryIntoForce: '1994-06-01',
    version: 'Original',
    versionNumber: 19931501,
    hasParts: [
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
        number: 1,
        type: 'section',
        versionNumber: 19931501,
        hasParts: [{
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/19931501',
          number: 1,
          type: 'subsection',
          versionNumber: 19931501,
          hasParts: [
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/intro/19931501',
              content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:',
              number: 0,
              versionNumber: 19931501,
              type: 'paragraph'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/1/19931501',
              content: 'liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;',
              number: 1,
              versionNumber: 19931501,
              type: 'paragraph'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/2/19931501',
              number: 2,
              type: 'paragraph',
              versionNumber: 19931501,
              content: 'tavaran maahantuonnista.'
            }
          ]
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/19931501',
          number: 2,
          type: 'subsection',
          versionNumber: 19931501,
          content: 'Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.'
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19931501',
          number: 3,
          type: 'subsection',
          versionNumber: 19931501,
          content: 'Henkilökuljetustoiminnan ja yleisradiotoiminnan harjoittamisen katsotaan tapahtuvan liiketoiminnan muodossa silloinkin, kun toiminnan harjoittamiseen saadaan 79 §:ssä tarkoitettuja korvauksia.'
        }]
      }
    ],
    originalStatute: '1501/1993',
    originalStatuteFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
    amendedBy: null,
    amendedByFinlexUrl: null,
    noLongerInForce: null
  },
  {
    id: '19941483',
    he: null,
    heUrl: null,
    entryIntoForce: null,
    version: 'Consolidated',
    versionNumber: 19941483,
    hasParts: [{
      id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
      number: 1,
      type: 'section',
      versionNumber: 19931501,
      hasParts: [
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1',
          number: 1,
          type: 'subsection',
          versionNumber: 19931501,
          hasParts: [
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/intro/19931501',
              content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:',
              number: 0,
              versionNumber: 19931501,
              type: 'paragraph'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/1/19931501',
              content: 'liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;',
              number: 1,
              versionNumber: 19931501,
              type: 'paragraph'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/2/19941483',
              number: 2,
              type: 'paragraph',
              versionNumber: 19941483,
              content: 'Suomessa tapahtuvasta tavaran maahantuonnista;'
            }
          ]
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/19931501',
          number: 2,
          type: 'subsection',
          versionNumber: 19931501,
          content: 'Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.'
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19941483',
          number: 3,
          type: 'subsection',
          versionNumber: 19941483,
          content: '3 momentti on kumottu L:lla 29.12.1994/1486.'
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/19941483',
          number: 5,
          type: 'subsection',
          versionNumber: 19941483,
          content: 'Autoverolle suoritettavasta arvonlisäverosta säädetään erikseen autoverolaissa (1482/94).'
        }
      ]
    }],
    originalStatute: '1501/1993',
    originalStatuteFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
    amendedBy: '1486/1994',
    amendedByFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1994/19941486',
    noLongerInForce: null
  },
  {
    id: '19951767',
    he: null,
    heUrl: null,
    entryIntoForce: null,
    version: 'Consolidated',
    versionNumber: 19951767,
    hasParts: [
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
        number: 1,
        type: 'section',
        versionNumber: 19931501,
        hasParts: [
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/19931501',
            number: 1,
            type: 'subsection',
            versionNumber: 19931501,
            hasParts: [
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/intro/19931501',
                content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:',
                number: 0,
                versionNumber: 19931501,
                type: 'paragraph'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/1/19931501',
                content: 'liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;',
                number: 1,
                versionNumber: 19931501,
                type: 'paragraph'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/2/19941483',
                number: 2,
                type: 'paragraph',
                versionNumber: 19941483,
                content: 'Suomessa tapahtuvasta tavaran maahantuonnista;'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/3/19951767',
                type: 'paragraph',
                number: 3,
                versionNumber: 19951767,
                content: 'Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/4/19951767',
                type: 'paragraph',
                number: 4,
                versionNumber: 19951767,
                content: 'Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.'
              }
            ]
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/19931501',
            number: 2,
            type: 'subsection',
            versionNumber: 19931501,
            content: 'Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19941483',
            number: 3,
            type: 'subsection',
            versionNumber: 19941483,
            content: '3 momentti on kumottu L:lla 29.12.1994/1486.'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/19941483',
            number: 5,
            type: 'subsection',
            versionNumber: 19941483,
            content: 'Autoverolle suoritettavasta arvonlisäverosta säädetään erikseen autoverolaissa (1482/94).'
          }
        ]
      }],
    originalStatute: '1501/1993',
    originalStatuteFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
    amendedBy: '1767/1995',
    amendedByFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1995/19951767',
    noLongerInForce: null
  },
  {
    id: '19970585',
    he: 'HE 64/1997',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+64/1997',
    entryIntoForce: '1997-07-01',
    version: 'Consolidated',
    versionNumber: 19970585,
    hasParts: [
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
        number: 1,
        type: 'section',
        versionNumber: 19931501,
        hasParts: [
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/19931501',
            number: 1,
            type: 'subsection',
            versionNumber: 19931501,
            hasParts: [
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/intro/19931501',
                content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:',
                number: 0,
                versionNumber: 19931501,
                type: 'paragraph'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/1/19931501',
                content: 'liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;',
                number: 1,
                versionNumber: 19931501,
                type: 'paragraph'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/2/19941483',
                number: 2,
                type: 'paragraph',
                versionNumber: 19941483,
                content: 'Suomessa tapahtuvasta tavaran maahantuonnista;'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/3/19951767',
                type: 'paragraph',
                number: 3,
                versionNumber: 19951767,
                content: 'Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;'
              },
              {
                id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/4/19951767',
                type: 'paragraph',
                number: 4,
                versionNumber: 19951767,
                content: 'Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.'
              }
            ]
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/19931501',
            number: 2,
            type: 'subsection',
            versionNumber: 19931501,
            content: 'Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19941483',
            number: 3,
            type: 'subsection',
            versionNumber: 19941483,
            content: '3 momentti on kumottu L:lla 29.12.1994/1486.'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/4/19970585',
            number: 4,
            type: 'subsection',
            versionNumber: 19970585,
            content: 'Myynnin ei katsota tapahtuvan liiketoiminnan muodossa, jos siitä saatu vastike on ennakkoperintälain (1118/1996) 13 §:ssä tarkoitettua palkkaa.'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/19941483',
            number: 5,
            type: 'subsection',
            versionNumber: 19941483,
            content: 'Autoverolle suoritettavasta arvonlisäverosta säädetään erikseen autoverolaissa (1482/94).'
          }
        ]
      }],
    originalStatute: '1501/1993',
    originalStatuteFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
    amendedBy: '585/1997',
    amendedByFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1997/19970585',
    noLongerInForce: null
  },
  {
    id: '20090006',
    he: 'HE 192/2008',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+192/2008',
    entryIntoForce: '2009-04-01',
    version: 'Consolidated',
    versionNumber: 20090006,
    hasParts: [{
      id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
      number: 1,
      type: 'section',
      versionNumber: 19931501,
      hasParts: [
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
          number: 1,
          type: 'section',
          versionNumber: 19931501,
          hasParts: [
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/19931501',
              number: 1,
              type: 'subsection',
              versionNumber: 19931501,
              hasParts: [
                {
                  id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/intro/19931501',
                  content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:',
                  number: 0,
                  versionNumber: 19931501,
                  type: 'paragraph'
                },
                {
                  id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/1/19931501',
                  content: 'liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;',
                  number: 1,
                  versionNumber: 19931501,
                  type: 'paragraph'
                },
                {
                  id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/2/19941483',
                  number: 2,
                  type: 'paragraph',
                  versionNumber: 19941483,
                  content: 'Suomessa tapahtuvasta tavaran maahantuonnista;'
                },
                {
                  id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/3/19951767',
                  type: 'paragraph',
                  number: 3,
                  versionNumber: 19951767,
                  content: 'Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;'
                },
                {
                  id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/4/19951767',
                  type: 'paragraph',
                  number: 4,
                  versionNumber: 19951767,
                  content: 'Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.'
                }
              ]
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/19931501',
              number: 2,
              type: 'subsection',
              versionNumber: 19931501,
              content: 'Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19941483',
              number: 3,
              type: 'subsection',
              versionNumber: 19941483,
              content: '3 momentti on kumottu L:lla 29.12.1994/1486.'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/4/19970585',
              number: 4,
              type: 'subsection',
              versionNumber: 19970585,
              content: 'Myynnin ei katsota tapahtuvan liiketoiminnan muodossa, jos siitä saatu vastike on ennakkoperintälain (1118/1996) 13 §:ssä tarkoitettua palkkaa.'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/20090006',
              number: 5,
              type: 'subsection',
              versionNumber: 20090006,
              content: '5 momentti on kumottu L:lla 9.1.2009/6.'
            }
          ]
        }]
    }],
    originalStatute: '1501/1993',
    originalStatuteFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
    amendedBy: '6/2009',
    amendedByFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/2009/20090006',
    noLongerInForce: null
  },
  {
    id: '20161064',
    he: 'HE 110/2016',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+110/2016',
    entryIntoForce: '2017-01-01',
    version: 'Consolidated',
    versionNumber: 20161064,
    hasParts: [{
      id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
      number: 1,
      type: 'section',
      versionNumber: 19931501,
      hasParts: [
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/19931501',
          number: 1,
          type: 'subsection',
          versionNumber: 19931501,
          hasParts: [
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/intro/19931501',
              content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:',
              number: 0,
              versionNumber: 19931501,
              type: 'paragraph'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/1/19931501',
              content: 'liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;',
              number: 1,
              versionNumber: 19931501,
              type: 'paragraph'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/2/19941483',
              number: 2,
              type: 'paragraph',
              versionNumber: 19941483,
              content: 'Suomessa tapahtuvasta tavaran maahantuonnista;'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/3/19951767',
              type: 'paragraph',
              number: 3,
              versionNumber: 19951767,
              content: 'Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;'
            },
            {
              id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/4/19951767',
              type: 'paragraph',
              number: 4,
              versionNumber: 19951767,
              content: 'Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.'
            }
          ]
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/19931501',
          number: 2,
          type: 'subsection',
          versionNumber: 19931501,
          content: '2 momentti on kumottu L:lla 9.12.2016/1064.'
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19941483',
          number: 3,
          type: 'subsection',
          versionNumber: 19941483,
          content: '3 momentti on kumottu L:lla 29.12.1994/1486.'
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/4/19970585',
          number: 4,
          type: 'subsection',
          versionNumber: 19970585,
          content: 'Myynnin ei katsota tapahtuvan liiketoiminnan muodossa, jos siitä saatu vastike on ennakkoperintälain (1118/1996) 13 §:ssä tarkoitettua palkkaa.'
        },
        {
          id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/20161064',
          number: 5,
          type: 'subsection',
          versionNumber: 20161064,
          content: '5 momentti on kumottu L:lla 9.1.2009/6.'
        }
      ]
    }],
    originalStatute: '1501/1993',
    originalStatuteFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
    amendedBy: '1064/2016',
    amendedByFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/2016/20161064',
    noLongerInForce: null
  },
  {
    id: '20241234',
    he: 'HE 110/2023',
    heUrl: null,
    entryIntoForce: '2024-01-01',
    version: 'Consolidated',
    versionNumber: 20241234,
    hasParts: [{
      id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/20241234',
      number: 1,
      type: 'section',
      versionNumber: 20241234,
      content: '1 pykälä kumottu L:lla 1.1.2024/1234'

    }],
    originalStatute: '1501/1993',
    originalStatuteFinlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
    amendedBy: '1234/2024',
    amendedByFinlexUrl: null,
    noLongerInForce: '2024-01-01'
  }
]

const ContextualContentStatuteHistory = props => {
  const classes = useStyles(props)
  let { data } = props
  const { tableOfContents, hasPartss, hasChapters } = props
  const {
    makeLink, externalLink, sortValues, sortBy, numberedList, columnId, linkAsButton,
    showSource, sourceExternalLink
  } = props.tableOfContentsConfig || {}
  const location = useLocation()
  const sectionRefs = useRef({})

  // Fuseki splits long HTML texts, combine them here
  if (Array.isArray(data)) {
    data = data.join('')
    data = false
  }
  const parser = new HTMLParser({ ...props, classes, sectionRefs })
  data = parser.parseHTML(data)
  console.log(data)

  useEffect(() => {
    if (tableOfContents && location.hash) {
      setTimeout(() => {
        const ref = sectionRefs.current
        if (has(ref, location.hash)) {
          ref[location.hash].scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }, [location.hash])

  const parseContent = (data, versionNumber) => {
    return Object.keys(data).reduce((result, key) => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        return result + parseContent(data[key], versionNumber)
      }
      if (key === 'content') {
        let content = data.content
        if (['paragraph', 'subparagraph'].includes(data.type) && data.number !== 0) {
          content = `${data.number}) ${content}`
        }
        if (data.versionNumber === versionNumber) {
          content = `<strong>${content}</strong>`
        }
        return result + `<p>${content}</p>`
      }
      return result
    }, '')
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.mainContainer} container spacing={1}>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={4}>
          {tableOfContents &&
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
              >
                <Typography variant='h6' component='h2'>Sisällysluettelo</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SectionOfALawListCollapsible
                  data={tableOfContents}
                  hasPartss={hasPartss === 'true'}
                  hasChapters={hasChapters === 'true'}
                  makeLink={makeLink}
                  externalLink={externalLink}
                  sortValues={sortValues}
                  sortBy={sortBy}
                  numberedList={numberedList}
                  columnId={columnId}
                  expanded
                  linkAsButton={linkAsButton}
                  showSource={showSource}
                  sourceExternalLink={sourceExternalLink}
                  collapsible={false}
                  onlyHashLinks
                />
              </AccordionDetails>
            </Accordion>}
          {tableOfContents &&
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
              >
                <Typography variant='h6' component='h2'>Lain nimi</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Tähän lain ajantasainen versio näkyviin.
              </AccordionDetails>
            </Accordion>}
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={8}>
          <Paper className={classes.textOuterContainer}>
            <div className={classes.textInnerContainer}>
              <Typography variant='h6' component='h1'>16 § Tähän pykälä otsikko jos on</Typography>
              <Stack spacing={3}>
                {testData.map(item => (
                  <Paper key={item.id} variant='outlined'>
                    <Box className={classes.metaDataContainer}>
                      <Grid container spacing={4}>
                        <Grid item>
                          {item.amendedBy && <Typography variant='body2'>Versio: <Link href={item.amendedByFinlexUrl} target='_blank' rel='noreferrer'>{item.amendedBy}</Link></Typography>}
                          {item.version === 'Original' && <Typography variant='body2'>Versio: <Link href={item.originalStatuteFinlexUrl} target='_blank' rel='noreferrer'>{item.originalStatute}</Link> (ALKUPERÄINEN)</Typography>}
                        </Grid>
                        <Grid item>
                          <Typography variant='body2'>Voimaantulo:
                            {item.entryIntoForce ? <strong>{format(new Date(item.entryIntoForce), 'dd.MM.yyyy')}</strong> : ''}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='body2'>Esityöt: <Link href={item.heUrl} target='_blank' rel='noreferrer'>{item.he}</Link></Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Typography variant='body1' className={classes.statuteHistoryItem}>
                      {parser.parseHTML(parseContent(item.hasParts, item.versionNumber))}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContextualContentStatuteHistory
