import React, { Component } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import "../stylesheets/language-side-bar.css";

function changeLanguage(languageSelected) {
        this.props.toggleSideBar('side-bar')
}

function htmlInLiTag(list, currentLanguage) {
  return list.map((e) => {
    return (e == currentLanguage) ? 
      <li key={e} className="language" id="current-language" onClick={() => console.log({e})}>{e}</li>
      : <li key={e} className="language" onClick={() => console.log({e})}>{e}</li>
  })
}

class LanguageSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarStyle: this.props.sideBarStyle,
      supportedLanguages: ['C++', 'Dart', 'Java', 'Javascript', 'Python', 'Ruby', 'Swift', 'Typescript']
    };
  }

  render() {
    return (
    <OutsideClickHandler
      onOutsideClick={() => {
        this.props.toggleSideBar('side-bar')
      }}
    >
      <div className={this.props.sideBarStyle}>
        <div className="title-container">
          <h3>Select your language</h3>
        </div>
        <div>
          <ul className="languages">
            {htmlInLiTag(this.state.supportedLanguages, this.props.currentLanguage)}
          </ul>
        </div>
      </div>
    </OutsideClickHandler>
    );
  }
}
 
export default LanguageSideBar;
