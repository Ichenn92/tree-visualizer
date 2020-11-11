import React, { Component } from "react";
import "../stylesheets/navbar.css"; "../stylesheets/navbar.css";
import CurveBG from '../../assets/images/nav-bar-wave.svg';
 
class NavBar extends Component {
  render() {
    return (
      <nav>
        <img id="curve-bg" src={CurveBG} alt="CurveBF" />
        <div className="brand-name">
          <p>EAZYTREE</p>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/learn">What is Binary Tree</a>
          </li>
          <li>
            <a href="/">Practice</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="https://github.com/Ichenn92/tree-visualizer">Github Project</a>
          </li>
        </ul>
      </nav>
    );
  }
}
 
export default NavBar;
