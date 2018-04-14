import * as ramda from 'ramda';
import { expect, assert } from 'chai';
import 'mocha';




//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ass 2.1
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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ass 2.2

const KSubsets: <T>(array:Array<T>,k:number)=>Array<Array<T>> =function<T>(array:Array<T>,k:number):Array<Array<T>> {
    var subsetResults = [];
    var currResult;
    var allCombination = Math.pow(2,array.length);
    var currSize;
    for(var i = 0; i < allCombination; i++){
        currResult = [];
        currSize = 0;

        while(currSize < array.length){
            if((i & (1<<currSize)) !== 0){
                currResult.push(array[currSize]);
            }
            currSize++;
        }
        if(currResult.length === k){
            subsetResults.push(currResult);
        }
    } 
    return subsetResults;
}

//tests
assert.deepEqual(KSubsets([1,2,3],2), [[1,2],[1,3],[2,3]],"KSubsets-test 1-check the regular");
assert.deepEqual(KSubsets([],2), [],"KSubsets-test 2-empty array ");
assert.deepEqual(KSubsets([1,2,3],0), [[]],"KSubsets-test 3-subset sizeof 0");
assert.deepEqual(KSubsets([1,2,3],4), [],"KSubsets-test 4-subset biger than array");
assert.deepEqual(KSubsets(["seifan","the","queen"],2), [["seifan","the"],["seifan","queen"],["the","queen"]],"KSubsets-test 5-string tests");


const AllSubsets:<T>(array:Array<T>)=>Array<Array<T>>=function<T>(array:Array<T>):Array<Array<T>>  {
    var subsetResults = [];
    var currResult;
    var allCombination = Math.pow(2,array.length);
    var currSize;
    for(var i = 0; i < allCombination; i++){
        currResult = [];
        currSize = 0;

        while(currSize < array.length){
            if((i & (1<<currSize)) !== 0){
                currResult.push(array[currSize]);
            }
            currSize++;
        }

        subsetResults.push(currResult);
    } 
    return subsetResults;
}
assert.deepEqual(AllSubsets([1, 2, 3]),[ [], [ 1 ], [ 2 ], [ 1, 2 ], [ 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ]],"AllSubsets-test 1-check the regular");
assert.deepEqual(AllSubsets([]), [ [] ],"AllSubsets-test 2-empty array ");
assert.deepEqual(AllSubsets(["seifan","the","queen"]), [ [],[ 'seifan' ],[ 'the' ],[ 'seifan', 'the' ],[ 'queen' ],[ 'seifan', 'queen' ],[ 'the', 'queen' ],[ 'seifan', 'the', 'queen' ] ],"AllSubsets-test 5-string tests");


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ass 2.3

//Flatmap 
const flatmap: <T1, T2>(func: Function, arr: Array<T1>) => Array<T2> = function <T1, T2>(func: Function, arr: Array<T1>): Array<T2> {
    let outPut: Array<T2> = [];

    if (func != undefined && arr != undefined) {
        for (let obj of arr) {
            outPut = outPut.concat(func(obj));
        }
    }
    return outPut;
};

//tests

assert.deepEqual(flatmap((x) => x * x, [1, 2, 3, 4, 5, 6, 7, 8]), [1, 4, 9, 16, 25, 36, 49, 64], "test1-power of int- the arrays not equal");
assert.deepEqual(flatmap((x) => x * x, undefined), [], "test2-undifined arr- the arrays not equal");
assert.deepEqual(flatmap(undefined, [1, 2, 3, 4, 5, 6, 7, 8]), [], "test3-undifined func- the arrays not equal");




//movieList
interface movie {
    name: string;
    videos: Array<video>;
};

interface video{
    id: number;
    title: string;
    boxarts: Array<boxart>;
};

interface return_video{
    id: number;
    title: string;
    boxarts: string;
};

interface boxart {
    width: number;
    height: number;
    url: string;
};



const box_check_demision: (box: boxart) => boolean = function (box: boxart): boolean {
    return (box.height === 200 && box.width === 150);
};


const extractVideoList: (movieList: Array<movie>) => Array<movie> = function (movieList: Array<movie>): Array<movie> {
    return flatmap((x) => x.video, movieList);
}


const video_filter: (video: video) => return_video = function(video: video): return_video {
    let boxart: boxart = ramda.filter(box_check_demision, video.boxarts).pop();
    if(boxart!=undefined)
    return {
        id: video.id,
        title: video.title,
        boxarts: boxart.url
    };
    return{ 
        id: video.id,
        title: video.title,
        boxarts: ""
    };
};

const getBoxarts: (movielist: Array<movie>) => Array<return_video> = function(movielist: Array<movie>): Array<return_video> {
    let curr_list: Array<video> = flatmap((x)=>x.videos, movielist);
    let new_list: Array<return_video> = ramda.map(video_filter, curr_list);
    return new_list;
};


//test 1-regular test
let movielist1: Array<movie> = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
            }
        ]
    }
];
let movielist1_res: Array<return_video> = [ { id: 70111470,
    title: 'Die Hard',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
  { id: 654356453,
    title: 'Bad Boys',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
  { id: 65432445,
    title: 'The Chamber',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
  { id: 675465,
    title: 'Fracture',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' } ];

    assert.deepEqual(getBoxarts(movielist1), movielist1_res,"faild test1 of get boxarts!");



//test2 -empty boxart
let movielist2: Array<movie> = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [],

                
            }
        ]
    }
    
];
let movielist2_res: Array<return_video> = [ { id: 70111470,
    title: 'Die Hard',
    boxarts: '' }];

assert.deepEqual(getBoxarts(movielist2),movielist2_res,"faild test2 of get boxarts!");

//test3- empty movielist
let movielist3: Array<movie> = [];

let movielist3_res: Array<return_video> = [];

assert.deepEqual(getBoxarts(movielist3),movielist3_res,"faild test3 of get boxarts!");