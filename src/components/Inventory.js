import React from 'react';

import AddProductForm from './AddProductForm';

class Inventory extends React.Component {
	constructor(){
		super();
		this.renderInventory = this.renderInventory.bind(this);	
	}

	renderInventory(key){
		return <p key={key}>{this.props.products[key].id}</p>
		}
	render(){
		return( 
			<div>
				<h2>Inventory</h2>
				{/* Object.keys(this.props.products).map(this.renderInventory) */}
			{/* video 20 will tell us how to make add product form to edit elements */}
				<AddProductForm addProduct={this.props.addProduct}/>
				
			</div>
		)
	}
}

export default Inventory;