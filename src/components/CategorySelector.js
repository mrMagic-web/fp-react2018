import React from 'react';
import {  language } from '../helpers';

class CategorySelector extends React.Component {

	constructor(){
		super();
		this.showCategories = this.showCategories.bind(this);
	}
	showCategories() {
		const cat = this.props.cat;
		Object.keys(cat).map(function (key) {
		 return `<li key=${key}>${cat[key].name[language]}</li>`	
		} ) 
	} 

	render(){
		
		return( 
			<ul>
				{this.showCategories}
			</ul>
		)
	}
}

export default CategorySelector;