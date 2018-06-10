"use strict";

//returns Arr filled with "days" number of Days. 
function createDays(days) {
    let createArr = [];
    let Day = function () {
        this.day = 0,
            this.priority = 'priority',
            this.time = 'time',
            this.repCount = 'rep count'
    };
    for (let i = 0; i < days; i++) {
        createArr.push(new Day);
        createArr[i].day = i + 1;
    }
    return createArr;
}
//takes arr of information with a key, inserts into global 
function createKey(arr, key, arrayObjs) {
    for (let keys in arrayObjs) {
        arrayObjs[keys][key] = arr[keys];
    }
}
// adds For Time or AMRAP for each day
function generatePriority(arr) {
    let evens = 0;
    let odds = 0;
    let priorityArr = [];
    let days = arr.length;
    //This is keeping from having more than two like days in a row
    for (let i = 0; i < days; i++) {
        let x = randomNumber(100);
        if (x % 2 == 0 && evens < 2) {
            priorityArr.push('AMRAP');
            evens++;
            odds = 0;
        } else if (x % 2 == 0 && evens > 1) {
            priorityArr.push('For Time');
            evens = 0;
            odds++;
        } else if (x % 2 == 1 && odds < 2) {
            priorityArr.push('For time');
            odds++;
            evens = 0;
        } else if (x % 2 == 1 && odds > 1) {
            priorityArr.push('AMRAP');
            odds = 0;
            evens++;
        } else {
            alert("how did we get here");
        }
    }
    return priorityArr
};
//Sets the wod lengths. 
function timeFrame(){
    let wodRandom = [];
    let wodInput = [];
    //replace this with a function that takes length and % and 
    //returns an array to push. 
    let heavy = 'Heavy Day',
    sprint = 'Sprint < 5m',
    short = 'Short 5 - 10m',
    medium = 'Medium 10 - 18m',
    long = 'Long 18 - 25m',
    damn = 'This will hurt';
    wodRandom.push(...(populateArrayPercent(heavy, .05)));
    wodRandom.push(...(populateArrayPercent(sprint, .10)));
    wodRandom.push(...(populateArrayPercent(short, .20)));
    wodRandom.push(...(populateArrayPercent(medium, .50)));
    wodRandom.push(...(populateArrayPercent(long, .10)));
    wodRandom.push(...(populateArrayPercent(damn, .05)));
    wodRandom = shuffleArr(wodRandom);
    return wodRandom; 
    // for(let i = 0; i < wods.length; i++){
    //     wods[i].time = wodRandom[i];
    // }

    //checkRepeat('time', 2);
    // testPercentages(heavy1, 'Heavy');
    // testPercentages(sprint1, 'Sprint');
    // testPercentages(short1, 'Short');
    // testPercentages(medium1, 'Medium');
    // testPercentages(long1, 'Long');
    // testPercentages(damn1, 'Damn');  
}
//returns random number between 0 and num
function randomNumber(num){
    return (Math.floor(Math.random()*num));
}
//used to randomize an array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// takes arr max consecutive days in a row it's allowed, and makes the changes
function checkRepeat(arr, maxConsec){
    let high = maxConsec - 1;
    for(let i = 2; i < arr.length; i++){
        if(i - maxConsec < 0){
            continue;
        }
        if (arr[i] === arr[i - maxConsec] && arr[i] === arr[i - high]){
            let temp = arr[i];
            let tempKey = randomNumber(arr.length);
            arr[i] = arr[tempKey];
            arr[tempKey] = temp;
            i = 2;
        }
    }
    return arr;
}
function generateRepCount(arr){
    let tempArr = [...arr];
    let days = wods.length;
    let repArr = [];
    let low = populateArrayPercent('Low Reps < 50', .08);
    let med = populateArrayPercent('Med Reps 50 - 100', .4);
    let high = populateArrayPercent('High Reps 100+', .62);
    repArr = [...low , ...med, ...high];
    repArr = shuffleArr(repArr);
    repArr = checkRepeat(repArr, 3);
    //this isn't working just yet.
    repArr.forEach(function(a){
        if(tempArr[repArr.indexOf(a)].time == 'Heavy Day'){
            repArr[repArr.indexOf(a)] = 'fuck me it worded';
        }
    })

    /* function makeAdustments(arr){
        let repHolder;
        for(let i = 0; i < days; i++){
            if (tempArr[i].time == 'Long 18 - 25m' && arr[i] == 'Low Reps < 50'){
                tempArr[i].repCount = 'High Reps 100+';
            } else if(tempArr[i].time == 'Heavy Day'){
                tempArr[i].repCount = 'N/A';
            } else{
              tempArr[i].repCount = arr[i];
            }
        }
    } */
    /* for(let things in repArr){
        tempArr[things].repCount = repArr[things];
        console.log(repArr[things]);
    } */
    //makeAdustments(repArr);
    //checkRepeat('repCount', 3);
    return repArr;
}
function addStrength(){
    for(let i = 0; i < wods.length; i++){
        if(wods[i].time == 'Sprint < 5m' 
        || wods[i].time == 'Short 5 - 10m'){
            wods[i].strength = 'Strength';
        };
        if(wods[i].time == 'Medium 10 - 18m' && i > 0){
            if(wods[i-1].strength == 'Strength'){
                continue;
            }else {
                wods[i].strength = 'Strength';
            }
        }
    }
}
// take item and % required return array with that number of entries
//takes length, finds the % and returns that many of that item.
//% should be sent as .6 = 60% .5 = 50%
function populateArrayPercent(item, percent){
    let arr = [];
    let num = wods.length * percent;
    for(let i = 0; i < num; i++){
        arr.push(item);
    }
    return arr;
}
//sent array, return random shuffle. 
function shuffleArr(arr) {
        let i = 0
            , j = 0
            , temp = null

        for (i = arr.length - 1; i > 0; i -= 1) {
            j = Math.round(Math.random() * (i + 1))
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    return arr;

}

 /* function testPercentages(itemCount, item){
    $(document).ready(function(){
        let itemCountNum = (itemCount / wods.length) * 100;
         $("#main").append(`<div>${item} ${itemCountNum}%</div>`);
    })
   
}  */
/* function printWods(){
    for(let keys of wods){
        console.log('the fuck');
         
    }
} */
//all for testing purposes.
let wods = createDays(20); //20 will be "days".
//printWods();
createKey(generatePriority(wods), 'priority', wods);
createKey(timeFrame(), 'time', wods);
//generateRepCount();
createKey(generateRepCount(wods), 'repCount', wods);
addStrength();
console.table(wods);