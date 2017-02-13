function run()
{
    initDom();
    initAjax();
}

var timeout;
function timeoutFun(counter){
        console.log(new Date().valueOf());
        // 下面这是一个闭包，尝试屏蔽掉这一段代码，对比看结果
        (function () {
            var i, j, k;
            for (i = 0; i < 99999; i++) {
                for (j = 0; j < 39999; j++) {
                    k = i * j;
                }
            }
        })()
    // 闭包结束
        console.log(new Date().valueOf() + '  --  timeout ' + counter + ' over.');
        counter ++;
        if(counter >= 5)
        {
            clearTimeout(timeout);
        }else
        {
            timeout = setTimeout('timeoutFun(' + counter + ')', 1000);
        }
}

function testTimeout() {
    
       timeout = setTimeout('timeoutFun(1)', 1000);
    
}

function initDom()
{
    var div = document.createElement('div');
    var label = document.createElement('label');
    label.innerText = '用户名:';
    label.setAttribute('for','username');
    div.appendChild(label);

    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.id = 'username';
    div.appendChild(input);
    document.body.appendChild(div);

    var div = document.createElement('div');
    var label = document.createElement('label');
    label.innerText = '密码：';
    label.setAttribute('for','password');
    
    div.appendChild(label);
    var input = document.createElement('input');
    input.setAttribute('type','password');
    input.id = 'password';
    div.appendChild(input);
    document.body.appendChild(div);
    
    var button = document.createElement('button');
    button.id = 'submit';
    button.innerText = "登录";
    document.body.appendChild(button);
    

    button.addEventListener('click', function(){
        var u = document.getElementById('username').value;
        var p = document.getElementById('password').value;
        loginWiz(u,p);
    });

    var button = document.createElement('button');
    button.id = 'submit';
    button.innerText = "测试 timeout";
    document.body.appendChild(button);
    

    button.addEventListener('click', function(){
       testTimeout();
    });

    var label = document.createElement('label');
    label.innerText = '结果 here';
    label.id = 'result';
    document.body.appendChild(label);

}

var xmlhttp;
function initAjax()
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        var div = document.getElementById("result");
        if (xmlhttp.readyState==4)
        {
            var txt = xmlhttp.responseText;
            var json = JSON.parse(txt);

            if( xmlhttp.status == 200 && '200' == json.code)
            {
                div.innerHTML= '成功:token=' + json.token;
            }
            else
            {
              div.innerHTML= '失败:' + json.message;
            }
        }
        else
        {
            div.innerHTML= '错误 code:' + xmlhttp.status;
        }
    }
}



function loginWiz(u, p)
{           
    xmlhttp.open("POST","/api/login",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("user_id=" + u + "&password=" + p); 
}