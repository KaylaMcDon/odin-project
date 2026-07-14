const BinarySearchTree = require("./binarySearchTree");

//prettyPrint function copied directly from The Odin Foundations
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}



const test = new BinarySearchTree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
prettyPrint(test.head);
//test.deleteItem(1);
//prettyPrint(test.head);
console.log(test.height(11)); //3
console.log(test.depth(6)); //1
console.log(test.height(2)); //1
console.log(test.depth(1)); //4
console.log(test.isBalanced()); //true
test.insert(21);
test.insert(22);
test.insert(23);
test.insert(24);
test.insert(25);
test.insert(26);
test.insert(27);
prettyPrint(test.head);
console.log(test.isBalanced()); //false
test.rebalance();
prettyPrint(test.head);
