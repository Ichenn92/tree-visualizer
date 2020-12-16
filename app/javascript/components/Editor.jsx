import React from "react";
import TreeRenderer from "./TreeRenderer.jsx";
import LanguageSideBar from "./LanguageSideBar.jsx";
import CodeMirror from 'react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/ruby/ruby.js';
import '../stylesheets/editor.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.updateCode = this.updateCode.bind(this);
    this.state = {
      name: 'CodeMirror',
      code: 'tree = TreesApi.new [6,2,78,1,3,24]',
      values: [],
      actions: [],
      nbr_iterations: 0,
      currentLanguage: 'Ruby',
      sideBarStyle: 'side-bar',
    };
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }

  explanation() {
    alert(
      `Get confortable by editing existing tree
Here are the build-in method to play around with the binary tree

#insert(value)
    @params : an integer (an existing value will raise an error)
    return : The created node or RuntimeError (The same value can't be inserted twice) if value exists already
#delete(value, parent_pointer = @root)
    @params1 : an integer
    @params2 : the node where the search will start. Default value : root of the tree
    return : The deleted node or nil of value not found
#rebalance!
    return : the full object with each node`)
  }

  generateTree = () => {
    const run_code = this.state.code + "\ntree.run";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: run_code })
    };
    fetch('http://localhost:3030/run', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          values: data.values,
          actions: data.actions,
          nbr_iterations: this.state.nbr_iterations + 1
        });
      });
  }

  toggleSideBar = (newStyle, newLanguage) => {
    this.setState({ sideBarStyle: newStyle, currentLanguage: newLanguage });
  }

  render() {
    let options = {
      lineNumbers: true,
      mode: this.state.currentLanguage.toLowerCase(),
      tabSize: 2,
      theme: "darcula",
    };
    return (
      <div>
        <div>
          <LanguageSideBar 
            sideBarStyle={this.state.sideBarStyle} 
            currentLanguage={this.state.currentLanguage}
            toggleSideBar={this.toggleSideBar.bind(this)}
          />
        </div>
        <div className="displays">
          <div className="display-editor">
            <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
            <div className="buttons">
              <button className="white-empty-btn" 
                onClick={this.toggleSideBar.bind(this, 'side-bar-toggled', this.state.currentLanguage)}
              >
                {this.state.currentLanguage} 
              </button>
              <button className="white-empty-btn" onClick={this.explanation}>Info</button>
            </div>
            <div>
              <button className="full-red-btn" onClick={this.generateTree}>RUN</button>
            </div>
          </div>
          <div className="display-tree">
            <TreeRenderer key={this.state.nbr_iterations} values={this.state.values} actions={this.state.actions} />
          </div>
        </div>
      </div>
    )
  }
};

export default Editor
