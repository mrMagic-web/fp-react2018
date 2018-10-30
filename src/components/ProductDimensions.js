import React from "react";
import pageElements from "../reducers/page_elements";

const ProductDimensions = ({ versions, language }) => (
  <div className="size-selection">
    {versions.map(version => (
      <ul className="dimensions">
        <small>{version.size}</small>
        {Object.keys(version.dimensions).map(key => (
          <li key={key}>
            {version.size === "sm" ? (
              <b> {pageElements[key][language]} </b>
            ) : (
              ""
            )}
            <span>{version.dimensions[key]}</span>{" "}
          </li>
        ))}
      </ul>
    ))}
  </div>
);

export default ProductDimensions;
