import React, { useRef, useEffect, useState } from 'react'

// import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import SectionOfALawListCollapsible from '../facet_results/SectionOfALawListCollapsible'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'
import { has } from 'lodash'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import StatuteHistoryDetails from './StatuteHistoryDetails'

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
  metaDataContainer: {
    backgroundColor: '#dfdfdf',
    overflow: 'hidden',
    padding: theme.spacing(1)
  }
}))

const testData = [
  {
    id: '1501/1993',
    finlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501',
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
    noLongerInForce: null
  },
  {
    id: '1486/1994',
    finlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1994/19941486',
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
    noLongerInForce: null
  },
  {
    id: '1767/1995',
    finlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1995/19951767',
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
    noLongerInForce: null
  },
  {
    id: '585/1997',
    finlexUrl: 'https://www.finlex.fi/fi/laki/alkup/1997/19970585', 
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
    noLongerInForce: null
  },
  {
    id: '6/2009',
    finlexUrl: 'https://www.finlex.fi/fi/laki/alkup/2009/20090006',
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
    noLongerInForce: null
  },
  {
    id: '1064/2016',
    finlexUrl: 'https://www.finlex.fi/fi/laki/alkup/2016/20161064',
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
    noLongerInForce: null
  },
  {
    id: '1234/2024',
    finlexUrl: null,
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
    noLongerInForce: '2024-01-01'
  }
]

const testData2 = {
  id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1',
  sections: {
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/19931501',
    number: '1',
    versionNumber: '19931501',
    version: 'Original',
    level: 'section',
    subsections: [
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/20090006',
        versionNumber: '20090006',
        level: 'subsection',
        number: '5',
        content: [
          '5 momentti on kumottu L:lla 9.1.2009/6, joka tulee A:n 60/2009 mukaisesti voimaan 1.4.2009. Aiempi sanamuoto kuuluu:',
          '5 momentti on kumottu L:lla 9.1.2009/6.'
        ],
        version: 'Consolidated'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/4/19970585',
        versionNumber: '19970585',
        level: 'subsection',
        number: '4',
        content: 'Myynnin ei katsota tapahtuvan liiketoiminnan muodossa, jos siitä saatu vastike on ennakkoperintälain (1118/1996) 13 §:ssä tarkoitettua palkkaa.',
        version: 'Consolidated'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19941486',
        versionNumber: '19941486',
        level: 'subsection',
        number: '3',
        content: [
          '3 momentti on kumottu L:lla 29.12.1994/1486.',
          '3 momentti on kumottu L:lla .'
        ],
        version: 'Consolidated'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/19931501',
        versionNumber: '19931501',
        level: 'subsection',
        number: '2',
        content: 'Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.',
        version: 'Original'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/19931501',
        versionNumber: '19931501',
        level: 'subsection',
        number: '5',
        content: 'Autoverolle suoritettavasta arvonlisäverosta säädetään erikseen autoverolaissa (1482/94).',
        version: 'Original'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/2/20161064',
        versionNumber: '20161064',
        level: 'subsection',
        number: '2',
        content: [
          '2 momentti on kumottu L:lla 9.12.2016/1064.',
          '2 momentti on kumottu L:lla 9.12.2016/1064, joka tuli voimaan 1.1.2017. Aiempi sanamuoto kuuluu:',
          '2 momentti on kumottu L:lla 9.12.2016/1064, joka tulee voimaan 1.1.2017. Aiempi sanamuoto kuuluu:'
        ],
        version: 'Consolidated'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/5/19941483',
        versionNumber: '19941483',
        level: 'subsection',
        number: '5',
        content: 'Autoverolle suoritettavasta arvonlisäverosta säädetään erikseen autoverolaissa (1482/94).',
        version: 'Consolidated'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/3/19931501',
        versionNumber: '19931501',
        level: 'subsection',
        number: '3',
        content: '3 momentti on kumottu L:lla 29.12.1994/1486.',
        version: 'Original'
      },
      {
        id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/19931501',
        paragraphs: [
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/3/19951767',
            versionNumber: '19951767',
            level: 'paragraph',
            number: '3',
            content: 'Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;',
            version: 'Consolidated'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/4/19951767',
            versionNumber: '19951767',
            level: 'paragraph',
            number: '4',
            content: 'Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.',
            version: 'Consolidated'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/2/19941486',
            versionNumber: '19941486',
            level: 'paragraph',
            number: '2',
            content: 'Suomessa tapahtuvasta tavaran maahantuonnista;',
            version: 'Consolidated'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/intro/19931501',
            versionNumber: '19931501',
            level: 'paragraph',
            number: 'intro',
            content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:',
            version: 'Original'
          },
          {
            id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/subsec/1/para/1/19931501',
            versionNumber: '19931501',
            level: 'paragraph',
            number: '1',
            content: 'liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;',
            version: 'Original'
          }
        ]
      }
    ]
  }
}

const ContextualContentStatuteHistory = props => {
  const classes = useStyles(props)
  const { data, statuteVersions } = props
  const { tableOfContents, hasParts, hasChapters } = props
  const {
    sortBy, columnId, linkAsButton, showSource, sourceExternalLink
  } = props.tableOfContentsConfig || {}
  const location = useLocation()
  const sectionRefs = useRef({})
  const [selectedSection, setSelectedSection] = useState(null)

  // yhden pykälän sisältämät eri versionumerot
  const getSectionVersionNumbers = (data) => {
    const versions = []

    if (data.versionNumber) {
      versions.push(data.versionNumber)
    }
    if (Array.isArray(data)) {
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
  // console.log(getSectionVersionNumbers(testData2))

  // säädöksen eri versioiden tiedot
  const statuteVersionsInfo = statuteVersions.reduce((map, it) => {
    const he = Array.isArray(it.he) ? it.he.find(he => he.id.toLowerCase().includes('he')) : it.he
    const versionNumber = parseInt(it.versionNumber)

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
    if (data.sections) {
      const { sections, ...restOfData } = data
      return { ...restOfData, hasParts: findPartsByVersionNumber(sections, targetVersionNumber) }
    }
    if (data.subsections) {
      const { subsections, ...restOfData } = data
      const parts = Array.isArray(subsections)
        ? subsections.map(subsection => findPartsByVersionNumber(subsection, targetVersionNumber)).filter(Boolean)
        : findPartsByVersionNumber(subsections, targetVersionNumber)

      return { ...restOfData, hasParts: parts }
    }
    if (data.paragraphs) {
      const { paragraphs, ...restOfData } = data
      if (Array.isArray(paragraphs)) {
        return { ...restOfData, hasParts: paragraphs.map(paragraph => findPartsByVersionNumber(paragraph, targetVersionNumber)).filter(Boolean) }
      } else {
        return { ...restOfData, hasParts: findPartsByVersionNumber(paragraphs, targetVersionNumber) }
      }
    }
    if (data.subparagraphs) {
      const { subparagraphs, ...restOfData } = data
      if (Array.isArray(subparagraphs)) {
        return { ...restOfData, hasParts: subparagraphs.map(subparagraphs => findPartsByVersionNumber(subparagraphs, targetVersionNumber)).filter(Boolean) }
      } else {
        return { ...restOfData, hasParts: findPartsByVersionNumber(subparagraphs, targetVersionNumber) }
      }
    }
    if (parseInt(data.versionNumber) === targetVersionNumber) {
      return data
    }
    return null
  }

  // console.log(findPartsByVersionNumber(testData2, 19931501))

  // koostetaan yhden pykälän kaikki versiot yhteen ja lisätään säädösversion tiedot
  const parseVersions = (data) => {
    const sectionVersions = getSectionVersionNumbers(data)
    const versions = []
    for (const version of sectionVersions) {
      const parts = findPartsByVersionNumber(data, version)
      const versionInfo = statuteVersionsInfo[version]
      const section = { hasParts: parts, ...versionInfo }
      versions.push(section)
    }
    return versions
  }

  console.log(parseVersions(testData2))

  // käydään läpi kaikki pykälät ja koostetaan niiden sisältämät versiot
  const parseSections = (data) => {
    return data.reduce((map, section) => {
      const versions = parseVersions(section.sections)
      map[section.idShort] = versions
      return map
    }, {})
  }

  console.log(parseSections(data))

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
        <StatuteHistoryDetails sectionNumber={1} testData={testData} layoutConfig={props.layoutConfig} HTMLParserTask={props.HTMLParserTask} />
      </Grid>
    </div>
  )
}

export default ContextualContentStatuteHistory
