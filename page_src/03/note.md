我的问题：
1. ```<script /> 这样无效，非要 <script></script>```
2. code里面能不能直接debug前端的js，如何方便的debug前端同时修改完直接保存到原文件


新知识点：
- 字符串的判断，只要用!即可判断是否为空，或null   if(!str)
- 是用throw还是自己做错误处理的原则：如果fun本身能处理的，不throw，直接以return中断，如果处理不了，才去throw
- label中的for属性，可以跳,用做& focus到对应的object，只能label.setAttribute('for','input id');
- obj.__proto__  可以看到所有原型, 类似于夫类的定义。ES6可以用 class extent
- addEventListener 可以增加多个 click事件，而 onclick只能一个。 各事件中
- script 写在header和body里的区别, 自闭合的只有：br link img ，浏览器会自动加代码闭合，导致内容为空
- DOM（一个document，有个element树）前端容器叫window，后台，一个node一个globle，java里的application
- （function(a){alert(a)(123)   定义后立即执行
- 作用域，js只有2个，一个是function级别内，一个是全局。function内不同地方定义var 都会有用，，ES6改成let可以解决
- text label域，在childElements是没有的，dom层级有childNodes才有


原则性问题：
- 在讨论前，先不下笼统抽象的定义，容易引起争论。应直接指出问题本身，描述性的，而不是抽象行。例如：你错了，应为：这个地方写错了，会引起bug 。不引发情绪。不求人价值观、观点、脑子同，只对事，解决问题，而不是针对对错

