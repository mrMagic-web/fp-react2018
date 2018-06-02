import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import pageElements from '../reducers/page_elements';

class Order extends React.Component {
	constructor() {
		super(); // we can't use this until we call super()
		this.renderOrder = this.renderOrder.bind(this);
	}
	renderOrder(key) {
		const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
		return <li key={key}>{this.props.products[key].name[this.props.language]} {removeButton}</li>;
	}
	render(){
		const orderIds = Object.keys(this.props.order);
		if(orderIds.length === 0)  return <div></div> 
		return (
			<div>
				<div className="order-wrap">
					<h4>{pageElements.orderTitle[this.props.language]}</h4>
					{/* <br><small>{pageElements.yourProductsIntro[this.props.language]}</small> */}
					<CSSTransitionGroup className="order"component="ul" transitionName="order" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
						{orderIds.map(this.renderOrder)}
					</CSSTransitionGroup>
					<button className="order-button" onClick={() => this.props.contact() }>{pageElements.orderBtn[this.props.language]}</button>
				</div>
			</div>
		)
	}
}

Order.contextTypes = {
  router: PropTypes.object
}

export default Order;