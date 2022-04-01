// console.log(tre)
// /**
//  * 初始化SVG缩放
//  */
//  function initSVGZoom() {
// 	const svgElement = document.getElementById('tree').childNodes[6];
// 	console.log('svgElement',svgElement)
//     svgPanZoom(svgElement, {controlIconsEnabled: true});
// };

// /**
//  * 展示B-树的SVG图像
//  * @param {number} value 本次操作的值
//  */
// function drawTree (value) {
//     const vizData = bt.btToDOT(value); // 获得B-树的DOT文本
//     // console.log('vizData=',vizData)
//     const treeCanvas = document.getElementById('tree-canvas');
//     treeCanvas.innerHTML = Viz(vizData, "svg");
//     initSVGZoom();
// };
// initSVGZoom() 