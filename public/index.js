const btn = document.getElementById('search-btn');
const input = document.getElementById('search');
const show = document.getElementById('show');
const numShow = document.getElementById('num');
const add = document.getElementById('add-more');
const delbtn = document.getElementById('delete-more');
const more = document.getElementById('more-search')

const searchLog = async (val, arr) => {
  let path = val.replace(/\//g, '__');

  const { data } = await axios.get('./qq?val=' + path + '&arr=' + JSON.stringify(arr));

  if(data.code == 0) {
    showLogToPage(data.data);


    // 存下来，免得下次还得重新输入
    localStorage.setItem('searchcontain', val);
  }
  else {
    alert(data.msg)
  }
}

const showLogToPage = (val) => {

  let res = '<ul>';
  let num = 0;

  if(val.length > 0) {
    val.forEach(todo => {
      res += '<li id="li' + num + '">' + JSON.stringify(todo);

      res += '<div>';

      for(let key in todo) {
        res += '<i>' + key + '</i>' + ' : ' + todo[key] + '\n';
      }

      res += '</div></li>';
      num++;
    });

    res += '</ul>';

    show.innerHTML = res;
    numShow.innerText = "共 " + num + " 条";
  }
  else {
    numShow.innerText = '';
    show.innerHTML = '<p class="tip">该文件暂无内容！</p>';
  }
}

// 点击搜索
btn.onclick = () => {
  if(input.value.length < 1) {
    alert("日志路径不能为空");
    return;  
  }

  let searchArr = [];

  for(let i = 0; document.getElementById('left' + i); i++) {

    if(!document.getElementById('left' + i).value || !document.getElementById('right' + i).value) {
      alert("搜索条件不能为空！");
      return;
    }

    searchArr.push({
      key: document.getElementById('left' + i).value,
      cond: document.getElementById('center' + i).value,
      val: document.getElementById('right' + i).value
    })
  }

  // console.log(searchArr);

  searchLog(input.value, searchArr);
}

// 如果有存储就有默认值
if(localStorage.getItem('searchcontain')) {
  input.value = localStorage.getItem('searchcontain');
}

let oldShow = '';

// 点击单条日志展开
show.onclick = item => {
  if(item.target.nodeName != 'LI') {
    return;
  }

  if(oldShow) {
    // 重复点击
    if(oldShow == item.target.id) {
      item.target.removeAttribute('class');
      oldShow = '';
    }
    else {
      document.getElementById(oldShow).removeAttribute('class');

      item.target.setAttribute('class', 'change');

      oldShow = item.target.id;
    }
  }
  else {
    item.target.setAttribute('class', 'change');

    oldShow = item.target.id;
  }
}

let addNum = 0;

// 添加搜索条件
add.onclick = () => {
  let doom = document.createElement('div');

  doom.innerHTML = `<input type="text" id="left${addNum}"><select id="center${addNum}"><option value="1">=</option><option value="2">></option><option value="3"><</option></option><option value="4">!=</option></select><input type="text" id="right${addNum}">`

  addNum++;

  more.appendChild(doom);
}

// 从末尾删除一个搜索条件
delbtn.onclick = () => {
  if(addNum < 1) {
    return;
  }
  addNum--;
  more.removeChild(document.getElementById('left' + addNum).parentNode);
}