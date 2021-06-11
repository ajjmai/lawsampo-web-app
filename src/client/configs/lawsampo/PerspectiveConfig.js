import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
// import AddLocationIcon from '@material-ui/icons/AddLocation'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import RedoIcon from '@material-ui/icons/Redo'
import LineChartIcon from '@material-ui/icons/ShowChart'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import SubjectIcon from '@material-ui/icons/Subject'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
// import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import statutesImage from '../../img/lawsampo/statutes_cropped.jpg'
import sectionsImage from '../../img/lawsampo/sections_cropped.jpg'
import caselawImage from '../../img/lawsampo/case_law_cropped.jpg'
import situationsImage from '../../img/lawsampo/contextual_search_cropped.jpg'

export const perspectiveConfig = [
  {
    id: 'statutes',
    type: 'faceted-search',
    frontPageImage: statutesImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['jenaText']),
    defaultTab: 'table',
    defaultInstancePageTab: 'content',
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'export',
        value: 1,
        icon: <ArrowForwardIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'content',
        value: 0,
        icon: <SubjectIcon />
      },
      {
        id: 'table',
        value: 1,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'export',
        value: 2,
        icon: <ArrowForwardIcon />
      }
    ]
  },
  {
    id: 'sections',
    type: 'faceted-search',
    frontPageImage: sectionsImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['jenaText']),
    defaultTab: 'table',
    // defaultInstancePageTab: no instance pages for sections
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'export',
        value: 1,
        icon: <ArrowForwardIcon />
      }
    ]
    // instancePageTabs: no instance pages for sections
  },
  {
    id: 'caselaw',
    type: 'faceted-search',
    frontPageImage: caselawImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['jenaText']),
    defaultTab: 'table',
    defaultInstancePageTab: 'content',
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'by_year',
        value: 1,
        icon: <LineChartIcon />
      },
      {
        id: 'export',
        value: 2,
        icon: <ArrowForwardIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'content',
        value: 0,
        icon: <SubjectIcon />
      },
      {
        id: 'table',
        value: 1,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'export',
        value: 2,
        icon: <ArrowForwardIcon />
      }
    ]
  },
  {
    id: 'situations',
    type: 'iterative-search',
    frontPageImage: situationsImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['situationFilters']),
    tabs: [
      {
        id: 'statutes',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'cases',
        value: 1,
        icon: <CloudDownloadIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },

      {
        id: 'export',
        value: 1,
        icon: <CloudDownloadIcon />
      }
    ]
  },
  {
    id: 'caselawfinder',
    type: 'external',
    frontPageImage: null,
    externalUrl: 'https://data.finlex.fi/document-finder'
  }
]
