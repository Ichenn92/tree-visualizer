import React, { Component } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import "../stylesheets/language-side-bar.css";
 
class LanguageSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'side-bar'
    };
  }

  toggleSideBar = () => {
    this.setState({
      style: 'side-bar-toggled'
    });
  }

  render() {
    return (
    <OutsideClickHandler
      onOutsideClick={() => {
        this.setState({
          style: 'side-bar'
        });
      }}
    >
     <div className={this.state.style}>
        <ul className="languages">
          <li>C++</li>
          <li>Dart</li>
          <li>Java</li>
          <li>Javascript</li>
          <li>Python</li>
          <li>Ruby</li>
          <li>Swift</li>
          <li>Typescript</li>
        </ul>
        <button className="btn" onClick={this.toggleSideBar}>Toggle LanguageSideBar</button>
      </div>
      Hello World
    </OutsideClickHandler>
      
    );
  }
}
 
export default LanguageSideBar;
