//run with 'node main.js'
const LinkedList = require("./linkedList");

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.pop();
list.prepend("turtle");

console.log(list.toString());
console.log(list.size());
console.log(list.findIndex("cat"));
console.log(list.contains("dolphin"));
console.log(list.head())