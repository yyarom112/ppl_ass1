import * as ramda from 'ramda';
import { assert } from 'chai';
import 'mocha';

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
