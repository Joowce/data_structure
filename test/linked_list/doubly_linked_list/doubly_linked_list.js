const should = require('should');
const DoublyLinkedList = require('../../../src/linked_list/doubly_linked_list/doubly_linked_list');

describe('doubly_linked_list', () => {
    describe('add',() => {
        it('양방향 링크드리스트 생성', () => {
            const list = new DoublyLinkedList();

            should.notEqual(list, null);
            should.equal(list.length(), 0);
        });

        it('head에 노드 추가', () => {
            const list = new DoublyLinkedList();
            const data = 1;
            const target = list.head;
            const newNode = list.add(target, data);

            should.equal(newNode.data, data);
            should.equal(list.length(), 1);
            should.equal(list.head, newNode);
        });

        it('list 중간에 노드 추가', () => {
            const list = new DoublyLinkedList();
            const count = 3;
            const head = list.head;

            const first = list.add(head, 1);
            const third = list.add(first, 3);
            const second = list.add(first, 2);

            should.equal(first.next, second);

            should.equal(second.prev, first);
            should.equal(second.next, third);

            should.equal(third.prev, second);

            should.equal(list.length(), count);
        });
    });

    describe('find', () => {
        it('원하는 data를 가지는 노드 찾기', () => {
            const list = new DoublyLinkedList();
            const data = 1;
            const temp = list.add(list.head, 2);
            const target = list.add(temp, data);

            const found = list.find(data);

            should.equal(found, target);
            should.equal(found.data, data);
        });

        it('찾고자하는 node가 없으면 null', () => {
            const list = new DoublyLinkedList();
            const findingData = 1;
            const actualData = 2;

            const actual = list.add(list.head, actualData);
            const found = list.find(findingData);

            should.notEqual(found, actual);
            should.equal(found, null);
        });

        it('빈 list에 찾으면 null', () => {
            const list = new DoublyLinkedList();
            const findingData = 1;
            const found = list.find(findingData);

            should.equal(found, null);
        });

        it('찾는 data가 null일 때 null', () => {
            const list = new DoublyLinkedList();
            const found = list.find(null);

            should.equal(found, null);
        });
    });

    describe('remove', () => {
       it('첫번쩨 node 삭제', () => {
           const list = new DoublyLinkedList();
           const data = 1;
           list.add(list.head, data);
           const deletedData = list.remove(list.head);

           should.equal(list.count, 0);
           should.equal(deletedData, data);
       });

       it('중간 node 삭제', () => {
           const list = new DoublyLinkedList();
           const first = list.add(list.head, 1);
           const second = list.add(first, 2);
           const third = list.add(second, 3);

           const deletedData = list.remove(second);
           should.equal(deletedData, 2);
       });

       it('마지막 node 삭제', () => {
            const list = new DoublyLinkedList();
            const first = list.add(list.head, 1);
            const second = list.add(first, 2);
            const third = list.add(second, 3);

            const deletdData = list.remove(third);
            should.equal(deletdData, 3);
       });

       it('empty list, remove 수행가능', () => {
            const list = new DoublyLinkedList();
            const deletedData = list.remove(list.head);

            should.equal(deletedData, null);
            should.equal(list.length(), 0);
       });
    });

    describe('toString', () => {
        it('순서에 맞게 string 생성', () => {
            const list = new DoublyLinkedList();
            let current = list.head;
            let expected = '';
            for(let i = 1; i <= 3; i += 1) {
                current = list.add(current, i);
                expected += ( i + ' ' );
            }

            should.deepEqual(list.toString(), expected);
        });

        it('역순서대로 string 생성', () => {
            const list = new DoublyLinkedList();
            let current = list.head;
            let expected = '';

            for(let i = 1; i <= 3; i += 1) {
                current = list.add(current, i);
            }
            for(let i = 3; i >= 1; i -= 1) {
                expected += ( i + ' ' );
            }

            should.deepEqual(list.toReverseString(), expected);
        });

        it('empty list이면 empty string', () => {
            const list = new DoublyLinkedList();

            should.deepEqual(list.toString(), '');
            should.deepEqual(list.toReverseString(), '');
        });
    })
});
