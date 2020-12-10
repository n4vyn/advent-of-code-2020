function task1(data){
    let joltDiffs = {1:0, 3:0}
    data.unshift(0)
    for (let i = 1; i < data.length; i++) {
        joltDiffs[data[i]-data[i-1]]++
    }
    joltDiffs[3]++
    return joltDiffs[1]*joltDiffs[3]
}

function task2(data){
    let lastPartEnd = -1;
    let combinations = 1
    for (let i = 0; i < data.length; i++) {
        if(data[i]+1!==data[i+1]){
            let len = i-lastPartEnd
            if(lastPartEnd === -1){
                combinations*=7
                lastPartEnd = i
                continue
            }
            lastPartEnd = i
            if(len < 3)continue
            else if(len === 3)combinations*=2
            else if(len === 4)combinations*=4
            else if(len === 5)combinations*=7
            else if(len>5)console.log('to sme si nedomluvili');
        }
    }
    return combinations
}

function prepareData(data){
    return data.trim().split('\r\n').map(x=>{return parseInt(x)}).sort((a,b)=>a-b)
}

module.exports = {task1, task2, prepareData};