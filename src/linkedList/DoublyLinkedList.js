const Node = require('./Node');

/**
 * < 단순 연결리스트 >
 * Node = data + 다음의 노드를 가리키는 link
 *
 * 노드들이 실제로 순차적인 위치에 저장 X
 * 추가, 삭제시 다른 노드들을 이동시킬 필요가 없음
 * 다만 link를 위한 공간이 필요
 *
 * 단순 연결리스트에서는 단순히 연결된 방향으로만, 즉 하나의 방향으로만 이동가능
 * 이전의 노드를 가고 싶으면 처음부터 다시 시작해야함
 * 원하는 노드를 삭제해야할 때 이전의 노드를 알기 위해
 * 맨 처음 노드부터 이전의 노드까지 이동해야함
 *
 * < 이중 연결 리스트 >
 *
 * Node = data + 이전의 노드를 가리키는 link + 다음의 노드를 가리키는 link
 *
 * 양방향이동 가능
 *
 * 단순 연결리스트 삭제시에 이전의 노드에 가기위해 맨처음으로 가지않고
 * 한번에 이전의 노드로 접근가능
 *
 */

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.count = 0;
    }

    /**
     * O(1)
     * 새로운 노드를 생성한 뒤 target뒤에 추가하는 method
     *
     * @param {Node} target target뒤에 새로운 node 추가
     * @param data 새로운 node의 data 값
     */
    add(target, data) {
        const newNode = new Node(data);

        /**
         * target이 null인 경우 = list에 아무 노드도 없음
         * head가 새로운 노드를 가리키게 해야함
         */

        // target이 head인 경우 null
        if (!target) {
            newNode.next = null;
            newNode.prev = null;
            this.head = newNode;
        } else {
            newNode.next = target.next;
            newNode.prev = target;

            // target.next가 null일 수 있음 (target이 맨마지막 노드)
            if (target.next) target.next.prev = newNode;
            target.next = newNode;
        }
        this.count += 1;
        return newNode;
    }

    /**
     * O(n)
     * 링크드 리스트 중에 찾고자 하는 데이터를 가진 노드를 출력
     * 링크드 리스트에 존재하지 않을 때에는 null을 출력
     *
     * @param {*} data
     * @returns {*}
     */
    find(data) {
        let current = this.head;

        if (!data) return null;

        while (current) {
            if (current.data === data) break;
            current = current.next;
        }

        if (current) return current;
        else return null;
    }

    /**
     * O(1)
     * 링크드 리스트에 target Node를 삭제한다
     * 기존의 링크드 리스트는 노드를 삭제하려면, 이전의 노드에 가기 위해 처음 부터 시작해야 하지만,
     * 양방향 연결 리스트는 이전의 노드에 한번에 접근할 수 있다.
     *
     * @param target
     * @returns {null}
     */
    remove(target) {

        if (!target || this.head === null) return null;

        // target가 마지막 노드가 아닐 때에만, 즉 이후의 노드가 존재할 때만
        if (target.next) target.next.prev = target.prev;

        // target가 첫번째 노드가 아닐 때에만, 즉 이전의 노드가 존재할 때만
        if (target.prev) target.prev.next = target.next;

        // target가 첫번째 노드이면, this.head의 값도 그 다음값으로 변경해줘야함
        if (target === this.head) this.head = target.next;
        this.count -= 1;

        return target.data;
    }

    /**
     * 현재 링크드 리스트의 길이를 출력하는 함수
     * @returns {number}
     */
    length() {
        return this.count;
    }

    /**
     * O(n)
     * 순서대로 데이터를 읽어 문자열 생성
     * @returns {string}
     */
    toString() {
        let current = this.head;
        let str = '';

        while(current) {
            str += (current.data + ' ');
            current = current.next;
        }
        return str;
    }

    /**
     * O(n)
     * 역순으로 데이터를 읽어 문자열 생성
     * @returns {string}
     */
    toReverseString() {
        let current = this.head;
        let str = '';
        // 맨마지막 노드를 가기 위해 도는 while
        while(current) {
            if (current.next) current = current.next;
            else break;
        }

        while(current) {
            str += (current.data + ' ');
            current = current.prev;
        }
        return str;
    }
}

module.exports = DoublyLinkedList;

