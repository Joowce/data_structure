const Node = require('../node/Node');

// 재귀적 정의 사용
class BST {
    constructor() {
        this.root = null;
        this.height = -1;
    }

    getHeight() {
        if (this.root) return this.height;
        return 0;
    }

    insert(data) {
        const tree = this.root;
        const newNode = new Node(data);

        if (tree === null) {
            this.root = newNode;
            this.root.left = new BST();
            this.root.right = new BST();
        } else if (data < tree.data) {
            this.root.left.insert(data);
        } else if (data > tree.data) {
            this.root.right.insert(data);
        } else {
            throw new Error(`["${data}"] alreay in tree`);
        }
        this.updateHeights(false);
    }

    updateHeights(recurse = true) {
        if (this.root) {
            if (recurse) {
                if (this.root.left) {
                    this.root.left.updateHeights()
                }
                if (this.root.right) {
                    this.root.right.updateHeights()
                }
            }
            this.height = this.root.left.getHeight() > this.root.right.getHeight() ?
                this.root.left.getHeight() + 1 : this.root.right.getHeight() + 1;
        } else {
            this.height = -1;
        }
    }

    getSuccessor () {
        let successor = this.root.right.root;
        if (successor) {
            while (successor.left) {
                if (!successor.left.root) return successor;
                else successor = successor.left.root;
            }
        }
        return successor;
    }

    delete (data) {
        if (!this.root) return;

        if (this.root.data === data) {
            if (!this.root.left.root && !this.root.right.root) {
                this.root = null;
            } else if (!this.root.left.root) {
                this.root = this.root.right.root;
            } else if (!this.root.right.root) {
                this.root = this.root.left.root;
            } else {
                const replacement = this.getSuccessor();
                if (replacement) {
                    this.root.data = replacement.data;
                    this.root.right.delete(replacement.data);
                }
            }
        } else if (this.root.data > data) {
            this.root.left.delete(data);
        } else if (this.root.data < data) {
            this.root.right.delete(data);
        }

        this.updateHeights(false);
    }

    inorder () {
        if (!this.root) return [];

        const result = [];
        const left = this.root.left.inorder();
        for (let idx = 0; idx < left.length; idx += 1){
            result.push(left[idx]);
        }
        result.push(this.root.data);
        const right = this.root.right.inorder();
        for (let idx = 0; idx < right.length; idx += 1){
            result.push(right[idx]);
        }

        return result;
    }

    rotateR () {
        const A = this.root;
        const B = this.root.left.root;
        const T = B.right.root;

        this.root = B;
        B.right.root = A;
        A.left.root = T;
    }

    rotateL () {
        const A = this.root;
        const B = this.root.right.root;
        const T = B.left.root;

        this.root = B;
        B.left.root = A;
        A.right.root = T;
    };
}

module.exports = BST;

