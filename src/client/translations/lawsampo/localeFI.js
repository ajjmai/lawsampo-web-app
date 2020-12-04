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
  exportToYasgui: 'avaa tuloskysely yasgui-editorissa',
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
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      Tietoa Lakisammosta
    </h1>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      ...
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      ...
    </p>  
  `,
  instructions: `
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      Lakisampo-portaalin käyttäminen
    </h1>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Yleistä
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Lakisampo-portaalissa voit hakea ja tutkia Semanttiseen Finlexiin pohjautuvaa lainsäädäntöaineistoa.
      Lisäksi portaalissa on valmiit työkalut "Digital Humanities"-tutkimukseen käyttäen
      <a href="https://seco.cs.aalto.fi/publications/2020/hyvonen-sampos-dhn-2020.pdf" target='_blank' rel='noopener noreferrer'>Sampo-mallia</a>,
      jossa portaalia voi käyttää seuraavasti:
    </p>
    <ol class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom">
    <li class="MuiTypography-gutterBottom">
        Portaalin etusivulla voit valita eri näkymistä aineistoon:
        Lainsäädäntö (hae lakeja, asetuksia ja päätöksiä),
        Pykälät (hae yksittäisiä pykäliä),
        Oikeuskäytäntö (hae oikeustapauksia),
        Haku tekstillä (Hae oikeustapauksia tekstikuvauksen avulla),
        Elämäntilanteet (Hae pykäliä ja oikeustapauksia elämäntilanteiden ja aiheiden avulla).
        Ideana on tarjota pääsy Lakisammon dataan (tietämysverkkoon) erilaisissa käyttötapauksissa datan pysyessä samana.
      </li>
      <li class="MuiTypography-gutterBottom">
        Lainsäädännön ja oikeuskäytännön näkymissä, voit käyttää fasettihakua tutkiaksesi sinua kiinnostavaa osajoukkoa näkymän entiteeteistä.
        Esimerkiksi voit tutkia tietyn ajanjakson säädöksiä. Oletuksena näkymät näyttävät kaikki kyseiseen näkymään kuuluvat tulokset (säädöset, pykälät tai oikeustapaukset).
        Tätä oletuksena näkyvää tulosjoukkoa voi rajata suodattimilla.
      </li>
      <li class="MuiTypography-gutterBottom">
        Lopuksi voit käyttää visualisointityökaluja tutkiaksesi tulosjoukkoa tarkemmin.
        Esimerkiksi voit katsoa oikeustapausten ajallista jakaumaa graafisesti.
      </li>
    </ol>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Näkymien Vie-välilehdeltä voit klikata "avaa tuloskysely YASGUI-editorissa" päästäksesi katsomaan tulosjoukon palauttavaa kyselyä ja tuloksia
      <a href="https://yasgui.triply.cc" target='_blank' rel='noopener noreferrer'>YASGUI</a>-SPARQL-editorissa.
      Voit käyttää YASGUI:n työkaluja tulosten tarkasteluun, tai ladata tulokset tiedostona,
      esimerkiksi CSV-formaatissa ladataksesi tulokset taulukkolaskentaohjelmalla.
  </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Jos haluat tutkia kaikkea tietämysverkon tietoa, joka liittyy yhteen  säädökseen tai muuhun entiteettiin, klikkaa entiteettiä.
    </p>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Yksittäisen suodattimen käyttö fasettihaussa
    </h2>
    <h3 class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom">
      Arvojen valinta suodattimen sisällä
    </h3>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Kaikki suodattimen mahdolliset arvot näytetään listana tai hierarkkisena puurakenteena.
      Tulosten määrä näytetään suluissa jokaisen arvon perässä.
      Kun arvo on valittu, tulokset päivitetään automaattisesti.
      Tyhjään tulosjoukkoon johtavat valinnat estetään päivittämällä kaikkien suodattimien
      mahdolliset valinnat, kun yhdessä suodattimessa on tehty valinta.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Suodattimien arvoista voi valita useita, jolloin tulosjoukko muodostetaan yhdistämällä molempien valintojen tulokset yhteen.
      Voit esimerkiksi valita EU-direktiivi-fasetista kaksi eri direktiiviä, jolloin tuloksina näytetään kaikki säädökset, jotka viittaavat jompaankumpaan.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Suodattimen valitut arvot näkyvät suodattimien yläpuolella olevassa "Aktiiviset suodattimet" -osiossa.
      Poistaaksesi valinnan, klikkaa x-merkkiä aktiivisen suodattimen oikealla puolella.
      Voit myös poistaa valinnan klikkaamalla valintaa itse suodattimessa.
      Aktiiviset suodattimet -osio näkyy vain jos suodattimissa on valittu arvoja.
    </p>
    <h3 class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom">
      Arvojen etsiminen suodattimen sisällä
    </h3>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Voit etsiä arvoja suodattimen sisällä käyttämällä suodattimen hakukenttää.
      Kaikki suodattimen mahdolliset arvot ovat näkyvissä kokoajan.
      Ne arvot, joihin hakulauseke täsmää, näkyvät alleviivattuna.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Ohjeet hakemiseksi suodattimen sisällä:
    </p>
    <ol class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom">
      <li class="MuiTypography-gutterBottom">
        Syötä hakulauseke hakukenttään. Jos se tuottaa tuloksia, näkyy
        hakukentän oikealla puolella numero kertomassa tulosten määrän.
      </li>
      <li class="MuiTypography-gutterBottom">
        Klikkaa " <  > " -nuolia hakukentän oikealla puolella hypätäksesi
        tulosten välillä. Kun klikkaat nuolta, listan ylimpänä näkyy eri hakuosuma.
        Ne arvot, joihin hakulauseke täsmää, näkyvät alleviivattuna.
      </li>
      <li class="MuiTypography-gutterBottom">
        Klikkaa arvoa aktivoidaksesi sen suodattimeen.
        Tulokset (ja muut suodattimet) päivittyvät automaattisesti.
      </li>
    </ol>
    <p></p>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Useiden suodattimien käyttö samaan aikaan
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Fasettihaun tehokkuus pääsee oikeuksiinsa kun useissa suodattimissa on tehty
      valintoja samaan aikaaan. Kuten monissa verkon kauppapaikoissa, loogista JA-operaattoria
      käytetään valintojen välillä.
    </p>
    <p></p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Fasettihaussa voit tehdä valintoja suodattimissa missä järjestyksessä tahansa ja
      tulosten määrä muissa suodattimissa päivitetään automaattisesti.
      Tällä tavalla käyttäjä ei päädy tyhjään tulosjoukkoon valintoja tehdessä.
    </p>
  `,
  feedback: `
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      Palaute
    </h1>
    `
}
