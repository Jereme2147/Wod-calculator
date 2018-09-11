'use strict'

//  returns Arr filled with "days" number of Days
function createDays (days) {
  let createArr = []
  let Day = function () {
    this.day = 0,
    this.priority = 'priority',
    this.time = 'time',
    this.repCount = 'rep count'
  }
  for (let i = 0; i < days; i++) {
    createArr.push(new Day())
        createArr[i].day = i + 1
    }
  return createArr
}
// takes arr of information with a key, inserts into global
function createKey (arr, key, arrayObjs) {
  for (let keys in arrayObjs) {
    arrayObjs[keys][key] = arr[keys]
    };
};
// adds For Time or AMRAP for each day
function generatePriority (arr) {
  let evens = 0
    let odds = 0
    let priorityArr = []
    let days = arr.length
    //This is keeping from having more than two like days in a row
    for (let i = 0; i < days; i++) {
    let x = randomNumber(100)
        if (x % 2 == 0 && evens < 2) {
      priorityArr.push('AMRAP')
            evens++
            odds = 0
        } else if (x % 2 == 0 && evens > 1) {
      priorityArr.push('For Time')
            evens = 0
            odds++
        } else if (x % 2 == 1 && odds < 2) {
      priorityArr.push('For time')
            odds++
            evens = 0
        } else if (x % 2 == 1 && odds > 1) {
      priorityArr.push('AMRAP')
            odds = 0
            evens++
        } else {
      alert('how did we get here')
        }
  }
  return priorityArr
};
// Sets the wod lengths.
function timeFrame () {
  let wodRandom = []
    let wodInput = []
    //replace this with a function that takes length and % and 
    //returns an array to push. 
    let heavy = 'Heavy Day';

    
let sprint = 'Sprint < 5m';

    
let short = 'Short 5 - 10m';

    
let medium = 'Medium 10 - 18m';

    
let long = 'Long 18 - 25m';

    
let damn = 'This will hurt'
    wodRandom.push(...(populateArrayPercent(heavy, 0.05)))
    wodRandom.push(...(populateArrayPercent(sprint, 0.10)))
    wodRandom.push(...(populateArrayPercent(short, 0.20)))
    wodRandom.push(...(populateArrayPercent(medium, 0.40)))
    wodRandom.push(...(populateArrayPercent(long, 0.20)))
    wodRandom.push(...(populateArrayPercent(damn, 0.05)))
    wodRandom = shuffleArr(wodRandom)
    wodRandom = checkRepeat(wodRandom, 3)
    return wodRandom 
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
// returns random number between 0 and num
function randomNumber (num) {
  return (Math.floor(Math.random() * num))
}
// used to randomize an array
function shuffle (array) {
  let currentIndex = array.length; let temporaryValue; let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

  return array
}
// takes arr max consecutive days in a row it's allowed, and makes the changes
function checkRepeat (arr, maxConsec) {
  let high = maxConsec - 1
    for (let i = 2; i < arr.length; i++) {
    if (i - maxConsec < 0) {
      continue
        }
    if (arr[i] === arr[i - maxConsec] && arr[i] === arr[i - high]) {
      let temp = arr[i]
            let tempKey = randomNumber(arr.length)
            arr[i] = arr[tempKey]
            arr[tempKey] = temp
            i = 2
        }
  }
  return arr
}
function generateRepCount (arr) {
  let tempArr = [...arr]
    let days = wods.length
    let repArr = []
    let low = populateArrayPercent('Low Reps < 50', 0.08)
    let med = populateArrayPercent('Med Reps 50 - 100', 0.4)
    let high = populateArrayPercent('High Reps 100+', 0.62)
    repArr = [...low, ...med, ...high]
    repArr = shuffleArr(repArr)
    repArr = checkRepeat(repArr, 3)
    for (let i = 0; i < tempArr.length; i++) {
    switch (tempArr[i].time) {
      case 'Heavy Day':
        repArr[i] = 'n/a'
                break;
      case 'Long 18 - 25m':
        repArr[i] = 'High reps 100+'
                break;
    }
  }
  /* for(let i = 0; i < tempArr.length; i++){
         if (tempArr[i].time == 'Heavy Day') {
             repArr[i] = 'n/a';
         } else if (tempArr[i].time == 'Long 18 - 25m' && repArr[i] == 'Low Reps < 50'){
             repArr[i] = 'High Reps 100+';
         }
    } */


  return repArr
}
function addStrength (arr) {
  let strengthArr = [...arr]
    let strength = []
    let sCount = 0
    let heavy = 'Heavy Day';

        
let sprint = 'Sprint < 5m';

        
let short = 'Short 5 - 10m';

        
let medium = 'Medium 10 - 18m';

        
let long = 'Long 18 - 25m';

        
let damn = 'This will hurt'
    for (let i = 0; i < strengthArr.length; i++) {
    if (strengthArr[i].time == short ||
            strengthArr[i].time == sprint) {
      if (sCount < 3 && strength[i - 1] != 'strength') {
        strength[i] = 'strength'
                sCount++
                } else {
        strength[i] = 'gymnastic test'
                    sCount = 0 
                }
    } else if (strengthArr[i].time == medium && sCount < 2) {
      strength[i] = 'strength'
                sCount++
            } else if (strengthArr[i].time == heavy || strengthArr[i].time == long) {
      strength[i] = 'N/A'
                sCount = 0
            } else {
      if (strengthArr[i].time == medium && sCount < 2) {
        strength[i] = 'strength'
                } else{
        strength[i] = 'Just wod'
                }
    }
  }
  return strength
}

// take item and % required return array with that number of entries
// takes length, finds the % and returns that many of that item.
// % should be sent as .6 = 60% .5 = 50%
function populateArrayPercent (item, percent) {
  let arr = []
    let num = wods.length * percent
    for (let i = 0; i < num; i++) {
    arr.push(item)
    }
  return arr
}
// sent array, return random shuffle.
function shuffleArr (arr) {
  let i = 0,
             j = 0,
             temp = null

  for (i = arr.length - 1; i > 0; i -= 1) {
    j = Math.round(Math.random() * (i + 1))
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr

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
// all for testing purposes.
let wods = createDays(12) //20 will be "days".
//printWods();
createKey(generatePriority(wods), 'priority', wods)
createKey(timeFrame(), 'time', wods)
//generateRepCount();
createKey(generateRepCount(wods), 'repCount', wods)
createKey(addStrength(wods), 'strength', wods)
//addStrength();
console.table(wods)
