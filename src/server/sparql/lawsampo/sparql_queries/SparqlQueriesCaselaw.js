// import { judgementTextHTMLAnnotatedTest } from './annotatedHTMLtest'
// BIND("""${judgementTextHTMLAnnotatedTest}""" as ?judgementTextHTMLAnnotated)

export const judgementProperties = `
  # This first block must not constrain the results.
  {
    ?id skos:prefLabel ?prefLabel__id
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)

    ?id dcterms:isVersionOf ?ecli .
 
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  # Expression = language version.
  # Currently there is only one language version at a time, so it's safe to use UNION.
  {
    ?id lss:isRealizedBy ?expression . 
    ?expression dcterms:language '<LANG>' .
    
    OPTIONAL { ?expression dcterms:abstract ?abstract }
    ?expression lss:html ?html_ .
    BIND(REPLACE(?html_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTML)
    
    OPTIONAL { 
       ?expression lss:annotatedHtml ?annotatedHtml_ .
       BIND(REPLACE(?annotatedHtml_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTMLAnnotated)
    }
  }
  UNION
  {
    ?id lss:isRealizedBy ?expression . 
    ?expression dcterms:language '<LANG_SECONDARY>' .
    
    OPTIONAL { ?expression dcterms:abstract ?abstract }
    ?expression lss:html ?html_ .
    BIND(REPLACE(?html_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTML)
    
    OPTIONAL { 
       ?expression lss:annotatedHtml ?annotatedHtml_ .
       BIND(REPLACE(?annotatedHtml_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTMLAnnotated)
    }
  }
  UNION 
  {
    ?id lss:referencedTerms/skos:relatedMatch? ?referencedTerm__id . # select both directly linked terms and related matches
    ?referencedTerm__id skos:prefLabel ?referencedTerm__prefLabel .
    OPTIONAL { ?referencedTerm__id dcterms:abstract ?referencedTerm__abstract }
    OPTIONAL { ?referencedTerm__id rdfs:comment ?referencedTerm__description }
    OPTIONAL { ?referencedTerm__id dcterms:hasFormat ?referencedTerm__externalLink }
    BIND(?referencedTerm__id as ?referencedTerm__dataProviderUrl)
  }
  UNION
  {
    ?id dcterms:contributor ?judge__id .
    ?judge__id rdfs:label|skos:prefLabel ?judge__prefLabel .
  }
  UNION
  {
    ?id dcterms:issued ?decisionDate .
  }
  UNION
  {
    ?id dcterms:creator ?court__id .
    ?court__id skos:prefLabel ?court__prefLabel .
    FILTER(LANG(?court__prefLabel) = '<LANG>')
  }
  UNION
  {
    ?id lss:referenceToCourtDecision ?referencedCourtDecision__id .
    BIND(?referencedCourtDecision_id AS ?referencedCourtDecision__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?rcl__id), "http://ldf.fi/lawsampo/", "")) AS ?referencedCourtDecision__dataProviderUrl)
  }
  UNION
  {
    ?id lss:referenceToLegislation ?referencedStatute__id .
    BIND(?referencedStatute__id AS ?referencedStatute__prefLabel)
    BIND(?referencedStatute__id AS ?referencedStatute__dataProviderUrl)
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
`
export const judgementsByYearQuery = `
  SELECT ?category (count(distinct ?judgement) as ?count) WHERE {
    <FILTER>
    ?judgement a lss:Judgment .
    ?judgement dcterms:issued ?decisionDate .
    BIND(year(xsd:dateTime(?decisionDate)) as ?year)
    FILTER (?year > 1700 && ?year <= year(NOW()))
    BIND(STR(?year) as ?category)
  } 
  GROUP BY ?category 
  ORDER BY ?category
`

export const judgementNetworkLinksQuery = `
  SELECT DISTINCT (?id as ?source) ?target
  WHERE {
    VALUES ?id { <ID> }
    ?id sfcl:referenceToCaseLaw ?target .
  } 
`

export const judgementNetworkNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
  WHERE {
    VALUES ?class { sfcl:Judgment }
    VALUES ?id { <ID_SET> }
    ?id a ?class .
    ?id sfcl:isRealizedBy/dcterms:title ?prefLabel .
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?rcl__id), "http://data.finlex.fi/ecli/", "")) AS ?href)
  }
`
