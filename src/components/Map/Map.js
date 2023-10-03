import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import EXIF from "exif-js";

import "./Map.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import L from "leaflet";

const Map = ({ items }) => {
  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  const mapInitValues = {
    position: [50.06226, 19.937065],
    zoom: 3,
    minZoom: 3,
    maxZoom: 18,
  };

  const convertDMSToDD = (parts) => {
    let dd =
      parseInt(parts[1]) +
      parseInt(parts[2]) / 60 +
      parseFloat(parts[3]) / 3600;
    if (parts[0] === "S" || parts[0] === "W") {
      dd *= -1;
    }
    return dd;
  };

  const getPosition = (file) => {
    let latitude, longitude;
    EXIF.getData(file, function () {
      const gpsLatitudeRef = EXIF.getTag(this, "GPSLatitudeRef");
      const gpsLatitude = EXIF.getTag(this, "GPSLatitude");
      const gpsLongitudeRef = EXIF.getTag(this, "GPSLongitudeRef");
      const gpsLongitude = EXIF.getTag(this, "GPSLongitude");
      latitude = convertDMSToDD([gpsLatitudeRef, ...gpsLatitude]);
      longitude = convertDMSToDD([gpsLongitudeRef, ...gpsLongitude]);
    });
    return [latitude, longitude];
  };

  const markers = items.map((item, index) => {
    const position = getPosition(item);
    return (
      <Marker key={index} position={position}>
        <Popup>
          <h4>{item.name}</h4>
          <p>{`${position[0]} ${position[1]}`}</p>
          <img
            src={URL.createObjectURL(item)}
            alt={item.name}
            className="img-preview"
          ></img>
        </Popup>
      </Marker>
    );
  });

  function MapFlyingEl() {
    const fitZoomMargin = 1.0005;
    const map = useMap();
    if (items.length > 0) {
      let itemsPositions = [];
      items.forEach((item) => {
        itemsPositions.push(getPosition(item));
      });
      const itemsLatitudes = itemsPositions.map((el) => el[0]);
      const itemsLongitudes = itemsPositions.map((el) => el[1]);
      const minLat = Math.min(...itemsLatitudes);
      const maxLat = Math.max(...itemsLatitudes);
      const minLng = Math.min(...itemsLongitudes);
      const maxLng = Math.max(...itemsLongitudes);
      map.flyToBounds(
        [
          [minLat / fitZoomMargin, minLng / fitZoomMargin],
          [maxLat * fitZoomMargin, maxLng * fitZoomMargin],
        ],
        {
          duration: 2,
        }
      );
    }
    return null;
  }

  return (
    <MapContainer
      center={mapInitValues.position}
      zoom={mapInitValues.zoom}
      minZoom={mapInitValues.minZoom}
      maxZoom={mapInitValues.maxZoom}
      style={{ width: "100wh", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {markers}
      <MapFlyingEl />
    </MapContainer>
  );
};

export default Map;
