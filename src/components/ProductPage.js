import React from 'react';

class ProductPage extends React.Component {
	render(){
	const selected = this.props.selected; 
	const imageStyle = {
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
		return (
			<aside>
				<h4>{selected.name['pl']}</h4>
				<img alt={selected.name['pl']} style={imageStyle} src={`http://fastpack.dk/wp-content/uploads/products/${selected.id}.jpg`} />
			</aside>
		)
	}
}

export default ProductPage;