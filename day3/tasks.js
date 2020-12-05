//if I didnt want to color print task1, I could just use task2 with 1 defined slope
function task1(data){
    const chalk = require('chalk');

    let column = 0;
    let trees = 0;

    //decided to print the result colorfully because i'm a cute nerd
    console.log(data[0])
    for(let i = 1; i<data.length; i++){
        let row = data[i];

        column+=3;
        let j = column%row.length;
        if(row.charAt(j) === '#'){
            trees++;   
            console.log(row.substr(0, j)+chalk.hex('#ff0000')('X')+ row.substr(j + 1))   
        }else{ 
            console.log(row.substr(0, j)+chalk.hex('#00ff00')('0')+ row.substr(j + 1)) 
        }        
    }
    return trees
}

function task2(data){    
    let slopes = initSlopes();
    let rowIndex = 0;
    while(rowIndex < data.length-1){
        rowIndex++;
        let row = data[rowIndex];

        for (let slope of slopes) {        
            if(rowIndex%slope.rowStep===0){
                slope.col+=slope.colStep;
                if(row.charAt(slope.col%row.length) === '#')slope.trees++
            }
        }        
    }    
    return logResult(slopes);
}

function initSlopes(){
    let slopes = []
    slopes.push({rowStep: 1, colStep: 1, col: 0, trees: 0})
    slopes.push({rowStep: 1, colStep: 3, col: 0, trees: 0})
    slopes.push({rowStep: 1, colStep: 5, col: 0, trees: 0})
    slopes.push({rowStep: 1, colStep: 7, col: 0, trees: 0})
    slopes.push({rowStep: 2, colStep: 1, col: 0, trees: 0})
    return slopes
}

function logResult(slopes){
    let toLog = [];
    let total = 1;
    for (const slope of slopes) {
        toLog.push(slope.trees);
        total = total*slope.trees;
    }
    // console.log('numbers to multiply', toLog);
    return total;
}

function prepareData(data){
    return data.trim().split('\r\n');
}

module.exports = {task1, task2, prepareData};