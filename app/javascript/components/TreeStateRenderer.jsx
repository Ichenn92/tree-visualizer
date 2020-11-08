import { func, node } from "prop-types";
import React, { useState } from "react";
import Sketch from "react-p5";



function default_setup(p5, canvasParentRef) {}
function default_draw(p5) {};

export default (props) => {
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
    const HEIGHT = (DEPTH + 1) * HEIGHT_UNIT ;

    const FONT_SIZE = 20;

    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);
    const [ dragging, setDragging ] = useState(false);
    const [ scale, setScale ] = useState(1);
    const [ offsetX, setOffsetX ] = useState((WIDTH_SIZE - WIDTH) / 2);
    const [ offsetY, setOffsetY ] = useState(0);


    function onWheel(e) {
        e.preventDefault();
        // Based on: https://stackoverflow.com/questions/57131714/create-zoom-effect-with-p5-js
        let delta = e.deltaY > 0 ? 1.05 : 0.95;
        setScale(scale * delta);
        setOffsetX(e.clientX * (1 - delta) + offsetX * delta);
        setOffsetY(e.clientY * (1 - delta) + offsetY * delta);
        
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

    }


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(WIDTH_SIZE, HEIGHT_SIZE).parent(canvasParentRef);
        p5.textSize(FONT_SIZE);
    };
 
    const draw = (p5) => {
        p5.background('#424B54');

        p5.translate(offsetX, offsetY);
        p5.scale(scale);

        let nodes = node_levels.list;
        for(let node of nodes) {  // for .. in take indices as string, since array are dict with Number as key
            let value = node.value;
            let parent = node.parent;
            let index = node.index;
            let depth = node.depth;
            let current = node.current;

            let unit = WIDTH / (Math.pow(2, depth) + 1);
            let x = unit * (index + 1) - HALF_RECT;  // to center at this position
            let y = HEIGHT_UNIT * (depth + 1);
            
            p5.fill(100);

            if(parent != null) {
                let previous_unit = WIDTH / (Math.pow(2, depth - 1) + 1);;
                let parent_x = previous_unit * (parent + 1) - HALF_RECT;
                let parent_y = HEIGHT_UNIT * depth + RECT_SIZE;
                // let parent_y = HEIGHT_UNIT * (2 * depth - 1) + RECT_SIZE;
                p5.line(x, y, parent_x, parent_y - RECT_SIZE);
            }

            let color = '#4CABE5';
            if(current)
                color = 200;

            p5.fill(color);
            p5.circle(x, y, RECT_SIZE);
            p5.fill(0);
            p5.text(value, x, y);
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
