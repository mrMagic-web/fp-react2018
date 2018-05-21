import React from 'react';
import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';
import ReactTooltip from 'react-tooltip'
import { language, imageUrl} from '../helpers';
import axios from 'axios';

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
		const tip = product.id;
		return <div data-tip={tip} style={ {backgroundImage: `url(${back})` }} className="order-product" key={product.id}></div>;
	}
	onSubmit(e) {
		e.preventDefault();
		const err = this.validate();

		if(!err) {
			this.props.onSubmit(this.state);
			this.setState({ name: '', email: '', phone: ''});
		}
		const {name, email, phone} = this.setState

		// const form = await axios.post('/api/form', {
		// 	name,
		// 	email,
		// 	phone
		// })
		axios.post(`http://magiceportfolio.xon.pl/mailer.php`, { name: "Maciek", email: "maciejdrahusz@gmai.com", phone: "511322292" })
		    .then(res => {
		    	console.log(res);
		    	console.log(res.data);
		    })
	}

	render(){
		const order = Object.keys(this.props.order);
		return( 
			<div className="wrapper contact">	
				<div className="current-order">{order.map( e => this.renderOrder(e))}</div>
				<div onClick={this.props.closeModal}><Icon icon={ICONS.CLOSE} className="icon icon-close" /></div>
				<form className="contact-form" method="POST" action="mailer.php">
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