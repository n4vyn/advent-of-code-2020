function task1(data){
    let count = 0;
    for (const item of data) {
        //allowed occurances, character, string 
        let [occ, char, str] = item.split(" ");
        char = char.replace(":","");
        const [min,max] = occ.split("-");

        const n = str.split(char).length-1;
        
        if(n>=min && n<=max){
            count++;
        }
    }
    return count
}

function task2(data){
    var count = 0;
    for (const item of data) {

        //allowed positions, character, string
        let [pos, char, str] = item.split(" ");

        char = char.replace(":","");

        const [x,y] = pos.split("-");

        const charAtX = str.charAt(x-1)
        const charAtY = str.charAt(y-1)

        if((charAtX === char && charAtY !== char) || (charAtX !== char && charAtY === char)){
            count++;
        }
    }   
    return count
}

function prepareData(data){
    return data.trim().split('\r\n');
}

module.exports = {task1, task2, prepareData};