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
            })
        });
        it('insert many nodes', () => {
            const tree = new RBT();
            const inserted = [3, 2, 1, 4, 5, 7, 6, 16, 15, 14, 10, 9, 8];
            const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16];
            const height = 5;

            inserted.forEach(val => tree.insert(val));
            should.deepEqual(tree.inorder(), result);
            should.equal(tree.getHeight(), height);
            // should.deepEqual(tree.inorder(), result);
        })
    });
});
