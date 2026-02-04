class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;

    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  #buildTree(array) {
    if (array.length === 0) return null;
    const sortedArr = [];

    array.filter((e) => {
      if (typeof e !== "number" || Number.isNaN(e))
        throw TypeError("Array elements must be numbers!!!");

      if (!sortedArr.includes(e)) {
        sortedArr.push(e);
      }
    });

    sortedArr.sort((a, b) => a - b);

    let mid = Math.floor((sortedArr.length - 1) / 2);
    const root = new Node(sortedArr[mid]);

    root.left = this.#buildTree(sortedArr.slice(0, mid));
    root.right = this.#buildTree(sortedArr.slice(mid + 1));

    return root;
  }

  includes(value) {
    if (typeof value !== "number" || Number.isNaN(value))
      throw TypeError("Parameter must be a nubmer!!!");

    function find(node, val) {
      // do i need the following line?
      //   if (!(node instanceof Node)) throw TypeError;
      if (node === null || node.value === null) return false;

      if (node.value === val) {
        return true;
      } else if (val < node.value) {
        return find(node.left, val);
      } else {
        return find(node.right, val);
      }
    }

    return find(this.root, value);
  }

  insert(value) {
    if (typeof value !== "number" || Number.isNaN(value))
      throw TypeError("Parameter must be a nubmer!!!");

    if (this.includes(value)) return;

    function insertNode(node, val, parentNode = null) {
      if (node === null) {
        node = new Node(val);
        if (val < parentNode.value) {
          parentNode.left = node;
        } else {
          parentNode.right = node;
        }
        return;
      } else if (val < node.value) {
        insertNode(node.left, val, node);
      } else if (val > node.value) {
        insertNode(node.right, val, node);
      }
    }

    insertNode(this.root, value);

    if (!this.isBalanced()) {
      this.rebalance();
    }
  }

  deleteItem(value) {
    if (typeof value !== "number" || Number.isNaN(value))
      throw TypeError("Parameter must be a nubmer!!!");

    if (!this.includes(value)) return;

    function getNodeAndParentNode(val, node, parentNode = null) {
      if (val === node.value) {
        return { node, parentNode };
      } else if (val < node.value) {
        return getNodeAndParentNode(val, node.left, node);
      } else {
        return getNodeAndParentNode(val, node.right, node);
      }
    }

    function leftOrRight(node, parentNode) {
      if (node === parentNode.left) {
        return false;
      } else {
        return true;
      }
    }

    function findSmallestChild(node) {
      if (node.left === null) {
        return node;
      } else {
        return findSmallestChild(node.left);
      }
    }

    const deletingNodeObj = getNodeAndParentNode(value, this.root);
    if (
      // this node has no children
      deletingNodeObj.node.left === null &&
      deletingNodeObj.node.right === null
    ) {
      if (!leftOrRight(deletingNodeObj.node, deletingNodeObj.parentNode)) {
        deletingNodeObj.parentNode.left = null;
      } else {
        deletingNodeObj.parentNode.right = null;
      }
    } else if (
      // only has left child
      deletingNodeObj.node.left !== null &&
      deletingNodeObj.node.right === null
    ) {
      if (!leftOrRight(deletingNodeObj.node, deletingNodeObj.parentNode)) {
        deletingNodeObj.parentNode.left = deletingNodeObj.node.left;
      } else {
        deletingNodeObj.parentNode.right = deletingNodeObj.node.left;
      }
    } else if (
      // only has right child
      deletingNodeObj.node.left === null &&
      deletingNodeObj.node.right !== null
    ) {
      if (!leftOrRight(deletingNodeObj.node, deletingNodeObj.parentNode)) {
        deletingNodeObj.parentNode.left = deletingNodeObj.node.right;
      } else {
        deletingNodeObj.parentNode.right = deletingNodeObj.node.right;
      }
    } else {
      // both sides has child
      if (value === this.root.value) {
        findSmallestChild(this.root.right).left = this.root.left;
        this.root = this.root.right;
        return;
      }

      if (!leftOrRight(deletingNodeObj.node, deletingNodeObj.parentNode)) {
        findSmallestChild(deletingNodeObj.node.right).left =
          deletingNodeObj.node.left;
        deletingNodeObj.parentNode.left = deletingNodeObj.node.right;
      } else {
        findSmallestChild(deletingNodeObj.node.right).left =
          deletingNodeObj.node.left;
        deletingNodeObj.parentNode.right = deletingNodeObj.node.right;
      }
    }

    if (!this.isBalanced()) {
      this.rebalance();
    }
  }

  //incorrect, only check level 0
  isBalanced() {
    if (this.root === null) return true;

    function childNodeCount(node) {
      let leftCount = 0;
      let rightCount = 0;

      if (node.left !== null) {
        const subCounts = childNodeCount(node.left);
        leftCount = 1 + subCounts.leftCount + subCounts.rightCount;
      }

      if (node.right !== null) {
        const subCounts = childNodeCount(node.right);
        rightCount = 1 + subCounts.leftCount + subCounts.rightCount;
      }

      return { leftCount, rightCount };
    }

    const counts = childNodeCount(this.root);
    const diffCounts = Math.abs(counts.leftCount - counts.rightCount);
    return diffCounts <= 1;
  }

  rebalance() {
    function getArr(node) {
      if (node === null) return [];
      const arr = [];

      arr.push(node.value);

      if (node.left !== null) {
        arr.push(...getArr(node.left));
      }

      if (node.right !== null) {
        arr.push(...getArr(node.right));
      }

      return arr;
    }

    this.root = this.#buildTree(getArr(this.root));
  }
}

export { Tree };
