const chalk = require('chalk');
const fs = require('fs')
const open = require('open');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// blatantly stolen from Sikari who blatantly stole from https://stackoverflow.com/a/16060619
const uncachedRequire = module => {
    delete require.cache[require.resolve(module)];
    return require(module);
};
    
let availableCommands = []

rl.setPrompt('cli> ')
rl.prompt()

rl.on('line', (input) => {

    let [command, ...args] = input.split(' ')

    try {
        if(commands[command]){
            commands[command].handler(args)
        }else{
            console.log(chalk.hex('#ff0000')('Unrecognized command.'));
        }
    } catch (error) {
        console.log(chalk.hex('#ff0000')(error.message))
    }

    console.log('');
    rl.prompt()    
});

function runAndLog(day, task){
    console.log(chalk.hex('#0000ff')('Result -> ')+chalk.hex('#00ffff')(runDayAndTask(day, task)))
}

function runDayAndTask(day, task){
    const tasks = uncachedRequire('./day'+day+'/tasks');
    const data = tasks.prepareData(fs.readFileSync('./day'+day+'/data.txt', "utf-8"));
    return tasks['task'+task](data);
}

var commands = {
    run: {
        expectedArgs: '<day> <task>',
        handler: (args) => {
            let [day, task] = [...args]
            if(day){
                if(!fs.existsSync('./day'+day)) {
                    throw new Error("I haven't solved tasks for this day yet.")
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
            runAndLog(day, task);
        }
    },
    help: {
        expectedArgs: '',
        handler: ()=>{
            console.log('available commands: ');
            for (const c of availableCommands) {
                console.log('- '+chalk.hex('#00ffff')(c));
            }
        }
    },
    quit: {
        expectedArgs: '',
        handler: ()=>{
            console.log(chalk.hex('#00ff00')('Quitting.'));
            process.exit()
        }
    },
    prepareDirectory: {        
        expectedArgs: '<day>',
        handler: (args)=>{
            const [day] = [...args];
            if(!day){
                throw new Error('You need to specify day number.')
            }
            if(!fs.existsSync(__dirname+'/day'+day)) {
                try {
                    fs.mkdirSync(__dirname+'/day'+day);
                    fs.writeFileSync(__dirname+'/day'+day+'/data.txt','');
                    fs.copyFileSync(__dirname+'/tasks.js', __dirname+'/day'+day+'/tasks.js');
                    console.log(chalk.hex('#00ff00')('Created succesfully!'));
                } catch (error) {
                    console.log(chalk.hex('#ff0000')(error));
                }
            }else{
                throw new Error('Day already exists!')
            }
        }
    },
    showTask:{
        expectedArgs: '<day>',
        handler: (args)=>{
            const [day] = [...args];
            open('https://adventofcode.com/2020/day/'+day)
        }
    }
}

createAliases();

function createAliases(){
    for (const c of Object.keys(commands)) {
        let alias = c.charAt(0);
        let capitals = c.match(/[A-Z]/g)

        if(capitals) alias = (alias+capitals.join('')).toLowerCase(); 

        if(commands[alias]){
            console.log(chalk.hex('#ff0000')(`Error creating alias ${alias}, key already exists.`))
        }else{
            availableCommands.push(`${alias}, ${c} ${commands[c].expectedArgs}`);
            commands[alias]=commands[c];
        }
    };
}

