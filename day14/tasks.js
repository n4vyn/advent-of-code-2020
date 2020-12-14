function task1(data){
    let memory = {}
    let mask = ''
    for (const c of data) {
        const [t, v] = c;
        if(t === 'mask'){
            mask = v
        }else{
            const index = t.match(/[0-9]+/)[0]
            let bin = (v >>> 0).toString(2);
            bin = '0'.repeat(mask.length-bin.length)+bin
            let newBin = ''
            for (let i = 0; i < mask.length; i++) {
                if(mask[i] === 'X') newBin += bin[i]
                if(mask[i] === '0') newBin += '0'
                if(mask[i] === '1') newBin += '1'
            }
            memory[index] = parseInt(newBin, 2)
        }
    }
    return Object.values(memory).reduce((acc, cur)=>acc+cur,0)
}

function task2(data){
    let memory = {}
    let mask = ''
    for (const c of data) {
        const [t, v] = c;
        if(t === 'mask'){
            mask = v
        }else{
            const index = t.match(/[0-9]+/)[0]
            let binIndex = (index >>> 0).toString(2);
            binIndex = '0'.repeat(mask.length-binIndex.length)+binIndex

            let binIndices = ['']

            for (let i = 0; i < mask.length; i++) {
                const len = binIndices.length
                for(let j = 0; j < len; j++){
                    if(mask[i] === '0') binIndices[j] += binIndex[i]
                    if(mask[i] === '1') binIndices[j] += '1'
                    if(mask[i] === 'X'){
                        binIndices.push(binIndices[j]+'1')
                        binIndices[j] += '0'
                    }
                }
            }
            for (const bi of binIndices) {
                memory[bi] = parseInt(v);
            }
        }
    }
    return Object.values(memory).reduce((acc, cur)=>acc+cur,0)
}

function prepareData(data){
    return data.trim().split('\r\n').map(c=>c.split(' = '))
}

module.exports = {task1, task2, prepareData};