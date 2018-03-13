import React from 'react';

class ProductInfo extends React.Component {
	render(){
		const selected = this.props.selected;
		const imageStyle = {
			maxWidth: '500px',
			width: '95%',
			margin: 'auto'
		}
		if(!selected){
            return (
                <div>
                    <p>Please select products that best fit your business</p>
                    <div>&nbsp;</div>
                </div>
            )
        };
		const gray = selected.color.white ? "white": "" ; 
		const white = selected.color.gray ? "gray": "" ; 
		return (
			<aside>
				<h4>{selected.name['pl']}</h4>
				<img alt={selected.name['pl']} style={imageStyle} src={`http://fastpack.dk/wp-content/uploads/products/${selected.id}.jpg`} />
				<p>{selected.description['pl']}
					<span className={white}></span> <span className={gray}></span>
				</p>
				<ul>
				{ Object.keys(selected.dimensions)
						.map(key => <li key={key}> {key} {selected.dimensions[key]} </li>) 
				}
				</ul>
				<button onClick={() => this.props.addToOrder(selected.id)}>Add to order</button>
				<button onClick={() => this.props.removeFromOrder(selected.id)}>Remove from order</button>
			</aside>
		)
	}
}

ProductInfo.contextTypes = {
	router: React.PropTypes.object
}

export default ProductInfo;