import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/codemirror.css';

class NavBar extends React.Component {
  constructor(props) {
  super(props);
}

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navigation-bar">
        <i className="icss-home"></i>
        <a className="navbar-brand" href="#">Set 01Tree</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Practice<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/learn">Learn</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;
