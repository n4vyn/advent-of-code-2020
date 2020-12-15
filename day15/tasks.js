function task1(data){
    for (let i = 5; i < 2020; i++) {
        if(data.findIndex(x=>x===data[i]) === i){
            data.push(0)
        }else{
            data.push([...data].slice(0, -1).reverse().findIndex(x=>x===data[i])+1)
        }
    }
    return data[2019]
}

function task2(data){
    /**
     * Holy smokes. When using array or object for hashtable,
     * (hashtable[number]=i) this task takes about 250 seconds.
     * I tried it in Java using Hashtable<> it took 8 seconds.
     * Then I disovered Map(), and now it takes less than 5 seconds.
     * wow.
     */
    let hashtable = new Map()
    for (let i = 0; i < data.length; i++) {
        hashtable.set(data[i],i)
    }
    let number = 0;
    for (let i = data.length; i < 30000000-1; i++) {
        if(hashtable.get(number) !== undefined){
            let newNumber = i-hashtable.get(number)
            hashtable.set(number, i)
            number = newNumber;
        }else{
            hashtable.set(number, i)
            number = 0
        }
    }
    return number
}

function prepareData(data){
    return data.trim().split(',').map(Number);
}

module.exports = {task1, task2, prepareData};