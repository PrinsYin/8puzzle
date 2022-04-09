 function initSVGZoom() //初始化矢量图区域
 {
	const svgElement = document.getElementById('tree').childNodes[6];

	// console.log('svgElement',svgElement)
    svgPanZoom(svgElement, {controlIconsEnabled: true});
};


function drawTree ()//画树
 {
    var vizdata=JSON.parse(localStorage.getItem('viz'));
    const treeCanvas = document.getElementById('tree');
    treeCanvas.innerHTML = Viz(vizdata, "svg");
    document.getElementById('tree').childNodes[6].style.width="100%";
    document.getElementById('tree').childNodes[6].style.height="100%";
    document.getElementById('tree').childNodes[6].style.posotion="absolute";
    document.getElementById('tree').childNodes[6].style.top="-1000px";
    // document.getElementById('graph0').style.top="0";
    initSVGZoom();
};
