import React from "react";
import PropTypes from "prop-types";
import ProductsList from "../reducers/new_products";
import pageElements from "../reducers/page_elements";
import { imageUrl } from "../helpers";
import ICONS from "../graphics/icons";
import Icon from "../graphics/icon";
import ProductDimensions from "./ProductDimensions";

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: ProductsList
    };
  }

  render() {
    const product = this.props.details;
    const imageGray = this.props.gray ? "_gray" : "";
    const white = product.color.white ? "white" : "";
    const gray = product.color.gray ? "gray" : "";
    const language = this.props.language;
    return (
      <li
        className={`expand container ${this.props.param ? "top-product" : ""}`}
      >
        <div onClick={this.props.closeProduct}>
          <Icon icon={ICONS.CLOSE} className="icon-close" />
        </div>
        <div className="image">
          <img
            alt={product.name[language]}
            src={`${imageUrl}${product.id}${imageGray}.jpg`}
          />
        </div>
        <div className="description">
          <h4>
            {product.name[language]}{" "}
            <div className="colors">
              <span onClick={this.props.viewWhite} className={white} />{" "}
              <span onClick={this.props.viewGray} className={gray} />
            </div>
          </h4>
          <p>{product.description[language]}</p>
          <ul className="size-selection">
            {product.versions
              .filter(version => version.size === "sm")
              .map(version => (
                <ProductDimensions version={version} language={language} />
              ))}
          </ul>
          <div className="cart-buttons">
            <button
              className={this.props.productAdded}
              onClick={() => this.props.addToOrder(product.id)}
            >
              {pageElements.addToList[language]}
            </button>
            <button
              className={this.props.productRemoved}
              onClick={() => this.props.removeFromOrder(product.id)}
            >
              {pageElements.removeFromList[language]}
            </button>
          </div>
        </div>
      </li>
    );
  }
}

ProductPage.contextTypes = {
  router: PropTypes.object
};

export default ProductPage;
