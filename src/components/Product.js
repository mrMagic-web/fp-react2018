import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { moreInfo, addToList } from "../reducers/page_elements";
import { imageUrl } from "../helpers";
import ProductPage from "./ProductPage";

class Product extends React.Component {
  constructor() {
    super();
    this.openProduct = this.openProduct.bind(this);
    this.closeProduct = this.closeProduct.bind(this);
    this.baseState = this.state;
  }
  state = {
    open: false
  };
  componentDidMount() {
    this.setState({ open: this.props.param === this.props.details.id });
  }

  openProduct() {
    this.setState(this.baseState);
    this.setState({ open: true });
    ReactDOM.findDOMNode(this).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
  closeProduct() {
    this.setState({ open: false });
    if (this.props.param === this.props.details.id) {
      this.props.transitionOnClose();
    }
  }
  render() {
    const details = this.props.details;
    const gray = details.color.gray ? "gray" : "";
    const white = details.color.white ? "white" : "";
    const productAdded = this.props.added[details.id] ? "disabled" : "";
    const productRemoved = this.props.added[details.id] ? "" : "disabled";
    const language = this.props.language;
    const versions = details.versions.length > 1;

    if (this.state.open) {
      return (
        <ProductPage
          details={this.props.details}
          closeProduct={this.closeProduct}
          language={this.props.language}
          addToOrder={this.props.addToOrder}
          removeFromOrder={this.props.removeFromOrder}
          gray={gray}
          param={this.props.param}
          productAdded={productAdded}
          productRemoved={productRemoved}
          versions={versions}
        />
      );
    }

    return (
      <li className="product">
        {console.log(this.props, this.state)}
        <div className="product-hover">
          <button onClick={this.openProduct}>{moreInfo[language]}</button>
          <button
            className={"hide-mobile " + productAdded}
            onClick={() => this.props.addToOrder(details.id)}
          >
            {addToList[language]}
          </button>
        </div>
        <div className="clickable">
          <img
            alt={details.id}
            src={`${imageUrl}/thumbs/${details.id}${versions ? "_sm" : ""}.jpg`}
          />
          <h4 className="product-name">{details.name[language]}</h4>
          <div className="colors">
            <span className={white} /> <span className={gray} />
          </div>
        </div>
      </li>
    );
  }
}

ProductPage.contextTypes = {
  router: PropTypes.object
};

export default Product;
