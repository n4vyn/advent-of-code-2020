
function task1(data){
    let validCount = 0;    
    for (const passport of data) {
        if(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(r=>{
            return Object.keys(passport).some(key=>{return key===r})
        }))validCount++;
    }
    return validCount
}

//also tried making it a lot fancier, reducing all hardcoding to 0, but it got out of PepeHands
function task2(data){
    const valueValidators = {
        byr: (value) =>{
            return (1920 <= value && value <= 2002)
        },
        iyr: (value) =>{
            return (2010 <= value && value <= 2020)
        },
        eyr: (value) =>{
            return (2020 <= value && value <= 2030)
        },
        hgt: (value) =>{
            if(!value)return false
            //could just take last 2 chars as units, but I'm fancy and I split string from number
            const [v, u] = value.split(/([A-Z]+)/i);
            return ((u === 'cm' && (150 <= v && v <= 193)) || (u === 'in' && (59 <= v && v <= 76)))
        },
        hcl: (value) =>{
            return /^#[0-9A-F]{6}$/i.test(value)
        },
        ecl: (value) =>{
            return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
        },
        pid: (value) =>{
            return /^[0-9]{9}$/.test(value)
        }
    }

    const requiredKeys = Object.keys(valueValidators)
    let validCount = 0

    for (const passport of data) {
        const isValid = requiredKeys.every(rk=>{
            return valueValidators[rk](passport[rk])
        })
        if(isValid)validCount++
    }
    return validCount;
}

function prepareData(data){
    return data.trim().replace(/\r\n/g, ' ').split('  ')
    .map(passport=>{
        let keyedPassport = {}
        for (const dataPair of passport.split(' ')) {
            const [key, value] = dataPair.split(':');
            keyedPassport[key] = value;
        }
        return keyedPassport
    })
}

module.exports = {task1, task2, prepareData};