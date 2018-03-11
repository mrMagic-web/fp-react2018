import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css'
import App from './components/App';
import ProductPage from './components/ProductPage';
import NotFound from './components/NotFound';

const Root = () => {
	// Router with BrowserRouter, Match and Miss
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={App} />
				<Match pattern="/product/:productId" component={ProductPage} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('main'))