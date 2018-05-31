const Node = require('../node/Node');

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.count = 0;
    }

    /**
     *
     * @param {Node} target target뒤에 새로운 node 추가
     * @param data 새로운 node의 data 값
     */
    add(target, data) {
        const newNode = new Node(data);

        // target이 head인 경우 null
        if (!target) {
            newNode.next = null;
            newNode.prev = null;
            this.head = newNode;
        } else {
            newNode.next = target.next;
            newNode.prev = target;

            // target.next가 null일 수 있음
            if (target.next) target.next.prev = newNode;
            target.next = newNode;
        }
        this.count += 1;
        return newNode;
    }

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

    remove(deleted) {

        if (!deleted || this.head === null) return null;

        // deleted가 마지막 노드가 아닐 때에만
        if (deleted.next) deleted.next.prev = deleted.prev;

        // deleted가 첫번째 노드일 때만
        if (deleted.prev) deleted.prev.next = deleted.next;

        if (deleted === this.head) this.head = deleted.next;
        this.count -= 1;

        return deleted.data;
    }

    length() {
        return this.count;
    }

    toString() {
        let current = this.head;
        let str = '';

        while(current) {
            str += (current.data + ' ');
            current = current.next;
        }
        return str;
    }

    toReverseString() {
        let current = this.head;
        let str = '';
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

