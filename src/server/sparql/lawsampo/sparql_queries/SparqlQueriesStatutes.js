import { statuteTextHTMLAnnotatedTest } from './annotatedHTMLtest'

export const statuteProperties = `
  {
    ?id skos:prefLabel ?prefLabel__prefLabel .

    # create link for React Router:
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)

    # create link to SAHA
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)

    BIND("""${statuteTextHTMLAnnotatedTest}""" as ?statuteTextHTMLAnnotated)
  }
  UNION
  {
    ?id lss:statute_date ?statuteDate .
  }
  UNION
  {
    ?id lss:timespan/skos:prefLabel ?statuteYear .
  }
  UNION
  {
    ?id eli:type_document/skos:prefLabel ?documentType .
    FILTER(lang(?documentType) = 'fi')
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
