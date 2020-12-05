
function task1(data){
    return 'xs'
    return Math.max(...data)
}

function task2(data){
    //manual sort function cause 99>980 with the default one smh
    data.sort((a,b)=>{return a-b})
    for (let i = 0; i < data.length; i++) {
        if(data[i]+1 !== data[i+1]){
            return data[i]+1
        }
    }
}

function prepareData(data){
    return data.trim().split('\r\n')
    .map(ticket=>{
        const rowBin = ticket.slice(0,7).replace(/F/g, 0).replace(/B/g, 1)
        const colBin = ticket.slice(7).replace(/L/g, 0).replace(/R/g, 1)
        
        const rowDec = parseInt(rowBin, 2)
        const colDec = parseInt(colBin, 2)

        return rowDec*8+colDec;
    })
}

module.exports = {task1, task2, prepareData};