export const statuteProperties = `
  {
    ?id skos:prefLabel ?prefLabel__prefLabel .
    OPTIONAL { ?id lss:statute_date ?statute_date }

    # create link for React Router:
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://data.finlex.fi/eli/sd/", "")) AS ?prefLabel__dataProviderUrl)

    # create URI link for result table
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id lss:timespan/skos:prefLabel ?statuteYear .
  }
  UNION
  {
    ?id eli:transposes ?euDirective__id .
    ?euDirective__id skos:prefLabel ?euDirective__prefLabel .
  }
`

export const statutesByYearQuery = `
  SELECT ?category (count(?instance) as ?count) WHERE {
    <FILTER>
    ?instance lss:timespan ?category_ ;
       a lss:Statute .
    ?category_ skos:prefLabel ?category .
  }
  GROUP BY ?category
  ORDER BY ?category
`
