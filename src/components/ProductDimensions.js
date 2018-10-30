import React from "react";
import pageElements from "../reducers/page_elements";

const ProductDimensions = ({ versions, language, changeSelectedSize }) => (
  <div className="size-selection">
    {versions.map(version => (
      <div key={version.size}>
        <div className="sizings">
          {Object.keys(version.dimensions).map(
            key =>
              version.size === "sm" ? (
                <span key={key}> {pageElements[key][language]} </span>
              ) : (
                ""
              )
          )}
        </div>
        <ul
          className="dimensions"
          onClick={() => changeSelectedSize(version.size)}
        >
          <small>{version.size}</small>
          {Object.keys(version.dimensions).map(key => (
            <li key={key}>
              <span>{version.dimensions[key]}</span>{" "}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default ProductDimensions;
