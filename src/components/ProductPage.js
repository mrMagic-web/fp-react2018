import React from "react";
import PropTypes from "prop-types";
import ProductsList from "../reducers/new_products";
import pageElements from "../reducers/page_elements";
import { imageUrl } from "../helpers";
import ICONS from "../graphics/icons";
import Icon from "../graphics/icon";
import ProductDimensions from "./ProductDimensions";
import ColorPicker from "./ColorPicker";

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
    this.changeSelectedSize = this.changeSelectedSize.bind(this);
  }
  viewGray() {
    this.setState({ gray: true });
  }
  viewWhite() {
    this.setState({ gray: false });
  }
  changeSelectedSize(size) {
    this.setState({ selected: size });
  }
  render() {
    const { language, details } = this.props;
    const white = details.color.white ? "white" : "";
    const gray = details.color.gray ? "gray" : "";
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
            src={`${imageUrl}${details.id}_${
              this.state.selected
            }${imageGray}.jpg`}
          />
        </div>
        <div className="description">
          <h4>{details.name[language]} </h4>
          <p>{details.description[language]}</p>
          <div className="product-specs">
            <ProductDimensions
              versions={details.versions}
              language={language}
              changeSelectedSize={this.changeSelectedSize}
            />
            <ColorPicker
              language={language}
              viewWhite={this.viewWhite}
              viewGray={this.viewGray}
              white={white}
              gray={gray}
            />
          </div>
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
