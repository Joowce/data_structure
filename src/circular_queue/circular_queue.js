const MAX_SIZE = 100;

class CircularQueue {
    constructor(maxSize){
        this.queue = [];
        this.maxSize = maxSize || MAX_SIZE;

        this.tail = 0;
        this.head = 0;
    }

    getMaxSize() {
        return this.maxSize;
    }

    isEmpty() {
        return this.tail === this.head
    }

    isFull() {

        // 여유공간이 없으면 queue가 full인지 empty인지 구분할 수 없음
        const tail = (this.tail + 1) % this.maxSize;
        return tail === this.head;
    }

    // O(1)
    // queue의 뒤에 새 원소 추가
    add(data){
        if(this.isFull()) {
            this.full();
        }
        this.tail = (this.tail + 1) % this.maxSize;
        this.queue[this.tail] = data;
    }

    // O(1) 소요
    // queue의 앞에 있는 원소 삭제
    delete() {
        if(this.isEmpty()) return null;
        this.head = (this.head + 1) % this.maxSize;

        return this.queue[this.head];
    }

    full() {
        // this.head는 맨처음 원소의 앞자리를 가리키고 있음
        const start = (this.head + 1) % this.maxSize;
        const newQueue = [];

        // O(n) 소요
        const copy = (source, startIdx, finishIdx, destination, destStartIdx) => {
            let j = destStartIdx;
            for (let i = startIdx; i < finishIdx; i += 1) {
                destination[j] = source[i];
                j += 1;
            }
        };
        // queue의 원소들이 중간에 끊기지 않고 연속적으로 이어질 때
        if (start < 2) {
            copy(this.queue, start, start + this.maxSize - 1, newQueue, 0);
        } else {
            copy(this.queue, start, this.maxSize, newQueue, 0);
            copy(this.queue, 0, this.tail + 1, newQueue, 0 + this.maxSize - start);
        }

        this.maxSize *= 2;
    }

    getQueue() {
        return this.queue;
    }

    getElement(order) {
        const idx = (this.head + order + 1) % this.maxSize;
        return this.queue[idx];
    }

    toStr() {
        let str = '';
        const start = (this.head + 1) % this.maxSize;
        if (start <= this.tail) {
            for(let i = start; i <= this.tail; i += 1){
                str += this.queue[i] + ' ';
            }
        } else {
            for(let i = start; i < this.maxSize; i += 1) {
                str += this.queue[i] + ' ';
            }
            for(let i = 0; i <= this.tail; i += 1) {
                str += this.queue[i] + ' ';
            }
        }

        return str;
    }
}

module.exports = CircularQueue;

