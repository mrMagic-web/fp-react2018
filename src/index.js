import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css'
import App from './components/App';

import TagManager from 'react-gtm-module'

const tagManagerArgs = {
	gtmId: 'GTM-WDX629V'
}

const Root = () => {
	// Router with BrowserRouter, Match and Miss

	return (
		<BrowserRouter basename="/">
			<div>
				<Match exactly pattern="/" component={App} />
				<Match exactly pattern="/:appLanguage" component={App} />
				<Match exactly pattern="/:appLanguage/:selectedCat" component={App} />
				<Match pattern="/:appLanguage/all/:productId" component={App} />
				<Miss component={App} />
			</div>
		</BrowserRouter>
	)
}
TagManager.initialize(tagManagerArgs)
render(<Root />, document.getElementById('main'))
