const LinkedList = require("./linkedList");

module.exports = class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.array = new Array(this.capacity);
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = new LinkedList();
        }
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        this.array[hashCode].append(key, value);

        //increases capacity if necessary
        if(this.length()>(this.capacity*this.loadFactor)){
            this.capacity = this.capacity*2;
            const entries = this.entries();
            this.clear();


            //places entries back in array in their new spots
            for(let i=0; i<entries.length; i++){
                this.set(entries[i][0], entries[i][1]);
            }
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const list = this.array[hashCode];
        const node = list.at(list.findIndexByKey(key));
        const value = node.getValue();
        return value;
    }

    has(key) {
        const hashCode = this.hash(key);
        const list = this.array[hashCode];
        return (list.findIndexByKey(key) != -1);
    }

    remove(key) {
        const hashCode = this.hash(key);
        const list = this.array[hashCode];
        const index = list.findIndexByKey(key);
        if (index != -1) {
            list.removeAt(index);
            return true;
        } else {
            return false;
        }
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.array.length; i++) {
            const list = this.array[i];
            count += list.size();
        }
        return count;
    }

    clear() {
        this.array = new Array(this.capacity);

        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = new LinkedList();
        };
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.array.length; i++) {
            const list = this.array[i];
            const listSize = list.size();
            for (let j = 0; j < listSize; j++) {
                const node = list.at(j);
                keys.push(node.getKey());
            }
        }

        return keys;
    }

    values() {

        let values = [];
        for (let i = 0; i < this.array.length; i++) {
            const list = this.array[i];
            const listSize = list.size();
            for (let j = 0; j < listSize; j++) {
                const node = list.at(j);
                values.push(node.getValue());
            }
        }

        return values;
    }

    entries() {
        let entries = [];
        for (let i = 0; i < this.array.length; i++) {
            const list = this.array[i];
            const listSize = list.size();
            for (let j = 0; j < listSize; j++) {
                const node = list.at(j);
                const entry = [node.getKey(), node.getValue()];
                entries.push(entry)
            }
        }

        return entries;
    }
}