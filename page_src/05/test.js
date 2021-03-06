function run()
{
    initDom();
    initAjax();
}

function initDom()
{
    var div = document.createElement('div');
    div.id = 'login_div';
    var label = document.createElement('label');
    label.innerText = '用户名:';
    label.setAttribute('for','username');
    div.appendChild(label);


    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.id = 'username';
    input.value = 'xxx';
    div.appendChild(input);

    div.appendChild(document.createElement('br'));

    var label = document.createElement('label');
    label.innerText = '密码：';
    label.setAttribute('for','password');
    
    div.appendChild(label);
    var input = document.createElement('input');
    input.setAttribute('type','password');
    input.id = 'password';
    input.value = 'xxx';
    div.appendChild(input);

    div.appendChild(document.createElement('br'));
   
    
    var button = document.createElement('button');
    button.id = 'submit';
    button.innerText = "登录";
    

    button.addEventListener('click', function(){
        var u = document.getElementById('username').value;
        var p = document.getElementById('password').value;
        button.disabled = true;
        loginWiz(u,p);
    });

    div.appendChild(button);

    document.body.appendChild(div);

    var label = document.createElement('label');
    label.innerText = '结果 here';
    label.id = 'result';
    document.body.appendChild(label);

}

var xmlhttp;
var actionid=0;
var _token;
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
        if (xmlhttp.readyState==4)
        {
            var txt = xmlhttp.responseText;
            
           

            if( xmlhttp.status == 200 )
            {
                 var json;
            
                try {
                    json = JSON.parse(txt);
                }catch(exception){
                    showLog('error xmlhttp.status=' + xmlhttp.status);
                    return;
                }
                
                switch (actionid)
                {
                    case 1:
                        {
                            if ('200' == json.code)
                            {
                                showLog('成功:token=' + json.token);
                                _token = json.token;
                                listBiz(_token);
                            }else
                            {
                                 showLog('失败:' + json.message);
                            }
                            break;
                        }
                    case 2:
                        {
                            if('200' == json.return_code)
                            {
                                showLog("成功: biz groups");
                                listGroups(_token);
                                displayBiz(json);
                            }
                            else
                            {
                                showLog('失败:' + json.return_message);
                            }
                            break;
                        }
                    case 3:
                        {
                             if('200' == json.return_code)
                            {
                                showLog("成功: groups");
                                displayGroups(json);
                            }
                            else
                            {
                                showLog('失败:' + json.return_message);
                            }
                            break;
                        }
                    default:
                    {
                        showLog('error actionid=' + actionid);
                    }
                }                 
            }
            else
            {
              showLog('错误 http status:' + xmlhttp.status);
            }
        }
        else
        {
            showLog('错误 readyState:' + xmlhttp.readyState);
        }
    }
}

function showLog(log)
{
    var div = document.getElementById("result");
    div.innerHTML= log;
}


function loginWiz(u, p)
{           
    actionid = 1;
    xmlhttp.open("POST","/api/login",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("user_id=" + u + "&password=" + p); 
}

function listBiz(token)
{
    var div = document.getElementById("login_div");
    div.hidden = true;
    actionid = 2;
    xmlhttp.open("GET",'/wizas/a/biz/user_bizs?api_version=6&token=' + token,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

}

function listGroups(token)
{
    actionid = 3;
    xmlhttp.open("GET",'/wizas/a/groups?api_version=6&token=' + token,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();
    //alert(token);
}


function displayBiz(json)
{

    var div = document.createElement('div');
    div.id = 'BizDiv';

    var p = document.createElement('p');

    p.innerText = "企业群组";//JSON.stringify(json.result);
    div.appendChild(p);


    var ul = document.createElement('ul');

    for(var bg in json.result)
    {
        var p = document.createElement('li');
        p.innerText = json.result[bg].biz_name;//JSON.stringify(bg);
        var ol = document.createElement('ol');
        ol.id = json.result[bg].biz_guid;
        p.appendChild(ol);
        ul.appendChild(p);
    }
    div.appendChild(ul);
   document.body.appendChild(div);
    //alert(json);
}

function displayGroups(json)
{

        var div = document.createElement('div');
    div.id = 'PersonGroupDiv';
     
    var p = document.createElement('p');
    p.innerText = "个人群组";//JSON.stringify(json.result);
    div.appendChild(p);
    
    var personul = document.createElement('uu');
 
    for(var bg in json.group_list)
    {
        var bizguid = json.group_list[bg].bizGuid;
        console.log(bg + ', ' + bizguid + ' kbname = ' + json.group_list[bg].kbName);
        var ul = document.getElementById(bizguid);

        if( json.group_list[bg].kbName == 'WindowsFeedback')
        {
            console.log('111');
        }
        if(bizguid)
        {
            var p = document.createElement('li');
            p.innerText = json.group_list[bg].kbName;
            ul.appendChild(p);
        }else
        {
            var li = document.createElement('li');
            li.innerText = json.group_list[bg].kbName;
            personul.appendChild(li);
        }     
    }

    div.appendChild(personul);
    document.body.appendChild(div);
}