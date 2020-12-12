function task1(data){
    let directions = {
        '-3': 'S',
        '-2': 'W',
        '-1': 'N',
        '0': 'E',
        '1': 'S',
        '2': 'W',
        '3': 'N'
    }
    let angle = 0
    let distancesTravelled = {
        'E': 0,
        'S': 0,
        'W': 0,
        'N': 0
    }
    for (const move of data) {
        let [type, val] = move;
        if(type === 'F'){
            distancesTravelled[directions[(angle%360)/90]] += val
        }else if(type === 'R'){
            angle += val
        }else if(type === 'L'){
            angle -= val
        }else{
            distancesTravelled[type]+=val
        }
    }
    return  Math.abs(distancesTravelled.E - distancesTravelled.W) +
            Math.abs(distancesTravelled.N - distancesTravelled.S)
}

function task2(data){
    let wayPoint = [10, 1]
    let position = [0, 0]
    for (const move of data) {
        let [type, val] = move;
        if(type === 'E') wayPoint[0] += val
        else if (type === 'W') wayPoint[0] -= val
        else if (type === 'N') wayPoint[1] += val
        else if (type === 'S') wayPoint[1] -= val
        else if (type === 'F') {
            position[0] += wayPoint[0]*val
            position[1] += wayPoint[1]*val
        }
        else if (type === 'L'){
            let nrOfTurns = val/90
            for (let i = 0; i < nrOfTurns; i++) {
                let p = [...wayPoint]
                wayPoint[0] = -p[1]
                wayPoint[1] = p[0]
            }            
        }
        else if (type === 'R'){
            let nrOfTurns = val/90            
            for (let i = 0; i < nrOfTurns; i++) {
                let p = [...wayPoint]
                wayPoint[0] = p[1]
                wayPoint[1] = -p[0]
            }
        }
    }
    return Math.abs(position[0])+Math.abs(position[1])
}

function prepareData(data){
    return data.trim().split('\r\n').map(move=>{
        let [type, val] = move.split(/([0-9]+)/i);
        return [type, parseInt(val)]
    });
}

module.exports = {task1, task2, prepareData};