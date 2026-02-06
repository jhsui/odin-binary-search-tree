import { Tree } from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([]);

// console.log(tree);
// prettyPrint(tree.root);
// console.log(tree.includes(1));
// prettyPrint(tree.root);

tree.insert(0);
// tree.insert(4);
// tree.insert(5);
// tree.insert(6);
// tree.insert(7);
// tree.insert(8);
// tree.insert(9);
// tree.insert(10);
// tree.insert(-1);
// tree.insert(-2);
// tree.insert(-3);
// tree.insert(-4);
// tree.insert(-5);
// tree.insert(-6);
// tree.insert(-7);

// prettyPrint(tree.root);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 100; i++) {
  let r = randomInt(-1000, 1000);

  tree.insert(r);
}

console.log(tree.isBalanced());

// tree.insert(3);

// prettyPrint(tree.root);
// console.log(tree.isBalanced());

// tree.deleteItem(-4);
// console.log(tree.isBalanced());
// prettyPrint(tree.root);
// tree.deleteItem(-6);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());

// tree.deleteItem(-4);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());

// tree.deleteItem(2);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());

// tree.postOrderForEach((e) => console.log(e + 100));
// tree.levelOrderForEach((e) => console.log(e + 100));
// console.log(tree.height(-1));
// tree.insert(0);
prettyPrint(tree.root);
console.log(tree.isBalanced());
// console.log(tree.includes(0));
// console.log(tree.includes(0));

// prettyPrint(tree.root);
