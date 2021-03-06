import React, { Component } from 'react';
import PropTypes from 'prop-types';

class KMLMap extends Component {
    constructor(props) {
        super(props);

        this.key = 'AIzaSyCGMlQX40VC2WiDV3Zb0m5L5lvaALBiDzM';
        this.kml = 'https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/all6.kml';

        this.state = {
            googleMap: null
        };

        this.init = this.init.bind(this);
        this.getCircle = this.getCircle.bind(this);
        this.eqfeed_callback = this.eqfeed_callback.bind(this);
        this.loadJS = this.loadJS.bind(this);
        this.setupIdahoMap = this.setupIdahoMap(this);
    }

    getGEOCoding(url) {
        // https://maps.googleapis.com/maps/api/geocode/json?address=oregon&key=AIzaSyCGMlQX40VC2WiDV3Zb0m5L5lvaALBiDzM
    }

    componentDidMount = () => {
        window.mapsInit = this.init;
        window.eqfeed_callback = this.eqfeed_callback;
        this.loadJS(`https://maps.googleapis.com/maps/api/js?key=${this.key}&callback=mapsInit`);
    }

    loadJS(src) {
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        this.mapContainer.appendChild(script);
    }

    setupIdahoMap() {
        //Data grabbed using Google maps GEOCoding: https://maps.googleapis.com/maps/api/geocode/json?address=idaho&key=AIzaSyCGMlQX40VC2WiDV3Zb0m5L5lvaALBiDzM
        // "northeast" : {
        //     "lat" : 49.0011461,
        //     "lng" : -111.043495
        //  },
        //  "southwest" : {
        //     "lat" : 41.9880051,
        //     "lng" : -117.243027
        //  }

    }

    init() {
        this.map = new window.google.maps.Map(this.map, {
            zoom: 2,
            center: {lat: -33.865427, lng: 151.196123},
            mapTypeId: 'terrain',
            styles: [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#242f3e"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#746855"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#242f3e"
                    }
                  ]
                },
                {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#d59563"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#d59563"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#263c3f"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#6b9a76"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#38414e"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#212a37"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9ca5b3"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#746855"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#1f2835"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#f3d19c"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#2f3948"
                    }
                  ]
                },
                {
                  "featureType": "transit.station",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#d59563"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#17263c"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#515c6d"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#17263c"
                    }
                  ]
                }
              ]
        });

        var ctaLayer = new google.maps.KmlLayer({
            url: this.kml,
            map: this.map
          });



        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        // script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        // document.getElementsByTagName('head')[0].appendChild(script);

        // this.map.data.setStyle((feature) => {
        //     var magnitude = feature.getProperty('mag');
        //     return {
        //         icon: this.getCircle(magnitude)
        //     };
        // });
    }

    getCircle(magnitude) {
        return {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: .2,
            scale: Math.pow(2, magnitude) / 2,
            strokeColor: 'white',
            strokeWeight: .5
        };
    }

    eqfeed_callback(results) {
        this.map.data.addGeoJson(results);
    }

    render() {
        return (
            <div ref={(container) => { this.mapContainer = container; }} style={{height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0}}>
                {this.state.googleMap}
                <div ref={(map) => { this.map = map; }} style={{height: '100vh', width: '100vw'}}>

                </div>
            </div>
        );
    }
}

export default KMLMap;