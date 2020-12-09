// I didn't like these tasks much, won't bother making the code prettier
function task1(data){
    let value = 0, i = 0, alreadyExecuted = [];
    while(!alreadyExecuted.includes(i)) {
        alreadyExecuted.push(i)
        const [type, arg] = data[i].split(' ');
        if(type === 'acc'){
            value += parseInt(arg)
            i++
        }else if(type === 'jmp'){
            i += parseInt(arg)
        }else{
            i++
        }
    }
    return value
    //1818
}

function task2(data){

    let max = data.length

    for (let j = 0; j<max; j++) {

        const [t, a] = data[j].split(' ');
        const oldCommand = data[j];
        if(t === 'nop'){
            data[j] = 'jmp '+a;
        }else if(t === 'jmp'){
            data[j] = 'nop 1';
        }
        
        let value = 0, i = 0, alreadyExecuted = [];

        while(!alreadyExecuted.includes(i)){
            alreadyExecuted.push(i)
            const [type, arg] = data[i].split(' ');
            if(type === 'acc'){
                value += parseInt(arg)
                i++
            }else if(type === 'jmp'){
                i += parseInt(arg)
            }else{
                i++
            }
            if(i===max)break
        }

        if(i===max)return value
        else data[j] = oldCommand
    }

}

function prepareData(data){
    return data.trim().split('\r\n');
}

module.exports = {task1, task2, prepareData};