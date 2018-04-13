import * as ramda from 'ramda';
import { expect, assert } from 'chai';
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
    name: string,
    videoList: Array<video>
};

interface video {
    id: number;
    title: string;
    boxarts: Array<boxart>;
};

interface return_video {
    id: number,
    title: string,
    boxarts: string
};

interface boxart {
    width: number,
    height: number,
    url: string,
};

const box_check_demision: (box: boxart) => boolean = function(box: boxart): boolean{
    return (box.height === 200 && box.width === 150);
}

const extractVideoList: (movieList: Array<movie>) => Array<movie> = function (movieList: Array<movie>): Array<movie> {
    return flatmap((x) => x.video, movieList);
}

const video_filter: (video: video) => return_video = function (video: video): return_video {
    let boxarts: boxart = ramda.filter(box_check_demision, video.boxarts).pop();
    let outPut: return_video = {
        id: video.id,
        title: video.title,
        boxarts: boxarts.url
    };
    return outPut;
};

const getBoxArts: (movielist: Array<movie>) => Array<return_video> = function (movielist: Array<movie>): Array<return_video> {
    let video_list: Array<video> = flatmap((x) => x.video, movielist);
    let outPut:Array<return_video>= ramda.map(video_filter, video_list);
    return outPut;
};


//test 1

let movielist1: Array<movie> = [
    {
        name: "Instant Queue",
        videoList: [
            {
                id: 70111470,
                title: "Die Hard",
                boxarts: [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                // "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                // "rating": 4.0,
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                // "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                // "rating": 5.0,
            }
        ]
    },
    {
        name: "New Releases",
        videoList: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                // "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                // "rating": 4.0,
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                // "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                // "rating": 5.0,
            }
        ]
    }
];

let movielist1_res: Array<return_video> = [{
    id: 70111470,
    title: 'Die Hard',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg'
},
{
    id: 654356453,
    title: 'Bad Boys',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg'
},
{
    id: 65432445,
    title: 'The Chamber',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg'
},
{
    id: 675465,
    title: 'Fracture',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg'
}];


assert.deepEqual(getBoxArts(movielist1), movielist1_res, "faild test1 of get boxarts!");