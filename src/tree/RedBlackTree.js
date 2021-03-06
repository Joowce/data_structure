const BinarySearchTree = require('./BinarySearchTree');
/**
 * 레드-블랙 트리
 * self-balancing binary tree
 * 연관 배열을 구현하는데 사용
 * AVL보다는 roughly balanced tree
 * 검색, 삽입, 삭제에서 최악의 경우에도 일정한 실행 시간 보장
 * 함수형 프로그래밍에서 많이 사용
 *
 * 각각의 노드가 레드나 블랙인 색상 속성을 가짐
 * 1. 노드는 레드 혹은 블랙
 * 2. 루트 노드는 블랙
 * 3. 모든 리프노드는 블랙
 * 4. 레드노드의 양쪽 자식 노드는 항상 블랙노드 => 레드노드의 부모로 레드 노드가 될 수 없음
 * 5. 루트부터 리프노드까지의 모든 경로는 같은 수의 블랙노드 있음
 * 루트노드로부터 가장 긴 경로는 짧은 경로의 2개 밖에 나지 않았음
 * 모든 속성을 만족하기 위해, null leaf사용
 * null leaf 자료를 가지고 있지 않고, 트리의 끝에만 사용됨
 *
 * < 삽입 >
 *     binary-search-tree와 동일하게 노드를 삽입한 뒤, 삽입한 노드를 레드노드로 시작한다
 *     주위의 색에 따라, 후에 색이 결정된다
 *     노드를 삽입할 위치 결정 : O(logn)
 *     색전환 및 회전 : O(1)
 *     => O(logn)
 * < 삭제 >
 *     자식노드의 수에 따 로직이 달라짐
 *     최대 3번의 회전을 넘지 않음
 *     => O(logn)
 *
 */
const RED = 'r';
const BLACK = 'b';


class RedBlackTree extends BinarySearchTree {
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
        return new RedBlackTree();
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


    delete (data) {
        if (this.root === data) {
            if (!this.right || !this.left) this._delete0();
            if (this.isLeaf()) {
                if (this.isRoot()) {
                    this.root = null;
                    this.paintBlack();
                } else if (this.isRightChild()) {
                    this.parent.right = null;
                } else if (this.isLeftChild()) {
                    this.parent.left = null;
                }
            } else if (!this.right) { // left child 만을 가질 때
                if (this.isRoot()) {
                    this.root = this.left.root;
                    this.right = this.left.right;
                    this.left = this.left.left;
                }
                else if (this.isRightChild()) this.parent.right = this.left;
                else if (this.isLeftChild()) this.parent.left = this.left;
            } else if (!this.left) { // right child 만을 가질 때
                if (this.isRoot()) {
                    this.root = this.right.root;
                    this.left = this.right.left;
                    this.right = this.right.right;
                }
                else if (this.isRightChild()) this.parent.right = this.right;
                else if (this.isLeftChild()) this.parent.left = this.right;
            } else {
                const replacement = this.getSuccessor();
                this.root = replacement.root;
                this.right.delete(replacement.root);
            }
        } else {
            let dir;

            if (this.root > data) dir = 'left';
            else if (this.root < data) dir = 'right';

            if(!this[dir]) return;
            this[dir].delete(data);
        }

        this.updateHeights(true);
    }

    _delete0() {
        const child = this.left ? this.left : this.right;
        if (this.isBlack()) {
            if(child && child.isRed()) child.paintBlack();
            else this._delete1() // 현재 노드가 black인데 자식노드는 black or null node
        }
    }
    _delete1() {
        if (!this.isRoot()) this._delete2();
    }
    _delete2() {
        const sibling = this.getSibling();

        if (sibling && sibling.isRed()) {
            this.parent.paintRed();
            sibling.paintBlack();
            if (this.isLeftChild()) {
                this.parent.rotateL();
            } else if (this.isRightChild()) {
                this.parent.rotateR();
            }
        }
        this._delete3();
    }
    _delete3() {
        const sibling = this.getSibling();
        const isSiblingBlack = sibling ? sibling.isBlack() : true;
        const isSiblingLeftBlack = sibling.left ? sibling.left.isBlack() : true;
        const isSiblingRightBlack = sibling.right ? sibling.right.isBlack() : true;

        if (this.parent.isBlack() && isSiblingBlack && isSiblingLeftBlack && isSiblingRightBlack) {
            sibling.paintRed();
            this.parent._delete1();
        } else {
            this._delete4();
        }
    }
    _delete4() {
        const sibling = this.getSibling();
        const isSiblingBlack = sibling ? sibling.isBlack() : true;
        const isSiblingLeftBlack = sibling.left ? sibling.left.isBlack() : true;
        const isSiblingRightBlack = sibling.right ? sibling.right.isBlack() : true;

        if (this.parent.isRed() && isSiblingBlack && isSiblingRightBlack && isSiblingLeftBlack) {
            sibling.paintRed();
            this.parent.paintBlack();
        } else {
            this._delete5();
        }
    }
    _delete5() {
        const sibling = this.getSibling();
        const isSiblingBlack = sibling ? sibling.isBlack() : true;
        const isSiblingLeftBlack = sibling.left ? sibling.left.isBlack() : true;
        const isSiblingRightBlack = sibling.right ? sibling.right.isBlack() : true;

        if (isSiblingBlack) {
            if (this.isLeftChild() && !isSiblingLeftBlack && isSiblingRightBlack) {
                sibling.paintRed();
                if (sibling.left) sibling.left.paintBlack();
                sibling.rotateR();
            } else if (this.isRightChild() && isSiblingLeftBlack && !isSiblingRightBlack) {
                sibling.paintRed();
                if (sibling.right) sibling.right.paintBlack();
                sibling.rotateL();
            }
        }

        this._delete6();
    }
    _delete6() {
        const sibling = this.getSibling();
        if (sibling) this.parent.isBlack ? sibling.paintBlack() : sibling.paintRed();
        this.parent.paintBlack();
        if (this.isLeftChild()) {
            if (sibling.right) sibling.right.paintBlack();
            this.parent.rotateL();
        } else if (this.isRightChild()) {
            if (sibling.left) sibling.left.paintBlack();
            this.parent.rotateR();
        }
    }
}

module.exports = RedBlackTree;
