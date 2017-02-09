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
}

function initDom()
{

}