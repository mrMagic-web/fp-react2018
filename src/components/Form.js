import React from 'react';
import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';
import ReactTooltip from 'react-tooltip'
import { imageUrl} from '../helpers';

class Form extends React.Component {
	
	state = {
		name: '',
		nameError: '',
		email: '',
		emailError: '',
		phone: '',
		phoneError: ''

	}
	validate = e => {
		let isErr = false;
		const errors = {};
		
		if(this.state.name.length < 5) {
			isErr = true;
			errors.nameError = "User short";
		}
		if (isErr) {
			this.setState({
				...this.state,
				...errors
			})
		}
	}
	change = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	renderOrder = e => {
		const product = this.props.products[e];
		const back = imageUrl + 'thumbs/' +product.id + '.jpg';
		const tip = product.name[this.props.language];
		return <div data-tip={tip} style={ {backgroundImage: `url(${back})` }} className="order-product" key={product.id} ></div>;
	}
	onSubmit(e) {
		e.preventDefault();
		const order = Object.keys(this.props.order).map( e => this.props.products[e].name[this.props.language]);

		window.$crisp.push(["do", "chat:open"]);
		setTimeout( window.$crisp.push(["do", "message:send", ['text', `Hello ${this.state.name}. You have chosen following products`]]), 100);
		setTimeout( window.$crisp.push(["do", "message:send", ['text', `"${JSON.stringify(order)}"`]]), 500);
		setTimeout( window.$crisp.push(["do", "message:send", ['text', `We will contact you as soon as possible to discuss your requirements.`]]), 1100);
		window.$crisp.push(["set", "user:email", [this.state.email]]);
		window.$crisp.push(["set", "user:nickname", [JSON.stringify(this.state.name)]]);		
	}

	render(){
		const order = Object.keys(this.props.order);

		return( 
			<div className="wrapper contact">	
				<div className="current-order">{order.map( e => this.renderOrder(e))}</div>
				<div onClick={this.props.closeModal}><Icon icon={ICONS.CLOSE} className="icon icon-close" /></div>
				<form className="contact-form">
					<span>{this.state.nameError}</span>					
					<input name="name" 
					value={this.state.name} 
					placeholder="name" 
					onChange={ e => this.change(e) } />
					<input name="email" 
				
					value={this.state.email} 
					placeholder="email" 
					onChange={ e => this.change(e) } />
					
					<input name="phone" 
					
					value={this.state.phone} 
					placeholder="phone" 
					onChange={ e => this.change(e) } />
					<button onClick={e => this.onSubmit(e)}>submit</button>
				</form>
				<ReactTooltip effect='solid'>
					
				</ReactTooltip>
			</div>
		)
	}
}

export default Form;