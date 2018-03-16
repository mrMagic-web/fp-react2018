import React from 'react';

class Product extends React.Component {
		
	render(){
		const details = this.props.details;
		const gray = details.color.white ? "white": "" ; 
		const white = details.color.gray ? "gray": "" ;

		return (
			<li className="menu-products">
			<div className="clickable" onClick={() => this.props.openProduct(details)}>
				<img alt={details.id} src={`http://fastpack.dk/wp-content/uploads/products/thumbs/${details.id}.jpg`} />
				<h4 className="product-name">{details.name['en']}
				</h4>
			</div>
			<div className="colors"><span className={white}></span> <span className={gray}></span></div>
			<div className='description'>
				<p><small>{details.description['en']}</small></p>
			</div>
			<div className="order-buttons">
				<button onClick={() => this.props.addToOrder(details.id)}>Add to order</button>
				{/*<button onClick={() => this.props.removeFromOrder(details.id)}>Remove from order</button>*/}
			</div>
			</li>
		)
	}

}

export default Product;