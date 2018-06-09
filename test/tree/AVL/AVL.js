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

            data.forEach(val => tree.insert(val));
            should.equal(tree.getHeight(), height);
            should.equal(tree.balance, balance);
            should.equal(tree.root.data, 4);
        })

    });
});
