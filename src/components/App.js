import React from 'react';
import Order from './Order';
import productsList from '../reducers/reducer_products';
import categories from '../reducers/reducer_product_categories';
import Product from './Product';
import ProductList from './ProductList';
import ProductPage from './ProductPage';
import base from '../base';

class App extends React.Component {

	constructor() {
		super(); // we can't use this until we call super()
		this.addToOrder = this.addToOrder.bind(this); 
		this.openProduct = this.openProduct.bind(this); 
		this.removeFromOrder = this.removeFromOrder.bind(this); 
		this.openProduct = this.openProduct.bind(this); 
		this.state = {
			products: {},
			order: {},
			categories: {},
			selected: '',
			selectedCategory: {}
		}
	}
	componentWillMount() {
	
		//this runs before the app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/product`, {
            context: this,
            state: 'products'
        });
        //check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.productId}`);
        
    	this.setState({
			products: productsList,
			categories: categories
		});
		
		//update App component's order state
        if(localStorageRef) {	
        	this.setState({
        		order: JSON.parse(localStorageRef)
        	}); 
        }


    }
    componentWillUnmount(){
    	base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
    	localStorage.setItem(`order-${this.props.params.productId}`, JSON.stringify(nextState.order)); // when adding to local storege we cannot use object. we turn it into string
    }

	openProduct(key) {
		this.setState({ selected: key });
	}

	addToOrder(key) {
		const order = {...this.state.order}; // take a copy of own state
		order[key] =  1 ; //update or add new number of ordered products
		this.setState({ order }); // update state, ES short for {order: this.order}
	}
	removeFromOrder(key) {
		const order = {...this.state.order}; // take a copy of own state
		delete order[key]; //update or add new number of ordered products
		this.setState({ order }); // update state, ES short for {order: this.order}
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<ul className="list-of-products">
					<ProductList 
						categories={this.state.categories} 
						products={this.state.products} 
					/>
						{ Object.keys(this.state.products)
						.map(key =>  <Product addToOrder={this.addToOrder}
										removeFromOrder={this.removeFromOrder} 
										openProduct={this.openProduct}
										details={this.state.products[key]} key={key} /> )}
					</ul>
				</div>
				<Order 
					params={this.state.params}
					products={this.state.products} 
					order={this.state.order} 
					removeFromOrder={this.removeFromOrder}
				/>
				<ProductPage 
					products={this.state.products}
					selected={this.state.selected}
				/>
				{/*<Inventory products={this.state.products} 
					addProduct={this.addProduct} 
				/> { /* pass addProduct method to the component */}
			</div>
		)
	}
}

export default App;