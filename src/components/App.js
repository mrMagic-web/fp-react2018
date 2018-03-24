import React from 'react';
import Order from './Order';
import CategorySelector from './CategorySelector';
import productsList from '../reducers/new_products';
import categories from '../reducers/product_categories';
import Product from './Product';
import base from '../base';



class App extends React.Component {

	constructor() {
		super(); // we can't use this until we call super()
		this.addToOrder = this.addToOrder.bind(this); 
		this.removeFromOrder = this.removeFromOrder.bind(this); 
		this.selectCategory = this.selectCategory.bind(this); 
	}
	
	state = {
		products: {},
		order: {},
		categories: {},
		selectedCat: 'all',
		added: {}
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
        		order: JSON.parse(localStorageRef),
        		added: JSON.parse(localStorageRef)
        	}); 
        }

    }
    componentWillUnmount(){
    	base.removeBinding(this.ref);
    }
    componentWillUpdate(nextProps, nextState) {
    	localStorage.setItem(`order-${this.props.params.productId}`, JSON.stringify(nextState.order)); // when adding to local storege we cannot use object. we turn it into string
    	localStorage.setItem(`added-${this.props.params.productId}`, JSON.stringify(nextState.added)); // when adding to local storege we cannot use object. we turn it into string
    }
    selectCategory(key) {
    	//convert array of product into object
    	const categoryProducts = this.state.categories[key].productList.reduce((acc, cur) => { acc[cur] = productsList[cur] ; return acc;} ,{});
	    const cats = key === 'all' ? productsList : categoryProducts;
    	// this.setState({products});
    	console.log(cats)
    }
	addToOrder(key) {
		const order = {...this.state.order}, added = {...this.state.added}; // take a copy of own state
 		added[key] = true;
		order[key] =  1; //update or add new number of ordered products
		this.setState({ order, added }); // update state, ES short for {order: this.order}
	}
	removeFromOrder(key) {
		const added = {...this.state.added}, order = {...this.state.order}; // take a copy of own state
 		delete added[key];
		delete order[key]; //update or add new number of ordered products
		this.setState({ order,  added}); // update state, ES short for {order: this.order}
	}

	render() {
		return (
			<div className="wrapper">
				<CategorySelector categories={this.state.categories} 
								  selectCategory={this.selectCategory}/>
				<div className="menu">
					<ul className="products">
						{console.log(this.state.products)}
						{ Object.keys(this.state.products).map(key =>  
							<Product open={this.state.open} 
							addToOrder={this.addToOrder} 
							added={this.state.added} 
							removeFromOrder={this.removeFromOrder}  
							details={this.state.products[key]} key={key} /> )}
						}
						
					</ul>
				</div>
				<Order key="Order" params={this.state.params} products={this.state.products} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
			</div>
		)
	}
}

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;