import React from 'react';

class CategorySelector extends React.Component {
	testSelected(key){
		return key === this.props.selectedCat ? 'selected' : '';
	}

	render(){
		const {language,categories} = this.props;
		return ( 
			<div className="selector container">
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