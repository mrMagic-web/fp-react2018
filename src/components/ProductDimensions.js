import React from "react";
import pageElements from "../reducers/page_elements";

const ProductDimensions = ({ version, language }) => (
  <div className="productDimensions">
    <ul className="dimensions">
      {Object.keys(version.dimensions).map(key => (
        <li key={key}>
          <b>{pageElements[key][language]}</b>
          <span>{version.dimensions[key]}</span>{" "}
        </li>
      ))}
    </ul>
  </div>
);

export default ProductDimensions;
