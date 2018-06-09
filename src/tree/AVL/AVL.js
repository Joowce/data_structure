const Node = require('../node/Node');
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
    insert(data) {
        const tree = this.root;
        const newNode = new Node(data);

        if (tree === null) {
            this.root = newNode;
            this.root.left = new AVL();
            this.root.right = new AVL();
        } else if (data < tree.data) {
            this.root.left.insert(data);
        } else if (data > tree.data) {
            this.root.right.insert(data);
        } else {
            throw new Error(`["${data}"] alreay in tree`);
        }
        this.rebalance();
    }

    updateBalances(recurse = true) {
        if (this.root) {
            if (recurse) {
                if (this.root.left) {
                    this.root.left.updateBalances();
                }
                if (this.root.right) {
                    this.root.right.updateBalances();
                }
            }
            this.balance = this.root.left.getHeight() - this.root.right.getHeight();
        } else {
            this.balance = 0;
        }
    }

    rebalance() {
        this.updateBalances(false);
        this.updateHeights(false);
        while (this.balance < -1 || this.balance > 1) {
            if (this.balance < -1) {
                if (this.root.right.balance > 0) {
                    this.root.right.rotateR();
                    this.updateHeights();
                    this.updateBalances();
                }
                this.rotateL();
                this.updateHeights();
                this.updateBalances();
            }
            if (this.balance > 1) {
                if (this.root.left.balance < 0) {
                    this.root.left.rotateL();
                    this.updateHeights();
                    this.updateBalances();
                }
                this.rotateR();
                this.updateHeights();
                this.updateBalances();
            }
        }
    }

    delete(data) {
        if (!this.root) return;

        if (this.root.data === data) {
            if (!this.root.left && !this.root.right) {
                this.root = null;
            } else if (!this.root.left) {
                this.root = this.root.right.root;
            } else if (!this.root.right) {
                this.root = this.root.left.root;
            } else {
                const replacement = this.getSuccessor();
                if (replacement) {
                    this.root.data = replacement.data;
                    this.root.right.delete(replacement.data);
                }
            }
        } else if (this.root.data > data) {
            this.root.data.left.delete(data);
        } else if (this.root.data < data) {
            this.root.data.right.delete(data);
        }
        this.rebalance();
    }
}

module.exports = AVL;

