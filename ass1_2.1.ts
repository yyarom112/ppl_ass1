import * as ramda from 'ramda';
import { expect, assert } from 'chai';
import 'mocha';

interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

const TreePreArray: (tree: BinTree) => Array<number> = function (tree: BinTree): Array<number> {
    let arr: Array<number> = getNumOrderArr(tree, [], 0);
    return arr;
};

const TreeInArray: (tree: BinTree) => Array<number> = function (tree: BinTree): Array<number> {
    let arr: Array<number> = getNumOrderArr(tree, [], 1);
    return arr;
};
const TreePostArray: (tree: BinTree) => Array<number> = function (tree: BinTree): Array<number> {
    let arr: Array<number> = getNumOrderArr(tree, [], 2);
    return arr;
};

//order: 0=preOrder 1=Inorder 2=postOrder
const getNumOrderArr: (tree: BinTree, arr: Array<number>, order: number) => Array<number> =
    function (tree: BinTree, arr: Array<number>, order: number): Array<number> {
        if (tree != undefined && arr != undefined && order>=0 && order<=2) {
            switch (order) {
                case 0: {
                    arr.push(tree.root);
                    arr = (getNumOrderArr(tree.left, arr, order));
                    arr = (getNumOrderArr(tree.right, arr, order));
                    break;
                }
                case 1: {
                    arr = (getNumOrderArr(tree.left, arr, order));
                    arr.push(tree.root);
                    arr = (getNumOrderArr(tree.right, arr, order));
                    break;
                }
                case 2: {
                    arr = (getNumOrderArr(tree.left, arr, order));
                    arr = (getNumOrderArr(tree.right, arr, order));
                    arr.push(tree.root);
                    break;
                }
            }
        }
        return arr;
    };

    const GBinTreePreArray :<T> (tree: GBinTree<T>) => Array<T> = function <T> (tree: GBinTree<T>): Array<T> {
        let arr: Array<T> = getOrderArr(tree, [], 0);
        return arr;
    };
    
    const GBinTreeInArray:<T> (tree: GBinTree<T>) => Array<T> = function <T> (tree: GBinTree<T>): Array<T> {
        let arr: Array<T> = getOrderArr(tree, [], 1);
        return arr;
    };

    const GBinTreePostArray:<T> (tree: GBinTree<T>) => Array<T> = function <T> (tree: GBinTree<T>): Array<T> {
        let arr: Array<T> = getOrderArr(tree, [], 2);
        return arr;
    };
    
    //order: 0=preOrder 1=Inorder 2=postOrder
    const getOrderArr: <T>(tree: GBinTree<T>, arr: Array<T>, order: number) => Array<T> =
        function<T> (tree: GBinTree<T>, arr: Array<T>, order: number): Array<T> {
            if (tree != undefined && arr != undefined  && order>=0 && order<=2) {
                switch (order) {
                    case 0: {
                        arr.push(tree.root);
                        arr = (getOrderArr(tree.left, arr, order));
                        arr = (getOrderArr(tree.right, arr, order));
                        break;
                    }
                    case 1: {
                        arr = (getOrderArr(tree.left, arr, order));
                        arr.push(tree.root);
                        arr = (getOrderArr(tree.right, arr, order));
                        break;
                    }
                    case 2: {
                        arr = (getOrderArr(tree.left, arr, order));
                        arr = (getOrderArr(tree.right, arr, order));
                        arr.push(tree.root);
                        break;
                    }
                }
            }
            return arr;
        };

//TESTS
let tree1: BinTree = {
    root: 1
};

let tree2: BinTree = {
    root: 2
};

let tree3: BinTree = {
    root: 3,
    left: tree1,
    right: tree2
};
let tree4: BinTree = {
    root: 4,
    left: tree3
};

//TESTS
let treeString1: GBinTree<String> = {
    root:"a" 
};

let treeString2: GBinTree<String> = {
    root: "b"
};

let treeString3: GBinTree<String>  = {
    root: "c",
    left: treeString1,
    right: treeString2
};
let treeString4: GBinTree<String>  = {
    root: "d",
    left: treeString3
};

//test for BinTree
//Pre
assert.deepEqual(TreePreArray(tree1), [1], "BinTree-Pre-test1-num:the arrays are not equal.");
assert.deepEqual(TreePreArray(tree3), [3, 1, 2], "BinTree-Pre-test2-numthe arrays are not equal.");
assert.deepEqual(TreePreArray(tree4), [4, 3, 1, 2], "BinTree-Pre-test3-num:the arrays are not equal.");
assert.deepEqual(TreePreArray(undefined), [], "BinTree-Pre-test4-num:the arrays are not equal.");

//In
assert.deepEqual(TreeInArray(tree1), [1], "BinTree-In-test1-num:the arrays are not equal.");
assert.deepEqual(TreeInArray(tree3), [1,3,2], "BinTree-In-test2-num:the arrays are not equal.");
assert.deepEqual(TreeInArray(tree4), [1,3,2,4], "BinTree-In-test3-num:the arrays are not equal.");
assert.deepEqual(TreeInArray(undefined), [], "BinTree-In-test4-num:the arrays are not equal.");


//Post
assert.deepEqual(TreePostArray(tree1), [1], "BinTree-Post-test1-num:the arrays are not equal.");
assert.deepEqual(TreePostArray(tree3), [1,2,3], "BinTree-Post-test2-num:the arrays are not equal.");
assert.deepEqual(TreePostArray(tree4), [1,2,3,4], "BinTree-Post-test3-num:the arrays are not equal.");
assert.deepEqual(TreePostArray(undefined), [], "BinTree-Post-test4-num:the arrays are not equal.");


//test for GBinTree
//Pre
assert.deepEqual(GBinTreePreArray (tree1), [1], "GBinTree-Pre-test1-num:the arrays are not equal.");
assert.deepEqual(GBinTreePreArray (tree3), [3, 1, 2], "GBinTree-Pre-test2-num:the arrays are not equal.");
assert.deepEqual(GBinTreePreArray (tree4), [4, 3, 1, 2], "GBinTree-Pre-test3-num:the arrays are not equal.");
assert.deepEqual(GBinTreePreArray (undefined), [], "GBinTree-Pre-test4-num:the arrays are not equal.");
assert.deepEqual(GBinTreePreArray (treeString1), ["a"], "GBinTree-Pre-test1-string:the arrays are not equal.");
assert.deepEqual(GBinTreePreArray (treeString3), ["c","a","b"], "GBinTree-Pre-test2-string:the arrays are not equal.");
assert.deepEqual(GBinTreePreArray (treeString4), ["d","c","a","b"], "GBinTree-Pre-test3-string:the arrays are not equal.");
assert.deepEqual(GBinTreePreArray (undefined), [], "GBinTree-Pre-test4-string:the arrays are not equal.");
//In
assert.deepEqual(GBinTreeInArray (tree1), [1], "GBinTree-In-test1-num:the arrays are not equal.");
assert.deepEqual(GBinTreeInArray (tree3), [1,3,2], "GBinTree-In-test2-num:the arrays are not equal.");
assert.deepEqual(GBinTreeInArray (tree4), [1,3,2,4], "GBinTree-In-test3-num:the arrays are not equal.");
assert.deepEqual(GBinTreeInArray (undefined), [], "GBinTree-In-test4-num:the arrays are not equal.");
assert.deepEqual(GBinTreeInArray (treeString1), ["a"], "GBinTree-In-test1-string:the arrays are not equal.");
assert.deepEqual(GBinTreeInArray (treeString3), ["a","c","b"], "GBinTree-In-test2-string:the arrays are not equal.");
assert.deepEqual(GBinTreeInArray (treeString4), ["a","c","b","d"], "GBinTree-In-test3-string:the arrays are not equal.");
assert.deepEqual(GBinTreeInArray (undefined), [], "GBinTree-In-test4-string:the arrays are not equal.");

//Post
assert.deepEqual(GBinTreePostArray (tree1), [1], "GBinTree-Post-test1-num:the arrays are not equal.");
assert.deepEqual(GBinTreePostArray (tree3), [1,2,3], "GBinTree-Post-test2-num:the arrays are not equal.");
assert.deepEqual(GBinTreePostArray (tree4), [1,2,3,4], "GBinTree-ePost-test3-num:the arrays are not equal.");
assert.deepEqual(GBinTreePostArray (undefined), [], "GBinTree-Post-test4-num:the arrays are not equal.");
assert.deepEqual(GBinTreePostArray (treeString1), ["a"], "GBinTree-Post-test1-string:the arrays are not equal.");
assert.deepEqual(GBinTreePostArray (treeString3), ["a","b","c"], "GBinTree-Post-test2-string:the arrays are not equal.");
assert.deepEqual(GBinTreePostArray (treeString4), ["a","b","c","d"], "GBinTree-ePost-test3-string:the arrays are not equal.");
assert.deepEqual(GBinTreePostArray (undefined), [], "GBinTree-Post-test4-string:the arrays are not equal.");