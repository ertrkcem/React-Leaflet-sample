import React, { Component, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
import {
  ImageOverlay,
  LayersControl,
  TileLayer,
  WMSTileLayer,
  MapLayer,
  Map
} from 'react-leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import parseGeoraster from 'georaster';

const { BaseLayer, Overlay } = LayersControl;

function App() {

  const position = [37, 39];
  const zoom = 8;
  const mapRef = useRef();
  const wmsOptions = {
    layers: 'agcurate:JPEG-sample',
    format: 'image/png',
    version: '1.1.1',
    transparent: true,
    tiled: true,
    attribution: '&copy; Myself',
    zIndex: 3
  };

  useEffect(() => {
    const map = mapRef.current.leafletElement;
    console.log('map: ', map);

    // const bounds = [[36, 35], [40, 37]];
    // const imageOverlay = L.imageOverlay("http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg", bounds).addTo(map);
    // console.log('imageOverlay: ', imageOverlay);

    var TCI_T37SEB = L.tileLayer.wms("http://104.248.39.254:8080/geoserver/cite/wms", {
      	layers: 'cite:TCI_T37SEB',
      	format: 'image/png',
      	version: '1.1.1',
      	transparent: true,
      	tiled: true,
        attribution: '&copy; Myself',
        zIndex: 3
    });

    var TCI_T38SKG = L.tileLayer.wms("http://104.248.39.254:8080/geoserver/cite/wms", {
      	layers: 'cite:TCI_T38SKG',
      	format: 'image/png',
      	version: '1.1.1',
      	transparent: true,
      	tiled: true,
        attribution: '&copy; Myself',
        zIndex: 3
    });

    var overlays = {
      TCI_T38SKG: TCI_T38SKG,
      TCI_T37SEB: TCI_T37SEB
    };

    L.control.layers(null, overlays).addTo(map);


    // setTimeout(() => {
    //   map.removeLayer(layer);
    // },10000)

    // var url_to_geotiff_file = "http://0.0.0.0:8000/sample.tif";
    // console.log("dehe");
    // parseGeoraster(url_to_geotiff_file).then(georaster => {
    //   console.log("georaster:", georaster);

    //   var layer = new GeoRasterLayer({
    //       attribution: "Planet",
    //       georaster: georaster,
    //       resolution: 128,
    //       zIndex: 5
    //   });
    //   layer.addTo(map);
    //   console.log("bounds: ", layer.getBounds());
    //   map.fitBounds(layer.getBounds());
    // });



  });

  // componentDidMount() {
  //   this.map = this.refs.map;
  //   const mapLeafletElement = this.map.leafletElement;
  //   mapLeafletElement.flyTo([36, 35], 8);
  //   console.log('Map Layer: ', MapLayer);
  //   // const map = L.map('map');
  //   console.log('map: ', this.map);
  //   // const bounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
  //   // L.imageOverlay('TCI_20m_T33UVT_2.png', bounds).addTo(this.map);
  // }

  // render() {
    return (
      <div id="map">
        <Map center={position} zoom={zoom} ref={mapRef}>
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap.Mapnik">
              <TileLayer
                attribution="&amp;copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            <BaseLayer name="OpenStreetMap.BlackAndWhite">
              <TileLayer
                  attribution="&amp;copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            {/* <Overlay name="picture">
              <ImageOverlay name="deneme" url="http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg" bounds={[[36, 35], [40, 37]]}/>
            </Overlay> */}
            {/* <Overlay>
              <WMSTileLayer url="http://localhost:8080/geoserver/agcurate/wms" options={wmsOptions} />
            </Overlay> */}
          </LayersControl>

        </Map>
      </div>
    );
  // }
}

export default App;
