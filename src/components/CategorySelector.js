import React from 'react';
import {  language } from '../helpers';

class CategorySelector extends React.Component {

	render(){
		const categories = this.props.categories;
		return( 
			<div className="category-selector">
				<h3>Select Category</h3>
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