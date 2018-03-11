import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
	constructor() {
		super(); // we can't use this until we call super()
		this.renderOrder = this.renderOrder.bind(this);
	}
	renderOrder(key) {
		const prod = this.props.products.filter( (product) => product.id === key );
		const removeButton = <button onClick={() => this.props.removeFromOrder(prod[0].id)}>&times;</button>
		return <li key={key}>{prod[0].name['pl']} {removeButton}</li>;
	}
	render(){
		const orderIds = Object.keys(this.props.order);
		return (
			<div className="order-wrap">
				<h2>Your order</h2>
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
		)
	}
}

export default Order;