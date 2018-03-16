import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
	constructor() {
		super(); // we can't use this until we call super()
		this.renderOrder = this.renderOrder.bind(this);
		this.hideOrder = this.hideOrder.bind(this);
	}
	renderOrder(key) {
		const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
		return <li key={key}>{key} {removeButton}</li>;
	}
	hideOrder(){
		return <div>&nbsp;</div>
	}
	render(){
		const orderIds = Object.keys(this.props.order);
		if(orderIds.length === 0) {
			return <div>{this.hideOrder}</div>
		}
		return (
			<div>
				<div className="order-wrap" >
					<h4>Your order</h4>
					<CSSTransitionGroup 
					className="order"
					component="ul" 
					transitionName="order"
					transitionEnterTimeout={400}
					transitionLeaveTimeout={400}
					>
						{orderIds.map(this.renderOrder)}
					</CSSTransitionGroup>
				</div>
			</div>
		)
	}
}

export default Order;