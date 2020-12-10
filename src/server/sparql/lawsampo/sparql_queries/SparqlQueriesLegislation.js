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
    ?id lss:section ?firstLevel__secondLevel__section__id .
    ?firstLevel__secondLevel__section__id lss:part_number_int ?firstLevel__id ;
                                          lss:chapter_number_int ?firstLevel__secondLevel__id ;
                                          skos:prefLabel ?firstLevel__secondLevel__section__prefLabel ;
                                          lss:section_number_int ?firstLevel__secondLevel__section__sectionNumberInt ;
                                          lss:section_number ?firstLevel__secondLevel__section__sectionNumber .
    BIND("" as ?firstLevel__prefLabel)                            
    BIND(CONCAT("/sections/page/", REPLACE(STR(?firstLevel__secondLevel__section__id), "http://ldf.fi/lawsampo/", "")) AS ?firstLevel__secondLevel__section__dataProviderUrl)
    BIND(true as ?hasParts)
    BIND(true as ?hasChapters)
  }
  UNION 
  {
    ?id lss:section ?firstLevel__section__id .
    ?firstLevel__section__id lss:chapter_number_int ?firstLevel__id ;
                             skos:prefLabel ?firstLevel__section__prefLabel ;
                             lss:section_number_int ?firstLevel__section__sectionNumberInt ;
                             lss:section_number ?firstLevel__section__sectionNumber .
    BIND("" as ?firstLevel__prefLabel)                            
    BIND(CONCAT("/sections/page/", REPLACE(STR(?firstLevel__section__id), "http://ldf.fi/lawsampo/", "")) AS ?firstLevel__section__dataProviderUrl)
    BIND(false as ?hasParts)
    BIND(true as ?hasChapters)
    FILTER NOT EXISTS { ?firstLevel__section__id lss:part_number_int [] }
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
    ?id lss:section ?firstLevel__secondLevel__section__id .
    ?firstLevel__secondLevel__section__id lss:part_number_int ?firstLevel__id ;
                                          lss:chapter_number_int ?firstLevel__secondLevel__id ;
                                          skos:prefLabel ?firstLevel__secondLevel__section__prefLabel ;
                                          lss:section_number_int ?firstLevel__secondLevel__section__sectionNumberInt ;
                                          lss:section_number ?firstLevel__secondLevel__section__sectionNumber .
    BIND("" as ?firstLevel__prefLabel)                            
    BIND(CONCAT("/sections/page/", REPLACE(STR(?firstLevel__secondLevel__section__id), "http://ldf.fi/lawsampo/", "")) AS ?firstLevel__secondLevel__section__dataProviderUrl)
    BIND(true as ?hasParts)
    BIND(true as ?hasChapters)
  }
  UNION 
  {
    ?id lss:section ?firstLevel__section__id .
    ?firstLevel__section__id lss:chapter_number_int ?firstLevel__id ;
                             skos:prefLabel ?firstLevel__section__prefLabel ;
                             lss:section_number_int ?firstLevel__section__sectionNumberInt ;
                             lss:section_number ?firstLevel__section__sectionNumber .
    BIND("" as ?firstLevel__prefLabel)                            
    BIND(CONCAT("/sections/page/", REPLACE(STR(?firstLevel__section__id), "http://ldf.fi/lawsampo/", "")) AS ?firstLevel__section__dataProviderUrl)
    BIND(false as ?hasParts)
    BIND(true as ?hasChapters)
    FILTER NOT EXISTS { ?firstLevel__section__id lss:part_number_int [] }
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
    ?id lss:referencedTerms/skos:relatedMatch? ?referencedTerm__id . # select both directly linked terms and related matches
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
    ?id lss:section_statute_date ?statuteEnforcementDate .
  }
  UNION
  {
    ?id lss:section_date ?sectionEnforcementDate .
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
