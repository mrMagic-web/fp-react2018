import React from 'react';
import {  language } from '../helpers';

import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';

class CategorySelector extends React.Component {
	testSelected(key){
		return key === this.props.selectedCat ? 'selected' : '';
	}

	render(){
		const categories = this.props.categories;
		return ( 
			<div className="selector">
				<ul> 
					{ Object.keys(categories).map((key) => 
						<li key={key} 
						className={this.testSelected(key)}
						onClick={() => this.props.selectCategory(key)} > 
						{categories[key].name[language]}
						</li>) }
			
				</ul>
			</div>
		)
	}
}

export default CategorySelector;