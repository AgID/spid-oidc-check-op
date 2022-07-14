import React, { Component } from 'react';

class Redirect extends Component {

	constructor(props) {
		super(props);
    
		console.log("Redirect", props);	
		window.location = props.redirect;
	}	
  
	render() {
		let render = "";

		return render;
	}
}
 
export default Redirect;
 