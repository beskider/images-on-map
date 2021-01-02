import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import EXIF from 'exif-js';

import "./Map.css";

const Map = ({items}) => {

  const mapInitValues = {
    position: [ 50.062260, 19.937065],    
    zoom: 15,
    minZoom: 5,
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
    
    let gpsLatitudeRef,
        gpsLatitude,
        gpsLongitudeRef,
        gpsLongitude;

    EXIF.getData(file, function() {
      gpsLatitudeRef = EXIF.getTag(this, "GPSLatitudeRef");
      gpsLatitude = EXIF.getTag(this, "GPSLatitude");
      gpsLongitudeRef = EXIF.getTag(this, "GPSLongitudeRef");
      gpsLongitude = EXIF.getTag(this, "GPSLongitude");                  
    });
        
    let latitude = convertDMSToDD( [ gpsLatitudeRef, ...gpsLatitude ] );
    let longitude = convertDMSToDD( [ gpsLongitudeRef, ...gpsLongitude ] );

    return ([ latitude, longitude ]);

  }

  const markers = items.map((item, index) => {      
    return (
      <Marker key={index} position={getPosition(item)}>
        <Popup>
        <h4>{item.name}</h4>
        <img src={URL.createObjectURL(item)} alt={item.name}></img>
        </Popup>
      </Marker>
    )
  });
  
  return (
    <MapContainer 
        center={mapInitValues.position} 
        zoom={mapInitValues.zoom} 
        minZoom={mapInitValues.minZoom} maxZoom={mapInitValues.maxZoom} 
        style={{ width: '100wh', height: '100vh' }} 
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />
      {markers}
    </MapContainer>
  );
};

export default Map;
