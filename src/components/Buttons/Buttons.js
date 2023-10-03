import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faImages } from "@fortawesome/free-solid-svg-icons";

import "./Buttons.css";

const Buttons = (props) => {
  return (
    <>
      <div className="buttons">
        <div className="button">
          <label htmlFor="single">
            <FontAwesomeIcon
              icon={faFileImage}
              color="#068920"
              size="3x"
              title="Otwórz plik"
            />
          </label>
          <input
            type="file"
            id="single"
            accept=".jpg, .jpeg, .png, .tif, .tiff, .heif, .heic"
            onChange={props.onChange}
          />
        </div>
        <div className="button">
          <label htmlFor="multi">
            <FontAwesomeIcon
              icon={faImages}
              color="#068920"
              size="3x"
              title="Otwórz więcej plików"
            />
          </label>
          <input
            type="file"
            id="multi"
            accept=".jpg, .jpeg, .png, .tif, .tiff, .heif, .heic"
            onChange={props.onChange}
            multiple
          />
        </div>
      </div>
    </>
  );
};

export default Buttons;
