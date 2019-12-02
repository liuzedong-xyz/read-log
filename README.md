## 一个简易的本地日志查看服务


* 支持输入文件路径打开文件
![img](http://cdn.521plus.com/other/26D7F61F-6162-48ED-BE90-535E3AE32F5A.png)

* 支持字段搜索，按照字段过滤内容
![img](http://cdn.521plus.com/other/6FDA9285-C743-41EB-8710-01AA02AAFEEE.png)

* 每条日志可展开查看，提高效率
![img](http://cdn.521plus.com/other/565BA861-4A3C-4D48-B34C-3C4B8A33D7F7.png)


用于测试的是 lumen 生成的日志。有较好的使用体验，可以直观的查看日志！

> 代码拉到本地
```git clone https://github.com/sansiro-me/read-log.git```

> 安装依赖
```cd read-log.git && npm i```

> 启动服务(使用pm2)
```pm2 start index.js```
