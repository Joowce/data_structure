const should = require('should');
const CircularQueue = require('../../src/circular_queue/circular_queue');

describe('circular queue', () => {
    describe('circular queue 생성', () => {
        it('빈 queue 생성', () => {
            const queue = new CircularQueue();
            should.ok(queue.isEmpty());
        });

        it('queue 생성 시에 max size 설정 가능', () => {
           const maxSize = 4;
           const queue = new CircularQueue(maxSize);

           should.equal(maxSize, queue.getMaxSize());
        });
    });

    describe('add', () => {
        it('queue 맨 마지막 위치에 add', () => {
            const queue = new CircularQueue();
            const first = 1;
            const last = 2;

            queue.add(first);
            queue.add(last);

            const data = queue.getQueue();
            should.equal(data[0], first);
            should.equal(data[1], last);
        });
    });

    describe('delete', () => {
        it('queue 맨 앞의 원소 delete', () => {
            const queue = new CircularQueue();
            const first = 1;
            const second = 2;

            queue.add(first);
            queue.add(second);

            const firstDeleted = queue.delete();
            should.equal(firstDeleted, first);

            const third = 3;

            const secondDeleted = queue.delete();
            should.equal(secondDeleted, second);
        });

        it('empty queue delete return null', () => {
            const queue = new CircularQueue();
            should.ok(queue.isEmpty());

            const deleted = queue.delete();
            should.equal(deleted, null);
        });
    });

    describe('circular', () => {
        it('뒤에 더 이상 자리가 없으면 앞에 추가', () => {
            const queue = new CircularQueue(4);
            const first = 1;
            const second = 2;
            const third = 3;
            const fourth = 4;
            const fifth = 5;

            queue.add(first);
            queue.add(second);
            queue.add(third);

            should.equal(queue.delete(), first);
            should.equal(queue.delete(), second);

            queue.add(fourth);
            queue.add(fifth);
            const data = queue.getQueue();

            should.equal(data[0], fifth);
        });
    });

    describe('full => double size', () => {
        it('다찼을 시, maxSize를 2배로', () => {
            const prevMaxSize = 4;
            const queue = new CircularQueue(prevMaxSize);
            should.equal(prevMaxSize, queue.getMaxSize());

            const first = 1;
            const second = 2;
            const third = 3;
            const fourth = 4;

            queue.add(first);
            queue.add(second);
            queue.add(third);

            should.ok(queue.isFull());

            queue.add(fourth);
            const laterMaxSize = prevMaxSize * 2;
            should.equal(queue.getMaxSize(), laterMaxSize);
        });
    });

    describe('getElement', () => {
        it('order에 맞는 원소 출력', () => {
            const queue = new CircularQueue(4);
            const deleting = 0;
            const first = 1;
            const second = 2;
            const third = 3;

            queue.add(deleting);
            queue.add(first);

            should.equal(queue.delete(), deleting);
            queue.add(second);
            queue.add(third);

            should.equal(queue.getElement(0), first);
            should.equal(queue.getElement(1), second);
            should.equal(queue.getElement(2), third);
        });
    });

    describe('toStr', () => {
        it('order에 맞게 string 생성', () => {
            const queue = new CircularQueue(4);
            const deleting = 0;
            const first = 1;
            const second = 2;
            const third = 3;

            queue.add(deleting);
            queue.add(first);

            should.equal(queue.delete(), deleting);
            queue.add(second);
            queue.add(third);

            const str = `${first} ${second} ${third} `;
            should.equal(queue.toStr(), str);
        });
    });
});
