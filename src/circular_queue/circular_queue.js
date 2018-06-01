const MAX_SIZE = 100;

/**
 * < Queue >
 *
 * rear라는 한 쪽 끝에서 삽입이 일어나고, front라는 반대쪽 끝에서 삭제가 일어남
 * FIFO: 제일 먼저 삽입된 원소가 제일 먼저 삭제
 *
 * 큐에 원소가 추가되고 나갈 수록 큐는 점점 오른쪽으로 이동
 * 전체 큐를 왼쪽으로 이동시켜 첫번째 원소를 큐의 첫번째 자리로 이동
 * => 매 삭제 연산시 마다 이동시에 시간이 많이 소요, 최악의 경우 O(max_size)발생
 *
 * < Circular Queue >
 * 큐를 일직선이 아닌 원형으로 생각
 * max size - 1 다음 위치는 0, 0 이전의 위치는 max size - 1
 *
 * 모듈로 연산자를 이용해 front와 rear를 다음 위치로 이동
 *
 * 원형큐에서는 큐가 비어있을 때와 만원일 때를 구분 불가
 * => 큐에 원소를 max size 대신 maz size - 1 만큼만 넣어 해결
 *
 */

class CircularQueue {
    constructor(maxSize){
        this.queue = [];
        this.maxSize = maxSize || MAX_SIZE;

        this.rear = this.maxSize - 1;
        this.front = this.maxSize - 1;
    }

    /**
     * O(1)
     * 현재 queue의 max size 출력
     *
     * @returns {*|number}
     */
    getMaxSize() {
        return this.maxSize;
    }

    /**
     * O(1)
     * queue가 비어있는지를 출력
     * @returns {boolean}
     */
    isEmpty() {
        return this.rear === this.front
    }

    isFull() {

        // 여유공간이 없으면 queue가 full인지 empty인지 구분할 수 없음
        const rear = (this.rear + 1) % this.maxSize;
        return rear === this.front;
    }

    /**
     * O(1)
     * 큐 맨 뒤에 새로운 원소를 추가
     * @param data
     */
    add(data){
        if(this.isFull()) {
            this.full();
        }
        // modulo 연산 사용
        this.rear = (this.rear + 1) % this.maxSize;
        this.queue[this.rear] = data;
    }

    /**
     * O(1)
     * queue 맨 앞에 있는 원소 삭제
     * 원소가 없을 시에는 null
     * 삭제된 원소 값을 출력
     * @returns {*}
     */
    delete() {
        if(this.isEmpty()) return null;
        // modulo 연산 사용
        this.front = (this.front + 1) % this.maxSize;

        return this.queue[this.front];
    }

    /**
     * O(n)
     * 배열배가 사용
     * < 배열배가 >
     *     배열의 크기를 늘릴 때 항상 배열의 크기를 2배로 만듬
     *
     * 큐가 꽉 찼을 때, 크기가 2배인 새로운 큐를 만든 뒤에
     * 기존의 큐의 데이터를 새로운 큐로 복사
     * 이때 새로운 큐의 맨앞에 오도록 복사
     *
     */
    full() {
        // this.front는 맨처음 원소의 앞자리를 가리키고 있음
        const start = (this.front + 1) % this.maxSize;
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
            // 중간에 끊겼으므로, 맨처음 원소부터 맨 마지막 원소 까지
            copy(this.queue, start, this.maxSize, newQueue, 0);
            // 큐의 맨 첫부분을 직전에 마지막으로 옮겼던 노드의 바로 다음으로 복사
            copy(this.queue, 0, this.rear + 1, newQueue, 0 + this.maxSize - start);
        }

        this.maxSize *= 2;
    }

    /**
     * O(1)
     * queue를 출력
     * @returns {Array}
     */
    getQueue() {
        return this.queue;
    }

    /**
     * O(1)
     * 모듈로 연산을 이용해
     * 실제 큐에 저장되어 있는 위치가 아닌 논리적인 순서로 원소를 가져옴
     * @param order
     * @returns {*}
     */
    getElement(order) {
        const idx = (this.front + order + 1) % this.maxSize;
        return this.queue[idx];
    }

    /**
     * 순서대로 원소를 나열하는 문자열 출력
     * @returns {string}
     */
    toStr() {
        let str = '';
        const start = (this.front + 1) % this.maxSize;
        // 중간에 끊기지 않을 때
        if (start <= this.rear) {
            for(let i = start; i <= this.rear; i += 1){
                str += this.queue[i] + ' ';
            }
        // 중간에 끊길 때
        } else {
            for(let i = start; i < this.maxSize; i += 1) {
                str += this.queue[i] + ' ';
            }
            for(let i = 0; i <= this.rear; i += 1) {
                str += this.queue[i] + ' ';
            }
        }

        return str;
    }
}

module.exports = CircularQueue;

