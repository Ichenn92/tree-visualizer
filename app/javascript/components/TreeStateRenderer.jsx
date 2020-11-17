import { func, node } from "prop-types";
import React, { useState } from "react";
import Sketch from "react-p5";



function default_setup(p5, canvasParentRef) {}
function default_draw(p5) {};

export default (props) => {

    function onChangeOffset(x, y) {
        if(props.onChangeOffset)
            props.onChangeOffset(x, y);
    }

    function onChangeScale(scale) {
        if(props.onChangeScale)
            props.onChangeScale(scale);
    }

    const BG_COLOR = props.bgColor || "#424B54";
    const NODE_COLOR = props.nodeColor || "#4CABE5";
    const ACTIVE_NODE_COLOR = props.activeNodeColor || 200;

    // Sizes of the canvas
    const WIDTH_SIZE = props.width || 500;
    const HEIGHT_SIZE = props.height || 500;

    let node_levels = props.state || { depth: 0, list: [] };

    const WIDTH_UNIT = 100;
    const HEIGHT_UNIT = 100;

    const RECT_SIZE = 50;
    const HALF_RECT = RECT_SIZE / 2;

    const DEPTH = node_levels.depth;
    const MAX_NODE_PER_LINE = Math.pow(2, DEPTH);

    // Dimensions of the tree
    const WIDTH = (MAX_NODE_PER_LINE + 1) * WIDTH_UNIT;
    // const HEIGHT = (DEPTH + 1) * HEIGHT_UNIT;

    const FONT_SIZE = 20;

    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);
    const [ dragging, setDragging ] = useState(false);
    const [ scale, setScale ] = useState(props.scale || 1);
    const [ offsetX, setOffsetX ] = useState(props.offsetX || ((WIDTH_SIZE - WIDTH) / 2));
    const [ offsetY, setOffsetY ] = useState(props.offsetY || 0);

    function onWheel(e) {
        e.preventDefault();
        // Based on: https://stackoverflow.com/questions/57131714/create-zoom-effect-with-p5-js
        let delta = e.deltaY > 0 ? 1.05 : 0.95;
        setScale(scale * delta);
        setOffsetX(e.clientX * (1 - delta) + offsetX * delta);
        setOffsetY(e.clientY * (1 - delta) + offsetY * delta);
        onChangeScale(scale);
        onChangeOffset(offsetX, offsetY);
    }

    function onMouseUp(e) {
        e.preventDefault();
        setDragging(false);
    }

    function onMouseLeave(e) {
        e.preventDefault();
        setDragging(false);
    }


    function onMouseDown(e) {
        e.preventDefault();
        setDragging(true);
        setMouseX(e.clientX);
        setMouseY(e.clientY);
    }

    function onMouseMove(e) {
        e.preventDefault();
        if(!dragging)
            return;

        setOffsetX(offsetX + e.clientX - mouseX);
        setOffsetY(offsetY + e.clientY - mouseY);
        setMouseX(e.clientX);
        setMouseY(e.clientY);

        onChangeOffset(offsetX, offsetY);
    }


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(WIDTH_SIZE, HEIGHT_SIZE).parent(canvasParentRef);
        p5.rectMode(p5.CENTER);
        p5.textSize(FONT_SIZE);
        p5.textAlign(p5.CENTER, p5.CENTER);
    };
 
    const draw = (p5) => {
        p5.background(BG_COLOR);

        p5.translate(offsetX, offsetY);
        p5.scale(scale);

        let nodes = node_levels.list;
        p5.fill(100);
        for(let node of nodes) {  // for .. in take indices as string, since array are dict with Number as key
            let parent = node.parent;
            let index = node.index;
            let depth = node.depth;

            let unit = WIDTH / (Math.pow(2, depth) + 1);
            let x = unit * (index + 1) - HALF_RECT;  // to center at this position
            let y = HEIGHT_UNIT * (depth + 1);
            

            if(parent != null) {
                let previous_unit = WIDTH / (Math.pow(2, depth - 1) + 1);;
                let parent_x = previous_unit * (parent + 1) - HALF_RECT;
                let parent_y = HEIGHT_UNIT * depth + RECT_SIZE;
                p5.line(x, y, parent_x, parent_y - RECT_SIZE);
            }
        }
        for(let node of nodes) {  // for .. in take indices as string, since array are dict with Number as key
            let value = node.value;
            let index = node.index;
            let depth = node.depth;
            let current = node.current;

            let unit = WIDTH / (Math.pow(2, depth) + 1);
            let x = unit * (index + 1) - HALF_RECT;  // to center at this position
            let y = HEIGHT_UNIT * (depth + 1);

            let color = NODE_COLOR;
            if(current)
                color = ACTIVE_NODE_COLOR;

            p5.fill(color);
            p5.circle(x, y, RECT_SIZE);
            // p5.fill(150);
            // p5.rect(x, y, RECT_SIZE, RECT_SIZE);
            p5.fill(0);
            p5.text(value, x, y, RECT_SIZE, RECT_SIZE);
        }
        
    };
    return (
        <div
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            onMouseLeave={ onMouseLeave }
            onMouseMove={ onMouseMove }
            onWheel={ onWheel }
            style={ {display: "inline-block"} }
            height={HEIGHT_SIZE}
            width={WIDTH_SIZE}
        >
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};
