import bannerImage from '../../img/lawsampo/lawsampo-banner-3000px.jpg'

export const rootUrl = ''

export const defaultLocale = 'fi'

export const MAPBOX_ACCESS_TOKEN = '' // https://docs.mapbox.com/accounts/overview/tokens/

export const MAPBOX_STYLE = 'light-v10' // https://docs.mapbox.com/api/maps/#styles

export const documentFinderAPIUrl = 'https://data.finlex.fi/document-finder-backend'

export const backendErrorText = 'The database is not available. Please try again later.'

export const yasguiBaseUrl = 'https://yasgui.triply.cc'

export const yasguiParams = {
  contentTypeConstruct: 'text/turtle',
  contentTypeSelect: 'application/sparql-results+json',
  endpoint: 'http://ldf.fi/lawsampo/sparql',
  requestMethod: 'POST',
  tabTitle: 'Exported query'
}

export const SLIDER_DURATION = {
  halfSpeed: 1200,
  normalSpeed: 600,
  doubleSpeed: 300
}

export const layoutConfig = {
  hundredPercentHeightBreakPoint: 'md',
  reducedHeightBreakpoint: 'xl',
  tabHeight: 58,
  paginationToolbarHeight: 37,
  tableFontSize: '0.8rem',
  topBar: {
    showLanguageButton: true,
    feedbackLink: 'https://link.webropolsurveys.com/S/E4C53B4A2D5D01B4',
    reducedHeight: 44,
    defaultHeight: 64,
    mobileMenuBreakpoint: 1360
  },
  mainPage: {
    bannerBackround: `linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(${bannerImage})`,
    bannerMobileHeight: 150,
    bannerReducedHeight: 220,
    bannerDefaultHeight: 400
  },
  infoHeader: {
    default: {
      height: 49,
      expandedContentHeight: 160,
      headingVariant: 'h4',
      infoIconFontSize: 40
    },
    reducedHeight: {
      height: 40,
      expandedContentHeight: 100,
      headingVariant: 'h6',
      infoIconFontSize: 32
    }
  },
  footer: {
    reducedHeight: 44,
    defaultHeight: 64
  }
}
