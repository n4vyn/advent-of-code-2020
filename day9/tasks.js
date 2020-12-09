function task1(data){
    return findContiguousNumber(data, 25)
}

function findContiguousNumber(data, preamble){
    for (let i = preamble; i < data.length; i++) {
        const range = data.slice(i-preamble, i)
        if(!range.some(x=>{            
            return range.some(y=>{return data[i]===y+x})
        }))return data[i]
    }
}

function task2(data){
    const contiguousNumber = findContiguousNumber(data, 25)
    for (let i = 0; i < data.length; i++) {
        let j = i, sum = 0;
        while(sum<contiguousNumber){
            sum+=data[j]
            if(sum===contiguousNumber){
                const contiguousRange = data.slice(i, j+1)
                const min = Math.min(...contiguousRange)
                const max = Math.max(...contiguousRange)
                return min+max;
            }
            j++
        }
    }
}


function prepareData(data){
    return data.trim().split('\r\n').map(x=>parseInt(x));
}

module.exports = {task1, task2, prepareData};
