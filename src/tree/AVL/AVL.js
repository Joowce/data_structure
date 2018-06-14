const BST = require('../binary_search_tree/BST');


class AVL extends BST {
    constructor() {
        super();
        this.balance = 0;
    }

    /**
     * O(h) 소요
     *
     * 이진 탐색 트리에서의 삽입 : O(h)
     * AVL 트리는 추가로, 삽입 후에 Balance를 계산하고, rotation을 수행
     *
     * Balance 계산: O(h)
     * => 루트노드에서 새 leaf node까지의 경로에 있는 모든 노드들을 계산해야 하므로 O(h)
     * rotation : O(1)
     * => linked list로 구현해 부모자식의 관계만 변경하면 됨. single, double 둘다 O(1)
     *
     * 삽입 및 balance 계산 및 rotation 수행 => O(h)
     *
     * AVL 트리의 노드수가 n개일 때 높이 h의 하한은 2 * logn
     * O(h) = O(logn)
     * @param data
     */

    updateTree() {
        this.rebalance();
    }

    updateBalances(recurse = true) {
        if (this.root) {
            if (recurse) {
                if (this.left) {
                    this.left.updateBalances();
                }
                if (this.right) {
                    this.right.updateBalances();
                }
            }
            const leftHeight = this.left ? this.left.getHeight() : 0;
            const rightHeight = this.right ? this.right.getHeight() : 0;
            this.balance = leftHeight - rightHeight;
        } else {
            this.balance = 0;
        }
    }

    makeNewTree() {
        return new AVL();
    }

    rebalance() {
        this.updateBalances(false);
        this.updateHeights(false);
        while (this.balance < -1 || this.balance > 1) {
            if (this.balance < -1) {
                if (this.right.balance > 0) {
                    this.right.rotateR();
                    this.updateHeights();
                    this.updateBalances();
                }
                this.rotateL();
                this.updateHeights();
                this.updateBalances();
            }
            if (this.balance > 1) {
                if (this.left.balance < 0) {
                    this.left.rotateL();
                    this.updateHeights();
                    this.updateBalances();
                }
                this.rotateR();
                this.updateHeights();
                this.updateBalances();
            }
        }
    }
}

module.exports = AVL;

