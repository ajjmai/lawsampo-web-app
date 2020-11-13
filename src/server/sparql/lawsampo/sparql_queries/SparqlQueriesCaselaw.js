import { annotatedHTMLTest } from './annotatedHTMLtest'

export const judgementProperties = `
  {
    # This first block must not constrain the results.
    # Each judgement has an ECLI identifier, so it should be
    # safe to use it here. 
    ?id dcterms:isVersionOf ?ecli .
    BIND(REPLACE(STR(?ecli), "ECLI:FI:", "") AS ?prefLabel__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id lss:isRealizedBy ?expression__id . # expression = language version
    ?expression__id dcterms:title ?expression__prefLabel .
    ?expression__id dcterms:language "fi" .
    ?expression__id lss:isEmbodiedBy ?format .
    ?format dcterms:format <http://www.iana.org/assignments/media-types/text/html> ;
            lss:html ?html_ .
    BIND(STR(?html_) as ?judgementTextHTML)
    BIND("""${annotatedHTMLTest}""" as ?judgementTextHTMLAnnotated)
    BIND(?expression__id as ?expression__dataProviderUrl)
  }
  UNION
  {
    ?id dcterms:contributor ?judge__id .
    ?judge__id rdfs:label|skos:prefLabel ?judge__prefLabel .
  }
  UNION
  {
    ?id dcterms:description ?keyword__id .
    BIND(?keyword__id as ?keyword__prefLabel)
    # ?keyword__id skos:prefLabel ?keyword__prefLabel .
    # FILTER(LANG(?keywords__prefLabel) = 'fi')
  }
  UNION
  {
    ?id dcterms:issued ?decisionDate .
  }
  UNION
  {
    ?id lss:isRealizedBy/dcterms:abstract ?abstract .
  }
  UNION
  {
    ?id dcterms:creator ?court__id .
    BIND(?court__id as ?court__prefLabel)
    # ?court__id rdfs:label|skos:prefLabel ?court__prefLabel .
    # FILTER(LANG(?court__prefLabel) = 'fi')
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
`
export const judgementsByYearQuery = `
  SELECT ?category (count(distinct ?judgement) as ?count) WHERE {
    <FILTER>
    ?judgement a lss:Judgment .
    ?judgement dcterms:issued ?decisionDate .
    BIND(year(xsd:dateTime(?decisionDate)) as ?year)
    FILTER (?year <= year(NOW()))
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
