
import React from 'react'
import InfoHeader from '../../../main_layout/InfoHeader'
import PerspectiveTabs from '../../../main_layout/PerspectiveTabs'
import Grid from '@mui/material/Grid'
import { getSpacing } from '../../../../helpers/helpers'
import { Route, Redirect, useLocation } from 'react-router-dom'
import SituationsFacetBar from './SituationsFacetBar'
import SituationsResultTable from './SituationsResultTable'

const IterativeSearchPerspective = props => {
  const {
    portalConfig, layoutConfig, perspective,
    screenSize, rootUrl, facetResults
  } = props
  const location = useLocation()
  return (
    <>
      <InfoHeader
        portalConfig={portalConfig}
        layoutConfig={layoutConfig}
        resultClass={perspective.id}
        pageType='facetResults'
        expanded={facetResults.facetedSearchHeaderExpanded}
        updateExpanded={props.updatePerspectiveHeaderExpanded}
        screenSize={screenSize}
      />
      <Grid
        container spacing={1}
        sx={theme => {
          if (facetResults.facetedSearchHeaderExpanded) {
            return {
              margin: theme.spacing(0.5),
              width: `calc(100% - ${getSpacing(theme, 1)}px)`,
              [theme.breakpoints.up(layoutConfig.hundredPercentHeightBreakPoint)]: {
                height: `calc(100% - ${layoutConfig.topBar.reducedHeight +
                    layoutConfig.infoHeader.reducedHeight.height +
                    layoutConfig.infoHeader.reducedHeight.expandedContentHeight +
                    getSpacing(theme, 5.5)
                    }px)`
              },
              [theme.breakpoints.up(layoutConfig.reducedHeightBreakpoint)]: {
                height: `calc(100% - ${layoutConfig.topBar.defaultHeight +
                    layoutConfig.infoHeader.default.height +
                    layoutConfig.infoHeader.default.expandedContentHeight +
                    getSpacing(theme, 4.5)
                    }px)`
              }
            }
          } else {
            return {
              margin: theme.spacing(0.5),
              width: `calc(100% - ${getSpacing(theme, 1)}px)`,
              [theme.breakpoints.up(layoutConfig.hundredPercentHeightBreakPoint)]: {
                height: `calc(100% - ${layoutConfig.topBar.reducedHeight +
                    layoutConfig.infoHeader.reducedHeight.height +
                    getSpacing(theme, 1.5)
                    }px)`
              },
              [theme.breakpoints.up(layoutConfig.reducedHeightBreakpoint)]: {
                height: `calc(100% - ${layoutConfig.topBar.defaultHeight +
                    layoutConfig.infoHeader.default.height +
                    getSpacing(theme, 1.5)
                    }px)`
              }
            }
          }
        }}
      >
        <Grid
          item xs={12} md={3}
          sx={theme => ({
            [theme.breakpoints.up(layoutConfig.hundredPercentHeightBreakPoint)]: {
              height: '100%'
            },
            [theme.breakpoints.down('md')]: {
              paddingRight: '0px !important'
            },
            overflow: 'auto',
            paddingLeft: '0px !important',
            paddingRight: '4px !important',
            paddingTop: '0px !important',
            paddingBottom: '0px !important'
          })}
        >
          <SituationsFacetBar
            perspective={perspective}
            fetchSituations={props.fetchSituations}
            facetData={props.facetData}
            perspectiveState={props.facetResults}
            updateSituationQuery={props.updateSituationQuery}
            updateResultType={props.updateResultType}
            updateSituationSelected={props.updateSituationSelected}
            addSituationKeyword={props.addSituationKeyword}
            setSituationKeywords={props.setSituationKeywords}
            removeSituationKeyword={props.removeSituationKeyword}
            clearAllSituations={props.clearAllSituations}
            fetchSituationResults={props.fetchSituationResults}
            location={location}
          />
        </Grid>
        <Grid
          item xs={12} md={9}
          sx={theme => ({
            height: 'auto',
            [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
              height: '100%'
            },
            paddingTop: '0px !important',
            paddingBottom: '0px !important',
            paddingLeft: '4px !important',
            paddingRight: '0px !important',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px !important',
              marginBottom: theme.spacing(1),
              marginTop: theme.spacing(0.5)
            }
          })}
        >
          <>
            <PerspectiveTabs
              tabs={perspective.tabs}
              screenSize={props.screenSize}
              layoutConfig={props.layoutConfig}
            />
            <Route
              exact path={`${rootUrl}/${perspective.id}/iterative-search`}
              render={() => <Redirect to={`${rootUrl}/${perspective.id}/iterative-search/statutes`} />}
            />
            <Route
              path={`${rootUrl}/${perspective.id}/iterative-search/statutes`}
              render={routeProps =>
                <SituationsResultTable
                  perspective={perspective}
                  isFetching={props.facetData.isFetching}
                  data={props.facetResults}
                  columns={props.facetResults.statutesProperties}
                  results={props.facetResults.statutesResults}
                  resultClass='situations'
                  facetClass='situations'
                />}
            />
            <Route
              path={`${rootUrl}/${perspective.id}/iterative-search/cases`}
              render={routeProps =>
                <SituationsResultTable
                  perspective={perspective}
                  isFetching={props.facetData.isFetching}
                  data={props.facetResults}
                  columns={props.facetResults.caseProperties}
                  results={props.facetResults.casesResults}
                  resultClass='situations'
                  facetClass='situations'
                />}
            />
          </>
        </Grid>
      </Grid>
    </>
  )
}

export default IterativeSearchPerspective
