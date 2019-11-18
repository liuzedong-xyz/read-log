const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
    input: fs.createReadStream('/home/log/lumen_log/201909/blog_api_site_SiteController.log')
});
rl.on('line', (line) => {
    // console.log(line)
    console.log(JSON.parse(line));
});
        
rl.on('close', ()=> {
    console.log('closed')
});