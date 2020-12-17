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
// import sdfImage from '../../img/lawsampo/sdf-tumb.png'
// import legislationImage from '../../img/lawsampo/legislation.png'
// import caselawImage from '../../img/lawsampo/caselaw.png'
import manuscriptsImage from '../../img/main_page/manuscripts-452x262.jpg'

export const perspectiveConfig = [
  {
    id: 'statutes',
    frontPageImage: manuscriptsImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['jenaText']),
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
    frontPageImage: manuscriptsImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['jenaText']),
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
  },
  {
    id: 'caselaw',
    frontPageImage: manuscriptsImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['jenaText']),
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
    searchMode: 'iterative-search',
    frontPageImage: manuscriptsImage,
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
    frontPageImage: manuscriptsImage,
    externalUrl: 'https://data.finlex.fi/document-finder'
  }
]
