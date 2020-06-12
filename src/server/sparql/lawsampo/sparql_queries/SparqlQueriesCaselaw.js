export const judgementProperties = `
  {
    ?id sfcl:isRealizedBy ?expression__id . # expression = language version
    ?expression__id dcterms:title ?expression__prefLabel .
    ?expression__id dcterms:language ?lang .
    BIND(?expression__id as ?expression__dataProviderUrl)
    BIND(?expression__id as ?prefLabel__id)
    FILTER(?lang = 'fi')
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?expression__prefLabel as ?prefLabel__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?id), "http://data.finlex.fi/ecli/", "")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id dcterms:creator ?court__id .
    ?court__id rdfs:label|skos:prefLabel ?court__prefLabel .
    FILTER(LANG(?court__prefLabel) = 'fi')
  }
  UNION
  {
    ?id dcterms:contributor ?judge__id .
    ?judge__id rdfs:label|skos:prefLabel ?judge__prefLabel .
  }
  UNION
  {
    ?id dcterms:description ?keywords__id .
    ?keywords__id skos:prefLabel ?keywords__prefLabel .
    FILTER(LANG(?keywords__prefLabel) = 'fi')
  }
  UNION
  {
    ?id dcterms:date ?decisionDate .
  }
  UNION
  {
    ?id sfcl:isRealizedBy/dcterms:abstract ?abstract .
    FILTER(LANG(?abstract) = 'fi')
  }
  UNION
  {
    ?id dcterms:isVersionOf ?ecli .
  }
  UNION
  {
    ?id sfcl:referenceToCaseLaw ?rcl__id .
    BIND(?rcl__id AS ?rcl__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?rcl__id), "http://data.finlex.fi/ecli/", "")) AS ?rcl__dataProviderUrl)
  }
  UNION
  {
    ?id sfcl:referenceToLegislation ?rl__id .
    BIND(?rl__id AS ?rl__prefLabel)
    BIND(?rl__id AS ?rl__dataProviderUrl)
  }
`
export const judgementsByYearQuery = `
  SELECT ?category (count(distinct ?judgement) as ?count) WHERE {
    <FILTER>
    ?judgement a sfcl:Judgment .
    ?judgement dcterms:date ?decisionDate .
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
