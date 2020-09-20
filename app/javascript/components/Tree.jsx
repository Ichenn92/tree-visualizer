import { node } from "prop-types";
import React from "react";
import Sketch from "react-p5";


class NodeTree {
    constructor(values) {
        this.root = null;
        for(let val of values) {
            this.add(val);
        }
    }

    add(value) {
        if(!this.root) {
            this.root = {
                value: value,
                left: null,
                right: null,
            };
            return;
        }

        let node = this.root;
        while(true) {
            if(node.value < value) {
                if(node.right)
                    node = node.right;
                else {
                    node.right = {
                        value: value,
                        left: null,
                        right: null,
                    };
                    break;
                }
            }
            else {
                if(node.left)
                    node = node.left;
                else {
                    node.left = {
                        value: value,
                        left: null,
                        right: null,
                    };
                    break;
                }
            }

        }
    }

    width(action) {
    }

    preorder(action) {
        if(!this.root)
            return;

        function _preorder(node, depth, action) {
            action(node.value, depth);
    
            ++depth;
            if(node.left)
                _preorder(node.left, depth, action);
            if(node.right)
                _preorder(node.right, depth, action);
            --depth;
        }

        _preorder(this.root, 0, action);
    }

    list() {
        if(!this.root)
            return [];
        
        let nodes = [{
            node: this.root,
            depth: 0,
            parent: null
        }];


        var current_level = [];
        let depth_index = 0;

        var levels = [current_level];

        for(let i = 0; i < nodes.length; ++i) {
            let node = nodes[i].node;
            let depth = nodes[i].depth;
            let parent = nodes[i].parent;

            
            if(depth > depth_index) {
                depth_index = depth;
                current_level = [];
                levels.push(current_level);
            }

            let current_index = current_level.length;
            
            current_level.push({
                value: node.value,
                parent: parent
            });

            if(node.left)
                nodes.push({
                    node: node.left,
                    depth: depth + 1,
                    parent: current_index
                })
            if(node.right)
                nodes.push({
                    node: node.right,
                    depth: depth + 1,
                    parent: current_index
                })
        }

        return levels
    }

};

function default_setup(p5, canvasParentRef) {}
function default_draw(p5) {};


export default (props) => {
    if(props.values.length == 0)
        return <Sketch setup={default_setup} draw={default_draw} />;

    let tree = new NodeTree(props.values);
    let node_levels = tree.list();


    let TREE_HEIGHT = node_levels.length;
    let TREE_WIDTH = 0;
    for(let level of node_levels) {
        if(level.length > TREE_WIDTH)
            TREE_WIDTH = level.length;
    }

    const WIDTH = 500;
    const HEIGHT = 500;

    const MIN_DIM = Math.min(WIDTH, HEIGHT);
    const FONT_SIZE_RATIO = MIN_DIM / 500;
    const FONT_SIZE = Math.floor(32 * FONT_SIZE_RATIO);

    let max_rect_width = WIDTH / (2 * TREE_WIDTH + 1);
    let max_rect_height = HEIGHT / (2 * TREE_HEIGHT + 1);

    const RECT_SIZE = Math.min(max_rect_width, max_rect_height);
    const HALF_RECT = RECT_SIZE / 2;

    const HEIGHT_UNIT = HEIGHT / (2 * TREE_HEIGHT + 1);

    console.log(node_levels);
    console.log(TREE_HEIGHT);
    console.log(TREE_WIDTH);
    console.log(RECT_SIZE);

    let LEVEL_UNITS = [];
    for(let level of node_levels) {
        let unit = WIDTH / (level.length + 1);  // a level is never empty, but we need the distance unit
        LEVEL_UNITS.push(unit);
    }

    console.log("levels units:", LEVEL_UNITS);
 
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        p5.textSize(FONT_SIZE);
    };
 
    const draw = (p5) => {
        p5.background(55);


        for(let depth = 0; depth < node_levels.length; ++depth) {
            let level = node_levels[depth];
            let y = HEIGHT_UNIT * (2 * depth + 1);
            let unit = LEVEL_UNITS[depth];  // a level is never empty, but we need the distance unit
            for(let index = 0; index < level.length; ++index) {  // for .. in take indices as string, since array are dict with Number as key
                let value = level[index].value;
                let parent = level[index].parent;
                let x = unit * (index + 1) - HALF_RECT;  // to center at this position
                
                p5.fill(100);

                if(parent != null) {
                    let previous_unit = LEVEL_UNITS[depth - 1];
                    let parent_x = previous_unit * (parent + 1) - HALF_RECT;
                    let parent_y = HEIGHT_UNIT * (2 * depth - 1) + RECT_SIZE;
                    p5.line(x + HALF_RECT, y, parent_x + HALF_RECT, parent_y);
                }


                p5.fill(100);
                p5.rect(x, y, RECT_SIZE, RECT_SIZE);
                p5.fill(0);
                p5.text(value, x, y);
            }

        }
        
    };
 
    return <Sketch setup={setup} draw={draw} />;
};