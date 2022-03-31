var electron = require('electron') 

var app = electron.app   
const Menu = electron.Menu
var BrowserWindow = electron.BrowserWindow;
var mainWindow=null
// Menu.setApplicationMenu(null)
app.on('ready',()=>{
    mainWindow = new BrowserWindow//调用electron并打开主窗口
    ({
        width:850,
        height:600,
        icon: 'image/1.ico',
        webPreferences:{ nodeIntegration: true, //设置开启nodejs环境
        contextIsolation: false}
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed',()=>{
        mainWindow=null
    })
})

