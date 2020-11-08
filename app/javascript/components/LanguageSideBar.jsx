import React, { Component } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import "../stylesheets/language-side-bar.css";
 
class LanguageSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '0px'
    };
  }

  toggleSideBar = () => {
    this.setState({
      position: '280px'
    });
  }

  render() {
    return (
    <OutsideClickHandler
      onOutsideClick={() => {
        this.setState({
          position: '0px'
        });
      }}
    >
     <div className="side-bar" style={{transform: `translateX(${this.state.position})`}}>
        <ul className="languages">
          <li>C++</li>
          <li>C++</li>
          <li>C++</li>
          <li>C++</li>
        </ul>
        <button className="btn" onClick={this.toggleSideBar}>Toggle LanguageSideBar</button>
      </div>
      Hello World
    </OutsideClickHandler>
      
    );
  }
}
 
export default LanguageSideBar;
