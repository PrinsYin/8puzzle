/**
 * 初始化SVG缩放
 */

 function getdot()
 {
    console.log("t1"+t1)
    if(t1>10000||t1<=1)
        return;
     var dot='digraph g {\nsplines="line";\nnode [shape = record, height = .1];\n'
     for(var i=1;i<t1;i++)
     {
         dot=dot+'node'+i+'[label = "';
         var array=getarray(idtostate[i]);
         dot=dot+array[0][0]+" "+array[0][1]+" "+array[0][2]+'\\'+'n';
         dot=dot+array[1][0]+" "+array[1][1]+" "+array[1][2]+'\\'+'n';
         dot=dot+array[2][0]+" "+array[2][1]+" "+array[2][2]+'\\'+'n';
         if(solveid[i])
            dot+='", style=filled, fillcolor=pink] ;\n'
        else
            dot+='"];\n'
     }
     for(var i=2;i<t1;i++)
     {
         childnum[tr[i]]--;
         if(solveid[i]&&solveid[tr[i]])
            dot=dot+'"node'+tr[i]+'" -> "node' +i+'"[style=filled, fillcolor=red] ;\n';
         else
            dot=dot+'"node'+tr[i]+'" -> "node' +i+'";\n';
         
            
     }
     dot+="}"
     return dot;
 }


function drawTree ()
 {
     
    const vizData = getdot();
    if(t1>10000||t1<=1)
        return;
    jsondata=JSON.stringify(vizData);
	localStorage.setItem('viz',jsondata);  //对应方法2，将数据存储在HTML5的localStorage中。
    console.log('vizData=',vizData)
    // const treeCanvas = document.getElementById('tree');
    // treeCanvas.innerHTML = Viz(vizData, "svg");
    window.open("svg.html")
    // document.getElementById('tree').childNodes[6].style.width="100%";
    // document.getElementById('tree').childNodes[6].style.height="50%";
    // document.getElementById('tree').childNodes[6].style.posotion="absolute";
    // document.getElementById('tree').childNodes[6].style.top="20px";
    // document.getElementById('graph0').style.top="0";
};

// digraph g {
// splines="line";
// node [shape = record, height = .1];
// node0[label = "<f0> | 38 | <f1> | 56 | <f2> "];
// "node0":f0 -> "node1";
// node1[label = "<f0> | 11 | <f1> "];
// "node1":f0 -> "node2";
// node2[label = "<f0> | 10 | <f1> "];
// "node1":f1 -> "node3";
// node3[label = "<f0> | 16 | <f1> "];
// "node0":f1 -> "node4";
// node4[label = "<f0> | 49 | <f1> "];
// "node4":f0 -> "node5";
// node5[label = "<f0> | 41 | <f1> | 43 | <f2> "];
// "node4":f1 -> "node6";
// node6[label = "<f0> | 50 | <f1> | 51 | <f2> "];
// "node0":f2 -> "node7";
// node7[label = "<f0> | 62 | <f1> "];
// "node7":f0 -> "node8";
// node8[label = "<f0> | 58 | <f1> "];
// "node7":f1 -> "node9";
// node9[label = "<f0> | 64 | <f1> "];
// }