import React from 'react';
import ReactDOM  from 'react-dom';
import PropTypes from 'prop-types';
import { moreInfo, addToList } from '../reducers/page_elements';
import { imageUrl } from '../helpers';
import ProductPage from './ProductPage';

class Product extends React.Component {
	
	constructor(){
		super();
		this.viewGray = this.viewGray.bind(this);
		this.viewWhite = this.viewWhite.bind(this);
		this.openProduct = this.openProduct.bind(this);
		this.closeProduct = this.closeProduct.bind(this);
		this.state = {
			gray: false, 
			open: false
		}
		this.baseState = this.state;
	}
	componentDidMount() {
		this.setState({ open: this.props.param === this.props.details.id })
	}
	viewGray() {
		this.setState({ gray: true});
	}
	viewWhite() {
		this.setState({ gray: false});
	}
	openProduct(){
		this.setState(this.baseState);
		this.setState({ open: true});
		ReactDOM.findDOMNode(this).scrollIntoView({behavior: "smooth", block: "start"});
	}
	closeProduct(){ 
		this.setState({ open: false});
		this.props.transitionOnClose();
	}
	render(){
		const details = this.props.details;
		const imageGray = this.props.gray ? "_gray": "";
		const gray = details.color.gray ? "gray": "" ; 
		const white = details.color.white ? "white": "" ;
		const productAdded = this.props.added[details.id] ? 'disabled' : '';
		const productRemoved = this.props.added[details.id] ? '' : 'disabled';
		const language = this.props.language;

		if(this.state.open) {
			return <ProductPage 
					details={this.props.details}
					closeProduct={this.closeProduct}
					language={this.props.language}
					addToOrder={this.props.addToOrder}
					removeFromOrder={this.props.removeFromOrder}
					viewWhite={this.viewWhite} 
					viewGray={this.viewGray}
					gray={this.state.gray}
					productAdded={productAdded} 
					productRemoved={productRemoved}
				/>
		}
		
		return (
			<li className="product" >
				<div className="product-hover">
					<button onClick={this.openProduct}>{moreInfo[language]}</button>
					<button className={"hide-mobile " + productAdded} onClick={() => this.props.addToOrder(details.id)}>{ addToList[language] }</button>
				</div>
				<div className="clickable">
					<img alt={details.id} src={`${imageUrl}/thumbs/${details.id}${imageGray}.jpg`} />
					<h4 className="product-name">{details.name[language]}</h4>
					<div className="colors"><span className={white}></span> <span className={gray}></span></div>
				</div>
			</li>
		)
	}

}

ProductPage.contextTypes = {
	router: PropTypes.object
}

export default Product;