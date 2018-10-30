import React from "react";
import { productColors } from "../reducers/page_elements";

const ColorPicker = ({ language, white, gray, viewWhite, viewGray }) => (
  <div className="product-colors">
    <h4>{productColors[language]}</h4>
    <div className="colors">
      <span onClick={viewWhite} className={white} />{" "}
      <span onClick={viewGray} className={gray} />
    </div>
  </div>
);

export default ColorPicker;
