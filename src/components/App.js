import React from 'react';
import PropTypes from 'prop-types';

import Order from './Order';
import CategorySelector from './CategorySelector';
import productsList from '../reducers/new_products';
import categories from '../reducers/product_categories';
import Product from './Product';
import SampleProjects from './SampleProjects';
import Custom from './Custom';
import TopNavbar from './TopNavbar';
import Form from './Form';
// import base from '../base';
import { language } from '../helpers';
import Modal from 'react-responsive-modal';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {

	constructor() {
		super(); // we can't use this until we call super()
		this.addToOrder = this.addToOrder.bind(this); 
		this.removeFromOrder = this.removeFromOrder.bind(this); 
		this.selectCategory = this.selectCategory.bind(this);
		this.changeLanguage = this.changeLanguage.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.contact = this.contact.bind(this);
		this.transitionOnClose = this.transitionOnClose.bind(this);
	}
	
	state = {
		products: {},
		order: {},
		categories: {},
		appLanguage: "dk",
		selectedCat: localStorage.getItem('categorySelection') || 'all',
		added: {},
		modalOpen: false,
		fields: {}
	}
 
	componentWillMount() {
				
		// //this runs before the app is rendered
        // this.ref = base.syncState(`${this.props.params.storeId}/product`, {
        //     context: this,
        //     state: 'products'
        // });
        //check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.productId}`);
        const categorySelected = categories[this.props.params.selectedCat];
        const validCategory = categorySelected ?  categorySelected.id : "all";

    	this.setState({
			products: productsList,
			categories: categories,
			selectedCat: validCategory,
			appLanguage: this.props.params.appLanguage || language 
		});
		
		//update App component's order state
        if(localStorageRef) {	
        	this.setState({
        		order: JSON.parse(localStorageRef),
        		added: JSON.parse(localStorageRef)
        	}); 
				}
		}
    // componentWillUnmount(){
    // 	base.removeBinding(this.ref);
    // }
    componentWillUpdate(nextProps, nextState) {
    	localStorage.setItem(`order-${this.props.params.productId}`, JSON.stringify(nextState.order)); // when adding to local storege we cannot use object. we turn it into string
    	localStorage.setItem(`added-${this.props.params.productId}`, JSON.stringify(nextState.added)); // when adding to local storege we cannot use object. we turn it into string
    }
    selectCategory(key) {
    	this.setState({selectedCat: key});
    	this.context.router.transitionTo(`/${this.state.appLanguage}/${key}`);
		}
		changeLanguage(lang) {
			this.setState({appLanguage: lang});
			this.context.router.transitionTo(`/${lang}`);
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
	contact() {
		this.setState({modalOpen: true});
	}
	transitionOnClose(){
		this.context.router.transitionTo(`/${this.state.appLanguage}/all`);
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
			return (
			<div className="wrapper">
				<header className="navbar"><TopNavbar language={this.state.appLanguage} changeLanguage={this.changeLanguage} /></header>

				<CategorySelector categories={this.state.categories} 
								  selectCategory={this.selectCategory}
									selectedCat={this.state.selectedCat}
									language={this.state.appLanguage}
								  />

				<div className="menu container">
					<CSSTransitionGroup className="products selection" component="ul" transitionName="selection" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
						{ Object.keys(cats).map(key =>  
							<Product open={this.state.open} 
							addToOrder={this.addToOrder} 
							added={this.state.added} 
							category={this.state.selectedCat}
							param={this.props.params.productId}
							removeFromOrder={this.removeFromOrder}  
							openProduct={this.state.openProduct} language={this.state.appLanguage}
							details={this.state.products[key]} key={key} 
							transitionOnClose={this.transitionOnClose}
							/> 
							)}
					</CSSTransitionGroup>
				</div>
				<Custom language={this.state.appLanguage} />
				<SampleProjects category={this.state.selectedCat} language={this.state.appLanguage}/>
				<Order key="Order" params={this.state.params} products={this.state.products} order={this.state.order} removeFromOrder={this.removeFromOrder} contact={this.contact} language={this.state.appLanguage}/>
				<Modal open={this.state.modalOpen} onClose={this.closeModal} little>
					<Form onSubmit={fields => this.onSubmit(fields)} order={this.state.order} products={this.state.products} closeModal={this.closeModal} language={this.state.appLanguage} />
				</Modal>
			</div>
		)
	}
}

App.contextTypes = {
  router: PropTypes.object
}

export default App;