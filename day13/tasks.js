function task1(data){
    let i = 1
    let buses = data.buses.filter(x=>x!=='x').map(Number)
    let closestOverEearliest = {}

    for (const bus of buses) {
        closestOverEearliest[bus] = bus*Math.floor((data.earliest/bus))
    }

    while(true){
        for (let j = 0; j < buses.length; j++) {
            closestOverEearliest[buses[j]] += buses[j]
            if(closestOverEearliest[buses[j]] >= data.earliest){
                buses.splice(j, 1)
            }
        }

        if(buses.length === 0) break
        i++
    }
    let result = Object.entries(closestOverEearliest).sort((a,b)=>a[1]-b[1])[0]
    return (result[1]-data.earliest)*result[0]
}

function task2(data){
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