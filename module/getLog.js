const fs = require('fs');
const readline = require('readline');

const readFromFile = (path, arr) => {

  return new Promise((res, rej) => {
    // try {
      const rl = readline.createInterface({
        input: fs.createReadStream(path)
      });
    
      let result = [];
      let tmp, item;
      let isok = false;
      rl.on('line', line => {
        tmp = JSON.parse(line);
        isok = true;

        // console.log(arr && arr.length && arr.length > 0);

        if(arr && arr.length && arr.length > 0) {
          // arr.forEach(item => {
          for(let i = 0; i < arr.length; i++) {
            item = arr[i];

            if(!tmp[item.key]) {
              isok = false;
              // break;
            }
            else {
              if(item.cond == 1 && tmp[item.key] == item.val) {

              }
              else if(item.cond == 2 && tmp[item.key] > item.val) {

              }
              else if(item.cond == 3 && tmp[item.key] < item.val) {
                
              }
              else if(item.cond == 4 && tmp[item.key] != item.val) {
                
              }
              else {
                isok = false;
                // break;
              }
            }
          }
        }

        if(isok) {
          result.unshift(tmp);
        }
      });
              
      rl.on('close', ()=> {
        res({ result: result });
      });
    // }
    // catch(e) {
    //   rej({ result: -1 });
    // }
  })
}

module.exports = readFromFile;
