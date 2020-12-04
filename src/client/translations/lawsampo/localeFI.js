export default {
  languageLabel: 'Suomi',
  appTitle: {
    short: 'Lakisampo',
    long: 'Lakisampo',
    subheading: `
      Lainsäädäntö ja oikeuskäytäntö semanttisessa webissä
    `
  },
  appDescription: `

  `,
  selectPerspective: 'Valitse näkymä aineiston hakua ja tutkimista varten:',
  mainPageImageLicence: 'Etusivun kuva: Shutterstock.com',
  topBar: {
    feedback: 'palaute',
    info: {
      info: 'Tietoa',
      blog: 'Projektin kotisivu',
      blogUrl: 'https://seco.cs.aalto.fi/projects/lakisampo/',
      aboutThePortal: 'Tietoa portaalista'
    },
    searchBarPlaceHolder: 'Etsi koko aineistosta',
    searchBarPlaceHolderShort: 'Haku',
    instructions: 'ohjeet'
  },
  facetBar: {
    results: 'Tulokset',
    activeFilters: 'Aktiiviset suodattimet:',
    defaultMissingValueLabel: 'Tieto puuttuu',
    removeAllFilters: 'Poista kaikki',
    narrowDownBy: 'Rajoita',
    filterOptions: 'Asetukset',
    filterByName: 'Hae nimellä',
    selectionOptions: 'Asetukset',
    selectAlsoSubconcepts: 'Hae myös alakäsitteillä',
    doNotSelectSubconcepts: 'Älä hae alakäsitteillä',
    sortingOptions: 'Järjestys',
    sortAlphabetically: 'Järjestä nimen mukaan',
    sortByNumberOfSearchResults: 'Järjestä hakutuloksien lukumäärän mukaan',
    useDisjunction: 'Käytä TAI-operaattoria valintojen välillä',
    useConjuction: 'Käytä JA-operaattoria valintojen välillä',
    minYear: 'Min year',
    maxYear: 'Max year',
    min: 'Min',
    max: 'Max',
    facetSearchFieldPlaceholder: 'Hae...',
    applyFacetSelection: 'päivitä',
    pieChart: {
      tooltip: 'Piirakkakaavio'
    },
    barChart: {
      tooltip: 'Pylväsdiagrammi',
      language: {
        title: 'Language',
        xaxisTitle: 'Language',
        yaxisTitle: 'Manuscript count',
        seriesTitle: 'Manuscript count'
      }
    },
    lineChart: {
      tooltip: 'Viivakaavio',
      statuteYear: {
        title: 'Säädöksiä vuosittain',
        xaxisTitle: 'Vuosi',
        yaxisTitle: 'Säädösten lukumäärä',
        seriesTitle: 'Säädösten lukumäärä'
      }
    }
  },
  tabs: {
    table: 'taulukko',
    map: 'kartta',
    by_year: 'vuosijakauma',
    network: 'verkosto',
    export: 'Vie',
    statutes: 'Lainsäädäntö',
    cases: 'Oikeustapaukset'
  },
  table: {
    rowsPerPage: 'Riviä sivulla',
    of: 'of'
  },
  exportToYasgui: 'avaa tuloskysely yasgui editorissa',
  openInLinkedDataBrowser: 'avaa linkitetyn datan selaimessa',
  resultsAsCSV: 'lataa tulokset CSV taulukkona',
  facets: {
    dateFacet: {
      invalidDate: 'Epäkelpo päivämäärä.',
      toBeforeFrom: 'Alkupäivämäärän täytyy olla ennen loppupäivämäärää.',
      minDate: 'Aikaisin sallittu päivämäärä on {minDate}',
      maxDate: 'Myöhäisin sallittu päivämäärä on {maxDate}',
      cancel: 'Peruuta',
      fromLabel: 'Alku',
      toLabel: 'Loppu'
    },
    textFacet: {
      inputLabel: 'Etsi nimellä'
    },
    sliderFacet: {
      invalidStartOrEnd: 'Min value must be smaller than max value. The smallest value can be {min} and the largest value can be {max}.'
    }
  },
  instancePageGeneral: {
    introduction: `
    `,
    repetition: `
    `
  },
  perspectives: {
    situations: {
      label: 'Elämäntilanteet',
      mainPageLabel: 'Elämäntilanteet',
      facetResultsType: '',
      shortDescription: 'Hae pykäliä ja oikeustapauksia elämäntilanteiden ja aiheiden avulla',
      longDescription: '',
      inputPlaceHolder: '',
      properties: {
        uri: {
          label: 'URI-tunniste',
          description: 'Uniform Resource Identifier -tunniste'
        },
        statute: {
          label: 'Säädös',
          description: `
            Säädös
          `
        },
        prefLabel: {
          label: 'Pykälä',
          description: `
            Pykälä
          `
        },
        text: {
          label: 'Teksti',
          description: `
            Teksti
          `
        },
        abstract: {
          label: 'Tiivistelmä',
          description: `
            Tiivistelmä
          `
        },
        court: {
          label: 'Tuomioistuin',
          description: `
            Tuomioistuimen nimi
          `
        },
        decisionDate: {
          label: 'Päätöksen päivämäärä',
          description: `
            Tuomion päivämäärä
          `
        },
        enforcementDate: {
          label: 'Voimaantulo',
          description: `
            Voimaantulopäivämäärä
          `
        }
      }
    },
    statutes: {
      label: 'Lainsäädäntö',
      mainPageLabel: 'Lainsäädäntö',
      facetResultsType: 'säädöstä',
      shortDescription: 'Hae lakeja, asetuksia ja päätöksiä',
      longDescription: `
      `,
      instancePage: {
        label: 'Säädös',
        description: `
        `
      },
      properties: {
        uri: {
          label: 'URI-tunniste',
          description: 'Uniform Resource Identifier -tunniste'
        },
        prefLabel: {
          label: 'Säädös',
          description: `
          `
        },
        statute: {
          label: 'Laws and acts',
          description: `
            Laws and acts
          `
        },
        jenaText: {
          label: 'Vapaatekstihaku',
          textFacetInputPlaceholder: 'Hae...',
          description: `
            Vapaatekstihaku
          `
        },
        text: {
          label: 'Teksti',
          description: `
            Teksti
          `
        },
        identifier: {
          label: 'Tunniste',
          description: `
            Tunniste
          `
        },
        section: {
          label: 'Pykälät',
          description: `
            Pykälät
          `
        },
        subjectCategory: {
          label: 'Aihe',
          description: `
            Aihe
          `
        },
        situationCategory: {
          label: 'Elämäntilanne',
          description: `
            Elämäntilanne
          `
        },
        documentType: {
          label: 'Dokumenttiluokka',
          description: `
            Dokumenttiluokka
          `
        },
        statuteType: {
          label: 'Säädöksen tyyppi',
          description: `
            Säädöksen tyyppi
          `
        },
        enforcementDate: {
          label: 'Voimaantulo',
          description: `
            Voimaantulopäivämäärä
          `
        },
        euDirective: {
          label: 'EU-direktiivi',
          missingValueLabel: 'ei direktiiviä',
          description: `
            EU-direktiivi
          `
        },
        wordcloud: {
          label: 'Sanapilvi',
          description: `
            Sanapilvi
          `
        },
        contentHTML: {
          label: 'Säädöksen sisältö',
          description: `
            Säädöksen sisältö
          `
        },
        contentHTMLAnnotated: {
          label: 'Säädöksen kontekstuaalinen sisältö',
          description: `
            Säädöksen kontekstuaalinen sisältö
          `
        }
      }
    },
    sections: {
      label: 'Pykälät',
      mainPageLabel: 'Pykälät',
      facetResultsType: 'pykälää',
      shortDescription: 'Hae yksittäisiä lainsäädännön pykäliä',
      longDescription: `
      `,
      instancePage: {
        label: 'Pykälä',
        description: `
        `
      },
      properties: {
        uri: {
          label: 'URI-tunniste',
          description: 'Uniform Resource Identifier -tunniste'
        },
        prefLabel: {
          label: 'Pykälä',
          description: `
          `
        },
        statute: {
          label: 'Säädös',
          description: `
          `
        },
        jenaText: {
          label: 'Vapaatekstihaku',
          textFacetInputPlaceholder: 'Hae...',
          description: `
            Vapaatekstihaku
          `
        },
        text: {
          label: 'Teksti',
          description: `
            Teksti
          `
        },
        identifier: {
          label: 'Tunniste',
          description: `
            Tunniste
          `
        },
        section: {
          label: 'Pykälä',
          description: `
            Pykälä
          `
        },
        subjectCategory: {
          label: 'Aihe',
          description: `
            Aihe
          `
        },
        situationCategory: {
          label: 'Elämäntilanne',
          description: `
            Elämäntilanne
          `
        },
        documentType: {
          label: 'Dokumenttiluokka',
          description: `
            Dokumenttiluokka
          `
        },
        statuteType: {
          label: 'Säädöksen tyyppi',
          description: `
            Säädöksen tyyppi
          `
        },
        enforcementDate: {
          label: 'Säädöksen voimaantulo',
          description: `
            Säädöksen voimaantulopäivämäärä
          `
        },
        euDirective: {
          label: 'EU-direktiivi',
          description: `
            EU-direktiivi
          `
        },
        contentHTML: {
          label: 'Pykälän sisältö',
          description: `
            Sisältö
          `
        },
        contentHTMLAnnotated: {
          label: 'Pykälän kontekstuaalinen sisältö',
          description: `
            Kontekstuaalinen sisältö
          `
        }
      }
    },
    caselaw: {
      label: 'Oikeuskäytäntö',
      mainPageLabel: 'Oikeuskäytäntö',
      facetResultsType: 'oikeustapausta',
      shortDescription: 'Hae oikeustapauksia',
      longDescription: `
      `,
      instancePage: {
        label: 'Oikeustapaus',
        description: `
        `
      },
      properties: {
        uri: {
          label: 'URI-tunniste',
          description: 'Uniform Resource Identifier -tunniste'
        },
        prefLabel: {
          label: 'Oikeustapaus',
          description: `
            Oikeustapaus
          `
        },
        jenaText: {
          label: 'Vapaatekstihaku',
          textFacetInputPlaceholder: 'Hae...',
          description: `
            Vapaatekstihaku
          `
        },
        abstract: {
          label: 'Tiivistelmä',
          description: `
            Tiivistelmä
          `
        },
        court: {
          label: 'Tuomioistuin',
          description: `
            Tuomioistuimen nimi
          `
        },
        judge: {
          label: 'Tuomari',
          description: `
            Tuomarin nimi
          `
        },
        typeOftheMatter: {
          label: 'Tyyppi',
          description: `
            Oikeustapauksen tyyppi
          `
        },
        subjectCategory: {
          label: 'Aihe',
          description: `
            Aihe
          `
        },
        situationCategory: {
          label: 'Elämäntilanne',
          description: `
            Elämäntilanne
          `
        },
        decisionDate: {
          label: 'Antopäivä',
          description: `
            Antopäivä
          `
        },
        referencedStatute: {
          label: 'Viitattu ajantasainen säädös',
          description: `
            Viitattu ajantasainen säädös
          `
        },
        contentHTML: {
          label: 'Oikeustapauksen sisältö',
          description: `
            Oikeustapauksen sisältö
          `
        },
        contentHTMLAnnotated: {
          label: 'Oikeustapauksen kontekstuaalinen sisältö',
          description: `
            Oikeustapauksen kontekstuaalinen sisältö
          `
        }
      }
    },
    caselawfinder: {
      label: 'Haku tekstillä',
      mainPageLabel: 'Haku tekstillä',
      shortDescription: 'Hae oikeustapauksia tekstikuvauksen avulla'
    }
  },
  aboutThePortalPartOne: `
  `,
  instructions: `
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      Using the LawSampo Portal
    </h1>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      General Idea
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      The LawSampo Portal enables you to search and explore the legislative data originating from Semantic Finlex.
      In addition, the portal is equipped with ready-to-use tools for Digital Humanities research using the
      <a href="https://seco.cs.aalto.fi/publications/2020/hyvonen-sampos-dhn-2020.pdf" target='_blank' rel='noopener noreferrer'>
      "Sampo" model</a> where the portal is used as follows:
    </p>
    <ol class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom">
    <li class="MuiTypography-gutterBottom">
        On the front page of the portal different perspectives to the data are given as a selection: the statutes of
        consolidated legislation, the sections of consolidated legislation, case law, case law finder (external service), and
        contextual legislation search.
        The idea is to provide access to the underlying data (knowledge graph)
        through multiple use cases while the data remains the same.
      </li>
      <li class="MuiTypography-gutterBottom">
        In the perspectives regarding consolidated legislation and caselaw, faceted search can be used for filtering out a subset
        of objects of the view, the “target group” of interest. For example, statutes of a given time period can be selected.
        By default the perspectives display all results from the corresponding class (Statute, Section, Case Law).
        This default result set can be narrowed down by using the filters.
      </li>
      <li class="MuiTypography-gutterBottom">
        Finally, visualization tools can be applied to study the target group. For example, it is possible
        to see on the temporal distribution of the court decisions of the case law.
      </li>
    </ol>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Using the "Export" tab in a perspective and then the button "Open SPARQL query in YASGUI" the SPARQL query corresponding to
      the facet selections made is shown in the
      <a href="https://yasgui.triply.cc" target='_blank' rel='noopener noreferrer'>
      YASGUI</a> SPARQL querying interface with the results. Additional YASGUI tools for studying the results and downloading
      the data are available there. For example, the results of the query can be downloaded in CSV format for additional
      spreadsheet computing.
  </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      If you want to inspect the full raw data for any individual statute or other entity, click on the link of the entity.
    </p>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Using a Single Filter in Faceted Search
    </h2>
    <h3 class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom">
      Selecting values within a filter
    </h3>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      All possible values for a filter are displayed either as a list or as a hierarchical
      tree (if available). The number of results is shown in brackets for each value.
      Once a value is selected, the results are automatically updated. To prevent further
      selections that do not return any results, also the possible values for all other
      filters are updated at the same time.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Multiple values can be selected within a single filter. Selecting multiple values
      generates results that contain <strong>any</strong> of the selected values. For example, selecting
      two different directives in the EU directive facet returns results that
      make references to either of them.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Selected values of a filter appear in the Active filters section at the top of the list
      of filters. To deselect a filter, click the X mark next to it within the Active filters
      section. You can also deselect a filter value by unchecking the checkmark in the
      filter’s value list. The Active filters section only appears if there are filter
      values currently selected.
    </p>
    <h3 class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom">
      Searching categories within a filter
    </h3>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Category selections within a filter can be searched by using the search field at the
      top of each filter. All possible values of a filter remain visible at all times.
      The values of the filter that match the search term are indicated by a purple underline.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Steps for searching within filters:
    </p>
    <ol class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom">
      <li class="MuiTypography-gutterBottom">
        Type search term into search field. If there are matches, a number
        will appear to the right of the search field, indicating the number
        of filter values that match the search term.
      </li>
      <li class="MuiTypography-gutterBottom">
        Click the arrows " <  > " to the right of the search field to cycle through
        the results. As you click the arrow, a different filter value will appear
        at the top of the list. Matched filters are underlined in purple.
      </li>
      <li class="MuiTypography-gutterBottom">
        Click the checkmark next to a filter value to activate it.
        The results (and also other filters) are automatically updated.
      </li>
    </ol>
    <p></p>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Using Multiple Filters Simultaneously
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      The effectiveness of faceted search is realized when multiple filters are
      applied at the same time. As in many e-commerce sites, a logical AND is
      always used between the filters.
    </p>
    <p></p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      In faceted search you can make selections in filters in any order, and the hit
      counts in the other filters are automatically updated. In this way you never end
      up in "no hits" dead ends.
    </p>
  `,
  feedback: `
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      Palaute
    </h1>
    `
}
