print("hello js")

'''
utils info

ctrl + alt + - 折叠所有代码

1 json.parse
  function() {
    var _parse = JSON.parse;
    JSON.parse = function(ps) {
        console.log("Hook JSON.parse ——> ", ps);
        debugger;
        return _parse(ps);  // 不改变原有的执行逻辑 
    }

'''

'''
事件监听器 脚本 任何脚本都能断住
'''

'''
conclusion

1 加载器c.a.function, 这种鼠标点击c不在具体的位置,需要往上翻一翻,查看具体定义.  

2 有些加载器的方法不能直接使用，需要进去扣里面的--->通过console.log查看具体的属性就可以看到怎么样了。

3 r.decrypt这种，要查看r的定义，r是模块，要往上看

'''

'''
cookie反爬虫 
httponly 指的是后端的返回
_jsl开头的就是cookies反爬虫
'''

# 替换文件
'''
替换，源码标签找到对应的文件，保存并覆盖，保存自己要调试的文件 

浏览器状态清楚不完全，可以使用无痕模式来跑一下。
调试的时候有的时候需要清空下再跑。
'''


# 有些网站debug需要先刷新网页，然后在debug，才不会被无限debug， 不过使用本地文件替换的方式应该也可以过debugger。 对于有些不是定时的dubegger可能要等一下才进去
# 判断有些没用到的方法，可以删掉