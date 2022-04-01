var timeout2;
var moverunning;//判断是否正在移动
var autotime=400;//设置自动演示时间，数字越小越快
var movetime=5;//设置移动速度，数字越小越快
function move(a,j,i,color)//实现移动动画，将位置改变分为小步移动的重复
{
    array=getarray(current);
    if(array[j][i]==a)
        return;
    var desj=posyi[j];
    var desi=posxi[i];
    b[a].style.position="absolute";
    var pj=parseInt(b[a].style.top,10);
    var pi=parseInt(b[a].style.left,10);
    if(j+1<=2&&array[j+1][i]==a)
        di=0;
    else if(j-1>=0&&array[j-1][i]==a)
        di=1;  
    else if(i-1>=0&&array[j][i-1]==a)
        di=3;   
    else if(i+1<=2&&array[j][i+1]==a)
        di=2;    
    else
        di=4; 
    if(di!=4)
    {
        moverunning=1;
        timeout2=setTimeout("movestep("+a+","+pj+","+pi+","+desj+","+desi+","+color+",0,"+di+")",movetime);
    }
}

function movestep(a,pj,pi,desj,desi,color,step,di)//循环执行实现一步步移动，结合为移动动画
{
    console.log(a,di)
    var length;
    if(step<=14||step>=40)//实现慢快慢的效果，移动速度随时间变化
        length=1;
    else   
        length=4;
    if(di==0)
        b[a].style.top=(parseInt(b[a].style.top,10)-length)+"px";
    else if(di==1)
        b[a].style.top=(parseInt(b[a].style.top,10)+length)+"px";
    else if(di==2)
        b[a].style.left=(parseInt(b[a].style.left,10)-length)+"px";
    else if(di==3)
        b[a].style.left=(parseInt(b[a].style.left,10)+length)+"px";
    // b[a].style.left=(((desi-pi)/13+pi)+"px");
    // b[a].style.top=(((desj-pj)/13+pj)+"px");
    step++;
    if(step>=55)
    {
        moverunning=0;
        clearTimeout(timeout2)
        setTimeout(changecolor(a,color),50);//最后移动完更改颜色并停止
        return;
    }
    timeout2=setTimeout("movestep("+a+","+pj+","+pi+","+desj+","+desi+","+color+","+step+","+di+")",movetime);
}

function changecolor(a,color)//改变颜色，移动到正确位置为绿色
{
    
    if(color==1)
        b[a].className="block-false";
    else if(color==2)
        b[a].className="block-right";
}

function autorun()//自动演示执行函数
{
    if(autorunning==1||moverunning==1)
        return;
    autorunning=1;
    console.log("autorun");
    timeout=setTimeout("autodraw()",autotime);
}

function autodraw()//自动演示函数，随时更新内容
{
    console.log("autodraw");
    var l=solvelist[autoz]
    autoz--;
    var array=getarray(l);
        for(var j=0;j<=2;j++)
            for(var i=0;i<=2;i++)
            {
                if(array[j][i]==0)
                    b[array[j][i]].className="block0";
                else if(array[j][i]==array_right[j][i])
                    move(array[j][i],j,i,2)
                    // b[array[j][i]].className="block-right";
                else
                    move(array[j][i],j,i,1)
                //     b[array[j][i]].className="block-false";
                // b[array[j][i]].style.position="absolute";
                // b[array[j][i]].style.left=posx[i];
                // b[array[j][i]].style.top=posy[j];
            }
            current=l;
            var info=document.getElementById("info")
         info.innerHTML=("·初始状态："+stt+"<br>·目标状态："+en+"<br>·搜索序列长度："+searchlength+"<br>·解序列长度："+solvelist.length+"<br>·当前耗散值："+idtof[statetoid[current]]+"<br>·搜索花费时间："+searchtime+"ms");
    if(autoz<0)
    {
        info.innerHTML=("·已经达到目标状态！"+"<br>·初始状态："+stt+"<br>·搜索序列长度："+searchlength+"<br>·解序列长度："+solvelist.length+"<br>·当前耗散值："+idtof[statetoid[current]]);
        stopdraw()
    }
    else
        timeout=setTimeout("autodraw()",autotime);
}

function clickmove(x)//点击数字移动函数，判断移动的可行性并进行移动
{
    if(autorunning==1||moverunning==1)
        return;
    var array=getarray(current);
    var x0,y0,x1,y1;
    var swi=0;
    for(var j=0;j<=2;j++)
            for(var i=0;i<=2;i++)
            {
                if(array[j][i]==0)
                {
                    x0=j;
                    y0=i;
                }
                else if(array[j][i]==x)
                {
                    x1=j;
                    y1=i;
                }
            }
    if(x0==x1&&(y0==y1+1||y0==y1-1))
            swi=1;
    if(y0==y1&&(x0==x1+1||x0==x1-1))
            swi=1;
    console.log("clickmove")
    console.log(current)
    console.log(x0,y0,x1,y1)
    if(swi)//移动可行，与0换位置
    {
        console.log(current)
        if(array[x1][y1]==array_right[x0][y0])
             move(array[x1][y1],x0,y0,2)
        //    b[array[x1][y1]].className="block-right";
       else
            move(array[x1][y1],x0,y0,1)
        //    b[array[x1][y1]].className="block-false";
        //    b[array[x1][y1]].style.position="absolute";
        //    b[array[x1][y1]].style.left=posx[y0];
        //    b[array[x1][y1]].style.top=posy[x0];
           b[array[x0][y0]].className="block0";
           b[array[x0][y0]].style.position="absolute";
           b[array[x0][y0]].style.left=posx[y1];
           b[array[x0][y0]].style.top=posy[x1];
           array[x0][y0]=array[x1][y1];
           array[x1][y1]=0;
    }
    current=getnum(array);
    
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
    if(current==en)//移动后重新判断状态
    {
        info.innerHTML=("·已经达到目标状态！")
    }
    else if(checkans(current)!=en_ni)
    {
        autoz=0;
        nextz=0;
        info.innerHTML=("·此状态<font color='red'>无解</font><br>·请选择生成随机状态<br>·可以点击随意移动滑块哦！")
    }
    else
        info.innerHTML=("·此状态可解<br>·请选择启发式函数类型！<br>·可以点击随意移动滑块哦！");
    
}

function drawnext()//下一步单步演示函数
{
    if(autorunning==1||moverunning==1)
        return;
    stopdraw();
    if(autoz<nextz)
        nextz=autoz;
    console.log("drawnext");
    if(nextz==solvelist.length-1)
        nextz--;
    var l=solvelist[nextz]
    if(nextz!=0)
        nextz--;
    autoz=nextz;
    var array=getarray(l);
        for(var j=0;j<=2;j++)
            for(var i=0;i<=2;i++)
            {
                if(array[j][i]==0)
                    b[array[j][i]].className="block0";
                else if(array[j][i]==array_right[j][i])
                    move(array[j][i],j,i,2)
                    // b[array[j][i]].className="block-right";
                else
                    move(array[j][i],j,i,1)
                    // b[array[j][i]].className="block-false";
                // b[array[j][i]].style.position="absolute";
                // b[array[j][i]].style.left=posx[i];
                // b[array[j][i]].style.top=posy[j];
            }
    current=l;
    // var info=document.getElementById("info")
    if(current==en)//更改信息显示
    {
        info.innerHTML=("·已经达到目标状态！"+"<br>·初始状态："+stt+"<br>·搜索序列长度："+searchlength+"<br>·解序列长度："+solvelist.length+"<br>·当前耗散值："+idtof[statetoid[current]]);
        return;
    }
    else
    ("·初始状态："+stt+"<br>·目标状态："+en+"<br>·搜索序列长度："+searchlength+"<br>·解序列长度："+solvelist.length+"<br>·当前耗散值："+idtof[statetoid[current]]+"<br>·搜索花费时间："+searchtime+"ms");
}

