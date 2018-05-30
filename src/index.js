import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css'
import App from './components/App';

const Root = () => {
	// Router with BrowserRouter, Match and Miss

	return (
		<BrowserRouter basename="/">
			<div>
				<Match exactly pattern="/" component={App} />
				<Match exactly pattern="/:selectedCat" component={App} />
				<Match pattern="/all/:productId" component={App} />
				<Miss component={App} />
			</div>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('main'))