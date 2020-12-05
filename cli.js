const chalk = require('chalk');
const fs = require('fs')
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
    
let avaiableCommands = []
let avaiableCommandss = [
    'h, help',
    'createday <day>',
    'run <day> <task>',
    'q, quit'
]

rl.setPrompt('cli> ')
rl.prompt()

rl.on('line', (input) => {

    let [command, ...args] = input.split(' ')
    
    if(commands[command]){
        commands[command].handler(args)
    }else{
        console.log(chalk.hex('#ff0000')('Unrecognized command.'));
    }

    console.log('');
    rl.prompt()    
});

function runDayAndTask(day, task){
    const tasks = uncachedRequire('./day'+day+'/tasks');
    const data = tasks.prepareData(fs.readFileSync(__dirname+'/day'+day+'/data.txt', "utf-8"));
    console.log(chalk.hex('#0000ff')('Result -> ')+chalk.hex('#00ffff')(tasks['task'+task](data)))
}

var commands = {
    run: {
        expectedArgs: '<day> <task>',
        handler: (args) => {
            let [day, task] = [...args]
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
            runDayAndTask(day, task);
        }
    },
    help: {
        expectedArgs: '',
        handler: ()=>{
            console.log('Avaiable commands: ');
            for (const c of avaiableCommands) {
                console.log('- '+chalk.hex('#00ffff')(c));
            }
        }
    },
    quit: {
        expectedArgs: '',
        handler: ()=>{
            console.log(chalk.hex('#ff0000')('Quitting.'));
            process.exit()
        }
    },
    prepareDirectory: {        
        expectedArgs: '<day>',
        handler: (args)=>{
            const [day] = [...args];
            if(!day){
                console.log(chalk.hex('#ff0000')('You need to specify day number.'));
                return;
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
                console.log(chalk.hex('#ff0000')('Day already exists!'));
            }
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
            avaiableCommands.push(`${alias}, ${c} ${commands[c].expectedArgs}`);
            commands[alias]=commands[c];
        }
    };
}

