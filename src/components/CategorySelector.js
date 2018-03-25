import React from 'react';
import {  language } from '../helpers';

class CategorySelector extends React.Component {
	constructor(){
		super();
		this.toggle = this.toggle.bind(this);
		this.state = { 
			toggled: false 
		};
	}

	toggle(){
		const tog = this.state.toggled;
		this.setState({ toggled:  !tog})
	}

	render(){
		const categories = this.props.categories;
		return( 
			<div className="category-selector">
				<h3 onClick={this.toggle}>Select Category</h3>
				<ul>
					{ Object.keys(categories).map((key) => 
						<li key={key} 
						onClick={() => this.props.selectCategory(key)} > 
						{categories[key].name[language]}
						</li>) }
				
				</ul>
			</div>
		)
	}
}

export default CategorySelector;