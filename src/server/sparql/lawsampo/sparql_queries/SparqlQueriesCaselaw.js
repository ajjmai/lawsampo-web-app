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
    ?id lss:isRealizedBy ?expP .
    ?expP dcterms:language '<LANG>' ;
          dcterms:abstract ?abstract__text .
    BIND('abstractPrimary' as ?abstract__id)
  }
  UNION 
  {
    ?id lss:isRealizedBy ?expS .
    ?expS dcterms:language '<LANG_SECONDARY>' ;
          dcterms:abstract ?abstract__text .
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
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?id), "http://ldf.fi/lawsampo/", "")) AS ?prefLabel__dataProviderUrl)
    FILTER(LANG(?prefLabel__id) = '<LANG>')

    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION 
  {
    ?id lss:isRealizedBy ?expP .
    ?expP dcterms:language '<LANG>' ;
          dcterms:abstract ?abstract__text .
    BIND('abstractPrimary' as ?abstract__id)
  }
  UNION 
  {
    ?id lss:isRealizedBy ?expS .
    ?expS dcterms:language '<LANG_SECONDARY>' ;
          dcterms:abstract ?abstract__text .
    BIND('abstractSecondary' as ?abstract__id)
  }
  UNION
  {
    BIND(<ID> as ?id)
    OPTIONAL {
      ?id lss:isRealizedBy ?expPrimary .
      ?expPrimary dcterms:language '<LANG>' ;
                  lss:annotatedHtml ?htmlPrimary .
    }
    OPTIONAL {
      ?id lss:isRealizedBy ?expSecondary .
      ?expSecondary dcterms:language '<LANG_SECONDARY>' ;
                    lss:html ?htmlSecondary  # Swedish HTML's are not annotated    
    } 
    BIND(COALESCE(?htmlPrimary, ?htmlSecondary) as ?html_)
    BIND(REPLACE(?html_, "<html>|</html>|<head />|<body>|</body>", "") as ?contentHTMLAnnotated)
  }
  UNION 
  {
    ?id lss:referencedTerms/skos:relatedMatch? ?referencedTerm__id . # select both directly linked terms and related matches
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
