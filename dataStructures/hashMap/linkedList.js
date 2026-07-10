module.exports = class LinkedList {
    constructor(headNode = null) {
        this.headNode = headNode;
    }

    at(index) {
        let node = this.headNode;
        for (let i = 0; i < index; i++) {
            if (node == null) { return undefined };
            node = node.getNext();
        }
        return node;
    }

    head() {
        return this.headNode == null ? undefined : this.headNode;
    }

    tail() {
        let node = this.headNode;
        if (node == null) { return undefined };

        while (node.getNext() != null) {
            node = node.getNext();
        }
        return node;
    }

    append(key, value) {
        const newNode = new Node(key, value);

        const tail = this.tail();
        if (tail == undefined) {
            this.headNode = newNode;
        } else {
            tail.setNext(newNode);
        }
    }

    prepend(key, value) {
        const newNode = new Node(key, value, this.headNode);
        this.headNode = newNode;
    }

    size() {
        let node = this.headNode;
        if (node == null) { return 0 };

        let count = 1;
        while (node.getNext() != null) {
            node = node.getNext();
            count++;
        }
        return count;
    }

    pop() {
        if (this.headNode == null) { return undefined };

        const removedValue = this.headNode.getValue();
        this.headNode = this.headNode.getNext();
        return removedValue;
    }

    contains(target) {
        let node = this.headNode;

        while (node != null) {
            if (node.getValue() == target) {
                return true;
            }
            node = node.getNext();
        }

        return false;
    }

    findIndexByValue(target) {
        let node = this.headNode;

        for (let i = 0; node != null; i++) {
            if (node.getValue() == target) {
                return i;
            }
            node = node.getNext();
        }

        return -1;
    }

    findIndexByKey(target) {
        let node = this.headNode;

        for (let i = 0; node != null; i++) {
            if (node.getKey() == target) {
                return i;
            }
            node = node.getNext();
        }

        return -1;
    }

    removeAt(index) {
        if (index == 0) {
            this.pop();
        } else {
            let node = this.headNode;
            for (let i = 0; i < index - 1; i++) {
                node = node.getNext();
            }

            let prevNode = node;
            let nextNode = node.getNext().getNext();
            prevNode.setNext(nextNode);
        }
    }

    toString() {
        let finalString = "";
        let node = this.headNode;

        while (node != null) {
            finalString += "( ";
            finalString += node.getValue();
            finalString += " ) -> ";

            node = node.getNext();
        }

        finalString += "null";
        return finalString;
    }
}

class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }

    getNext() {
        return this.nextNode;
    }

    setNext(node) {
        this.nextNode = node;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }
}