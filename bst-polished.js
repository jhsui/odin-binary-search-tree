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

    array.forEach((e) => {
      if (typeof e !== "number" || Number.isNaN(e)) {
        throw TypeError("Array elements must be numbers!!!");
      }

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
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw TypeError("Parameter must be a nubmer!!!");
    }

    function find(node, val) {
      if (node === null) return false;

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
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw TypeError("Parameter must be a nubmer!!!");
    }

    function insertNode(node, val) {
      if (node === null) {
        return new Node(val);
      }

      if (val < node.value) {
        node.left = insertNode(node.left, val);
      } else if (val > node.value) {
        node.right = insertNode(node.right, val);
      }

      return node;
    }

    this.root = insertNode(this.root, value);

    if (!this.isBalanced()) {
      this.rebalance();
    }
  }

  deleteItem(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw TypeError("Parameter must be a nubmer!!!");
    }

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

    // get the smallest childNode
    function findSmallestChild(node) {
      if (node.left === null) {
        return node;
      } else {
        return findSmallestChild(node.left);
      }
    }

    const deletingNodeObj = getNodeAndParentNode(value, this.root);

    // if the deleting node is root
    if (deletingNodeObj.parentNode === null) {
      if (
        deletingNodeObj.node.left === null &&
        deletingNodeObj.node.right === null
      ) {
        this.root = null;
      } else if (
        deletingNodeObj.node.left !== null &&
        deletingNodeObj.node.right === null
      ) {
        this.root = this.root.left;
      } else if (
        deletingNodeObj.node.left === null &&
        deletingNodeObj.node.right !== null
      ) {
        this.root = this.root.right;
      } else {
        const replacingNode = findSmallestChild(deletingNodeObj.node.right);
        const replacingNodeObj = getNodeAndParentNode(
          replacingNode.value,
          this.root,
        );

        replacingNode.left = deletingNodeObj.node.left;

        if (deletingNodeObj.node.right !== replacingNode) {
          // no matter if replacingNode.right is null
          replacingNodeObj.parentNode.left = replacingNode.right;
          replacingNode.right = deletingNodeObj.node.right;
        }

        this.root = replacingNode;
      }
      return;
    }

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
      const replacingNode = findSmallestChild(deletingNodeObj.node.right);
      const replacingNodeObj = getNodeAndParentNode(
        replacingNode.value,
        this.root,
      );

      replacingNode.left = deletingNodeObj.node.left;

      if (deletingNodeObj.node.right !== replacingNode) {
        // no matter if replacingNode.right is null
        replacingNodeObj.parentNode.left = replacingNode.right;
        replacingNode.right = deletingNodeObj.node.right;
      }

      // connect new node to deletingNode's parentNode
      if (!leftOrRight(deletingNodeObj.node, deletingNodeObj.parentNode)) {
        deletingNodeObj.parentNode.left = replacingNode;
      } else {
        deletingNodeObj.parentNode.right = replacingNode;
      }
    }

    // if (!this.isBalanced()) {
    //   this.rebalance();
    // }
  }

  //incorrect,
  isBalanced() {
    if (this.root === null) return true;

    function getCounts(node) {
      let leftCount = 0;
      let rightCount = 0;

      if (node.left !== null) {
        const subCounts = getCounts(node.left);
        leftCount = 1 + subCounts.leftCount + subCounts.rightCount;
      }

      if (node.right !== null) {
        const subCounts = getCounts(node.right);
        rightCount = 1 + subCounts.leftCount + subCounts.rightCount;
      }

      return { leftCount, rightCount };
    }

    function checkOneNode(node) {
      const counts = getCounts(node);
      const diffCounts = Math.abs(counts.leftCount - counts.rightCount);
      return diffCounts <= 1;
    }

    function traverseSubTree(node) {
      if (node === null) {
        return true;
      }

      if (!checkOneNode(node)) {
        return false;
      }

      if (node.left !== null) {
        if (!traverseSubTree(node.left)) {
          return false;
        }
      }

      if (node.right !== null) {
        if (!traverseSubTree(node.right)) {
          return false;
        }
      }

      return true;
    }

    return traverseSubTree(this.root);
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

  levelOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw Error("Parameter must be a function!!!");
    }

    const arr = [];
    arr.push(this.root);

    function dealWithOneNode(callback) {
      const curr = arr[0];
      if (curr === undefined) {
        return;
      }

      callback(curr.value);

      if (curr.left !== null) {
        arr.push(curr.left);
      }
      if (curr.right !== null) {
        arr.push(curr.right);
      }

      arr.shift(curr.value);

      dealWithOneNode(callback);
    }

    dealWithOneNode(callback);
  }

  preOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw Error("Parameter must be a function!!!");
    }

    function dealWithOneNode(node, callback) {
      if (node === null) {
        return;
      } else {
        callback(node.value);

        if (node.left !== null) {
          dealWithOneNode(node.left, callback);
        }
        if (node.right !== null) {
          dealWithOneNode(node.right, callback);
        }
      }
    }

    dealWithOneNode(this.root, callback);
  }

  inOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw Error("Parameter must be a function!!!");
    }

    function dealWithOneNode(node, callback) {
      if (node === null) {
        return;
      } else {
        if (node.left !== null) {
          dealWithOneNode(node.left, callback);
        }

        callback(node.value);

        if (node.right !== null) {
          dealWithOneNode(node.right, callback);
        }
      }
    }

    dealWithOneNode(this.root, callback);
  }

  postOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw Error("Parameter must be a function!!!");
    }

    function dealWithOneNode(node, callback) {
      if (node === null) {
        return;
      } else {
        if (node.left !== null) {
          dealWithOneNode(node.left, callback);
        }

        if (node.right !== null) {
          dealWithOneNode(node.right, callback);
        }

        callback(node.value);
      }
    }

    dealWithOneNode(this.root, callback);
  }

  height(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw TypeError("Parameter must be a nubmer!!!");
    }

    // find the node
    function find(node, val) {
      if (node === null) return false;

      if (node.value === val) {
        return node;
      } else if (val < node.value) {
        return find(node.left, val);
      } else {
        return find(node.right, val);
      }
    }
    const nodeOfValue = find(this.root, value);

    // get all the leaf nodes
    function checkLeaf(node) {
      // check if a node is a leaf
      if (node === undefined) return true;

      if (node.left === null && node.right === null) {
        return true;
      } else {
        return false;
      }
    }

    const leafArr = [];
    function getLeafNodeArr(node) {
      if (checkLeaf(node)) {
        leafArr.push(node);
      } else {
        if (node.left !== null) {
          getLeafNodeArr(node.left);
        }

        if (node.right !== null) {
          getLeafNodeArr(node.right);
        }
      }
    }
    getLeafNodeArr(nodeOfValue);

    // then calculate all the height
    function getHeight(startNode, leafNode) {
      let h = 0;
      if (leafNode === undefined) {
        return h;
      }

      if (leafNode.value === startNode.value) {
        return h;
      } else if (leafNode.value < startNode.value) {
        return (h = h + 1 + getHeight(startNode.left, leafNode));
      } else if (leafNode.value > startNode.value) {
        return (h = h + 1 + getHeight(startNode.right, leafNode));
      }
    }

    const heightArr = leafArr.map((leafNode) =>
      getHeight(nodeOfValue, leafNode),
    );

    // return the max
    return Math.max(...heightArr);
  }

  depth(value) {
    if (this.root === null && value === null) {
      return 0;
    }

    if (typeof value !== "number" || Number.isNaN(value))
      throw TypeError("Parameter must be a nubmer!!!");

    function findNode(node, val) {
      let height = 0;

      if (val === node.value) {
        return height;
      } else if (node.left === null && node.right === null) {
        return undefined;
      } else if (node.left !== null && val < node.value) {
        height = height + 1 + findNode(node.left, val);
      } else if (node.right !== null && val > node.value) {
        height = height + 1 + findNode(node.right, val);
      }

      return height;
    }

    return findNode(this.root, value);
  }
}

export { Tree };
