import { Tree } from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([1, 2]);

// console.log(tree);
// prettyPrint(tree.root);
// console.log(tree.includes(1));
// prettyPrint(tree.root);

tree.insert(3);
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

// console.log(tree.isBalanced());

// tree.insert(3);

// prettyPrint(tree.root);
// console.log(tree.isBalanced());

// tree.deleteItem(-4);
// console.log(tree.isBalanced());
prettyPrint(tree.root);
tree.deleteItem(-6);
prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.deleteItem(-4);
prettyPrint(tree.root);
console.log(tree.isBalanced());

// tree.deleteItem(2);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());
