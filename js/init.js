// 获取数字图形化在html中的元素，并合并为列表
var b=[];
var b1 = document.getElementById("b0")
b.push(b1);
b1 = document.getElementById("b1")
b.push(b1);
b1 = document.getElementById("b2")
b.push(b1);
b1 = document.getElementById("b3")
b.push(b1);
b1 = document.getElementById("b4")
b.push(b1);
b1 = document.getElementById("b5")
b.push(b1);
b1 = document.getElementById("b6")
b.push(b1);
b1 = document.getElementById("b7")
b.push(b1);
b1 = document.getElementById("b8")
b.push(b1);
// 获取其他html元素用于进一步变化
var tre=document . querySelector("#treesvg");
var c0=document.getElementById("choose0")
var c1=document.getElementById("choose1")
var c2=document.getElementById("choose2")
var c3=document.getElementById("choose3")
var auto=document.getElementById("auto")
var pause=document.getElementById("pause")
var next=document.getElementById("next") 
var info=document.getElementById("info")
var current;//当前状态 
var solvelist;//解序列
var searchlength=0;//搜索序列长度
var autorunning=0;//是否正在执行自动演示
var array_right=//目标状态
[
    [1,2,3],
    [8,0,4],
    [7,6,5]
]
var searchtime;
var stt;//起始状态
posxi=[10,140,270];//用来进行方块移动等的定位
posyi=[10,140,270];
posx=["10px","140px","270px"];
posy=["10px","140px","270px"];
var autoz;//自动演示的循环计数标志
var nextz;//下一步演示的计数标志
var timeout;//保存Timeout函数返回值并终止循环
var en_ni=1;
function stopdraw()//终止自动演示
{
    console.log("stopdraw");
    clearTimeout(timeout)
    autorunning=0;
}

function loaddata()//加载输入的数据
{
    var typeinit=parseInt(document.getElementById("startstate").value);
    var typeend=parseInt(document.getElementById("endstate").value);
    var l=[0,0,0,0,0,0,0,0,0,1];
    var s=typeinit;
    var flag=0;
    console.log(typeinit)
    if(isNaN(s)&&flag!=1)
        flag=2;
    else
    {
        for (var i=8;i>=0;i--)
        { 
            l[s%10]++;
            s/=10;
            s=parseInt(s);
        }
        for (var i=8;i>=0;i--)
        { 
            if(l[i]!=1)
            {
                 flag=1;
                 document.getElementById("startstate").value="";
                 break;
            }
        }
    }
   
   l=[0,0,0,0,0,0,0,0,0,1];
   s=typeend;
   if(isNaN(s)&&flag==2&&flag!=1)
        flag=4;
    else if(isNaN(s)&&flag!=1)
    {
        flag=3;
    }
    else
    {
        for (var i=8;i>=0;i--)
        { 
            l[s%10]++;
            s/=10;
            s=parseInt(s);
        }
        for (var i=8;i>=0;i--)
        { 
            if(l[i]!=1)
            {
                    flag=1;
                    document.getElementById("endstate").value="";
                    break;
            }
        }
    }
    console.log("flag"+flag)
   if(flag==1)
   {
       alert("请输入正确的序列！");
       return;
   }
   if(flag!=2&&flag!=4)
   {
        stt=parseInt(typeinit);
        en=123804765;
   }
    if(flag!=3&&flag!=4)
    {
        en=parseInt(typeend);
        array_right=getarray(en);
        en_ni=checkans(en);
    }
    document.getElementById("startstate").value=""
    document.getElementById("endstate").value=""
    if(flag!=2&&flag!=4)
        init_graph(1);
    else
        init_graph();
}

function ran()//产生一个符合条件的随机初始状态，可能无解
{
    var l=[0,0,0,0,0,0,0,0,0,1];
    var st=0;
    var num=0;
    while(num<9)
    {
        var i=Math.round(Math.random()*10);
        if(l[i]==0)
        {
            l[i]=1;
            st+=i;
            st*=10;
            num++;
        }
    }
    st/=10;
    return st;
}

function checkans(l)//判断序列是否无解
{
    var list=[];
        for(var j=7;j>=0;j--)
        {
            if(l%10==0)
            {
                l/=10;
                l=parseInt(l);
            }
            list[j]=l%10;
            l/=10;
            l=parseInt(l);
        }
    var sum=0;
    for(var i=1;i<=7;i++)
    {
        for(var j=0;j<i;j++)
        {
            if(list[j]>list[i])
                sum++;
        }
    }
    return sum%2;
}
var stoptime=0;
var clocktime;
var astartime1=0;
function tim()
{
    astartime1++;
    console.log( astartime1)
    console.log( stoptime)
    if(stoptime==1)
    {
        stoptime=0;
        clearInterval(clocktime);
        return;
    }
    clocktime=setInterval("tim()",1);
}

// function info1()
// {
//     info.innerHTML=("计算中...部分算法可能较慢！");
// }

function astar()//执行A*算法
{
    // var info=document.getElementById("info")
    // var auto=document.getElementById("auto")
    // var pause=document.getElementById("pause")
    // var next=document.getElementById("next")
    if(current==en)
    {
        info.innerHTML=("·已经达到目标状态！");
        return;
    }
    stt=current;
    console.log("stt"+stt)
    tr=[];
    t1=2;
    statetoid=new Array();
    idtostate=new Array();
    childnum=new Array();
    solveid=new Array();
    idtof=new Array();
    solvelist=[];
    searchlength=0;
    if(checkans(stt)==en_ni)//按照是否有解划分内容
    {
        console.log("time used:"+astartime1);
        
        let ax = new axing;
        const startTime = new Date();
        ax.a1();
        solvelist=ax.solve(en);
        drawTree();
        const finishedTime = new Date();
        searchtime=finishedTime-startTime;
        console.log(searchtime);
        console.log("solve");
        console.log(solvelist)
        console.log(searchlength)
        autoz=solvelist.length-1;
        nextz=solvelist.length-1;
        info.innerHTML=("·初始状态："+stt+"<br>·目标状态："+en+"<br>·搜索序列长度："+searchlength+"<br>·解序列长度："+solvelist.length+"<br>·当前耗散值："+idtof[statetoid[current]]+"<br>·搜索花费时间："+searchtime+"ms");
        auto.removeAttribute("disabled");
        pause.removeAttribute("disabled");
        next.removeAttribute("disabled");

    }
    else
    {
        autoz=0;
        nextz=0;
        info.innerHTML=("·此状态<font color='red'>无解</font><br>·请选择生成随机状态<br>·可以点击随意移动滑块哦！<br><br><font class='caution'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意:搜索树在新窗口中展示<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搜索树庞大，加载需要一定时间！</font>")
    }
    
    
}

function init_graph(typein=0)//生成新的序列并初始化图像
{
    // var c0=document.getElementById("choose0")
    // var c1=document.getElementById("choose1")
    c0.className="btn btn-default btn-common";
    c1.className="btn btn-default btn-common";
    c2.className="btn btn-default btn-common";
    c3.className="btn btn-default btn-common";
    // var auto=document.getElementById("auto")
    // var pause=document.getElementById("pause")
    // var next=document.getElementById("next") 
    // var info=document.getElementById("info")
    auto.setAttribute("disabled","disabled");
    pause.setAttribute("disabled","disabled");
    next.setAttribute("disabled","disabled");
    info.innerHTML=("·此状态可解<br>·请选择启发式函数类型<br>·可以点击随意移动滑块哦！<br><br><font class='caution'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意:搜索树在新窗口中展示<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搜索树庞大，加载需要一定时间！</font>");
    console.log("init_graph");
    stopdraw()
    // astar();
    if(!typein)
        stt=ran();
    console.log("stt"+stt);
    console.log("en"+en);
    console.log(stt)
    searchlength=0;
    current=stt;
    if(current==en)//判断是否达到目标状态
    {
        info.innerHTML=("·已经达到目标状态！")
    }
    else if(checkans(stt)!=en_ni)
    {
        autoz=0;
        nextz=0;
        info.innerHTML=("·此状态<font color='red'>无解</font><br>·请选择生成随机状态<br>·可以点击随意移动滑块哦！<br><br><font class='caution'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意:搜索树在新窗口中展示<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搜索树庞大，加载需要一定时间！</font>")
    }
    console.log(stt)
    array=getarray(stt);
    //初次绘制图像
    for(var j=0;j<=2;j++)
        for(var i=0;i<=2;i++)
        {
            if(array[j][i]==0)
                b[array[j][i]].className="block0";
            else if(array[j][i]==array_right[j][i])
                b[array[j][i]].className="block-right";
            else
                b[array[j][i]].className="block-false";
            b[array[j][i]].style.position="absolute";
        	b[array[j][i]].style.left=posx[i];
        	b[array[j][i]].style.top=posy[j];
        }
}

