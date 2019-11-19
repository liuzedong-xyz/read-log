const btn = document.getElementById('search-btn');
const input = document.getElementById('search');
const show = document.getElementById('show');
const numShow = document.getElementById('num');

const searchLog = async (val) => {
  val = val.replace(/\//g, '__');

  const { data } = await axios.get('./qq?val=' + val);

  if(data.code == 0) {
    showLogToPage(data.data);
  }
}

const showLogToPage = (val) => {

  let res = '<ul>';
  let num = 0;

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

  if(num > 0) {
    numShow.innerText = "共 " + num + " 条";
  }
  else {
    numShow.innerText = '';
  }
}

btn.onclick = () => {

  if(input.value.length < 1) {
    alert("日志路径不能为空");
    return;  
  }

  searchLog(input.value);
}

let oldShow = '';

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