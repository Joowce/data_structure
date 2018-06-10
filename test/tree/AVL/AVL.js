const should = require('should');
const AVL = require('../../../src/tree/AVL/AVL');

describe('AVL Tree', () => {
    describe('create', () => {
        it('create Empty Tree', () => {
            const tree = new AVL();
            const height = 0;
            should.equal(tree.getHeight(), height);
        });
    });

    describe('insert', () => {
       it('insert one', () => {
           const tree = new AVL();
           const height = 1;
           const rootData = 1;

           tree.insert(rootData);
           should.equal(tree.getHeight(), height);
           should.equal(tree.root.data, rootData);
       });

        it('rotateR', () => {
            const tree = new AVL();
            const first = 3;
            const second = 2;
            const third = 1;
            const height = 2;

            tree.insert(first);
            tree.insert(second);
            tree.insert(third);

            should.equal(tree.getHeight(), height);
            should.equal(tree.root.data, second);
        });

        it('rotateL', () => {
            const tree = new AVL();
            const first = 1;
            const second = 2;
            const third = 3;
            const height = 2;

            tree.insert(first);
            tree.insert(second);
            tree.insert(third);

            should.equal(tree.getHeight(), height);
            should.equal(tree.root.data, second);
        });

        it('> double rotation', () => {
            const tree = new AVL();
            const first = 6;
            const second = 5;
            const third = 7;
            const fourth = 16;
            const fifth = 15;

            const height = 3;
            const balance = -1;

            tree.insert(first);
            tree.insert(second);
            tree.insert(third);
            tree.insert(fourth);
            tree.insert(fifth);

            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
            should.equal(tree.root.right.root.data, fifth);
        });

        it('< double rotation', () => {
            const tree = new AVL();
            const first = 6;
            const second = 5;
            const third = 15;
            const fourth = 7;
            const fifth = 14;

            const height = 3;
            const balance = -1;

            tree.insert(first);
            tree.insert(second);
            tree.insert(third);
            tree.insert(fourth);
            tree.insert(fifth);

            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
            should.equal(tree.root.right.root.data, fifth);
        });

        it('insert existing data => throw error', () => {
            const tree = new AVL();
            const data = 1;
            tree.insert(data);
            should.throws(() => {
                tree.insert(data);
            });
        });

        it('insert many nodes', () => {
            const tree = new AVL();
            const height = 4;
            const balance = -1;
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];
            const result = [1, 2, 3, 4, 5, 6, 7, 14, 15, 16];

            data.forEach(val => tree.insert(val));
            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
            should.equal(tree.root.data, 4);
            should.deepEqual(tree.inorder(), result);
        })
    });

    describe('delete', () => {
        it('delete root', () => {
            const tree = new AVL();
            const data = [3, 2, 1, 4, 5];
            const afterDeletion = [1, 3, 4, 5];

            data.forEach(val => tree.insert(val));
            const root = tree.root.data;
            tree.delete(root);
            should.deepEqual(tree.inorder(), afterDeletion);
        });

        it('delete leaf', () => {
            const tree = new AVL();
            const data = [3, 2, 1, 4];
            const deleted = 1;

            const afterDeletion = [2, 3, 4];
            const height = 2;
            const balance = 0;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
        });

        it('delete non-leaf, non-root', () => {
            const tree = new AVL();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];
            const deleted = 7;

            const afterDeletion = [1, 2, 3, 4, 5, 6, 14, 15, 16];
            const height = 4;
            const balance = -1;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
        });

        it('deleting empty tree is ok', () => {
            const tree = new AVL();
            const deleted = 1;
            const height = 0;

            tree.delete(deleted);
            should.equal(tree.getHeight(), height);
        });

        it('deleting non-existing tree is no change', () => {
            const tree = new AVL();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const deleted = 13;
            const afterDeletion = [1, 2, 3, 4, 5, 6, 7, 14, 15, 16];
            const height = 4;
            const balance = -1;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
        });

        it('delete no-left-child node', () => {
            const tree = new AVL();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const deleted = [14, 15];
            const afterDeletion = [1, 2, 3, 4, 5, 6, 7, 16];
            const height = 4;
            const balance = -1;

            data.forEach(val => tree.insert(val));
            deleted.forEach(val => tree.delete(val));
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
        });

        it('delete no-right-child node', () => {
            const tree = new AVL();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const deleted = [16, 15];
            const afterDeletion = [1, 2, 3, 4, 5, 6, 7, 14];
            const height = 4;
            const balance = -1;

            data.forEach(val => tree.insert(val));
            deleted.forEach(val => tree.delete(val));
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
        });
    });
});
