import { Tree } from "./bst-polished.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([]);

tree.insert(0);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);
tree.insert(8);
tree.insert(9);
tree.insert(10);
tree.insert(-1);
tree.insert(-2);
tree.insert(-3);
tree.insert(-4);
tree.insert(-5);
tree.insert(-6);
tree.insert(-7);
tree.insert(11);

// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// for (let i = 0; i < 10; i++) {
//   let r = randomInt(-1000, 1000);

//   tree.insert(r);
// }

prettyPrint(tree.root);
console.log();
console.log(tree.isBalanced());
console.log();
prettyPrint(tree.root);
