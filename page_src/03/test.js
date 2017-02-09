function run()
{
    arrayTest();
    initDom();
}

function arrayTest()
{
    var a = new Array(10);
    
    for(var i=0; i < a.length; i++)
    {
        a[i] = i;
    }
    console.log(a.toString());
    while(true)
    {
        if(a.length<1) break;
        a.pop();
        console.log(a.length);
    }
}

function initDom()
{


    var div = document.createElement('div');
    var label = document.createElement('label');
    label.innerText = '用户名:';
    label.for='username';
    div.appendChild(label);

    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.id = 'username';
    div.appendChild(input);
    document.body.appendChild(div);

    var div = document.createElement('div');
    var label = document.createElement('label');
    label.innerText = '密码：';
    label.for='password';
    
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
        alert('click button username=' + u + ',password=' + p);
    });

}