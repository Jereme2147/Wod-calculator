"use strict";
var lengths = [];   /* array for wod lengths */
var workOutOfTheDay = []; /* array to hold the contents of the entire day */
var amrap = 0;
var forTime = 0;
var lengths = [];   /* array for wod lengths */
let numberOfDays = 0; 

function wodLength(days){
    var day = document.getElementById('days').value;
   
    for (var i = 0; i < day; i++){
        lengths.push(Math.floor((Math.random() * 100) + 1)); /* random numbers for each dayt */ 
    }
    numberOfDays = days;
    convertNumbersToLengths(lengths);
} 

function convertNumbersToLengths(lengths){
    for (var i = 0; i < lengths.length; i++){
        
            if (lengths[i] > 0 && lengths[i] <= 7){
                lengths[i] = 'heavy';
                
            } else if (lengths[i] > 7 && lengths[i] <= 14){
                lengths[i] = 'sprint';
               
            } else if (lengths[i] > 14 && lengths[i] <= 28){
                lengths[i] = 'short';
                
            } else if (lengths[i] > 28 && lengths[i] <= 70){
                lengths[i] = 'medium';
               
            } else if (lengths[i] > 70 && lengths[i] <= 98){
                lengths[i] = 'long';
               
            } else{
                lengths[i] = 'fuck';
            }
        }
       putDayNumbers();
    }

function putDayNumbers(){
    for (var i = 0; i < lengths.length; i++) {
        workOutOfTheDay.push({ 'day': i + 1 });
    }
    putObject('time');
}
    /* puts time frames into the array */
function putObject(newInfo) {
    for (var i = 0; i < lengths.length; i++) {
        workOutOfTheDay[i][newInfo] = lengths[i];
    }
    priority();
    printWods(workOutOfTheDay);
}

/* will run until amrap vs for time is within 10%  */
function priority(){
    do {
        for (var i = 0; i < lengths.length; i++){
          if ((Math.floor((Math.random() * 10)) % 2)){
             workOutOfTheDay[i]['priority'] = 'For Time';
              }else {
                     workOutOfTheDay[i]['priority'] = 'AMRAP';
                }
            }
    } while(getPercentage(amrap) < 45 && getPercentage(amrap) > 55);
   
    countPriority();
}

function countPriority(){
    var x = lengths.length;
    
    for (var i = 0; i < x; i ++){
        switch (workOutOfTheDay[i]['priority']){
            case 'For Time':
                forTime ++;
                break;
            case 'AMRAP':
                amrap ++;
                break;
        }
    }
}

/* intended to return the percentage of a number in reference to the days  */
function getPercentage(number1){
    return Math.floor((( number1 / lengths.length) * 100 ));
}

/* prints every wod.  If I add a field it must be added to the loop */
function printWods(workout) {
    var rowID = 'dayGrid';
    var i;
    for (i = 0; i < lengths.length; i++) {
        for (var j = 0; j < 7; j++){
        var blockDiv = buildDayBlocks(rowID);
        blockDiv.innerHTML += "Day: " + workout[i].day;
        blockDiv.innerHTML += "<br>Time frame: " + workout[i].time;
        blockDiv.innerHTML += "<br>Workout Priority: " + workOutOfTheDay[i].priority;
        i++;
        }
        rowID = buildNewRow(rowID);
    }
}

function buildDayBlocks(newRowID){
    
        var blockDiv = document.createElement("div");
        blockDiv.id = "dayBlocks";
        var blockday = document.getElementById(newRowID);
        blockday.appendChild(blockDiv);
        return blockDiv;
}

function buildNewRow(oldRowID){
    var newRowID = oldRowID + 'a';
    console.log(newRowID);
    var newRow = document.createElement("div");
    newRow.className = "row";
    newRow.id = newRowID;
    var RowPlace = document.getElementById("topRow");
    RowPlace.appendChild(newRow);
    return newRowID;
}
