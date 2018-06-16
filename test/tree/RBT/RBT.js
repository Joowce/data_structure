const should = require('should');
const RBT = require('../../../src/tree/RBT/RBT');

const RED = 'r';
const BLACK = 'b';

describe('red black tree', () => {

    describe('create', () => {
        it('create empty tree', () => {
            const tree = new RBT();
            const height = 0;

            should.equal(tree.getHeight(), height);
        });
    });

    describe('insert', () => {
        it('insert one, root is black', () => {
            const tree = new RBT();
            const inserted = [1];
            const height = 1;

            inserted.forEach(val => tree.insert(val));

            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), inserted);
            should.ok(tree.isBlack());
        });
        it('insert existing data => error', () => {
            const tree = new RBT();
            const inserted = [3, 2, 1, 4, 5];
            const result = [1, 2, 3, 4, 5];
            const height = 3;

            inserted.forEach(val => tree.insert(val));
            should.equal(tree.getHeight(), height);
            should.deepEqual(tree.inorder(), result);
            should.throws(() => {
                tree.insert(inserted[0]);
            });
        });
        it('insert many nodes', () => {
            const tree = new RBT();
            const inserted = [3, 2, 1, 4, 5, 7, 6, 16, 15, 14, 11, 9, 12, 13];
            const result = [1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15, 16];
            const height = 5;

            inserted.forEach(val => tree.insert(val));
            should.deepEqual(tree.inorder(), result);
            should.equal(tree.getHeight(), height);
        });
    });

    describe('delete', () => {
        it('delete root', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5];
            const afterDeletion = [1, 3, 4, 5];
            const height = 3;

            data.forEach(val => tree.insert(val));
            const root = tree.root;
            tree.delete(root);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete root with only one-side child', () => {
            const tree = new RBT();
            const height = 1;
            let data = [6, 7];
            let afterDeletion = [7];

            data.forEach(val => tree.insert(val));
            let root = tree.root;
            tree.delete(root);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);

            data = [4];
            afterDeletion = [4];

            data.forEach(val => tree.insert(val));
            root = tree.root;
            tree.delete(root);

            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete leaf', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4];
            const deleted = 1;

            const afterDeletion = [2, 3, 4];
            const height = 2;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete non-leaf, non-root', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];
            const deleted = 15;

            const afterDeletion = [1, 2, 3, 4, 5, 6, 7, 14, 16];
            const height = 4;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete non-leaf, non-root with only one-side child', () => {
            const tree = new RBT();
            const data = [7, 8, 4, 3, 5, 2, 6];
            const deleted = [3, 6];

            const afterDeletion = [2, 4, 5, 7, 8];
            const height = 3;

            data.forEach(val => tree.insert(val));
            deleted.forEach(val => tree.delete(val));
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('deleting empty tree is ok', () => {
            const tree = new RBT();
            const deleted = 1;
            const height = 0;

            tree.delete(deleted);
            should.equal(tree.getHeight(), height);
        });

        it('deleting non-existing tree is no change', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const deleted = 13;
            const afterDeletion = [1, 2, 3, 4, 5, 6, 7, 14, 15, 16];
            const height = 5;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-0', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const deleted = 7;
            const afterDeletion = [1, 2, 3, 4, 5, 6, 14, 15, 16];
            const height = 4;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-1', () => {
            const tree = new RBT();
            const data = [3];

            const deleted = 3;
            const afterDeletion = [];
            const height = 0;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-2 : left', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7];

            const deleted = 1;
            const afterDeletion = [2, 3, 4, 5, 6, 7];
            const height = 3;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-2 : right', () => {
            const tree = new RBT();
            const data = [6, 7, 4, 3, 5, 2];

            const deleted = 7;
            const afterDeletion = [2, 3, 4, 5, 6];
            const height = 3;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-3', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const deleted = 6;
            const afterDeletion = [1, 2, 3, 4, 5, 7, 14, 15, 16];
            const height = 4;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-4', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7, 16];

            const deleted = 1;
            const afterDeletion = [2, 3, 4, 5, 6, 7, 16];
            const height = 4;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-5', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 18, 17];

            const deleted = 7;
            const afterDeletion = [1, 2, 3, 4, 5, 6, 16, 17, 18];
            const height = 4;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

        it('delete case-6', () => {
            const tree = new RBT();
            const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14];

            const deleted = 2;
            const afterDeletion = [1, 3, 4, 5, 6, 7, 14, 15, 16];
            const height = 4;

            data.forEach(val => tree.insert(val));
            tree.delete(deleted);
            should.deepEqual(tree.inorder(), afterDeletion);
            should.equal(tree.getHeight(), height);
        });

    });
});
