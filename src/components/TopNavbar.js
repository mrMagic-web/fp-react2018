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
        <div className="logo-area"><a href="http://www.fastpack.dk/"><img src="http://www.fastpack.dk/wp-content/uploads/logo-fastpack.png" alt="Logo fastpack" /></a></div>
        <div className={this.state.mainDropdown ? "topnav responsive" : "topnav"} id="myTopnav">
          <a href={mainMenu.home[language].link}>{ mainMenu.home[language].text }</a>
          <a href={mainMenu.about[language].link}>{ mainMenu.about[language].text }</a>
          <a href={mainMenu.services[language].link}>{ mainMenu.services[language].text }</a>
          <a href={mainMenu.contact[language].link}>{ mainMenu.contact[language].text }</a>
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