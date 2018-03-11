import React from 'react';

//stateless function component
const Header = (props) => {
	return (
		<header className="top">
			<h1>
			Product
				<span className="ofThe">
					<span className="of">of</span>
					<span className="the">the</span>
				</span>
			Day
			</h1>
			<h3><span>{props.tagline}</span></h3>
		</header>
	)	
}
	
Header.propTypes = {
	tagline: React.PropTypes.string.isRequired
}

export default Header;