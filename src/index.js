import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css'
import App from './components/App';
import ProductPage from './components/ProductPage';

const Root = () => {
	// Router with BrowserRouter, Match and Miss
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={App} />
				<Match exactly pattern="/:selectedCat" component={App} />
				<Match pattern="/product/:productId" component={ProductPage} />
				<Miss component={App} />
			</div>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('main'))