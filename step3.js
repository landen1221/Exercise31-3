const fs = require('fs');
const axios = require('axios')
const argv = process.argv
let pathVar = argv[2]
const length = argv.length

function cat(path) {
    if (length > 3) {
        let data = fs.readFileSync(path, 'utf8')
        return data
    }
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.log("Error", err);
            process.exit(1);
        }
        console.log(data)
    })
}

async function webCat(url) {
    try {
        let content = await axios.get(url)
        if (length > 3) {
            return content.data
        } else {
            console.log(content.data)
        } 

    } catch(e) {
        console.log("Error: Not a valid link\n", `Error Code: ${e.code}`)
        process.exit(1)
    }
}

async function outputFile(path, data) {
    let content = '';

    if (pathVar.substring(argv[3].length-4) == '.txt') {
        content = cat(data)
    } else {
        content = await webCat(data)
    } 
    
    write(path, content)
}

function write(path, content) {
    fs.writeFile(path, content, 'utf8', err => {
        if (err){
            console.log("Error!!!", err)
        }
        console.log("It Worked")
    })
}


if (length > 3) {
    outputFile(argv[length-2], argv[length-1])
} else if (pathVar.substring(pathVar.length-4) == '.txt') {
    cat(pathVar)
} else {
    webCat(pathVar)
} 

