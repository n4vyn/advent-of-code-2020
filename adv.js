const chalk = require('chalk');
const fs = require('fs')

var [day, task] = process.argv.slice(2);
if(day){
    if(!fs.existsSync(__dirname+'/day'+day)) {
        console.log(chalk.hex('#ff0000')("I haven't solved tasks for this day yet."))
        return
    }else{
        if(task){
            if (task == 1 || task == 2){
                console.log(chalk.hex('#00ff00')(`Running task ${task} of day ${day}`));
            }else{        
                console.log(chalk.hex('#ffa500')(`Invalid task number, there are only 2 per day. Running task 1 of day ${day}`));
                task = 1;
            }
        }else{
            console.log(chalk.hex('#ffa500')(`Task wasn't specified, running task 1 of day ${day}`));
            task = 1;
        }
    }
}else{
    console.log(chalk.hex('#ffa500')("Day and task weren't specified, running task 1 of day 1."))
    day = 1;
    task = 1;
}
console.log("");

runDayAndTask(day, task);

function runDayAndTask(day, task){
    const tasks = require('./day'+day+'/tasks');
    const data = tasks.prepareData(fs.readFileSync(__dirname+'/day'+day+'/data.txt', "utf-8"));
    console.log(chalk.hex('#0000ff')('Result -> ')+chalk.hex('#00ffff')(tasks['task'+task](data)))
    console.log('')
}

/*
var session = "...";

Axios.get('http://adventofcode.com/2020/day/'+day+'/input',{
    headers: {
        Cookie: `session=${session};`
    }
})
*/
