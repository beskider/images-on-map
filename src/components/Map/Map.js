import React from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import EXIF from 'exif-js';

import "./Map.css";
import "../utils";


const Map = ({items}) => {
  
  const mapInitValues = {
    position: [ 50.062260, 19.937065],    
    zoom: 3,
    minZoom: 3,
    maxZoom: 18   
  }     

  const convertDMSToDD = (parts) => {
    let dd = parseInt(parts[1]) + parseInt(parts[2])/60 + parseFloat(parts[3])/3600;
     if (parts[0] === "S" || parts[0] === "W") {
      dd *= -1 
    }        
    return dd;
  }

  const getPosition = (file) => {

    const position = getGPSfromFile(file);

    let latitude = convertDMSToDD( [ position.gpsLatitudeRef, ...position.gpsLatitude ] );
    let longitude = convertDMSToDD( [ position.gpsLongitudeRef, ...position.gpsLongitude ] );

    return ([ latitude, longitude ]);

  }

  const markers = items.map((item, index) => {      
    return (
      <Marker key={index} position={getPosition(item)}>
        <Popup>
        <h4>{item.name}</h4>
        <p>{getPosition(item)}</p>
        <img src={URL.createObjectURL(item)} alt={item.name} className="img-preview"></img>
        </Popup>
      </Marker>
    )
  });

  function MapFlyingEl() {
    const map = useMap();    
    if (items.length!==0) {
      const position = getPosition(items[0]);
      map.flyTo(position, 14, {
        duration: 2
      });
    }
    return null;
  }

  return (
    <MapContainer        
        center={mapInitValues.position} 
        zoom={mapInitValues.zoom} 
        minZoom={mapInitValues.minZoom} maxZoom={mapInitValues.maxZoom} 
        style={{ width: '100wh', height: '100vh' }} >
      <TileLayer 
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />
      {markers}
    <MapFlyingEl />
    </MapContainer>
  );
  
};

export default Map;
