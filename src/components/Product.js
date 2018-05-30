import React from 'react';
import ReactDOM  from 'react-dom';
import { imageUrl} from '../helpers';
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
	}
	render(){
		const details = this.props.details;
		const gray = details.color.gray ? "gray": "" ; 
		const white = details.color.white ? "white": "" ;
		const imageGray = this.state.gray ? "_gray": "";
		const productAdded = this.props.added[details.id] ? 'disabled' : '';
		const productRemoved = this.props.added[details.id] ? '' : 'disabled';
		const language = this.props.language;

		if(this.state.open) {
			return <ProductPage 
					details={this.props.details}
					closeProduct={this.closeProduct}
					addToOrder={this.props.addToOrder}
					removeFromOrder={this.props.removeFromOrder}
					viewWhite={this.viewWhite} viewGray={this.viewGray}
					language={this.props.language}
					imageGray={imageGray}
					productAdded={productAdded} productRemoved={productRemoved}
				/>
			
		}

		return (
			<li className="product">
				<div className="product-hover"><button>See details</button></div>
				<div className="clickable" onClick={this.openProduct}>
					<img alt={details.id} src={`${imageUrl}/thumbs/${details.id}${imageGray}.jpg`} />
					<h4 className="product-name">{details.name[language]}</h4>
					<div className="colors"><span onClick={this.viewWhite} className={white}></span> <span onClick={this.viewGray} className={gray}></span></div>
				</div>
			</li>
		)
	}

}

export default Product;