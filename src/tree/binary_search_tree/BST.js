/**
 * < Binary Search Tree >
 *     이원 트리 자료구조 중에 아래의 속성을 만족하는 자료구조
 *
 *      각 노드는 값을 가지, 어떤 두 원소도 동일한 키를 가지고 있지 않음
 *      왼쪽 서브트리에 있는 모든 값들은 루트의 값보다 작음
 *      오른쪽 서브트리에 있는 모든 값들은 루트의 값보다 큼
 *      왼쪽, 오른쪽 서브트리 모두 이진 탐색 트리
 *
 *      < 탐색 >
 *          k가 루트의 키보다 작다면 왼쪽 서브트리를 탐색
 *          k가 루트의 키보다 크다면 오른쪽 서브트리를 탐색
 *          => O(h) 소요 (이때 h는 트리의 높이 값)
 *
 *     < 삽입 >
 *         탐색 수행 후 실패한 자리에서 삽입수행
 *         탐색 : O(h), 삽입 : O(1)
 *         O(h) + O(1) = O(h)
 *         => O(h)
 *
 *     < 삭제 >
 *         리프 노드의 삭제는 간단
 *         차수가 1인 노드는 해당 노드를 삭제 후 그 위치에 자식노드를 위치
 *         차수가 2인 노드는 왼쪽서브트리에서 가장 큰 노드나 오른쪽 서브트리에서 가장 작은 노드 대체후 대체노드에 대해서 삭제연산 수행
 *         대체될 노드를 탐색 : O(h), 대체 노드 삭제: O(1)
 *         => O(h)
 *
 *    트리의 높이에 따라 탐색, 삽입, 삭제의 시간복잡도가 결
 */
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

    getSibling () {
        if (!this.parent) return null;
        if (this.isRightChild()) return this.parent.left;
        else if (this.isLeftChild()) return this.parent.right;
        return null;
    }

    /**
     * 삽입 연산
     * @param data : 추가하고자 하는 노드의 값
     */
    insert(data) {
        if (this.root === null) {
            this.root = data;
            this.updateTree();
            return this;
        }
        let dir;
        // 추가하고자 하는 값이 root보다 크면 오른쪽 서브트리로
        if (this.root < data) dir = 'right';
        // 추가하고자 하는 값이 root보다 작으면 왼쪽 서브트리로
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
        // 트리정보 갱신
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

    /**
     * 삭제 연산시에 차수가 2인 노드일 경우 오른쪽 서브트리에서 가장 작은 노드를 가져옴
     * 해당 트리에서 오른쪽 서브트리 중 가장 작은 값을 가지는 노드 출력
     */
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

    /**
     * 삭제 연산
     * 탐색 수행 후 해당 노드의 차수에 따라 삭제연산 수행
     * O(h) 소요
     * @param data
     */
    delete (data) {
        if (this.root === data) {
            if (this.isLeaf()) {
                /**
                 * 자식 노드가 없으면 해당 노드 삭제
                 */
                if (this.isRoot()) this.root = null;
                else if (this.isRightChild()) this.parent.right = null;
                else if (this.isLeftChild()) this.parent.left = null;
            } else if (!this.right) {
                /**
                 * 왼쪽 서브트리만 가질 경우, 해당 자리에 왼쪽 서브트리를 위치
                 */
                if (this.isRoot()) {
                    this.root = this.left.root;
                    this.right = this.left.right;
                    this.left = this.left.left;
                }
                else if (this.isRightChild()) this.parent.right = this.left;
                else if (this.isLeftChild()) this.parent.left = this.left;
            } else if (!this.left) {
                /**
                 * 오른쪽 서브트리만 가질 경우, 해당 자리에 오른쪽 서브트리를 위치
                 */
                if (this.isRoot()) {
                    this.root = this.right.root;
                    this.left = this.right.left;
                    this.right = this.right.right;
                }
                else if (this.isRightChild()) this.parent.right = this.right;
                else if (this.isLeftChild()) this.parent.left = this.right;
            } else {
                /**
                 * 차수가 2인 경우 오른쪽 서브트리 중 가장 작은 노드 가져옴
                 * => O(h) 소요
                 */
                const successor = this.getSuccessor();
                this.root = successor.root;
                this.right.delete(successor.root);
            }
        } else {
            /**
             * data가 root보다 크면 오른쪽 서브트리로 이동
             * data가 root보다 작으면 왼쪽 서브트리로 이동
             */
            let dir;
            if (this.root < data) dir = 'right';
            else if (this.root > data) dir = 'left';

            if (!this[dir]) return;
            this[dir].delete(data);
        }

        this.updateTree();
    }

    /**
     * tree를 inorder순서로 출력하는 함수
     * binary search tree를 inorder로 순회하면 정렬된 array가 출력
     * @returns {Array}
     */
    inorder () {
        /**
         * tree에 아무것도 없는 경우
         */
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

    /**
     * 오른쪽으로 회전
     * root값을 왼쪽자식의 값으로 변경
     * root를 왼쪽자식의 오른쪽자식으로 변경
     * 기존에 있던 왼쪽자식의 오른쪽 자식은 root의 왼쪽자식으로 변경
     */
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

    /**
     * 왼쪽으로 회전
     * root값을 오른쪽 자식의 값으로 변경
     * root값을 오른쪽 자식의 왼쪽자식으로 변경
     * 기존에 있던 오른쪽 자식의 왼쪽자식을 root의 오른쪽 자식으로 변경
     */
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

