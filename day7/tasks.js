function task1(data){
    let resultStructure = {
        0: ['shiny gold']
    }
    let i = 0;
    while(resultStructure[i].length>0){
        resultStructure[i+1] = []

        for (const color of Object.keys(data)) {
            if(resultStructure[i].some(lf=>{
                return data[color].some(c=>c.color === lf)
            })){
                resultStructure[i+1].push(color)
                delete data[color] //deleting so we dont get duplicates and we can iterate faster next time
            }
        }        
        i++
    }
    // console.log(resultStructure);    
    return Object.values(resultStructure).reduce((acc, curr) => acc + curr.length, 0)-1
}

let gData = {}
function task2(data){
    gData = data;
    return recursionFest('shiny gold')-1
}

function recursionFest(color){
    let bagContent = 0
    if(gData[color].length>0){
        for (const c of gData[color]) {
            bagContent += c.q*recursionFest(c.color)
        }
        // console.log(`${color} holds ${bagContent} other bags`);
        return bagContent+1 
    }else{
        return 1
    }
}

function prepareData(data){
    data = data.trim().split('\r\n')
    let keyedData = {}
    for (const rule of data) {
        let [holder, content] = rule.split(' contain ')
        let holderColor = holder.split(' ')
        holderColor = holderColor[0]+' '+holderColor[1]
        keyedData[holderColor] = [];

        content = content.split(', ')
        for (const c of content) {
            let x = c.split(' ')
            let q = x[0];
            let color = x[1]+' '+x[2]
            if(q !== 'no')keyedData[holderColor].push({q, color})
        }
    }
    return keyedData
}

module.exports = {task1, task2, prepareData};