import {map} from 'ramda'
import { expect, assert } from 'chai';
import 'mocha';

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


