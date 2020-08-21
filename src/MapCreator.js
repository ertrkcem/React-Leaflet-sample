import React, { Component } from 'react'
import L from 'leaflet'

export default class MapCreator extends Component {
  constructor() {
    super();
    this.state = {
      position: [36, 35],
      zoom: 5,
    }
  }

  componentDidMount() {
    const map = L.map('map');
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&amp;copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" }).addTo(map);

    const bounds = [[36, 35], [40, 37]];
    // const imageOverlay = L.imageOverlay("http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg", bounds).addTo(map); // this is running
    const imageOverlay = L.imageOverlay("TCI_20m_T33UVT_22.png", bounds).addTo(map);
    console.log('imageOverlay: ', imageOverlay);

    map.setView(this.state.position, this.state.zoom);
  }

  render() {
    return (
      <div id="map">

      </div>
    )
  }
}
