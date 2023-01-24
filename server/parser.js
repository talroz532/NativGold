//get string of temperature
//return array of temperature in numbers
function parser(temperatureString){
    
    let arr = temperatureString
    .slice(1, -1)
    .split(',')
    .map(Number);
    
    return arr;
}


//get array of temperatures
//return if there is at least on number is between 15-30 C
function isRange(numArr){

    for(var i = 0; i< numArr.length ; i++){
        if(numArr[i] > 15 && numArr[i] < 30){
            return true;
        }
        
    }
    return false;
}


module.exports = {parser , isRange };