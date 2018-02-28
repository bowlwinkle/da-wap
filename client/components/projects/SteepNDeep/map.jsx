import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Idaho = () => (
    <div/>
);

const MapInclude = ({init}) => <script async defer
                            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDxVMsRSQGB4OBU586Lj5xx4Tkhgi6T2mU&callback=${init}`}>
                        </script>

class Map extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.getCircle = this.getCircle.bind(this);
        this.eqfeed_callback = this.eqfeed_callback.bind(this);
    }

    init() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: {lat: -33.865427, lng: 151.196123},
            mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        this.map.data.setStyle(function(feature) {
            var magnitude = feature.getProperty('mag');
            return {
                icon: getCircle(magnitude)
            };
        });
    }

    getCircle(magnitude) {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: .2,
            scale: Math.pow(2, magnitude) / 2,
            strokeColor: 'white',
            strokeWeight: .5
        };
    }

    eqfeed_callback(results) {
        map.data.addGeoJson(results);
    }

    render() {
        return (
            <div>
                <MapInclude init={this.init}/>
                <div id='map'>

                </div>
            </div>
        );
    }
}

Map.propTypes = {

};

export default Map;