import React, { Component } from 'react';
import { mainMenu } from '../reducers/page_elements';
import { language } from '../helpers';
import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';

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
      <div className="topnav-area container">
        <div className="logo-area"><img src="./img/logo-fastpack.png" alt="Logo fastpack" /></div>
        <div className="topnav" id="myTopnav">
          <a href="#home">{ mainMenu.home[language] }</a>
          <a href="#news">{ mainMenu.about[language] }</a>
          <a href="#contact">{ mainMenu.services[language] }</a>
          <a href="#about">{ mainMenu.contact[language] }</a>
        </div>
        <div className="menu-close" onClick={ () => this.toggleNavbar()}><Icon icon={ ICONS.MENU } /> </div>
      </div>
    );
  }
}
export default TopNavbar;