
class NodeTree {
    constructor(values) {
        this.states = [];
        this.root = null;
        for(let val of values) {
            this.add(val, false);
        }
        this.save_state();
    }

    add(value, save=true) {
        value = parseInt(value);  // prevent receiving negative value as string
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
            if(save)
                this.save_state(node);
            if(node.value < value) {
                if(node.right)
                    node = node.right;
                else {
                    node.right = {
                        value: value,
                        left: null,
                        right: null,
                    };
                    if(save)
                        this.save_state(node.right);
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
                    if(save)
                        this.save_state(node.left);
                    break;
                }
            }

        }
        if(save)
            this.save_state();
    }

    _pop_node(node) {
        this.save_state(node);
        if(node.left && node.right) {
            let previous = node;
            let current = node.left;
            while(current.right) {
                previous = current;
                current = current.right;
            }
            node.value = current.value;
            if(previous == node)
                node.left = current.left;
            else
                previous.right = current.left;
            return node;
        }
        
        return node.left || node.right;

    }

    delete(value, save=true) {
        if(!this.root)
            return;

        let node = this.root;
        if(node.value == value) {
            this.root = this._pop_node(this.root);
        }

        while(node) {
            if(save)
                this.save_state(node);

            if(node.value < value) {
                if(node.right && node.right.value == value) {
                    node.right = this._pop_node(node.right);
                    break;
                }
                node = node.right;
            }
            else {
                if(node.left && node.left.value == value) {
                    node.left = this._pop_node(node.left);
                    break;
                }
                node = node.left;
            }

        }
        if(save)
            this.save_state();
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

    save_state(current=null) {
        if(current != null)
            current.isCurrent = true;

        this.states.push(this.list());

        if(current != null)
            delete current.isCurrent;
    }

    list() {
        if(!this.root)
            return {
                depth: 0,
                list: []
            };
        
        let nodes = [{
            node: this.root,
            depth: 0,
            index: 0,
            parent: null,
            current: this.root.isCurrent
        }];

        let res = [];

        let max_depth = 0;

        for(let i = 0; i < nodes.length; ++i) {
            let data = nodes[i]
            let node = data.node;
            let depth = data.depth;
            let index = data.index;
            let parent = data.parent;

            
            if(depth > max_depth) {
                max_depth = depth;
            }

            res.push({
                value: node.value,
                depth: depth,
                index: index,
                parent: parent,
                current: node.isCurrent
            });

            if(node.left)
                nodes.push({
                    node: node.left,
                    depth: depth + 1,
                    index: 2 * index,
                    parent: index
                })
            if(node.right)
                nodes.push({
                    node: node.right,
                    depth: depth + 1,
                    index: 2 * index + 1,
                    parent: index
                })
        }

        return {
            depth: max_depth,
            list: res
        };
    }

};

export default NodeTree;
