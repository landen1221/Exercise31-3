const fs = require('fs');
const axios = require('axios')

function cat(path) {
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
        console.log(content.data.slice(0,150))
    } catch(e) {
        console.log("Error: Not a valid link\n", e)
        process.exit(1)
    }
    
}

let path = process.argv[2]

if (path.substring(path.length-4) == '.txt') {
    cat(path)
} else {
    webCat(path)
}