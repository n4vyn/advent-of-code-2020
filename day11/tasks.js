function task1(data){
    let newData = []
    
    while(true){
        newData = [];

        for (let i = 0; i < data.length; i++) {
            const row = [...data[i]];
            let newRow = ''

            for (let j = 0; j < row.length; j++) {
                if(row[j] === 'L'){
                    if(countAdjacentOccupiedSeats(data, i, j)===0){
                        newRow += '#'
                        continue
                    }
                }else if(row[j] === '#'){
                    if(countAdjacentOccupiedSeats(data, i, j)>=4){
                        newRow += 'L'
                        continue
                    }
                }
                newRow += row[j]
            }
            newData.push(newRow);
        }
        if(arraysEqual(data, newData))break
        data = [...newData]
    }
    return countOccupiedSeats(newData)
}

//it does like 90 top level iterations, can take a few seconds
function task2(data){
    let newData = []

    while(true){
        newData = [];

        for (let i = 0; i < data.length; i++) {
            const row = [...data[i]];
            let newRow = ''

            for (let j = 0; j < row.length; j++) {
                if(row[j] === 'L'){
                    if(countOccupiedSeatsInSight(data, i, j)===0){
                        newRow += '#'
                        continue
                    }
                }else if(row[j] === '#'){
                    if(countOccupiedSeatsInSight(data, i, j)>=5){
                        newRow += 'L'  
                        continue
                    }
                }
                newRow += row[j]
            }
            newData.push(newRow);
        }
        if(arraysEqual(data, newData))break
        data = [...newData]
    }
    return countOccupiedSeats(newData)
}

function countAdjacentOccupiedSeats(data, i, j){
    let occupied = 0;
    /*
    for(let x = i-1; x < i+2; x++){
        if(x < 0 || x >= data.length) continue
        for (let y = j-1; y < j+2; y++) {
            if(y < 0 || y >= data[i].length) continue
            if(x===i && y===j)continue
            if(data[x][y] === '#'){
                occupied++;
            }
        }
    }
    prolly more readable handmade without fors lmao
    */

    if(data[i-1]){
        if(data[i-1][j-1] === '#')occupied++
        if(data[i-1][j] === '#')occupied++
        if(data[i-1][j+1] === '#')occupied++
    }

    if(data[i][j-1] === '#')occupied++
    if(data[i][j+1] === '#')occupied++

    if(data[i+1]){
        if(data[i+1][j-1] === '#')occupied++
        if(data[i+1][j] === '#')occupied++
        if(data[i+1][j+1] === '#')occupied++
    }

    return occupied
}

function arraysEqual(a, b){
    for (let i = 0; i < a.length; i++) {
        if(a[i]!==b[i])return false        
    }
    return true
}

function countOccupiedSeats(a){
    return JSON.stringify(a).match(/#/g).length
}

function countOccupiedSeatsInSight(data, i, j){
    let occupied = {
        'U': null,
        'UR': null,
        'R': null,
        'DR': null,
        'D': null,
        'DL': null,
        'L': null,
        'UL': null,
    }
    for(let z = 1; z < Math.max(data.length, data[0].length); z++){
        if(data[i+z]){
            if(occupied.D === null){
                if(data[i+z][j] === '#') occupied.D = true
                else if(data[i+z][j] === 'L') occupied.D = false
            }

            if(occupied.DR === null){
                if(data[i+z][j+z] === '#') occupied.DR = true
                else if(data[i+z][j+z] === 'L') occupied.DR = false
            }

            if(occupied.DL === null){
                if(data[i+z][j-z] === '#') occupied.DL = true
                else if(data[i+z][j-z] === 'L') occupied.DL = false
            }
        }
        if(data[i-z]){
            if(occupied.U === null){
                if(data[i-z][j] === '#') occupied.U = true
                else if(data[i-z][j] === 'L') occupied.U = false
                
            }

            if(occupied.UR === null){
                if(data[i-z][j+z] === '#') occupied.UR = true
                else if(data[i-z][j+z] === 'L') occupied.UR = false
                
            }

            if(occupied.UL === null){
                if(data[i-z][j-z] === '#') occupied.UL = true
                else if(data[i-z][j-z] === 'L') occupied.UL = false
            }
        }
        if(occupied.R === null){
            if(data[i][j+z] === '#') occupied.R = true
            else if(data[i][j+z] === 'L') occupied.R = false
            
        }
        
        if(occupied.L === null){
            if(data[i][j-z] === '#') occupied.L = true
            else if(data[i][j-z] === 'L') occupied.L = false  
        }
    }
    return Object.values(occupied).filter(x=>x===true).length
}

function prepareData(data){
    console.log('Happy birthday me :)');
    return data.trim().split('\r\n');
}

module.exports = {task1, task2, prepareData};