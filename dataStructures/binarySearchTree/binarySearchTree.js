module.exports = class BinarySearchTree {
    constructor(array) {
        this.head = this.buildTree(array);
    }

    buildTree(array) {
        //sort array
        array.sort((a, b) => { return a - b });
        console.log(array)

        //remove duplicates
        array = array.filter((value, index) => array.indexOf(value) == index);

        if (array.length == 0) { return null };

        const midpoint = Math.floor(array.length / 2);
        const root = new Node(array[midpoint]);

        const leftNode = this.buildTree(array.slice(0, midpoint));
        const rightNode = this.buildTree(array.slice(midpoint + 1, array.length));

        root.setLeft(leftNode);
        root.setRight(rightNode);

        return root;
    }

    includes(value, node = this.head) {
        if (node == null) { return false };
        if (node.getValue == value) { return true };

        console.log(node.getValue())
        if (node.getValue() < value) {
            return this.includes(value, node.getLeft());
        } else {
            return this.includes(value, node.getRight());
        }
    }

    insert(value) {
        const newNode = new Node(value)
        let node = this.head;

        //edge case if no nodes currently exist
        if (node == null) { this.head = newNode; return false };

        //do nothing if it would duplicate
        if (this.includes(value)) { return false };

        while (true) {
            if (node.getValue() > value) {
                if (node.getLeft() == null) {
                    node.setLeft(newNode);
                    return true;
                } else {
                    node = node.getLeft();
                }
            } else {
                if (node.getRight() == null) {
                    node.setRight(newNode);
                    return true;
                } else {
                    node = node.getRight();
                }
            }
        }
    }

    deleteItem(value) {
        //edgecase for empty tree
        if (this.head == null) { return undefined };
        //TODO: edgecase for head being value

        //find node
        let node = this.head;
        let prevNode;
        let direction = "head";
        while (node.getValue() != value) {
            prevNode = node;

            if (node.getValue() > value) {
                node = node.getLeft();
                direction = "L";
            } else {
                node = node.getRight();
                direction = "R";
            }

            //node not found
            if (node == null) { return undefined }
        }

        function replaceNode(node) {
            if (direction == "L") { prevNode.setLeft(node) }
            else if (direction == "R") { prevNode.setRight(node) }
            else if (direction == "head") { this.head = node }
        }

        //case where left child doesn't exist
        if (node.getLeft() == null) { replaceNode(node.getRight()) }

        //case where right child doesn't exist
        else if (node.getRight() == null) { replaceNode(node.getLeft()) }

        //case where both children exist
        else {
            //find smallest value in right subtree
            let smallestNode = node.getRight();
            let beforeSmallestnode = node;

            while (smallestNode.getLeft() != null) {
                beforeSmallestnode = smallestNode;
                smallestNode = smallestNode.getLeft();
            }

            beforeSmallestnode.setLeft(smallestNode.getRight());

            smallestNode.setLeft(node.getLeft());
            if (smallestNode != node.getRight) {
                smallestNode.setRight(node.getRight());
            }

            replaceNode(smallestNode);
        }
    }

    levelOrderForEach(callback) {
        //if callback is not provided or not a function
        if (typeof callback != "function") {
            throw new Error("Proper callback not provided");
        }


        let queue = [this.head];
        while (queue.length != 0) {
            const node = queue[0];
            const value = node.getValue();
            callback(value);

            const leftNode = node.getLeft();
            const rightNode = node.getRight();
            if (leftNode != null) { queue.push(leftNode) };
            if (rightNode != null) { queue.push(rightNode) };

            queue.shift()
        }
    }

    preOrderForEach(callback, node = this.head) {
        const leftNode = node.getLeft();
        const rightNode = node.getRight();

        callback(node);
        if (leftNode != null) { preOrderForEach(callback, leftNode) };
        if (rightNode != null) { preOrderForEach(callback, rightNode) };
    }

    inOrderForEach(callback, node = this.head) {
        const leftNode = node.getLeft();
        const rightNode = node.getRight();

        if (leftNode != null) { preOrderForEach(callback, leftNode) };
        callback(node);
        if (rightNode != null) { preOrderForEach(callback, rightNode) };
    }

    postOrderForEach(callback, node = this.head) {
        const leftNode = node.getLeft();
        const rightNode = node.getRight();

        if (leftNode != null) { preOrderForEach(callback, leftNode) };
        if (rightNode != null) { preOrderForEach(callback, rightNode) };
        callback(node);
    }

    height(value) {
        //find value
        let queue = [this.head];
        let targetNode = null;
        while (queue.length != 0) {
            const node = queue[0];
            const nodeValue = node.getValue();
            if (value == nodeValue) {
                targetNode = node;
                break;
            };

            const leftNode = node.getLeft();
            const rightNode = node.getRight();
            if (leftNode != null) { queue.push(leftNode) };
            if (rightNode != null) { queue.push(rightNode) };

            queue.shift()
        };

        //target not found
        if (targetNode == null) { return undefined };

        //calculate distance to leaf node
        queue = [targetNode];
        let colCount = 0;
        let rowCount = 0;

        while (queue.length != 0) {
            const node = queue[0];

            const leftNode = node.getLeft();
            const rightNode = node.getRight();

            if (leftNode == null && rightNode == null) { return rowCount };
            colCount++;
            const endOfRowReached = colCount == (2 ** rowCount)
            if (endOfRowReached) {
                colCount = 0;
                rowCount++;
            }

            if (leftNode != null) { queue.push(leftNode) };
            if (rightNode != null) { queue.push(rightNode) };

            queue.shift()
        }
    }

    depth(value) {
        let queue = [this.head];
        let colCount = 0;
        let rowCount = 0;

        while (queue.length != 0) {
            const node = queue[0];
            const nodeValue = node.getValue();

            if (value == nodeValue) { return rowCount };

            colCount++;
            const endOfRowReached = colCount == (2 ** rowCount)
            if (endOfRowReached) {
                colCount = 0;
                rowCount++;
            }

            const leftNode = node.getLeft();
            const rightNode = node.getRight();
            if (leftNode != null) { queue.push(leftNode) };
            if (rightNode != null) { queue.push(rightNode) };

            queue.shift()
        }
        return undefined;
    }

    isBalanced(node = this.head) {

        let leftSideHeight = 0;
        let leftTreeBalanced = true;
        const leftNode = node.getLeft();
        if (leftNode != null) {
            leftSideHeight = this.height(leftNode.getValue());
            leftTreeBalanced = this.isBalanced(leftNode);
        }

        let rightSideHeight = 0;
        let rightTreeBalanced = true;
        const rightNode = node.getRight();
        if (rightNode != null) {
            rightSideHeight = this.height(rightNode.getValue());
            rightTreeBalanced = this.isBalanced(rightNode);
        }

        const thisTreeBalanced = Math.abs(rightSideHeight - leftSideHeight) <= 1;

        return (thisTreeBalanced && leftTreeBalanced && rightTreeBalanced);
    }

    rebalance() {
        //get array of all value
        let nodes = [this.head]

        for (let i = 0; nodes.length > i; i++) {
            const node = nodes[i];
            const nodeValue = node.getValue();

            const leftNode = node.getLeft();
            const rightNode = node.getRight();
            if (leftNode != null) { nodes.push(leftNode) };
            if (rightNode != null) { nodes.push(rightNode) };
        }

        const values = nodes.map((node) => node.getValue());
        this.head = this.buildTree(values);
    }
}



class Node {
    constructor(value = null, leftNode = null, rightNode = null) {
        this.value = value;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }

    getLeft() {
        return this.leftNode;
    }

    setLeft(node) {
        this.leftNode = node;
    }

    getRight() {
        return this.rightNode;
    }

    setRight(node) {
        this.rightNode = node;
    }

    getValue() {
        return this.value;
    }
}