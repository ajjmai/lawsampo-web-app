export const instanceQuery = `
  SELECT * {
    BIND(<ID> as ?id)
    <PROPERTIES>
    <RELATED_INSTANCES>
  }
`

export const countQuery = `
  SELECT (COUNT(DISTINCT ?id) as ?count)
  WHERE {
    <FILTER>
    VALUES ?facetClass { <FACET_CLASS> }
    ?id a ?facetClass .
  }
`

export const countQueryStatuteHistory = `
  SELECT (COUNT(DISTINCT ?id) as ?count)
  WHERE {
    <FILTER>
    FILTER (STR(?id) IN ("http://ldf.fi/lawsampo/statute_eli_sd_2014_932", "http://ldf.fi/lawsampo/statute_eli_sd_2012_22", "http://ldf.fi/lawsampo/statute_eli_sd_2009_558", "http://ldf.fi/lawsampo/statute_eli_sd_2008_373", "http://ldf.fi/lawsampo/statute_eli_sd_2007_1438", "http://ldf.fi/lawsampo/statute_eli_sd_1993_1501"))
    VALUES ?facetClass { <FACET_CLASS> }
    ?id a ?facetClass .
  }
`

export const jenaQuery = `
  SELECT *
  WHERE {
    <QUERY>
    <RESULT_SET_PROPERTIES>
  }
`

export const fullTextQuery = `
  SELECT *
  WHERE {
    <QUERY>
    <RESULT_SET_PROPERTIES>
  }
`

export const facetResultSetQuery = `
  SELECT *
  WHERE {
    {
      # score and literal are used only for Jena full text index
      SELECT DISTINCT ?id ?score ?literal {
        <FILTER>
        VALUES ?facetClass { <FACET_CLASS> }
        ?id a ?facetClass .
        <ORDER_BY_TRIPLE>
      }
      <ORDER_BY>
      <PAGE>
    }
    FILTER(BOUND(?id))
    <RESULT_SET_PROPERTIES>
  }
`

export const facetResultSetQueryStatuteHistory = `
  SELECT *
  WHERE {
    {
      # score and literal are used only for Jena full text index
      SELECT DISTINCT ?id ?score ?literal {
        <FILTER>
        VALUES ?facetClass { <FACET_CLASS> }
        ?id a ?facetClass .
        FILTER (STR(?id) IN ("http://ldf.fi/lawsampo/statute_eli_sd_2014_932", "http://ldf.fi/lawsampo/statute_eli_sd_2012_22", "http://ldf.fi/lawsampo/statute_eli_sd_2009_558", "http://ldf.fi/lawsampo/statute_eli_sd_2008_373", "http://ldf.fi/lawsampo/statute_eli_sd_2007_1438", "http://ldf.fi/lawsampo/statute_eli_sd_1993_1501"))
        <ORDER_BY_TRIPLE>
      }
      <ORDER_BY>
    }
    FILTER(BOUND(?id))
    <RESULT_SET_PROPERTIES>
  }
`

export const facetValuesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?selected ?parent ?instanceCount {
    {
      {
        SELECT DISTINCT (count(DISTINCT ?instance) as ?instanceCount) ?id ?parent ?selected {
          # facet values that return results
          {
            <FILTER>
            ?instance <PREDICATE> ?id .
            <PARENTS>
            VALUES ?facetClass { <FACET_CLASS> }
            ?instance a ?facetClass .
            <SELECTED_VALUES>
          }
          <SELECTED_VALUES_NO_HITS>     
          BIND(COALESCE(?selected_, false) as ?selected)
        }
        GROUP BY ?id ?parent ?selected
      }
      FILTER(BOUND(?id))
      <FACET_VALUE_FILTER>
      <LABELS>
    }
    <UNKNOWN_VALUES>
  }
  <ORDER_BY>
`

export const facetValuesQueryTimespan = `
  # ignore selections from other facets
  SELECT ?min ?max {
    {
      SELECT (MIN(?start) AS ?min) {
        ?instance <PREDICATE> ?timespan .
        VALUES ?facetClass { <FACET_CLASS> }
        ?instance a ?facetClass .
        ?timespan <START_PROPERTY> ?start .
        <FACET_VALUE_FILTER>
      }
    }
    {
      SELECT (MAX(?end) AS ?max) {
        ?instance <PREDICATE> ?timespan .
        VALUES ?facetClass { <FACET_CLASS> }
        ?instance a ?facetClass .
        ?timespan <END_PROPERTY> ?end .
        <FACET_VALUE_FILTER>
      }
    }
  }
`

export const facetValuesRange = `
  # ignore selections from other facets
  SELECT (MIN(?value) AS ?min) (MAX(?value) AS ?max) {
    ?instance <PREDICATE> ?value .
    VALUES ?facetClass { <FACET_CLASS> }
    ?instance a ?facetClass .
    <FACET_VALUE_FILTER>
  }
`

export const sitemapInstancePageQuery = `
  SELECT DISTINCT ?path 
  WHERE {
    VALUES ?resultClass { <RESULT_CLASS> }
    ?uri a ?resultClass .
    BIND(CONCAT("<PERSPECTIVE>/page/", REPLACE(STR(?uri), "^.*\\\\/(.+)", "$1"), "/<DEFAULT_TAB>") AS ?path)
  }
  LIMIT 100
`

// An optimized query for hierarchical facet that requires set maxHierarchyLevel in config
// Note that this version can be faster in specific cases, but can also be slower in certain other cases
export const hierarchicalFacetValuesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?selected ?parent ?instanceCount {
    {
      {
        SELECT DISTINCT (count(DISTINCT ?instance) as ?instanceCount) ?id ?parent ?selected {
          # facet values that return results
          {
            <HIERARCHY>

            <FILTER>
            VALUES ?facetClass { <FACET_CLASS> }
            ?instance a ?facetClass .

            OPTIONAL { ?id <PARENTPROPERTY> ?parent_ }
            BIND(COALESCE(?parent_, '0') as ?parent)

            <SELECTED_VALUES>
          }
          <SELECTED_VALUES_NO_HITS>
          BIND(COALESCE(?selected_, false) as ?selected)
        }
        GROUP BY ?id ?parent ?selected
      }
      FILTER(BOUND(?id))
      <FACET_VALUE_FILTER>
      <LABELS>
    }
    <UNKNOWN_VALUES>
  }
  <ORDER_BY>
`
