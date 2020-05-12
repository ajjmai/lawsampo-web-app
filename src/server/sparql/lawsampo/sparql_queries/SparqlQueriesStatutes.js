export const statuteProperties = `
  {
    # one statute may have multiple versions
    ?id eli:has_member ?version__id .

    # get all titles of all Finnish versions
    BIND(IRI(CONCAT(str(?version__id),"/fin")) AS ?versionFinnish)
    ?versionFinnish eli:title ?prefLabel__id .

    # bind all titles of all Finnish versions into prefLabel object:
    BIND (?prefLabel__id as ?prefLabel__prefLabel)

    # get dates of all versions
    OPTIONAL { ?version__id eli:version_date ?versionDate_  }
    OPTIONAL { ?id eli:date_document ?originalDate_ }
    BIND(COALESCE(?versionDate_, ?originalDate_, "missing date") AS ?version__versionDate)

    # create labels for "Read" buttons
    BIND(COALESCE(?versionDate_, "original") AS ?versionDateTemp)
    BIND(CONCAT("Read ", STR(?versionDateTemp), " version") AS ?version__prefLabel)
    BIND(?version__id AS ?version__dataProviderUrl)

    # create link for React Router:
    BIND(CONCAT("/statutes/page/", REPLACE(STR(?id), "http://data.finlex.fi/eli/sd/", "")) AS ?prefLabel__dataProviderUrl)

    # create URI link for result table
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  }
  UNION
  {
    ?id sfl:statuteType ?statuteType__id .
    ?statuteType__id rdfs:label ?statuteType__prefLabel .
    FILTER(LANG(?statuteType__prefLabel) = 'fi')
  }
  UNION
  {
    ?id eli:type_document ?documentType__id .
    ?documentType__id rdfs:label ?documentType__prefLabel .
    FILTER(LANG(?documentType__prefLabel) = 'fi')
  }
  UNION
  {
    ?id sfl:year ?statuteYear.
  }
  UNION
  {
    ?id eli:has_member/eli:transposes ?euDirective__id . 
    BIND(?euDirective__id AS ?euDirective__prefLabel)
  }
`
