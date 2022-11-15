export const judgementPropertiesFacetResults = `
  # This first block must not constrain the results.
  {
    ?id dcterms:isVersionOf ?ecli .

    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)
    FILTER(LANG(?prefLabel__id) = '<LANG>')

    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id lss:is_realized_by ?expP .
    OPTIONAL {
        ?expP dcterms:language/skos:prefLabel ?lang__prefLabel .
        FILTER(LANG(?lang__prefLabel) = '<LANG>')
    }
    ?expP dcterms:abstract ?abstract__text .
    FILTER(LANG(?abstract__text) = '<LANG>')
    BIND('abstractPrimary' as ?abstract__id)
  }
  UNION
  {
    ?id lss:is_realized_by ?expS .
    OPTIONAL {
    ?expS dcterms:language/skos:prefLabel ?lang_second__prefLabel .
    FILTER(LANG(?lang_second__prefLabel) = '<LANG_SECONDARY>')
    }
    ?expS  dcterms:abstract ?abstract__text .
    FILTER(LANG(?abstract__text) = '<LANG>')
    BIND('abstractSecondary' as ?abstract__id)
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
`

export const judgementPropertiesInstancePage = `
  {
    ?id dcterms:isVersionOf ?ecli .

    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    # BIND(CONCAT("/caselaw/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)
    FILTER(LANG(?prefLabel__id) = '<LANG>')

    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id lss:is_realized_by ?expP .
    OPTIONAL {
    ?expP dcterms:language/skos:prefLabel ?lang__prefLabel .
    FILTER(LANG(?lang__prefLabel) = '<LANG>')
    }
    ?expP dcterms:abstract ?abstract__text .
    FILTER(LANG(?abstract__text) = '<LANG>')
    BIND('abstractPrimary' as ?abstract__id)
  }
  UNION
  {
    ?id lss:is_realized_by ?expS .
    OPTIONAL {
    ?expS dcterms:language/skos:prefLabel ?lang_second__prefLabel .
    FILTER(LANG(?lang_second__prefLabel) = '<LANG_SECONDARY>')
    }
    ?expS dcterms:abstract ?abstract__text .
    FILTER(LANG(?abstract__text) = '<LANG>')
    BIND('abstractSecondary' as ?abstract__id)
  }
  UNION
  {
    BIND(<ID> as ?id)
    OPTIONAL {
      ?id lss:is_realized_by ?expPrimary .
      OPTIONAL {
      ?expPrimary dcterms:language/skos:prefLabel ?lang__prefLabel .
      FILTER(LANG(?lang__prefLabel) = '<LANG>')
      }
      ?expPrimary lss:html ?htmlPrimary .
    }
    OPTIONAL {
      ?id lss:is_realized_by ?expSecondary .
      OPTIONAL {
      ?expSecondary dcterms:language ?lang_second__prefLabel .
      FILTER(LANG(?lang_second__prefLabel) = '<LANG_SECONDARY>')
      }
      ?expSecondary lss:html ?htmlSecondary .
    }
    BIND(COALESCE(?htmlPrimary, ?htmlSecondary) as ?html_)
    BIND(REPLACE(?html_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTMLAnnotated)
  }
  UNION
  {
    ?id lss:term_reference/skos:relatedMatch? ?referencedTerm__id . # select both directly linked terms and related matches
    ?referencedTerm__id skos:prefLabel ?prefLabel_ .
    OPTIONAL { ?referencedTerm__id dcterms:abstract ?referencedTerm__abstract }
    OPTIONAL { ?referencedTerm__id rdfs:comment ?referencedTerm__description }
    OPTIONAL { ?referencedTerm__id dcterms:hasFormat ?referencedTerm__externalLink }
    OPTIONAL { ?referencedTerm__id lss:count ?referencedTerm__count }
    BIND(?referencedTerm__id as ?referencedTerm__dataProviderUrl)
    BIND(LCASE(?prefLabel_) as ?referencedTerm__prefLabel)
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
    ?id lss:material_type ?typeOfSourceData__id .
    ?typeOfSourceData__id skos:prefLabel ?typeOfSourceData__prefLabel .
    FILTER(LANG(?typeOfSourceData__prefLabel) = '<LANG>')
  }
  UNION
  {
    ?id lss:reference_to_court_decision ?referencedCourtDecision__id .
    BIND(?referencedCourtDecision_id AS ?referencedCourtDecision__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?rcl__id), "http://ldf.fi/lawsampo/", "")) AS ?referencedCourtDecision__dataProviderUrl)
  }
  UNION
  {
    ?id lss:reference_to_legislation ?referencedStatute__id .
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
    ?id dct:subject ?subjectCategory__id .
    ?subjectCategory__id skos:prefLabel ?subjectCategory__prefLabel .
  }
  UNION
  {
     ?id lss:finlex_url ?finlexLink__id .
     BIND('Finlex' as ?finlexLink__prefLabel)
     BIND(?finlexLink__id as ?finlexLink__dataProviderUrl)
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
