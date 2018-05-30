import React from 'react';
import PropTypes from 'prop-types';

import Order from './Order';
import CategorySelector from './CategorySelector';
import productsList from '../reducers/new_products';
import categories from '../reducers/product_categories';
import Product from './Product';
import Form from './Form';
import ProductPage from './ProductPage';
import base from '../base';
import Modal from 'react-responsive-modal';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {

	constructor() {
		super(); // we can't use this until we call super()
		this.addToOrder = this.addToOrder.bind(this); 
		this.removeFromOrder = this.removeFromOrder.bind(this); 
		this.selectCategory = this.selectCategory.bind(this);
		this.openProduct = this.openProduct.bind(this); 
		this.closeProduct = this.closeProduct.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.contact = this.contact.bind(this);
	}
	
	state = {
		products: {},
		order: {},
		categories: {},
		selectedCat: 'all',
		added: {},
		modalOpen: false,
		language: 'en',
		openProd: true,
		gray: false,
		fields: {}
	}
 
	componentWillMount() {
				
		//this runs before the app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/product`, {
            context: this,
            state: 'products'
        });
        //check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.productId}`);
        const categorySelected = categories[this.props.params.selectedCat];
        const validCategory = categorySelected ?  categorySelected.id : "all";

    	this.setState({
			products: productsList,
			categories: categories,
			selectedCat: validCategory
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
    	this.setState({selectedCat: key});
    	this.context.router.transitionTo(`/${key}`);
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
	openProduct () {
		
	}
	closeProduct(){ 
		this.context.router.transitionTo(`/all`);	
	}
	contact() {
		this.setState({modalOpen: true});

	}
	closeModal() {
		this.setState({modalOpen: false});
	}
	onSubmit = fields => {
		this.setState({fields});
	}
	render() {

		const categoryProducts =  this.state.categories[this.state.selectedCat].productList.reduce((acc, cur) => { acc[cur] = productsList[cur] ; return acc;} ,{});
	    const cats = this.state.selectedCat === 'all' ? productsList : categoryProducts;
		const imageGray = this.state.gray ? "_gray": "";
		const productAdded = this.state.added[this.props.params.productId] ? 'disabled' : '';
		const productRemoved = this.state.added[this.props.params.productId] ? '' : 'disabled';
		const openProduct = this.state.openProd && this.props.params.productId ? ( <ProductPage details={this.state.products[this.props.params.productId]} closeProduct={this.closeProduct} addToOrder={this.addToOrder} removeFromOrder={this.removeFromOrder} viewWhite={this.viewWhite} viewGray={this.viewGray} language={this.state.language} imageGray={imageGray} productAdded={productAdded} productRemoved={productRemoved} /> ) : '';
		return (
			<div className="wrapper">	
				<CategorySelector categories={this.state.categories} 
								  selectCategory={this.selectCategory}
								  selectedCat={this.state.selectedCat}
								  language={this.state.language}
								  />
				
				<CSSTransitionGroup className="products selection" transitionName="selection" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{openProduct}
				</CSSTransitionGroup>

				<div className="menu">
					<CSSTransitionGroup className="products selection" component="ul" transitionName="selection" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
						{ Object.keys(cats).map(key =>  
							<Product open={this.state.open} 
							addToOrder={this.addToOrder} 
							added={this.state.added} language={this.state.language}
							removeFromOrder={this.removeFromOrder}  
							openProduct={this.state.openProduct}
							details={this.state.products[key]} key={key} /> )}
					</CSSTransitionGroup>
				</div>
				<Order key="Order" params={this.state.params} products={this.state.products} order={this.state.order} removeFromOrder={this.removeFromOrder} language={this.state.language} contact={this.contact}/>
				<Modal open={this.state.modalOpen} onClose={this.closeModal} little>
					<Form onSubmit={fields => this.onSubmit(fields)} order={this.state.order} products={this.state.products} closeModal={this.closeModal} />
				</Modal>
			</div>
		)
	}
}

App.contextTypes = {
  router: PropTypes.object
}

export default App;