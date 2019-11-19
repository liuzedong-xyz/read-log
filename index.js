const express = require('express')
const path = require('path')
const app = express()

const readline = require('readline');
const fs = require('fs');


// app.use(express.static('public'));

app.get('/qq', (req, res) => {
  // 搜索条件
  let search = req.query.val;

  search = search.replace(/__/g, '/');

  fs.exists(search, exist => {
    // 如果文件存在
    if(exist) {
      try {
        const rl = readline.createInterface({
          input: fs.createReadStream(search)
        });
    
        let result = [];
        rl.on('line', (line) => {
            result.unshift(JSON.parse(line));
        });
                
        rl.on('close', ()=> {
            res.json({
              code: 0,
              data: result,
              msg: 'ok'
            });
        });
      }
      catch(e) {
        res.json({
          code: -1,
          data: e,
          msg: 'error'
        });
      }
    }
    else {
      res.json({
        code: -1,
        data: [],
        msg: '路径错误或文件不存在！'
      });
    }
  })
  // /home/log/lumen_log/201909/blog_api_site_SiteController.log
})


app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))