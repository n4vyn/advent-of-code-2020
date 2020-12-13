function task1(data){
    let buses = data.buses.filter(x=>x!=='x').map(Number)
    let results = buses.map(bus=>bus*Math.ceil((data.earliest/bus)))
    let min = Math.min(...results)
    let busID = buses[results.findIndex(x=>x===min)];
    return (min-data.earliest)*busID
}

function task2(data){
    console.log(data);
    /**
     * First task I actually really hate,
     * because it seems I need to know some number theory shit
     * that I've never studied or even known about,
     * if I don't want to make some disgusting
     * loops that would run for 20 minutes
     * 
     * might come back to this later but right now I CBA
     */
}

function prepareData(data){
    data = data.trim().split('\r\n');
    let newData = {};
    newData.earliest = parseInt(data[0])
    newData.buses = data[1].split(',')
    return newData
}

module.exports = {task1, task2, prepareData};