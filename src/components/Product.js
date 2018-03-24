import React from 'react';
import ReactDOM  from 'react-dom';
import { imageUrl, language } from '../helpers';
import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';

class Product extends React.Component {
	
	constructor(){
		super();
		this.viewGray = this.viewGray.bind(this);
		this.viewWhite = this.viewWhite.bind(this);
		this.openProduct = this.openProduct.bind(this);
		this.closeProduct = this.closeProduct.bind(this);
		this.state = {
			gray: false, 
			open: false
		}
	}
	viewGray() {
		this.setState({ gray: true});
	}
	viewWhite() {
		this.setState({ gray: false});
	}
	openProduct(){
		this.setState({ open: true});
		ReactDOM.findDOMNode(this).scrollIntoView({behavior: "smooth", block: "start"});
	}
	closeProduct(){ 
		this.setState({ open: false});	
	}
	render(){
		const details = this.props.details;
		const gray = details.color.gray ? "gray": "" ; 
		const white = details.color.white ? "white": "" ;
		const imageGray = this.state.gray ? "_gray": "";
		const productAdded = this.props.added[details.id] ? 'disabled' : '';
		const productRemoved = this.props.added[details.id] ? '' : 'disabled';

		if(this.state.open) {
			return (
				<li className="expand">
						<div onClick={this.closeProduct}><Icon icon={ICONS.CLOSE} className="icon-close" /></div>
						<div className="image">
							<img alt={details.name[language]} src={`${imageUrl}${details.id}${imageGray}.jpg`} />
						</div>
						<div className="description">
						<h4>{details.name[language]} <div className="colors"><span onClick={this.viewWhite} className={white}></span> <span onClick={this.viewGray} className={gray}></span></div></h4>
						
						<p>{details.description[language]}
						</p>
						<ul className="dimensions">
						{ Object.keys(details.dimensions)
								.map(key => <li key={key}> <b>{key}</b> <br/> <span>{details.dimensions[key]}</span> </li>) 
						}
						</ul>
						<div className="cartButtons">
							<button className={productAdded} onClick={() => this.props.addToOrder(details.id)}>Add to order</button>
							<button className={productRemoved} onClick={() => this.props.removeFromOrder(details.id)}>Remove from order</button>
						</div>
						</div>
				</li>
			)
		}

		return (
			<li className="product">
				<div className="clickable" onClick={this.openProduct}>
					<img alt={details.id} src={`${imageUrl}/thumbs/${details.id}${imageGray}.jpg`} />
					<h4 className="product-name">{details.name[language]}</h4>
				</div>
				<div className="colors"><span onClick={this.viewWhite} className={white}></span> <span onClick={this.viewGray} className={gray}></span></div>
				<div className='description'>
					<p>{details.description[language]}</p>
				</div>
				<div className="order-buttons" >
					<button onClick={() => this.props.addToOrder(details.id)} className={productAdded}>Add to order</button>
					{/*<button onClick={() => this.props.removeFromOrder(details.id)}>Remove from order</button>*/}
				</div>
			</li>
		)
	}

}

export default Product;