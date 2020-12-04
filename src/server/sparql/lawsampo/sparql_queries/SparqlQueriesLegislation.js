// import { statuteTextHTMLAnnotatedTest } from './annotatedHTMLtest'
// BIND("""${statuteTextHTMLAnnotatedTest}""" as ?statuteTextHTMLAnnotated)

export const statutePropertiesFacetResults = `
  {
    ?id skos:prefLabel ?prefLabel__prefLabel .

    # create link for React Router:
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)

    # create link to SAHA
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id eli:type_document/skos:prefLabel ?statuteType .
    FILTER(lang(?statuteType) = '<LANG>')
  }
  UNION 
  {
    ?id lss:sf_identifier ?identifier .
  }
  UNION
  {
    ?id lss:statute_date ?enforcementDate .
  }
  UNION 
  {
    ?id lss:section ?section__id .
    ?section__id skos:prefLabel ?section__prefLabel .
    BIND(CONCAT("/sections/page/", REPLACE(STR(?section__id), "http://ldf.fi/lawsampo/", "")) AS ?section__dataProviderUrl)
  }
  UNION
  {
     ?id eli:transposes ?euDirective__id .
     ?euDirective__id skos:prefLabel ?euDirective__prefLabel .
     BIND(?euDirective__id as ?euDirective__dataProviderUrl)
  }
`

export const statutePropertiesInstancePage = `
  {
    ?id skos:prefLabel ?prefLabel__prefLabel .

    # create link for React Router:
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)

    # create link to SAHA
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id eli:type_document/skos:prefLabel ?statuteType .
    FILTER(lang(?statuteType) = '<LANG>')
  }
  UNION
  {
    ?id lss:statute_date ?enforcementDate .
  }
  UNION 
  {
    ?id lss:sf_identifier ?identifier .
  }
  UNION 
  {
    ?id lss:section ?section__id .
    ?section__id skos:prefLabel ?section__prefLabel .
    BIND(CONCAT("/sections/page/", REPLACE(STR(?section__id), "http://ldf.fi/lawsampo/", "")) AS ?section__dataProviderUrl)
  }
  UNION
  {
     ?id eli:transposes ?euDirective__id .
     ?euDirective__id skos:prefLabel ?euDirective__prefLabel .
     BIND(?euDirective__id as ?euDirective__dataProviderUrl)
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
    ?id lss:annotatedHtml ?annotatedHtml_ .
    BIND(REPLACE(?annotatedHtml_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTMLAnnotated)
  }
  UNION 
  {
    ?id lss:referencedTerms ?referencedTerm__id .
    ?referencedTerm__id skos:prefLabel ?prefLabel_ .
    OPTIONAL { ?referencedTerm__id dcterms:abstract ?referencedTerm__abstract }
    OPTIONAL { ?referencedTerm__id rdfs:comment ?referencedTerm__description }
    OPTIONAL { ?referencedTerm__id dcterms:hasFormat ?referencedTerm__externalLink }
    OPTIONAL { ?referencedTerm__id lss:count ?referencedTerm__count }
    BIND(?referencedTerm__id as ?referencedTerm__dataProviderUrl)
    BIND(LCASE(?prefLabel_) as ?referencedTerm__prefLabel)
  }
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
    ?id lss:section_statute_date ?enforcementDate .
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
  UNION
  {
    ?id lss:annotatedHtml ?annotatedHtml_ .
    BIND(REPLACE(?annotatedHtml_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTMLAnnotated)
  }
  UNION 
  {
    ?id lss:referencedTerms ?referencedTerm__id .
    ?referencedTerm__id skos:prefLabel ?referencedTerm__prefLabel .
    OPTIONAL { ?referencedTerm__id dcterms:abstract ?referencedTerm__abstract }
    OPTIONAL { ?referencedTerm__id rdfs:comment ?referencedTerm__description }
    OPTIONAL { ?referencedTerm__id dcterms:hasFormat ?referencedTerm__externalLink }
    BIND(?referencedTerm__id as ?referencedTerm__dataProviderUrl)
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
