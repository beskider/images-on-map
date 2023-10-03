import { useState } from "react";

import "./App.css";

import EXIF from "exif-js";

import Map from "./components/Map/Map";
import Buttons from "./components/Buttons/Buttons";
import Items from "./components/Items/Items";

function App() {
  
  const [images, setImages] = useState([]);

  const onChange = (e) => {
    registerImages(e.target.files);
  };

  const registerImages = (files) => {
    Array.from(files).forEach((file) => {
      EXIF.getData(file, function () {
        const exifData = EXIF.pretty(this);
        if (exifData) {
          const gpsLatitudeRef = EXIF.getTag(this, "GPSLatitudeRef");
          const gpsLatitude = EXIF.getTag(this, "GPSLatitude");
          const gpsLongitudeRef = EXIF.getTag(this, "GPSLongitudeRef");
          const gpsLongitude = EXIF.getTag(this, "GPSLongitude");
          if (
            gpsLatitudeRef !== undefined &&
            gpsLatitude !== undefined &&
            gpsLongitudeRef !== undefined &&
            gpsLongitude !== undefined
          ) {
            console.log(
              `Plik ${file.name} posiada dane GPS: ${gpsLatitudeRef}${gpsLatitude} ${gpsLongitudeRef}${gpsLongitude}`
            );
            setImages((prevImages) => [...prevImages, file]);
          } else {
            console.log(
              `Plik ${file.name} nie posiada prawidłowych danych GPS`
            );
          }
        } else {
          console.log(`Brak danych EXIF w pliku ${file}`);
        }
      });
    });
  };

  return (
    <div className="splitscreen">
      <div className="leftpanel">
        <Map items={images} />
      </div>
      <div className="rightpanel">
        <h3>Images on map</h3>
        <Buttons onChange={onChange} />
        <Items items={images} />
      </div>
    </div>
  );
}

export default App;
