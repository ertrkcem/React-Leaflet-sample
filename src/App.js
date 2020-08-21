import React, { Component, useRef, useEffect, createRef } from 'react';
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
// import GeoRasterLayer from 'georaster-layer-for-leaflet';
// import parseGeoraster from 'georaster';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const { BaseLayer, Overlay } = LayersControl;

const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
    position: fixed;
    left: 50%;
    top: 50%;
    z-Index: 1000;`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [37, 39],
      zoom: 8,
      loading: false,
    }
    this.mapRef = createRef();
  }


  componentDidMount() {
    var map = this.mapRef.current.leafletElement;
    console.log('map: ', map);

    // var TCI_T37SEB = L.tileLayer.wms("http://104.248.39.254:8080/geoserver/cite/wms", {
    //   	layers: 'cite:TCI_T37SEB',
    //   	format: 'image/png',
    //   	version: '1.1.1',
    //   	transparent: true,
    //   	tiled: true,
    //     attribution: '&copy; Myself',
    //     zIndex: 5
    // });

    var TCI_T37SEB = L.tileLayer.wms("http://104.248.39.254:8080/geoserver/cite/wms", {
      	layers: 'cite:TCI_T37SEB',
      	format: 'image/png',
      	version: '1.1.1',
      	transparent: true,
      	tiled: true,
        attribution: '&copy; Myself',
        zIndex: 5
    }).on('loading', () => {
      console.log('TCI_T37SEB loading');
      this.setState({ loading: true });
    }).on('load', () => {
      console.log('TCI_T37SEB load finished');
      this.setState({ loading: false });
    });

    var TCI_T38SKG = L.tileLayer.wms("http://104.248.39.254:8080/geoserver/cite/wms", {
      	layers: 'cite:TCI_T38SKG',
      	format: 'image/png',
      	version: '1.1.1',
      	transparent: true,
      	tiled: true,
        attribution: '&copy; Myself',
        zIndex: 5
    }).on('loading', () => {
      console.log("TCI_T38SKG loading");
      this.setState({ loading: true });
    }).on('load', () => {
      console.log('TCI_T38SKG load finished');
      this.setState({ loading: false });
    });

    var overlays = {
      TCI_T38SKG: TCI_T38SKG,
      TCI_T37SEB: TCI_T37SEB
    };

    L.control.layers(null, overlays).addTo(map);
  }

  render() {
    return (
      <div id="map">
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            size={35}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        <Map center={this.state.position} zoom={this.state.zoom} ref={this.mapRef}>
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
  }
}
