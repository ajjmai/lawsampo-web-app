// import { statuteTextHTMLAnnotatedTest } from './annotatedHTMLtest'
// BIND("""${statuteTextHTMLAnnotatedTest}""" as ?statuteTextHTMLAnnotated)

export const statuteProperties = `
  {
    ?id skos:prefLabel ?prefLabel__prefLabel .
    BIND(REPLACE(STR(?id), "http://ldf.fi/lawsampo/statute_", "") as ?identifier)

    # create link for React Router:
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)

    # create link to SAHA
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id lss:timespan/skos:prefLabel ?enforcementDate .
  }
  UNION 
  {
    ?id lss:section ?section__id .
    ?section__id skos:prefLabel ?section__prefLabel .
    BIND(CONCAT("/sections/page/", REPLACE(STR(?section__id), "http://ldf.fi/lawsampo/", "")) AS ?section__dataProviderUrl)
  }
  UNION 
  {
    ?id lss:cites ?legislationCited__id .
    # ?legislationCited__id skos:prefLabel ?legislationCited__prefLabel .
    BIND(?legislationCited__id as ?legislationCited__prefLabel)
    BIND(?legislationCited__id as ?legislationCited__dataProviderUrl)

  }
  UNION
  {
    ?id eli:type_document/skos:prefLabel ?documentType .
    FILTER(lang(?documentType) = '<LANG>')
  }
  UNION
  {
     ?id eli:transposes ?euDirective__id .
     ?euDirective__id skos:prefLabel ?euDirective__prefLabel .
     BIND(?euDirective__id as ?euDirective__dataProviderUrl)
  }
  # UNION
  # {
  #   ?id lss:annotatedHtml ?annotatedHtml_ .
  #   BIND(REPLACE(?annotatedHtml_, "<html>|</html>|<head />|<body>|</body>", "") as ?statuteTextHTMLAnnotated)
  # }
  # UNION 
  # {
  #   ?id lss:referencedTerm ?referencedTerm__id .
  #   ?referencedTerm__id skos:prefLabel ?referencedTerm__prefLabel .
  #   OPTIONAL { ?referencedTerm__id dcterms:abstract ?referencedTerm__abstract }
  #   OPTIONAL { ?referencedTerm__id rdfs:comment ?referencedTerm__comment }
  #   OPTIONAL { ?referencedTerm__id dcterms:hasFormat ?referencedTerm__format }
  #   BIND(?referencedTerm__id as ?referencedTerm__dataProviderUrl)
  # }
`

export const sectionProperties = `
  {
    ?id lss:statute ?statute__id .
    ?statute__id skos:prefLabel ?statute__prefLabel .  
    # create link to statute instance page:
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?statute__id), "http://ldf.fi/lawsampo/", "")) AS ?statute__dataProviderUrl)
    
    
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    # create link to section instance page:
    BIND(CONCAT("/sections/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)

    # create link to SAHA
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id lss:statute_date ?enforcementDate .
  }
  UNION
  {
    ?id lss:text ?text .
  }
  UNION 
  {
    ?id lss:situation_category ?situationCategory__id .
    ?situationCategory__id skos:prefLabel ?situationCategory__prefLabel .
  }
   UNION 
  {
    ?id lss:subject_category ?subjectCategory__id .
    ?subjectCategory__id skos:prefLabel ?subjectCategory__prefLabel .
  }
  UNION
  {
    ?id eli:transposes ?euDirective__id .
    ?euDirective__id skos:prefLabel ?euDirective__prefLabel .
    BIND(?euDirective__id as ?euDirective__dataProviderUrl)
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
