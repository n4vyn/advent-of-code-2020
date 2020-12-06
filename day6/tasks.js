function task1(data){
    let result = 0;
    for (let groupAnswers of data) {
        result += [... new Set(groupAnswers.replace(/ /g,''))].length;
    }
    return result;
}

function task2(data) {
    let result = 0;
    for (const groupAnswers of data) {
        const [first, ...rest] = groupAnswers.split(' ')

        for (let i = 0; i < first.length; i++) {            
            if(rest.every(ans=>{
                return ans.includes(first[i])
            }))result++            
        }  
    }
    return result;
}

function prepareData(data){
    return data.trim().replace(/\r\n/g, ' ').split('  ')
}

module.exports = {task1, task2, prepareData};