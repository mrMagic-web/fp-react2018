import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// constructor(){
	// 	super(); // bring in all the properties of component
	// 	this.goToStore = this.goToStore.bind(this); // bind this
	// }

	goToStore(event){
		event.preventDefault();
		//grab the text from the box
		const productId = this.storeInput.value;

		//trasition to product/:productid
		this.context.router.transitionTo(`/product/${productId}`);
	}
	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore.bind(this)}> {/* We can bind submit with this.goToStore.bind(this) or with (e)=> this.goToStore(e), alternative to constructor up above */}
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} 
					ref={(input)=> {this.storeInput = input}} />
				<button type="submit">Visit Store &rarr;</button>
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;