import { node } from "prop-types";
import React, { useState, useRef } from "react";
import NodeTree from "./Tree";
import TreeStateRenderer from "./TreeStateRenderer.jsx";


class TreeRenderer extends React.Component {
  constructor(props) {
    super(props);
    let tree = new NodeTree(props.values || []);
    let actions = props.actions || [];
    for(let action of actions) {
      if(action.value == null)
        continue;

      if(action.action == "add")
        tree.add(action.value);
      else if(action.action == "delete")
        tree.delete(action.value);
    }
    this.state = {
      tree: tree,
      currentState: 0,
      value: 0,
    };

    this.first_state = this.first_state.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.last_state = this.last_state.bind(this);


    this.add = this.add.bind(this);
    this.pop = this.pop.bind(this);
  }

  add() {
    if(this.state.value == null)
      return;
    this.state.tree.add(this.state.value);  // Not a good pattern, should work on copy if possible
  }

  pop() {
    if(this.state.value == null)
      return;
    this.state.tree.delete(this.state.value);  // Not a good pattern, should work on copy if possible
  }

  first_state() {
    this.setState({currentState: 0});
  }
  previous() {
    let currentState = this.state.currentState > 0 ? this.state.currentState - 1 : 0;
    this.setState({currentState});
  }

  next() {
    let currentState = Math.min(this.state.currentState + 1, this.state.tree.states.length - 1);
    this.setState({currentState});
  }

  last_state() {
    this.setState({currentState: this.state.tree.states.length - 1});
  }

  render() {
    return (
      <div>
          <TreeStateRenderer state={this.state.tree.states[this.state.currentState]}/>
          <button onClick={this.add}>Add</button>
          <button onClick={this.pop}>Delete</button>
          <input
            type="number"
            id="value"
            value={this.state.value}
            onChange={
              (event) => {
                this.setState({value: event.target.value});
                event.preventDefault();
              }
            }
          />

          <button onClick={this.first_state}>
            &#10096;
          </button>
          <button onClick={this.previous}>
            prev
          </button>
          <button onClick={this.next}>
            next
          </button>
          <button onClick={this.last_state}>
            &#10097;
          </button>
      </div>
    );
  }
}


export default TreeRenderer;
