import React, { Component } from 'react';
import { mainMenu } from '../reducers/page_elements';
import { languages, flags } from '../helpers';
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
    this.setState({ mainDropdown: !this.state.mainDropdown })
  }
  updateLanguage(lang){
    this.setState({ langDropdown: false, mainDropdown: false })
    this.props.changeLanguage(lang);
  }
  render() {
    const language = this.props.language;
    const remainingLangs = languages.filter( l => l !== language.toUpperCase() ) 
    return (
      <div className="topnav-area container">
        <div className="logo-area"><img src="../img/logo-fastpack.png" alt="Logo fastpack" /></div>
        <div className={this.state.mainDropdown ? "topnav responsive" : "topnav"} id="myTopnav">
          <a href="#home">{ mainMenu.home[language] }</a>
          <a href="#news">{ mainMenu.about[language] }</a>
          <a href="#contact">{ mainMenu.services[language] }</a>
          <a href="#about">{ mainMenu.contact[language] }</a>
          <a className="languageSelector" onClick={ () => this.toggleLanguage() }><ReactCountryFlag code={flags[language.toUpperCase()]} svg/>{language.toUpperCase()} <Icon icon={ ICONS.CARRET_DOWN } /></a>
            <div className="dropdown" id="langDropdown">
           { this.state.langDropdown ? remainingLangs.map( lang => <a key={lang} onClick={() => this.updateLanguage(lang.toLowerCase())}><ReactCountryFlag code={flags[lang]} svg/> {lang} </a> ) : '' } 
          </div>
        </div>

        <div className="menu-close" onClick={ () => this.toggleNavbar()}><Icon icon={ ICONS.MENU } /> </div>
      </div>
    );
  }
}
export default TopNavbar;