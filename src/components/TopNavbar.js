import React, { Component } from 'react';
import { mainMenu } from '../reducers/page_elements';
import { language } from '../helpers';

class TopNavbar extends Component {
  toggleNavbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }
  render() {
    return (
      <div className="container">
        <div className="topnav" id="myTopnav">
          <a href="#home" className="active">{ mainMenu.home[language] }</a>
          <a href="#news">{ mainMenu.about[language] }</a>
          <a href="#contact">{ mainMenu.services[language] }</a>
          <a href="#about">{ mainMenu.contact[language] }</a>
          <a className="icon" onClick={ () => this.toggleNavbar()}>
            <i className="fa fa-bars">-</i>
          </a>
        </div>
      </div>
    );
  }
}
export default TopNavbar;