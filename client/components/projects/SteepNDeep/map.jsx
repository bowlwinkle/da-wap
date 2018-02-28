import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
// import StateOverlay from './StateOverlay';

// Possible free kmls: https://www.huntinfool.com/maps/googlemaps.php
//https://www.toprut.com/news/2016/07/05/google-earth-unit-maps/
//http://diyhuntingmaps.com/p/google-earth-hunting-file-downloads.html; these are questionable
//Idaho specific: https://idfg.idaho.gov/ifwis/huntplanner/mapindex.aspx
// UNIT_INDEX_CONFIG = {
//     national: {
//         "kml"           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/all6.kml",
//         "lat"           : "40.680375588203944",
//         "lng"           : "-112.6739765625"
//     },
//     states: {
//         "arizona"       : {
//             "id"        : "56",
//             "lat"       : "34.2748",
//             "lng"       : "-111.901",
//             "state_kml" : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/individual/arizona.kml",
//             "one_map"   : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//             "kml"       : {
//                 "mule-deer"                     : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//                 "coues-deer"                    : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//                 "elk"                           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//                 "antelope"                      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//                 "rocky-mountain-bighorn-sheep"  : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//                 "desert-bighorn-sheep"          : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//                 "bison"                         : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//                 "bear"							: "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/arizona/all.kml",
//             }
//         },
//         "colorado"      : {
//             "id"        : "57",
//             "lat"       : "39.2387",
//             "lng"       : "-105.747",
//             "state_kml" : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/individual/colorado.kml",
//             "kml"       : {
//                 "mule-deer"                     : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/big-game/all.kml",
//                 "whitetail-deer"                : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/big-game/all.kml",
//                 "elk"                           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/big-game/all.kml",
//                 "antelope"                      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/big-game/all.kml",
//                 "moose"                         : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/big-game/all.kml",
//                 "rocky-mountain-bighorn-sheep"  : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/bighorn/all.kml",
//                 "rocky-mountain-goat"           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/goat/all.kml",
//                 "bear"							: "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/colorado/big-game/all.kml",
//             }
//         },
//         "nevada"        : {
//             "id"        : "58",
//             "lat"       : "39.4503",
//             "lng"       : "-117.053",
//             "state_kml" : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/individual/nevada.kml",
//             "one_map"   : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//             "kml"       : {
//                 "mule-deer"                     : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//                 "elk"                           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//                 "antelope"                      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//                 "rocky-mountain-bighorn-sheep"  : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//                 "california-bighorn-sheep"      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//                 "desert-bighorn-sheep"          : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//                 "rocky-mountain-goat"           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//                 "bear"							: "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/nevada/all.kml",
//             }
//         },
//         "new-mexico"    : {
//             "id"        : "55",
//             "lat"       : "34.4562",
//             "lng"       : "-106.364",
//             "state_kml" : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/individual/new-mexico.kml",
//             "one_map"   : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//             "kml"       : {
//                 "mule-deer"                     : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "coues-deer"                    : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "whitetail-deer"                : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "elk"                           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "antelope"                      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "rocky-mountain-bighorn-sheep"  : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "california-bighorn-sheep"      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "desert-bighorn-sheep"          : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "rocky-mountain-goat"           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "barbary-sheep"                 : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//                 "bear"			                : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/new-mexico/all.kml",
//             }
//         },
//         "oregon"       : {
//             "id"        : "24638",
//             "lat"       : "43.79538",
//             "lng"       : "-120.2979",
//             "state_kml" : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/individual/oregon.kml",
//             "one_map"   : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//             "kml"       : {
//                 "mule-deer"                     : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "columbian-blacktail-deer"      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "whitetail-deer"				: "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "columbian-whitetail-deer"      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "rocky-mountain-elk"            : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "roosevelt-elk"                 : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "antelope"                      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "rocky-mountain-bighorn-sheep"  : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "california-bighorn-sheep"      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "rocky-mountain-goat"           : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//                 "bear"				            : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/oregon/all.kml",
//             }
//         },
//         "utah"          : {
//             "id"        : "54",
//             "lat"       : "39.7606",
//             "lng"       : "-111.744",
//             "state_kml" : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/states/individual/utah.kml",
//             "kml"       : {
//                 "bison"                         : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/bison/all.kml",
//                 "deer"                          : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/deer/all.kml",
//                 "deer-extended-archery"         : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/deer-extended-archery/all.kml",
//                 "deer-limited-entry"            : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/deer-le/all.kml",
//                 "desert-bighorn-sheep"          : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/desert-bighorn/all.kml",
//                 "elk-over-the-counter"          : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/elk-general/all.kml",
//                 "elk-extended-archery"          : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/elk-extended-archery/all.kml",
//                 "elk-limited-entry"             : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/elk-le/all.kml",
//                 "moose"                         : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/moose/all.kml",
//                 "antelope"                      : "https://gohunt-assets-us-west-2.s3.amazonaws.com/map/kml/utah/pronghorn/all.kml",
//                 "rocky-mountain-bighorn-sheep"  : "https://gohunt-assets-us-wes…

const Idaho = () => (
    <div/>
);

class Map extends Component {
    constructor(props) {
        super(props);

        this.key = 'AIzaSyCGMlQX40VC2WiDV3Zb0m5L5lvaALBiDzM';

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
        const key = 'AIzaSyCGMlQX40VC2WiDV3Zb0m5L5lvaALBiDzM';
        window.mapsInit = this.init;
        window.eqfeed_callback = this.eqfeed_callback;
        this.loadJS(`https://maps.googleapis.com/maps/api/js?key=${key}&callback=mapsInit`);
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
        let overlay;
        StateOverlay.prototype = new window.google.maps.OverlayView();

/** @constructor */
function StateOverlay(bounds, image, map) {

    // Now initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay
    this.setMap(map);
  }

  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  StateOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.border = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayImage" pane.
    var panes = this.getPanes();
    panes.overlayImage.appendChild(this.div_);
  };

  StateOverlay.prototype.draw = function() {

    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  };

  StateOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
  };

  // Set the visibility to 'hidden' or 'visible'.
  StateOverlay.prototype.hide = function() {
    if (this.div_) {
      // The visibility property must be a string enclosed in quotes.
      this.div_.style.visibility = 'hidden';
    }
  };

  StateOverlay.prototype.show = function() {
    if (this.div_) {
      this.div_.style.visibility = 'visible';
    }
  };

  StateOverlay.prototype.toggle = function() {
    if (this.div_) {
      if (this.div_.style.visibility === 'hidden') {
        this.show();
      } else {
        this.hide();
      }
    }
  };

  // Detach the map from the DOM via toggleDOM().
  // Note that if we later reattach the map, it will be visible again,
  // because the containing <div> is recreated in the overlay's onAdd() method.
  StateOverlay.prototype.toggleDOM = function() {
    if (this.getMap()) {
      // Note: setMap(null) calls OverlayView.onRemove()
      this.setMap(null);
    } else {
      this.setMap(this.map_);
    }
  };

        this.map = new window.google.maps.Map(this.map, {
            zoom: 2,
            center: {lat: -33.865427, lng: 151.196123},
            mapTypeId: 'terrain'
        });

        var bounds = new window.google.maps.LatLngBounds(
            new google.maps.LatLng(41.9880051, -117.243027), //SW first
            new google.maps.LatLng(49.0011461, -111.043495)); //NE second

        var srcImage = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Idaho_Wildlife_Management_Units.svg';

        overlay = new StateOverlay(bounds, srcImage, this.map);



        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        this.map.data.setStyle((feature) => {
            var magnitude = feature.getProperty('mag');
            return {
                icon: this.getCircle(magnitude)
            };
        });
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
            <div ref={(container) => { this.mapContainer = container; }} style={{height: '100vh', width: '100vw'}}>
                {this.state.googleMap}
                <div ref={(map) => { this.map = map; }} style={{height: '100vh', width: '100vw'}}>

                </div>
            </div>
        );
    }
}

Map.propTypes = {

};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  constructor(props) {
      super(props);
      this.key = 'AIzaSyCGMlQX40VC2WiDV3Zb0m5L5lvaALBiDzM';
  }

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: this.key }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}

export default Map;