const btn = document.getElementById('search-btn');
const input = document.getElementById('search');
const show = document.getElementById('show');

const searchLog = async (val) => {
  val = val.replace(/\//g, '__');

  const { data } = await axios.get('./qq?val=' + val);

  if(data.code == 0) {
    showLogToPage(data.data);
  }
}

const showLogToPage = (val) => {

  let res = '';

  val.forEach(todo => {
    res += JSON.stringify(todo);
  });

  show.innerText = res;
}

btn.onclick = () => {

  if(input.value.length < 1) {
    alert("日志路径不能为空");
    return;  
  }

  searchLog(input.value);
}