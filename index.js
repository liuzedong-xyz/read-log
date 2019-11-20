const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs');

const getlogs = require('./module/getLog.js');


// app.use(express.static('public'));

app.get('/qq', (req, res) => {
  // 搜索条件
  let path = req.query.val;

  let searcharr = JSON.parse(req.query.arr);

  // console.log(searcharr);

  path = path.replace(/__/g, '/');

  fs.exists(path, async exist => {
    // 如果文件存在
    if(exist) {
      let { result } = await getlogs(path, searcharr);

      if(result == -1) {
        res.json({
          code: -1,
          data: [],
          msg: '查找失败'
        });
      }
      else {
        res.json({
          code: 0,
          data: result,
          msg: ''
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