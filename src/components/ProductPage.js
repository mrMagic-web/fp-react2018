import React from 'react';
import ProductsList from '../reducers/new_products';
import { imageUrl, language } from '../helpers';

class ProductPage extends React.Component {
	constructor(){
		super();
		this.backHome = this.backHome.bind(this);
		this.state = {
			products: ProductsList
		}
	}

	backHome(){
		this.context.router.transitionTo(`/`);
	}
	render(){
		const product = this.state.products[this.props.params.productId];
		const gray = product.color.white ? "white": "" ; 
		const white = product.color.gray ? "gray": "" ;
		return (
			<aside>

				<h4>{product.name[language]}</h4>
				<img alt={product.name[language]}  src={`${imageUrl}${product.id}.jpg`} />
				<p>{product.description[language]}
					<span className={white}></span> <span className={gray}></span>
				</p>
				<ul className="productDimensions">
				{ Object.keys(product.dimensions)
						.map(key => <li key={key}> {key} <br/>{product.dimensions[key]} </li>) 
				}
				</ul> 
				<button onClick={() => this.backHome()}>Home</button>
			</aside>

		)
	}
}

ProductPage.contextTypes = {
	router: React.PropTypes.object
}

export default ProductPage;