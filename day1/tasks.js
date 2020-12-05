function task1(data){
    for (const i in data) {
        for (var j = i; j < data.length; j++) {
            if(parseInt(data[i])+parseInt(data[j]) === 2020){
                return data[i]*data[j]
            }
        }
    }
}

function task2(data){
    for (const i in data) {
        for (var j = i; j < data.length; j++) {
            for (var k = j; k < data.length; k++) {
                if(parseInt(data[i])+parseInt(data[j])+parseInt(data[k])===2020){
                    return parseInt(data[i])*parseInt(data[j])*parseInt(data[k])
                }
            }
        }
    }
}

function prepareData(data){
    return data.trim().split('\r\n');
}

module.exports = {task1, task2, prepareData};