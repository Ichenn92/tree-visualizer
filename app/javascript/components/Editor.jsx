import React from "react"
import CodeMirror from 'react-codemirror'
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/ruby/ruby.js';

class Editor extends React.Component {
  constructor() {
    super();
    this.state = { 
      name: 'CodeMirror',
      code: "# test comment" 
    };
  }
  
  updateCode(newCode) {
    this.setState({ 
      code: newCode 
    });
  }
  
  render() {
    let options = {
      value: "# test comment",
      lineNumbers: true,
      mode: "ruby",
      tabSize: 2,
      keyMap: 'sublime',
      theme: "darcula"
    };
    return <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
  }
};

export default Editor;
