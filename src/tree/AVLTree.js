const BinarySearchTree = require('./BinarySearchTree');

/**
 * AVL Tree
 * 가장 초기에 나온 balanced tree
 * 각 노드는 오른쪽 자식트리와 왼쪽 자식 트리의 높이 차이를 가짐
 * 그리고 그 차이는 1 이하
 * < 높이 균형 성질 >
 *     모든 노드에 대해서 그 자식들의 높이 차이가 최대 1이다
 * 이를 만족하는 이진탐색트리는 AVL tree
 * AVL tree의 높이 : logn
 * < 검색 >
 *     검색은 높이에 영향을 받음 => O(logn)
 * < 삽입 >
 *     이진 탐색 트리에서의 삽입 : O(h)
 *     AVL 트리는 추가로, 삽입 후에 Balance를 계산하고, rotation을 수행
 *     Balance 계산: O(h)
 *     => 루트노드에서 새 leaf node까지의 경로에 있는 모든 노드들을 계산해야 하므로 O(h)
 *     rotation : O(1)
 *     => linked list로 구현해 부모자식의 관계만 변경하면 됨. single, double 둘다 O(1)
 *     삽입 및 balance 계산 및 rotation 수행 => O(h)
 *     AVL 트리의 노드수가 n개일 때 높이 h의 하한은 2 * logn
 *     O(h) = O(logn)
 * < 삭제 >
 *     삭제 위해 대체 노드 결정 : O(logn)
 *     삭제 후 balance 계산 : O(logn)
 *     rotation : O(1)
 *     => O(logn)
 */

class AVLTree extends BinarySearchTree {
    constructor() {
        super();
        this.balance = 0;
    }



    /**
     * Balance 계산하는 method
     *
     * 왼쪽트리의 height와 오른쪽트리의 height를 뺀값으로 balance 측정
     * balance > 0 => 왼쪽 트리 > 오른쪽 트리
     * balance = 0 => balanced (둘의 높이가 같음)
     * balance < 0 => 왼쪽 트리 < 오른쪽 트리
     */
    updateBalances() {
        if (this.root) {
            const leftHeight = this.left ? this.left.getHeight() : 0;
            const rightHeight = this.right ? this.right.getHeight() : 0;
            this.balance = leftHeight - rightHeight;
        } else {
            this.balance = 0;
        }
    }

    updateTree() {
        this.rebalance();
    }

    makeNewTree() {
        return new AVLTree();
    }

    /**
     * balance 계산 후
     * balance가 어긋난 노드는 rotate 수행
     *
     * < balance가 어긋난 4가지 경우 >
     * 1. LL (/) => rotateR
     * 2. RR (\) => rotateL
     * 3. RL (<) => rotateL, rotateR
     * 4. LR (>) => rotateR, rotateL
     *
     * balance 계산 : O(logn)
     * 회전 : O(1)
     * => O(logn)
     */
    rebalance() {
        // balance 계산
        this.updateBalances();
        this.updateHeights(false);
        // balance가 어긋날때
        while (this.balance < -1 || this.balance > 1) {
            // 오른쪽이 더 길 때
            if (this.balance < -1) {
                // LR => rotateR, rotateL
                if (this.right.balance > 0) {
                    this.right.rotateR();
                    this.updateHeights();
                    this.updateBalances();
                }
                // RR => rotateL
                this.rotateL();
                this.updateHeights();
                this.updateBalances();
            }
            // 왼쪽이 더 길 때
            if (this.balance > 1) {
                // RL => rotateL, rotateR
                if (this.left.balance < 0) {
                    this.left.rotateL();
                    this.updateHeights();
                    this.updateBalances();
                }
                // LL => rotateR
                this.rotateR();
                this.updateHeights();
                this.updateBalances();
            }
        }
    }
}

module.exports = AVLTree;

