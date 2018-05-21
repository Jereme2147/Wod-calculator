let wods = [];


// adds objects based on the number of days you want to create to wods ARR
function createDays(days){
    var Day = function () {
        this.day = 0;
        this.priority = 'priority';
        this.time = 'time';
        this.repCount = 'rep count';
    };
    for(i = 0; i < days; i++){
        wods.push(new Day);
        wods[i].day = i+1;
    }
}
// adds For Time or AMRAP for each day
function generatePriority(){
    let evens = 0;
    let odds = 0;
//This is keeping from having more than two like days in a row
    for(let i = 0; i < wods.length; i++){
        let x = randomNumber(100);
        if(x % 2 == 0 && evens < 2){
            wods[i].priority = 'AMRAP';
            evens ++;
            odds = 0;
        }else if(x % 2 == 0 && evens > 1){
            wods[i].priority = 'For Time';
            evens = 0;
            odds ++;
        }else if(x % 2 == 1 && odds < 2){
            wods[i].priority = 'For Time';
            odds ++;
            evens = 0;
        }else if(x % 2 == 1 && odds > 1){
            wods[i].priority = 'AMRAP';
            odds = 0;
            evens ++;
        }else {
            alert("how did we get here");
        }
    }
};
//Sets the wod lengths. 
function timeFrame(){
    let wodRandom = [];
    for(let i = 0; i < 100; i++){
        if(i < 7){
            wodRandom.push('Heavy Day');
        }else if(i < 14){
            wodRandom.push('Sprint < 5m');
        }else if(i < 42){
            wodRandom.push('Short 5 - 10m');
        }else if(i < 77){
            wodRandom.push('Medium 10 - 18m');
        }else if(i < 98){
            wodRandom.push('Long 18 - 25m');
        }else {
            wodRandom.push('This will hurt');
        }
        
    } 
    wodRandom = shuffle(wodRandom);
    wodRandom = shuffle(wodRandom);
     for(let j = 0; j < wods.length; j++){
        wods[j].time = wodRandom.shift();
    } 
    checkRepeat('time', 2);
}
function randomNumber(num){
    return (Math.floor(Math.random()*num));
}
//used to randomize an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
// takes key value and max consecutive days in a row it's allowed, and makes the changes
function checkRepeat(key, maxConsec){
    let high = maxConsec - 1;
    for(let i = 2; i < wods.length; i++){
        if(i - maxConsec < 0){
            continue;
        }
        if (wods[i][key] === wods[i - maxConsec][key] && wods[i][key] === wods[i - high][key]){
            let temp = wods[i][key];
            let tempKey = randomNumber(wods.length);
            wods[i][key] = wods[tempKey][key];
            wods[tempKey][key] = temp;
            i--;
        }
        console.log(wods[i][key]);
    }
}
function generateRepCount(){
    var days = wods.length;
    var low = Math.floor(days * .08);
    var med = Math.floor(days * .3)+1;
    var high = Math.floor(days * .62);
    var repArr = [];
    for(var i = 0; i < low; i++){
        repArr.push('Low Reps < 50');
    }
    for(var j = 0; j < med; j++){
        repArr.push('Med Reps 50 - 100');
    }
    for(var k = 0; k < high; k++){
        repArr.push('High Reps 100+')
    }
    for(var f = 0; f < 5; f++){
        repArr = shuffle(repArr);
    }
    function makeAdustments(arr){
        var repHolder;
        for(var i = 0; i < days; i++){
            if (wods[i].time == 'Long 18 - 25m' && arr[i] == 'Low Reps < 50'){
                wods[i].repCount = 'High Reps 100+';
            } else if(wods[i].time == 'Heavy Day'){
                wods[i].repCount = 'N/A';
            } else{
              wods[i].repCount = arr[i];
            }
        }
    }
    makeAdustments(repArr);
    checkRepeat('repCount', 3);
}

//all for testing purposes.
createDays(20);
generatePriority();
timeFrame();
generateRepCount();
console.table(wods);