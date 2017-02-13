- 为什么 POST biz 有效，POST group确405，答：服务端api有的接口提供了post兼容。一般推荐 新建修改用post put 获取、删除用get


- 名字里注入html，不应该写innerHtml，而是用append element，设置innerText
- href ="javascript:void()" void里必须有参数void(0)
- a如果不加href，浏览器不给他a的属性。简单方法是用 href="javascript:void(0)"


踩坑
- 封包问题：indexAjax创建xmlhttp的时候，需要参数和回掉 . 为ajax做的对象，不能用成全局的。
- 作用域问题：var a, 在{}内的，作用域都是在function级别里，而且编译器不提示，运行时也不报错。需要特别注意命名和检查，es6里，用let替换var




# 下次要求
- 同时发起请求，没有前后关联的
- class="a b c" debug时 $('.b') 可以返回. a.className = 'd'; 时会覆盖，jquery的 $('.a').addClass('d'); removeClass。判断 $('.d').hasClass()，判断元素是否打开或关闭。
- json数组 a.xxx = obj,  delete a.xxx; 




# 服务api的问题
- 退出group后没退出biz，会有很多空biz
