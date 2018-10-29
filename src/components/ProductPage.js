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
      products: ProductsList,
      gray: false,
      selected: "sm"
    };

    this.viewGray = this.viewGray.bind(this);
    this.viewWhite = this.viewWhite.bind(this);
  }
  viewGray() {
    this.setState({ gray: true });
  }
  viewWhite() {
    this.setState({ gray: false });
  }
  render() {
    const { language, details } = this.props;
    const white = details.color.white ? "white" : "";
    const gray = details.color.gray ? "gray" : "";
    const imageVersion = this.props.versions ? "_sm" : "";
    const imageGray = this.state.gray ? "_gray" : "";
    return (
      <li
        className={`expand container ${this.props.param ? "top-product" : ""}`}
      >
        <div onClick={this.props.closeProduct}>
          <Icon icon={ICONS.CLOSE} className="icon-close" />
        </div>
        <div className="image">
          <img
            alt={details.name[language]}
            src={`${imageUrl}${details.id}${imageVersion}${imageGray}.jpg`}
          />
        </div>
        <div className="description">
          <h4>
            {details.name[language]}{" "}
            <div className="colors">
              <span onClick={this.viewWhite} className={white} />{" "}
              <span onClick={this.viewGray} className={gray} />
            </div>
          </h4>
          <p>{details.description[language]}</p>
          <ul className="size-selection">
            {details.versions
              .filter(version => version.size === "sm")
              .map(version => (
                <ProductDimensions
                  key={version}
                  version={version}
                  language={language}
                />
              ))}
          </ul>
          <div className="cart-buttons">
            <button
              className={this.props.productAdded}
              onClick={() => this.props.addToOrder(details.id)}
            >
              {pageElements.addToList[language]}
            </button>
            <button
              className={this.props.productRemoved}
              onClick={() => this.props.removeFromOrder(details.id)}
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
