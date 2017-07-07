import React, { Component } from 'react';
import './../Assets/Header.css';
import Logo from './../Assets/Logo.png'

class Header extends Component{
  render(){
    return(
      <div className="HeaderContainer">
      <img src={Logo} alt={"Logo"} className="Logo"/>
    </div>
    );
  }
}

export default Header;
