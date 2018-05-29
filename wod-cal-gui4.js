"use strict";
var lengths = [];   /* array for wod lengths */
var workOutOfTheDay = []; /* array to hold the contents of the entire day */
var amrap = 0;
var forTime = 0;

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
    putObject('time', lengths);
    schemeInsert();
}
    /* puts time frames into the array */
function putObject(newInfo, newArray) {
    for (var i = 0; i < lengths.length; i++) {
        workOutOfTheDay[i][newInfo] = newArray[i];
    }
    return;
    /* priority();
    printWods(workOutOfTheDay); */
}

/* will run until amrap vs for time is within 10%  */
function priority(){
    let ones = 0;
    do{
        ones = 0;
        for (var i = 0; i < lengths.length; i++){
          if ((Math.floor((Math.random() * 10)) % 2)){
             workOutOfTheDay[i]['priority'] = 'For Time';
                ones++;
              }else {
                     workOutOfTheDay[i]['priority'] = 'AMRAP';
                    
                }
            }
        }while (!getPercentage(ones));
   

}



/* intended to return the percentage of a number in reference to the days  */
function getPercentage(ones) {
    let onesPercent = findPercentage(ones);
    if (onesPercent > 45 && onesPercent < 55) {
        return true;
    }else if(lengths.length < 10){
        return true;
    } 
    else {

        return false;
    }
}
/* prints every wod.  If I add a field it must be added to the loop */
function printWods(workout) {
    var rowID = 'dayGrid';
    var i;
    for (i = 0; i < lengths.length; i++) {
        for (var j = 0; j < 7; j++){    // ********have to figure out how to stop this from running too many times. **
        if(i + j > lengths.length){
            printPercentages();
            continue;
        }
        var blockDiv = buildDayBlocks(rowID);
        blockDiv.innerHTML += "Day: " + workout[i].day;
        blockDiv.innerHTML += "<br>Time frame: " + workout[i].time;
        blockDiv.innerHTML += "<br>Workout Priority: " + workOutOfTheDay[i].priority;
        blockDiv.innerHTML += "<br>Scheme: " + workOutOfTheDay[i].scheme;
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
    newRow.className = "row container-fluid";
    newRow.id = newRowID;
    var RowPlace = document.getElementById("topRow");
    RowPlace.appendChild(newRow);
    return newRowID;
}

function findPercentage(anyRecord){
    let percentOfTotalDays = Math.floor(((anyRecord / lengths.length) * 100));
    return percentOfTotalDays;
}
/* adds in scheme single couplet triplet chipper */

 function schemeInsert() {
     let scheme = [];
    for (var l = 0; l < lengths.length; l++) {
        scheme.push(Math.floor((Math.random() * 100) + 1)); /* random numbers for each dayt */
     }
    for (var i = 0; i < lengths.length; i++) {

        if (scheme[i] > 0 && scheme[i] < 5) {
            scheme[i] = 'single';

        } else if (scheme[i] > 4 && scheme[i] < 40) {
            scheme[i] = 'couplet';

        } else if (scheme[i] > 39 && scheme[i] < 75) {
            scheme[i] = 'triplet';

        } else if (scheme[i] > 74 && scheme[i] < 100) {
            scheme[i] = 'Chipper 4+';

        } else {
            scheme[i] = 'fuck if I know';
        }
    }
    putObject('scheme', scheme);
    priority();
    printWods(workOutOfTheDay);
}


/* to be deleted.  for development purposes */
function printPercentages() {
    let totalAmraps = 0; 
    let totalForTime = 0;
    let lengthOfWodLong = 0;
    let lengthOfWodMedium = 0;
    let lengthOfWodFuck = 0;
    let lengthOfWodShort = 0;
    let lengthOfWodSprint = 0;
    let lengthOfWodHeavy = 0;
    let schemeSingle = 0;
    let schemeCouplet = 0;
    let schemeTriplet = 0;
    let schemeChipper = 0;
    let schemeDunno = 0;
    

     for (let i = 0; i < workOutOfTheDay.length; i++){
        if(workOutOfTheDay[i].priority === 'AMRAP'){
            totalAmraps ++;
        }else{
            totalForTime ++;
        }
    }
     for (let j = 0; j < workOutOfTheDay.length; j++) {
        if (workOutOfTheDay[j].time === 'heavy') {
            lengthOfWodHeavy++;
        } else if(workOutOfTheDay[j].time === 'sprint'){
            lengthOfWodSprint ++;
        } else if(workOutOfTheDay[j].time === 'short'){
            lengthOfWodShort ++;
        } else if(workOutOfTheDay[j].time === 'medium'){
            lengthOfWodMedium ++;
        } else if(workOutOfTheDay[j].time === 'long'){
            lengthOfWodLong ++;
        } else {
            lengthOfWodFuck ++;
        }
           
    } 
    for (let b = 0; b < workOutOfTheDay.length; b++) {
        if (workOutOfTheDay[b].scheme === 'single') {
            schemeSingle++;
        } else if (workOutOfTheDay[b].scheme === 'couplet') {
            schemeCouplet++;
        } else if (workOutOfTheDay[b].scheme === 'triplet') {
            schemeTriplet++;
        } else if (workOutOfTheDay[b].scheme === 'Chipper 4+') {
            schemeChipper++;
        } else {
            schemeDunno++;
        }

    } 
    lengthOfWodFuck = findPercentage(lengthOfWodFuck);
    lengthOfWodHeavy = findPercentage(lengthOfWodHeavy);
    lengthOfWodSprint = findPercentage(lengthOfWodSprint);
    lengthOfWodShort = findPercentage(lengthOfWodShort);
    lengthOfWodMedium = findPercentage(lengthOfWodMedium);
    schemeSingle = findPercentage(schemeSingle);
    schemeCouplet = findPercentage(schemeCouplet);
    schemeTriplet = findPercentage(schemeTriplet);
    schemeChipper = findPercentage(schemeChipper);
    schemeDunno = findPercentage(schemeDunno);
    
    var percentages = document.getElementById("percentages");
    percentages.innerHTML = "Amraps: " + totalAmraps + '<br>For Time: ' + totalForTime;
    percentages.innerHTML += "<br>heavy: " + lengthOfWodHeavy + " Sprint: " + lengthOfWodSprint + "<br>Short: " + lengthOfWodShort + " Medium: " + lengthOfWodMedium + "<br> Long: " + lengthOfWodLong + " fuck: " + lengthOfWodFuck;
    percentages.innerHTML += "<br>Single: " + schemeSingle + "  Couplet:  " + schemeCouplet;
    percentages.innerHTML += "<br>Triplet:  " + schemeTriplet + "  Chipper:  " + schemeChipper;
    percentages.innerHTML += "<br>Fuck if I know: " + schemeDunno; 

    console.table(workOutOfTheDay);
}

