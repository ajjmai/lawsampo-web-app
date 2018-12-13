import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import L from 'leaflet';
import { has, orderBy } from 'lodash';
// import LeafletSidebar from './LeafletSidebar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { purple } from '@material-ui/core/colors';

import 'leaflet-sidebar-v2/js/leaflet-sidebar.min.js';
import 'leaflet-sidebar-v2/css/leaflet-sidebar.min.css';

import 'leaflet-fullscreen/dist/fullscreen.png';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.min.js';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

import 'Leaflet.Control.Opacity/dist/L.Control.Opacity.css';
import 'Leaflet.Control.Opacity/dist/L.Control.Opacity.js';

import 'leaflet.smooth_marker_bouncing/leaflet.smoothmarkerbouncing.js';

import 'Leaflet.extra-markers/dist/js/leaflet.extra-markers.min.js';
import 'Leaflet.extra-markers/dist/css/leaflet.extra-markers.min.css';
import 'Leaflet.extra-markers/dist/img/markers_default.png';
import 'Leaflet.extra-markers/dist/img/markers_shadow.png';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZWtrb25lbiIsImEiOiJjam5vampzZ28xd2dyM3BzNXR0Zzg4azl4In0.eozyF-bBaZbA3ibhvJlJpQ';

const style = {
  width: '100%',
  height: '100%'
};

const styles = () => ({
  leafletContainer: {
    height: 'calc(100% - 72px)'
  },
  spinner: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 500
  },
});

// https://github.com/pointhi/leaflet-color-markers
// const ColorIcon = L.Icon.extend({
//   options: {
//     shadowUrl: 'img/markers/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
//   }
// });

class LeafletMap extends React.Component {

  componentDidMount() {
    this.props.fetchPlaces(this.props.variant);

    // Base layers
    // const OSMBaseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // });

    const mapboxLight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=' + MAPBOX_ACCESS_TOKEN, {
      attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      tileSize: 512,
      zoomOffset: -1
    });

    // const parisTest = L.tileLayer('http://mapwarper.net/maps/tile/28345/{z}/{x}/{y}.png', {
    //   attribution: 'SeCo'
    // });

    // Marker layers
    this.resultMarkerLayer = L.layerGroup();

    this.bouncingMarkerObj = null;
    this.popupMarkerObj = null;


    if (this.props.mapMode === 'cluster') {
      this.updateMarkersAndCluster(this.props.results);
    } else {
      this.updateMarkers(this.props.results);
    }

    // create map
    this.leafletMap = L.map('map', {
      center: [22.43,10.37],
      zoom: 2,
      layers: [
        //OSMBaseLayer,
        mapboxLight,
        this.resultMarkerLayer,
      ],
      fullscreenControl: true,
    });

    // layer controls
    // const baseMaps = {
    //   'OpenStreetMap': OSMBaseLayer,
    // };
    // const overlayMaps = {
    //   // 'Search results': this.resultMarkerLayer,
    //   // 'Karelian maps (MapWarper)': karelianMaps,
    //   // 'Senate atlas (MapWarper)': senateAtlas,
    //   'Paris': parisTest
    // };

    // this.layerControl = L.control.layers(
    //   //baseMaps,
    //   overlayMaps,
    // ).addTo(this.leafletMap);

    // L.control.opacity(
    //   overlayMaps, {
    //     collapsed: true,
    //     position: 'bottomleft'
    //   }).addTo(this.leafletMap);

    L.Marker.setBouncingOptions({ exclusive: true });

    //L.control.sidebar({ container: 'sidebar' }).addTo(this.leafletMap).open('home');

  }

  componentDidUpdate({ results, place, mapMode }) {

    // check if results data or mapMode have changed
    if (this.props.results !== results || this.props.mapMode !== mapMode) {
      if (this.props.mapMode === 'cluster') {
        this.updateMarkersAndCluster(this.props.results);
      } else {
        this.updateMarkers(this.props.results);
      }
    }

    if (this.props.place !== place) {
      this.markers[this.props.place.id]
        .bindPopup(this.createPopUpContent(this.props.place), {
          maxHeight: 300,
          maxWidth: 400,
          minWidth: 400,
        //closeButton: false,
        })
        .openPopup();
    }

  }

  renderSpinner() {
    if(this.props.fetchingPlaces) {
      return (
        <div className={this.props.classes.spinner}>
          <CircularProgress style={{ color: purple[500] }} thickness={5} />
        </div>
      );
    }
    return null;
  }


  updateMarkers(results) {
    this.resultMarkerLayer.clearLayers();
    this.markers = {};
    Object.values(results).forEach(value => {
      const marker = this.createMarker(value);
      this.markers[value.id] = marker;
      marker == null ? null : marker.addTo(this.resultMarkerLayer);
    });
  }

  updateMarkersAndCluster(results) {
    this.resultMarkerLayer.clearLayers();
    this.markers = {};
    const clusterer = new L.MarkerClusterGroup({
      iconCreateFunction: (cluster) => {
        //const childCount = cluster.getChildCount();
        let childCount = 0;
        cluster.getAllChildMarkers().forEach(marker => {
          childCount += parseInt(marker.options.manuscriptCount);
        });
        let c = ' marker-cluster-';
        if (childCount < 10) {
          c += 'small';
        } else if (childCount < 100) {
          c += 'medium';
        } else {
          c += 'large';
        }
        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
      }
    });
    results.forEach(value => {
      const marker = this.createMarker(value);
      this.markers[value.id] = marker;
      marker == null ? null : clusterer.addLayer(marker);
    });
    clusterer.addTo(this.resultMarkerLayer);
  }

  createMarker(result) {
    // const color = typeof result.markerColor === 'undefined' ? 'grey' : result.markerColor;
    //const icon = new ColorIcon({iconUrl: 'img/markers/marker-icon-' + color + '.png'});
    if (!has(result, 'lat') || !has(result, 'long')) {
      return null;
    } else {
      const { lat, long } = result;
      const latLng = [+lat, +long];
      // https://github.com/coryasilva/Leaflet.ExtraMarkers
      const icon = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: result.manuscriptCount,
        markerColor: 'red',
        shape: 'circle',
        prefix: 'fa'
      });

      const marker = L.marker(latLng, {
        icon: icon,
        manuscriptCount: result.manuscriptCount ? result.manuscriptCount : null,
        id: result.id
      })
        .on('click', this.markerOnClick);
      return marker;
    }
  }

  markerOnClick = event => {
    this.props.fetchPlace(event.target.options.id);
  };

  createPopUpContent(result) {
    let popUpTemplate = `<h3><a target="_blank" rel="noopener noreferrer" href=${result.dataProviderUrl}>${result.prefLabel}</a></p></h3>`;
    if (has(result, 'sameAs')) {
      popUpTemplate += `<p>Place authority: <a target="_blank" rel="noopener noreferrer" href=${result.sameAs}>${result.sameAs}</a></p>`;
    }
    popUpTemplate += `<p>Manuscripts produced here:</p>`;
    popUpTemplate += this.createManscriptListing(result.manuscript);
    return popUpTemplate;
  }

  createManscriptListing(manuscripts) {
    let html = '';
    if (Array.isArray(manuscripts)) {
      manuscripts = orderBy(manuscripts, 'id');
      html += '<ul>';
      manuscripts.forEach(ms => {
        html += '<li><a target="_blank" rel="noopener noreferrer" href=' + ms.dataProviderUrl + '>' + ms.dataProviderUrl + '</a></li>';
      });
      html += '</ul>';
    } else {
      html += '<p><a target="_blank" rel="noopener noreferrer" href=' + manuscripts.dataProviderUrl + '>' + manuscripts.dataProviderUrl + '</a></p>';
    }
    return html;
  }

  createOpacitySlider() {
    L.Control.OpacitySlider = L.Control.extend({
      onAdd: function() {
        const slider = L.DomUtil.create('input', 'opacity-slider');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.value = 100;
        return slider;
      },
    });

    L.control.opacitySlider = function(opts) {
      return new L.Control.OpacitySlider(opts);
    };

    L.control.opacitySlider({ position: 'bottomleft' }).addTo(this.leafletMap);
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.props.classes.leafletContainer}>
          {/*<LeafletSidebar />*/}
          <div id="map" style={style} />
        </div>
        {this.renderSpinner()}
      </React.Fragment>
    );
  }
}

LeafletMap.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchPlaces: PropTypes.func.isRequired,
  fetchingPlaces: PropTypes.bool.isRequired,
  fetchPlace: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  mapMode: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  place: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeafletMap);
