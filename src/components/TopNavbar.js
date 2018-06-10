import React, { Component } from 'react';
import { mainMenu } from '../reducers/page_elements';
import { language, languages } from '../helpers';
import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';
import ReactCountryFlag from 'react-country-flag';

class TopNavbar extends Component {
  state = {
    langDropdown: false,
    mainDropdown: false,
  }
  toggleLanguage(){
    this.setState({ langDropdown: !this.state.langDropdown })
  }
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
          <a className="languageSelector" onClick={ () => this.toggleLanguage() }><ReactCountryFlag code="GB" svg/>EN <Icon icon={ ICONS.CARRET_DOWN } /></a>
            <div className="dropdown" id="langDropdown">
           { this.state.langDropdown ? languages.map( lang => <a key={lang}><ReactCountryFlag code={lang} svg/> {lang} </a> ) : '' } 
          </div>
        </div>

        <div className="menu-close" onClick={ () => this.toggleNavbar()}><Icon icon={ ICONS.MENU } /> </div>
      </div>
    );
  }
}
export default TopNavbar;