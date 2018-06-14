// const Node = require('../node/Node');
const BST = require('../binary_search_tree/BST');

const RED = 'r';
const BLACK = 'b';


class RBT extends BST {
    constructor() {
        super();
        // nil node is Black
        this.color = BLACK;
    }
    paintBlack () {
        if (!this.root) return;
        this.color = BLACK;
    }
    paintRed () {
        if (!this.root) return;
        this.color = RED;
    }
    isBlack () {
        return this.color === BLACK;
    }
    isRed () {
        return this.color === RED;
    }

    getGrandparent () {
        const parentTree = this.parent;
        if (parentTree) return parentTree.parent;
        return null;
    }

    getUncle () {
        const grandparentTree = this.getGrandparent();
        if (!grandparentTree) return null;
        if (this.parent.isLeftChild()) return grandparentTree.right;
        else return grandparentTree.left;
    }

    _insert1() {
        if (this.parent === null) this.paintBlack();
        else this._insert2();
    }

    _insert2() {
        if (this.parent.isBlack()) return;
        this._insert3();
    }

    _insert3() {
        const uncleTree = this.getUncle();
        if (uncleTree && uncleTree.isRed()) {
            this.parent.paintBlack();
            uncleTree.paintBlack();
            const grandparentTree = this.getGrandparent();
            grandparentTree.paintRed();
            grandparentTree._insert1();
            return;
        }
        this._insert4();
    }

    _insert4() {
        const parentTree = this.parent;
        if (this.isRightChild() && parentTree.isLeftChild()) {
            parentTree.rotateL();

        } else if (this.isLeftChild()&& parentTree.isRightChild()){
            parentTree.rotateR();
        }
        this._insert5();
    }

    _insert5() {
        const grandparentTree = this.getGrandparent();
        this.parent.paintBlack();
        grandparentTree.paintRed();
        console.log('5', this.root, grandparentTree.root, grandparentTree.color);
        if (this.isLeftChild()) grandparentTree.rotateR();
        else grandparentTree.rotateL();
    };

    rotateR() {
        const pivot = this.left;
        const right = this.right;
        const childLeft = pivot.left;
        const root = this.root;
        const color = this.color;

        this.root = pivot.root;
        pivot.root = root;
        this.color = pivot.color;
        pivot.color = color;

        this.right = pivot;
        this.left = childLeft;

        pivot.left = pivot.right;
        pivot.right = right;

        if (this.right) this.right.parent = this;
        if (this.left) this.left.parent = this;
        if (pivot.right) pivot.right.parent = pivot;
        if (pivot.left) pivot.left.parent = pivot;
    }

    rotateL() {
        const pivot = this.right;
        const left = this.left;
        const childRight = pivot.right;
        const root = this.root;
        const color = this.color;

        this.root = pivot.root;
        pivot.root = root;

        this.color = pivot.color;
        pivot.color = color;

        this.left = pivot;
        this.right = childRight;

        pivot.right = pivot.left;
        pivot.left = left;

        if (this.right) this.right.parent = this;
        if (this.left) this.left.parent = this;
        if (pivot.right) pivot.right.parent = pivot;
        if (pivot.left) pivot.left.parent = pivot;
    }

    makeNewTree(){
        return new RBT();
    }

    insert(data) {
        if (this.root === null) {
            this.root = data;
            this.paintRed();
            this._insert1();
            this.updateHeights(false);

        } else {
            let dir;
            if (data < this.root) dir = 'left';
            else if (data > this.root) dir = 'right';
            else throw new Error(`["${data}"] already in tree`);

            if (this[dir]) this[dir].insert(data);
            else {
                const newTree = this.makeNewTree();
                newTree.root = data;
                newTree.parent = this;

                this[dir]= newTree;
                newTree.paintRed();
                newTree._insert1();
                newTree.updateHeights(false);
            }
        }
        this.updateHeights(false);
    };
}

module.exports = RBT;
