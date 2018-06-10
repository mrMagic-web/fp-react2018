import React from 'react';
import PropTypes from 'prop-types';
import ProductsList from '../reducers/new_products';
import pageElements from '../reducers/page_elements';
import { imageUrl, language } from '../helpers';
import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';

class ProductPage extends React.Component {
	constructor(){
		super();
		this.state = {
			products: ProductsList
		}
	}

	render(){
		const product = this.props.details;
		const white = product.color.white ? "white": "" ; 
		const gray = product.color.gray ? "gray": "" ;
		const imageGray = this.props.imageGray;
		return (
				<li className="expand container">
					<div onClick={this.props.closeProduct}><Icon icon={ICONS.CLOSE} className="icon-close" /></div>
					<div className="image">
						<img alt={product.name[language]} src={`${imageUrl}${product.id}${imageGray}.jpg`} />
					</div>
					<div className="description">
					<h4>{product.name[language]} <div className="colors"><span onClick={this.props.viewWhite} className={white}></span> <span onClick={this.props.viewGray} className={gray}></span></div></h4>
					
					<p>{product.description[language]}
					</p>
					<ul className="dimensions">
					{console.log(product.dimensions)}
					{ Object.keys(product.dimensions).map(key => 
							<li key={key}> <b>{ pageElements[key][language]}</b> <br/> <span>{product.dimensions[key]}</span> </li>) 
					}
					</ul>
					<div className="cart-buttons">
						<button className={this.props.productAdded} onClick={() => this.props.addToOrder(product.id)}>{pageElements.addToList[language]}</button>
						<button className={this.props.productRemoved} onClick={() => this.props.removeFromOrder(product.id)}>{pageElements.removeFromList[language]}</button>
					</div>
					</div>
				</li>

		)
	}
}

ProductPage.contextTypes = {
	router: PropTypes.object
}

export default ProductPage;