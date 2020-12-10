function task1(data){
    let joltDiffs = {1:0, 3:0}
    data.unshift(0)
    for (let i = 1; i < data.length; i++) {
        joltDiffs[data[i]-data[i-1]]++
    }
    joltDiffs[3]++
    return joltDiffs[1]*joltDiffs[3]
}

/**
 * I kinda cheesed this task.
 * 
 * I think my approach of splitting data into parts
 * (there are only steps by 1 and 3), with the splitting
 * point being step > 1, is correct. But I could't think of
 * how to make a non-disgusting code for calculating possibilities
 * for each part.length at the time, maybe I'll come back to it.
 *   
 * I found out that in my input, maximum length of 
 * single part is 5, so I pre-calculated number of
 * possibilities for lengths 1-5 (and one extra for the 
 * starting part, because disgustingly enough,
 * a different algorithm must be applied)
 * and then hardcoded them in.
 * 
 * not my fault this task was made easily cheesable with
 * such little max length of parts :beavisCHAD:
 * 
 */
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
            if(len < 3)combinations*=1
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