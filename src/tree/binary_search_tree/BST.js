
// 재귀적 정의 사용
class BST {
    constructor() {
        this.root = null;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.height = -1;
    }
    isLeftChild () {
        if (!this.parent) return false;
        return this === this.parent.left;
    }

    isRightChild() {
        if (!this.parent) return false;
        return this === this.parent.right;
    }

    isRoot () {
        return this.parent === null;
    }

    isLeaf() {
        return this.left === null && this.right === null;
    }

    getHeight() {
        if (this.root) return this.height;
        return 0;
    }

    insert(data) {
        if (this.root === null) {
            this.root = data;
            this.updateTree();
            return this;
        }
        let dir;
        if (this.root < data) dir = 'right';
        else if (this.root > data) dir = 'left';
        else throw new Error(`["${data}"] already in tree`);

        if (!this[dir]) {
            const newTree = this.makeNewTree();
            newTree.root = data;
            newTree.parent = this;
            this[dir] = newTree;
            newTree.updateTree();
        } else {
            this[dir].insert(data);
        }
        this.updateTree();
    }

    updateTree() {
        this.updateHeights(false);
    }

    updateHeights(recurse = true) {
        if (this.root) {
            if (recurse) {
                if (this.left) {
                    this.left.updateHeights()
                }
                if (this.right) {
                    this.right.updateHeights()
                }
            }
            if (this.left && this.right) {
                this.height = this.left.getHeight() > this.right.getHeight() ?
                    this.left.getHeight() + 1 : this.right.getHeight() + 1;
            } else if (this.left) {
                this.height = this.left.getHeight() + 1;
            } else if (this.right) {
                this.height = this.right.getHeight() + 1;
            } else this.height = 1;
        } else {
            this.height = -1;
        }
    }

    getSuccessor () {
        let successor = this.right;
        if (successor) {
            while (successor.left) {
                if (!successor.left) return successor;
                else successor = successor.left;
            }
        }
        return successor;
    }

    delete (data) {
        if (this.root === data) {
            if (this.isLeaf()) {
                // 노드의 총 개수가 1개일 때
                if (this.isRoot()) this.root = null;
                else if (this.isRightChild()) this.parent.right = null;
                else if (this.isLeftChild()) this.parent.left = null;
            } else if (!this.right) { // left child만을 가질 때
                if (this.isRoot()) {
                    this.root = this.left.root;
                    this.right = this.left.right;
                    this.left = this.left.left;
                }
                else if (this.isRightChild()) this.parent.right = this.left;
                else if (this.isLeftChild()) this.parent.left = this.left;
            } else if (!this.left) { // right child만을 가질 때
                if (this.isRoot()) {
                    this.root = this.right.root;
                    this.left = this.right.left;
                    this.right = this.right.right;
                }
                else if (this.isRightChild()) this.parent.right = this.right;
                else if (this.isLeftChild()) this.parent.left = this.right;
            } else { // 둘다 가질 때
                const successor = this.getSuccessor();
                this.root = successor.root;
                this.right.delete(successor.root);
            }
        } else {
            let dir;
            if (this.root < data) dir = 'right';
            else if (this.root > data) dir = 'left';

            if (!this[dir]) return;
            this[dir].delete(data);
        }

        this.updateTree();
    }

    inorder () {
        if (!this.root) return [];

        const result = [];
        if (this.left) {
            const left = this.left.inorder();
            for (let idx = 0; idx < left.length; idx += 1){
                result.push(left[idx]);
            }
        }
        result.push(this.root);

        if(this.right) {
            const right = this.right.inorder();
            for (let idx = 0; idx < right.length; idx += 1){
                result.push(right[idx]);
            }
        }

        return result;
    }

    makeNewTree() {
        return new BST();
    }

    rotateR () {
        const pivot = this.left;
        const right = this.right;
        const childLeft = pivot.left;
        const root = this.root;

        this.root = pivot.root;
        pivot.root = root;

        this.right = pivot;
        this.left = childLeft;

        pivot.left = pivot.right;
        pivot.right = right;

        if (this.right) this.right.parent = this;
        if (this.left) this.left.parent = this;
        if (pivot.right) pivot.right.parent = pivot;
        if (pivot.left) pivot.left.parent = pivot;
    }

    rotateL () {
        const pivot = this.right;
        const left = this.left;
        const childRight = pivot.right;
        const root = this.root;

        this.root = pivot.root;
        pivot.root = root;

        this.left = pivot;
        this.right = childRight;

        pivot.right = pivot.left;
        pivot.left = left;

        if (this.right) this.right.parent = this;
        if (this.left) this.left.parent = this;
        if (pivot.right) pivot.right.parent = pivot;
        if (pivot.left) pivot.left.parent = pivot;
    };
}

module.exports = BST;

