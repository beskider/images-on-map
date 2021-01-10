import EXIF from 'exif-js';

const getGPSfromFile = (file) => {

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

    return {
      gpsLatitudeRef: gpsLatitudeRef,
      gpsLatitude: gpsLatitude,
      gpsLongitudeRef: gpsLongitudeRef,
      gpsLongitude: gpsLongitude
    }

  }