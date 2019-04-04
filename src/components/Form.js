import React from "react";
import ICONS from "../graphics/icons";
import Icon from "../graphics/icon";
import ReactTooltip from "react-tooltip";
import { imageUrl } from "../helpers";
import ReactGA from "react-ga";

class Form extends React.Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderOrder = e => {
    const product = this.props.products[e];
    const back = imageUrl + "thumbs/" + product.id + "_sm.jpg";
    const tip = product.name[this.props.language];
    return (
      <div
        data-tip={tip}
        style={{ backgroundImage: `url(${back})` }}
        className="order-product"
        key={product.id}
      />
    );
  };
  onSubmit(e) {
    e.preventDefault();
    // this.validate(e);
    setTimeout(() => {
      if (!this.state.error) {
        this.props.closeModal();
        const order = Object.keys(this.props.order).map(
          e => this.props.products[e].name[this.props.language]
        );

        window.$crisp.push(["do", "chat:open"]);
        setTimeout(
          window.$crisp.push([
            "do",
            "message:send",
            [
              "text",
              `Hello ${this.state.name}. You have chosen following products`
            ]
          ]),
          100
        );
        setTimeout(
          window.$crisp.push([
            "do",
            "message:send",
            ["text", `"${JSON.stringify(order)}"`]
          ]),
          1500
        );
        setTimeout(
          window.$crisp.push([
            "do",
            "message:send",
            [
              "text",
              `We will contact you as soon as possible to discuss your requirements.`
            ]
          ]),
          3000
        );
        window.$crisp.push(["set", "user:email", [this.state.email]]);
        window.$crisp.push([
          "set",
          "user:nickname",
          [JSON.stringify(this.state.name)]
        ]);
        ReactGA.ga("send", "event", "click", "Form Sent", "Product Form");
      }
    }, 100);
  }

  render() {
    const order = Object.keys(this.props.order);

    return (
      <div className="wrapper contact">
        <div className="current-order">
          {order.map(e => this.renderOrder(e))}
        </div>
        <div onClick={this.props.closeModal}>
          <Icon icon={ICONS.CLOSE} className="icon icon-close" />
        </div>
        <form className="contact-form">
          <input
            id="name"
            name="name"
            value={this.state.name}
            placeholder="name"
            onChange={e => this.change(e)}
          />
          <input
            id="email"
            name="email"
            value={this.state.email}
            placeholder="email"
            onChange={e => this.change(e)}
          />
          <input
            id="phone"
            name="phone"
            value={this.state.phone}
            placeholder="phone"
            onChange={e => this.change(e)}
          />
          <button onClick={e => this.onSubmit(e)}>submit</button>
        </form>
        <ReactTooltip effect="solid" />
      </div>
    );
  }
}

export default Form;
