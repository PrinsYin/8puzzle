// 状态以int数字形式存储，本函数可将数字转化为3*3矩阵
function getarray(l)
{
    var list=
            [[0,0,0],
            [0,0,0],
            [0,0,0]];
        for(var j=2;j>=0;j--)
             for (var i=2;i>=0;i--)
            { 
                list[j][i]=l%10;
                l/=10;
                l=parseInt(l);
            }
    return list;
}
//由矩阵获得状态数字
function getnum(l)
{
    var num=0;
        for(var j=0;j<=2;j++)
             for (var i=0;i<=2;i++)
            { 
                num+=l[j][i];
                num*=10;
            }
    num/=10;
    return num;
}
var choose;//启发式函数选择
var tr=[];//存储树结构，指向父亲的序号，用来获得解序列 
var t1=2;//标志位
var statetoid=new Array();//状态对应到序号，树结构
var idtostate=new Array();//序号对应到状态，树结构
var idtof=new Array();//序号对应耗散值
var en=123804765;//终止状态


function choose0()//按钮调用函数，选择启发式函数0
{
    c0.className="btn btn-info btn-common active";
    c1.className="btn btn-default btn-common";
    c2.className="btn btn-default btn-common";
    c3.className="btn btn-default btn-common";
    console.log('choose=0');
    choose=0;
    astar();
}

function choose1()//按钮调用函数，选择启发式函数1
{
    c0.className="btn btn-default btn-common";
    c1.className="btn btn-info btn-common active";
    c2.className="btn btn-default btn-common";
    c3.className="btn btn-default btn-common";
    console.log('choose=1');
    choose=1;
    astar();
}

function choose2()//按钮调用函数，选择贪婪式搜索
{
    c0.className="btn btn-default btn-common";
    c1.className="btn btn-default btn-common";
    c2.className="btn btn-info btn-common active";
    c3.className="btn btn-default btn-common";
    console.log('choose=2');
    choose=2;
    astar();
}

function choose3()//按钮调用函数，选择广度优先搜索
{
    c0.className="btn btn-default btn-common";
    c1.className="btn btn-default btn-common";
    c2.className="btn btn-default btn-common";
    c3.className="btn btn-info btn-common active";
    console.log('choose=3');
    choose=3;
    astar();
}


function check(it,fa,f)//检查节点是否被重复遍历，如果没有同时建立树结构
{
    if(statetoid[it])
        return 1;
    statetoid[it]=t1;//为状态分配序号
    idtostate[t1]=it;
    idtof[t1]=f;
    tr[t1]=statetoid[fa];//tr数组指向父亲的序号
    t1++;
    // console.log(it)
    // console.log(f)
    return 0;
}
class PriorityQueue//针对状态类构造优先队列结构
{
    constructor()
    {
        this.queue= [];
    }
    push1(val,fa)//数据进队列，时间复杂度O(n)
    {
        if(!fa)
        {
            statetoid[val.sta]=1;
            idtostate[1]=val.sta;
            idtof[1]=val.f;
        }
        else if(check(val.sta,fa.sta,val.f))
             return;
            
        // console.log(val)
        let t=this.queue;
       if(t.length==0)
       {
            t.push(val);
            return;
       }
        else if (val.f <= t[0].f) 
        {
            t.unshift(val); 
            return;
        }
        else if (val.f >= t[t.length - 1].f)
         {
            t.push(val);
             return;
        }
        for (let i = 0; i <= t.length - 2; i++)
        {
            if (t[i].f <= val.f && val.f <= t[i + 1].f)
            {
                t.splice(i + 1, 0, val); 
                return;
            }
        }
    }

    pop1()//数据出队列，时间复杂度O(1)
    {
        searchlength++;
        this.queue.shift();
    }

    get1()//获取队列头数据，时间复杂度O(1)
    {
        return this.queue[0];
    }
}

function hh(j)//启发式函数计算
{
    if(choose==3)
        return 0;
    var sum=0;

    if(choose==0)
    {
        sum+=weii(j);
    }   
    else if(choose==1)
    {
        var enddd=en;
        var sum=0;
        var jj=j;
        for (var i=8;i>=0;i--)
        { 
            if(jj%10==0)
            {
                jj/=10;
                enddd/=10;
                jj=parseInt(jj);
                enddd=parseInt(enddd);
                continue;
            }
           else if(enddd%10!=jj%10)
                sum++;
            jj/=10;
            enddd/=10;
            jj=parseInt(jj);
            enddd=parseInt(enddd);
        }
    }
    
    return sum;
}

function     weii(j)//曼哈顿距离
{
    var chart =[[ //表示第i个位置与第j个位置偏移的曼哈顿距离
                0,1,2,1,2,3,2,3,4],
                [1,0,1,2,1,2,3,2,3],
                [2,1,0,3,2,1,4,3,2],
                [1,2,3,0,1,2,1,2,3],
                [2,1,2,1,0,1,2,1,2],
                [3,2,1,2,1,0,3,2,1],
                [2,3,4,1,2,3,0,1,2],
                [3,2,3,2,1,2,1,0,1],
                [4,3,2,3,2,1,2,1,0]];
    var l1=[],l2=[];
    var jj=en;
    var sum=0;
    for (var i=8;i>=0;i--)
    {
        l1[j%10]=i;
        j/=10;
        j=parseInt(j);
    }
    for (var i=8;i>=0;i--)
    {
        l2[jj%10]=i;
        jj/=10;
        jj=parseInt(jj);
    }
    for (var i=8;i>=0;i--)
        sum+=chart[l1[i]][l2[i]];  
        return sum;
    };

class sta//存储状态的类，存储状态。深度、耗散值
{
    constructor(sta,d)
    {
        this.sta=sta;
        this.d=d;
        this.f=d+hh(sta)
    }
}

class axing//A*算法类
{
    constructor()
    {
        this.arr=stt;
    }

    findnext(a,q)//依据0的位置找到下一步可能的移动，判断后加入队列
    {
        var list=
            [[0,0,0],
            [0,0,0],
            [0,0,0]];
        var state=a.sta;
        for(var j=2;j>=0;j--)
             for (var i=2;i>=0;i--)
            { 
                list[j][i]=state%10;
                if(state%10==0)
                {
                    var h=j;
                    var l=i;
                }
                state/=10;
                state=parseInt(state);
            }
        var list2;
        list2=list;
        var res=0;
        if(h+1<=2)//上下左右分别试验
        {
            list2[h][l]=list2[h+1][l];
            list2[h+1][l]=0;
            for(var j=0;j<=2;j++)
               for (var i=0;i<=2;i++)
            { 
                res+=list2[j][i];
                res*=10;
            }
            res/=10;
            res=parseInt(res);
            list2[h+1][l]=list2[h][l];
            list2[h][l]=0;
            if(!statetoid[res])//判断是否遍历过
            {
                if(choose==2)
                {
                    let ne=new sta(res,a.d);
                    q.push1(ne,a)
                }
                else
                {
                    let ne=new sta(res,a.d+1);
                    q.push1(ne,a)
                }
            }
        }
        list2=list;
        res=0;
        if(h-1>=0)
        {
            list2[h][l]=list2[h-1][l];
            list2[h-1][l]=0;
            for(var j=0;j<=2;j++)
               for (var i=0;i<=2;i++)
            { 
                res+=list2[j][i];
                res*=10;
            }
            res/=10;
            res=parseInt(res);
            list2[h-1][l]=list2[h][l];
            list2[h][l]=0;
            if(!statetoid[res])//判断是否遍历过
            {
                if(choose==2)
                {
                    let ne=new sta(res,a.d);
                    q.push1(ne,a)
                }
                else
                {
                    
                    let ne=new sta(res,a.d+1);         
                    q.push1(ne,a)
                }
            }
        }
        list2=list;
        res=0;
        if(l+1<=2)
        {
            list2[h][l]=list2[h][l+1];
            list2[h][l+1]=0;
            for(var j=0;j<=2;j++)
               for (var i=0;i<=2;i++)
            { 
                res+=list2[j][i];
                res*=10;
            }
            res/=10;
            res=parseInt(res);
            list2[h][l+1]=list2[h][l];
            list2[h][l]=0;
            if(!statetoid[res])//判断是否遍历过
            {
                if(choose==2)
                {
                    let ne=new sta(res,a.d);
                    q.push1(ne,a)
                }
                else
                {
                    let ne=new sta(res,a.d+1);
                    q.push1(ne,a)
                }
            }
        }
        list2=list;
        res=0;
        // console.log(h,l);
        if(l-1>=0)
        {
            // console.log("111")
            list2[h][l]=list2[h][l-1];
            list2[h][l-1]=0;
            for(var j=0;j<=2;j++)
               for (var i=0;i<=2;i++)
            { 
                res+=list2[j][i];
                res*=10;
            }
            res/=10;
            res=parseInt(res);
            list2[h][l-1]=list2[h][l];
            list2[h][l]=0;
            if(!statetoid[res])//判断是否遍历过
            {
                if(choose==2)
                {
                    let ne=new sta(res,a.d);
                    q.push1(ne,a)
                }
                else
                {
                    let ne=new sta(res,a.d+1);
                    q.push1(ne,a)
                }
                // console.log(q)
            }
        }
    }

    a1()//A*算法主体部分，进行初始化并开始算法
    {
        
        console.log("计算中...部分算法可能较慢！")
        astartime1=0;
        // clocktime=setInterval(tim(),1);
        let ini = new sta(this.arr,0);
        let q = new PriorityQueue();
        q.queue=[]
        console.log(q)
        q.push1(ini,null);
        console.log(this.arr)
        while(1)
        {
            // console.log(q)
            if(q.get1().sta)
            {
                var a=q.get1();
                q.pop1();
                if(a.d<10)
                 console.log(a.sta+":"+a.d+":"+a.f)
                if(a.sta==en)
                    break;
                this.findnext(a,q);
            }
            else
                q.pop1();
        }
        stoptime=1;
    }

    solve(en)//按照搜索存储的数据找到解序列
    {
        var state=en;
        var i=0;
        var result=[];
        while(1)
        {
            result.push(state)
            // result.push(idtof[statetoid[state]])
            state=idtostate[tr[statetoid[state]]];
            if(state==stt)
            {
                result.push(state)
                break;
            }
            i++;
        }
        stoptime=1;
        return result;
    }
}


