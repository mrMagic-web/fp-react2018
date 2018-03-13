import React from 'react';

class Product extends React.Component {
		
	render(){
		const details = this.props.details;
		const gray = details.color.white ? "white": "" ; 
		const white = details.color.gray ? "gray": "" ;
			
		return (
			<li className="menu-products">
			<img alt={details.id} src={`http://fastpack.dk/wp-content/uploads/products/thumbs/${details.id}.jpg`} />
			<h4 className="product-name" onClick={() => this.props.openProduct(details)}>{details.name['en']}
				<div className="price"><span className={white}></span> <span className={gray}></span></div>
			</h4>
			<p><small>{details.description['en']}</small></p>
			<button onClick={() => this.props.addToOrder(details.id)}>Add to order</button>
			<button onClick={() => this.props.removeFromOrder(details.id)}>Remove from order</button>
			</li>
		)
	}

}

export default Product;