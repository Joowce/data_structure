const should = require('should');
const BST = require('../../../src/tree/binary_search_tree/BST');

describe('binary search tree', () => {
    describe('create', () => {
        it('create Empty Tree', () => {
            const tree = new BST();
            const height = 0;
            const result = [];

            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });
    });

    describe('insert', () => {
        it('insert one', () => {
            const tree= new BST();
            const inserted = 2;
            const height = 1;
            const result = [inserted];

            tree.insert(inserted);
            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });

        it('insert existing data => error', () => {
            const tree = new BST();
            const inserted = [3, 2, 4];

            inserted.forEach(val => tree.insert(val));
            should.throws(() => {
                tree.insert(inserted[0]);
            });
        });

        it('insert many nodes', () => {
            const tree = new BST();
            const inserted = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const result = [1, 2, 3, 4, 5, 6, 7, 14, 15, 16];
            const height = 8;

            inserted.forEach(val => tree.insert(val));
            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });
    });

    describe('delete', () => {
        it('delete root', () => {
            const tree = new BST();
            const inserted = [3, 2, 1, 4];
            const result = [1, 2, 4];
            const height = 3;

            inserted.forEach(val => tree.insert(val));

            const root = tree.root;
            tree.delete(root);

            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });

        it('delete leaf', () => {
            const tree = new BST();
            const inserted = [3, 2, 1, 4];
            const leaf = 1;
            const result = [2, 3, 4];
            const height = 2;

            inserted.forEach(val => tree.insert(val));
            tree.delete(leaf);

            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });

        it('delete non-leaf, non-root', () => {
           const tree = new BST();
           const inserted = [5, 2, 1, 4, 3, 6];
           const deleted = 2;
           const result = [1, 3, 4, 5, 6];
           const height = 3;

           inserted.forEach(val => tree.insert(val));
           tree.delete(deleted);

           should.equal(tree.getHeight(), height);
           should.deepEqual(tree.inorder(), result);
        });

        it('deleting empty tree is ok', () =>  {
            const tree = new BST();
            const height = 0;
            const result = [];

            tree.delete(1);
            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });

        it('deleting non-existing tree is no change', () => {
            const tree = new BST();
            const inserted = [5, 2, 1, 4, 3, 6];
            const height = 4;
            const result = [1, 2, 3, 4, 5, 6];

            inserted.forEach(val => tree.insert(val));
            tree.delete(7);
            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });

        it('delete no-left-child node', () => {
            const tree = new BST();
            const inserted = [5, 2, 1, 4, 3, 6];
            const deleted = [1, 2];
            const height = 3;
            const result = [3, 4, 5, 6];

            inserted.forEach(val => tree.insert(val));
            deleted.forEach(val => tree.delete(val));

            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });

        it('delete no-right-child node', () => {
            const tree = new BST();
            const inserted = [5, 2, 1, 4, 3, 6];
            const deleted = [3, 4, 2];
            const height = 2;
            const result = [1, 5, 6];

            inserted.forEach(val => tree.insert(val));
            deleted.forEach(val => tree.delete(val));

            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
        });
    });

    describe('getSuccessor', () => {
        it('get successor', () => {
            const tree = new BST();
            const inserted = [5, 2, 1, 4, 3, 6];
            const successorData = 6;

            inserted.forEach(val => tree.insert(val));

            const successor = tree.getSuccessor();
            should.equal(successor.root, successorData);
        });

        it('no successor', () => {
            const tree = new BST();
            const inserted = [6, 4, 3, 5];

            inserted.forEach(val => tree.insert(val));

            const successor = tree.getSuccessor();
            should.equal(successor, null);
        });
    });
});
