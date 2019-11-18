const express = require('express')
const path = require('path')
const app = express()

const readline = require('readline');
const fs = require('fs');


// app.use(express.static('public'));

app.get('/qq', (req, res) => {


  const rl = readline.createInterface({
      input: fs.createReadStream('/home/log/lumen_log/201909/blog_api_site_SiteController.log')
  });

  let result = [];
  rl.on('line', (line) => {
      // console.log(line)
      // console.log(JSON.parse(line));
      // result += line;
      result.push(JSON.parse(line));
  });
          
  rl.on('close', ()=> {
      // console.log('closed')
      res.json(result);
  });

})


app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))