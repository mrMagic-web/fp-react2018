import React from 'react';

class Form extends React.Component {
	state = {
		name: '',
		nameError: '',
		email: '',
		emailError: '',
		phone: '',
		phoneError: ''
	}
	validate = e => {
		let isErr = false;
		const errors = {};
		
		if(this.state.name.length < 5) {
			isErr = true;
			errors.nameError = "User short";
		}
		if (isErr) {
			this.setState({
				...this.state,
				...errors
			})
		}
	}
	change = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	onSubmit = e => {
		e.preventDefault();
		const err = this.validate();
		if(!err) {
			this.props.onSubmit(this.state);
			this.setState({ name: '', email: '', phone: ''});
		}
	}
	render(){
		return( 
			<div className="wrapper">	
				<form>
					<input name="name" 
					value={this.state.name} 
					placeholder="name" 
					onChange={ e => this.change(e) } />
					<span>{this.state.nameError}</span>					
					<input name="email" 
					errorText={this.state.emailError} 
					value={this.state.email} 
					placeholder="email" 
					onChange={ e => this.change(e) } />
					
					<input name="phone" 
					errorText={this.state.phoneError} 
					value={this.state.phone} 
					placeholder="phone" 
					onChange={ e => this.change(e) } />
					<button onClick={e => this.onSubmit(e)}>submit</button>
				</form>
			</div>
		)
	}
}

export default Form;