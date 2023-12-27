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
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardHeader, Divider, Stack } from '@mui/material'
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
    id: 'http://ldf.fi/lawsampo/eli/statute/2001/1145/sec/16/original',
    number: 16,
    he: 'HE 71/2001',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+71/2001',
    entryIntoForce: '2002-02-01',
    versionNumber: '00000000',
    content: 'Oikeus tietojen saamiseen teleyrityksiltä Rajavartiolaitoksella on oikeus vaaratilanteessa saada salassapitosäännösten estämättä yksityisyyden suojasta televiestinnässä ja teletoiminnan tietoturvasta annetussa laissa (565/1999), jäljempänä televiestinnän tietosuojalaki, tarkoitetulta teleyritykseltä hätäilmoitusta koskevat liittymän tunnistamistiedot ja matkaviestimen sijaintitiedot sekä tiedot liittymän tilaajasta, käyttäjästä ja asennusosoitteesta sen mukaan kuin televiestinnän tietosuojalain 18 §:n 2 ja 3 momentissa tarkemmin säädetään.',
    passedBy: '1145/2001',
    passedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2001/20011145',
    noLongerInForce: ''
  },
  {
    id: 'http://ldf.fi/lawsampo/eli/statute/2001/1145/sec/16/consolidated/20040521',
    number: 16,
    he: 'HE 125/2003',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+125/2003',
    entryIntoForce: '2004-09-01',
    versionNumber: '20040521',
    content: 'Oikeus tietojen saamiseen teleyrityksiltä Rajavartiolaitoksella on oikeus vaaratilanteessa saada salassapitosäännösten estämättä <strong>sähköisen viestinnän tietosuojalaissa (516/2004)</strong> tarkoitetulta teleyritykseltä hätäilmoitusta koskevat liittymän tunnistamistiedot ja matkaviestimen sijaintitiedot sekä tiedot liittymän tilaajasta, käyttäjästä ja asennusosoitteesta sen mukaan kuin <strong>sähköisen viestinnän tietosuojalain 35 §:ssä sekä viestintämarkkinalain (393/2003) 97 ja 98 §:ssä</strong> tarkemmin säädetään.',
    amendedBy: '521/2004',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2004/20040521',
    noLongerInForce: ''
  },
  {
    id: 'http://ldf.fi/lawsampo/eli/statute/2001/1145/sec/16/consolidated/20190640',
    number: 16,
    he: 'HE 241/2018',
    heUrl: 'https://www.eduskunta.fi/FI/vaski/KasittelytiedotValtiopaivaasia/Sivut/HE_241+2018.aspx',
    entryIntoForce: '2019-06-01',
    versionNumber: '20190640',
    content: '<strong>16 § on kumottu L:lla 10.5.2019/640.</strong>',
    amendedBy: '640/2019',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2019/20190640',
    noLongerInForce: '2019-06-01'
  }
]

const testData2 = [
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2/original',
    he: '88/1993',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+88/1993',
    entryIntoForce: '1994-06-01',
    versionNumber: '00000000',
    content: 'Velvollinen suorittamaan arvonlisäveroa (verovelvollinen) 1 §:ssä tarkoitetusta myynnistä on tavaran tai palvelun myyjä, ellei 9 §:ssä toisin säädetä.<br/><br/>Velvollisuudesta suorittaa veroa tavaran maahantuonnista säädetään 9 luvussa.',
    passedBy: '1501/1993',
    passedByUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2/consolidated/19990940',
    he: '28/1999',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+28/1999',
    entryIntoForce: '2000-01-01',
    versionNumber: '19990940',
    content: 'Velvollinen suorittamaan arvonlisäveroa (verovelvollinen) 1 §:ssä tarkoitetusta myynnistä on tavaran tai palvelun myyjä, ellei <strong>2 a, 8 a tai</strong> 9 §:ssä toisin säädetä.<br/><br/>Velvollisuudesta suorittaa veroa tavaran maahantuonnista säädetään 9 luvussa <strong>ja tavaran siirrosta varastointimenettelystä 72 m §:ssä.</strong>',
    amendedBy: '940/1999',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/1999/19990940'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2/consolidated/20100686',
    he: '41/2010',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+41/2010',
    entryIntoForce: '2011-04-01',
    versionNumber: '20100686',
    content: 'Velvollinen suorittamaan arvonlisäveroa (verovelvollinen) 1 §:ssä tarkoitetusta myynnistä on tavaran tai palvelun myyjä, ellei 2 a, 8 a<strong>\u20138 c </strong>tai 9 §:ssä toisin säädetä.<br/><br/>Velvollisuudesta suorittaa veroa tavaran maahantuonnista säädetään 9 luvussa ja tavaran siirrosta varastointimenettelystä 72 m §:ssä.',
    amendedBy: '686/2010',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2011/20100686'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2/consolidated/20100687',
    he: '41/2010',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+41/2010',
    entryIntoForce: '2010-08-01',
    versionNumber: '20100687',
    content: 'Velvollinen suorittamaan arvonlisäveroa (verovelvollinen) 1 §:ssä tarkoitetusta myynnistä on tavaran tai palvelun myyjä, ellei 2 a, 8 a, <strong>8 b</strong> tai 9 §:ssä toisin säädetä.<br/><br/>Velvollisuudesta suorittaa veroa tavaran maahantuonnista säädetään 9 luvussa ja tavaran siirrosta varastointimenettelystä 72 m §:ssä.',
    amendedBy: '687/2010',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2010/20100687',
    noLongerInForce: '2011-03-31'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/2/sec/2/consolidated/20140507',
    he: '31/2014',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+31/2014',
    entryIntoForce: '2015-01-01',
    versionNumber: '20140507',
    content: 'Velvollinen suorittamaan arvonlisäveroa (verovelvollinen) 1 §:ssä tarkoitetusta myynnistä on tavaran tai palvelun myyjä, ellei 2 a, 8 a<strong>\u20138 d</strong> tai 9 §:ssä toisin säädetä.<br/><br/>Velvollisuudesta suorittaa veroa tavaran maahantuonnista säädetään 9 luvussa ja tavaran siirrosta varastointimenettelystä 72 m §:ssä.',
    amendedBy: '507/2014',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2014/20140507'
  }
]

const testData3 = [
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/original',
    he: 'HE 88/93',
    entryIntoForce: '1994-06-01',
    versionNumber: '00000000',
    content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:<br/><br/>1) liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;<br/><br/>2) tavaran maahantuonnista.<br/><br/>Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.<br/><br/>Henkilökuljetustoiminnan ja yleisradiotoiminnan harjoittamisen katsotaan tapahtuvan liiketoiminnan muodossa silloinkin, kun toiminnan harjoittamiseen saadaan 79 §:ssä tarkoitettuja korvauksia.',
    passedBy: '1501/1993',
    passedByUrl: 'https://www.finlex.fi/fi/laki/alkup/1993/19931501'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/consolidated/19941486',
    entryIntoForce: '1995-01-01',
    versionNumber: '19941486',
    content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:<br/><br/>1) liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;<br/><br/>2) <strong>Suomessa tapahtuvasta</strong> tavaran maahantuonnista;.<br/><br/>Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.<br/><br/><strong>3 momentti on kumottu L:lla 29.12.1994/1486.</strong>',
    amendedBy: '1486/1994',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/1994/19941486'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/consolidated/19951767',
    entryIntoForce: '1996-01-01',
    versionNumber: '19951767',
    content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:<br/><br/>1) liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;<br/><br/>2) Suomessa tapahtuvasta tavaran maahantuonnista;<br/><br/><strong>3) Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;<br/><br/>4) Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.</strong><br/><br/>Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.<br/><br/>3 momentti on kumottu L:lla 29.12.1994/1486.',
    amendedBy: '1767/1995',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/1995/19951767'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/consolidated/19970585',
    he: 'HE 64/1997',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+64/1997',
    entryIntoForce: '1997-07-01',
    versionNumber: '19970585',
    content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:<br/><br/>1) liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;<br/><br/>2) Suomessa tapahtuvasta tavaran maahantuonnista;<br/><br/>3) Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;<br/><br/>4) Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.<br/><br/>Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.<br/><br/>3 momentti on kumottu L:lla 29.12.1994/1486.<br/><br/><strong>Myynnin ei katsota tapahtuvan liiketoiminnan muodossa, jos siitä saatu vastike on ennakkoperintälain (1118/1996) 13 §:ssä tarkoitettua palkkaa.</strong>',
    amendedBy: '585/1997',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/1997/19970585'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/consolidated/20090006',
    he: 'HE 192/2008',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+192/2008',
    entryIntoForce: '2009-04-01',
    versionNumber: '20090006',
    content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:<br/><br/>1) liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;<br/><br/>2) Suomessa tapahtuvasta tavaran maahantuonnista;<br/><br/>3) Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;<br/><br/>4) Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.<br/><br/>Veroa suoritetaan 32 §:ssä tarkoitetun kiinteistöhallintapalvelun ottamisesta omaan käyttöön silloinkin, kun se ei tapahdu liiketoiminnan muodossa.<br/><br/>3 momentti on kumottu L:lla 29.12.1994/1486.<br/><br/>Myynnin ei katsota tapahtuvan liiketoiminnan muodossa, jos siitä saatu vastike on ennakkoperintälain (1118/1996) 13 §:ssä tarkoitettua palkkaa.<br/><br/><strong>5 momentti on kumottu L:lla 9.1.2009/6.</strong>',
    amendedBy: '6/2009',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2009/20090006'
  },
  {
    idWork: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1',
    id: 'http://ldf.fi/lawsampo/eli/statute/1993/1501/part/1/chp/1/sec/1/consolidated/20161064',
    he: 'HE 110/2016',
    heUrl: 'https://www.eduskunta.fi/FI/Vaski/sivut/trip.aspx?triptype=ValtiopaivaAsiat&docid=he+110/2016',
    entryIntoForce: '2017-01-01',
    versionNumber: '20161064',
    content: 'Arvonlisäveroa suoritetaan valtiolle sen mukaan kuin tässä laissa säädetään:<br/><br/>1) liiketoiminnan muodossa Suomessa tapahtuvasta tavaran ja palvelun myynnistä;<br/><br/>2) Suomessa tapahtuvasta tavaran maahantuonnista;<br/><br/>3) Suomessa tapahtuvasta 26 a §:ssä tarkoitetusta tavaran yhteisöhankinnasta;<br/><br/>4) Suomessa tapahtuvasta 72 l §:ssä tarkoitetusta tavaran siirrosta varastointimenettelystä.<br/><br/><strong>2 momentti on kumottu L:lla 9.12.2016/1064.</strong><br><br/>3 momentti on kumottu L:lla 29.12.1994/1486.<br/><br/>Myynnin ei katsota tapahtuvan liiketoiminnan muodossa, jos siitä saatu vastike on ennakkoperintälain (1118/1996) 13 §:ssä tarkoitettua palkkaa.<br/><br/>5 momentti on kumottu L:lla 9.1.2009/6.',
    amendedBy: '1064/2016',
    amendedByUrl: 'https://www.finlex.fi/fi/laki/alkup/2016/20161064'
  }
]

const ContextualContentStatuteHistory = props => {
  const classes = useStyles(props)
  let { data } = props
  const { tableOfContents, hasParts, hasChapters } = props
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
                {testData3.map(item => (
                  <Paper key={item.id} variant='outlined'>
                    <Box className={classes.metaDataContainer}>
                      <Grid container spacing={4}>
                        <Grid item>
                          {item.passedBy && <Typography variant='body2'>Versio: <Link href={item.passedByUrl} target='_blank' rel='noreferrer'>{item.passedBy}</Link> (ALKUPERÄINEN)</Typography>}
                          {item.amendedBy && <Typography variant='body2'>Versio: <Link href={item.amendedByUrl} target='_blank' rel='noreferrer'>{item.amendedBy}</Link></Typography>}
                        </Grid>
                        <Grid item>
                          <Typography variant='body2'>Voimaantulo: <strong>{format(new Date(item.entryIntoForce), 'dd.MM.yyyy')}</strong></Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='body2'>Esityöt: <Link href={item.heUrl} target='_blank' rel='noreferrer'>{item.he}</Link></Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Typography variant='body1' className={classes.statuteHistoryItem}>{parser.parseHTML(item.content)}</Typography>
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
