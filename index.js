const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const path = require('path')


let MainWindow
let SearchWindow
let hiddenMenu

app.whenReady().then(() => {
    {
        MainWindow = new BrowserWindow({
            minWidth: 1000,
            minHeight: 650,
            width: 1280,
            height: 720,
            autoHideMenuBar: true,
            frame: false,
            transparent: true,
            fullscreenable: false,
            icon: "icon.png",

            webPreferences: {
                preload: path.join(__dirname, 'Window/MainWindow/main.js')
            }
        })

        MainWindow.loadFile("Window/MainWindow/index.html")

        const MainWindowFunctions = {
            quit: function () {
                MainWindow.show()
                MainWindow.webContents.send("main-functions");
            }
        }

        hiddenMenu = new Tray("icon.png");
        hiddenMenu.setToolTip("YTSR");
        hiddenMenu.setContextMenu(Menu.buildFromTemplate([
            {
                label: "拜拜owo",
                click() { MainWindowFunctions.quit() }
            },
            {
                label: "我關不掉QAQ",
                click() { app.quit() },
            },
            {
                type: 'separator'
            },
            {
                label: "搜尋",
                click() { SearchWindow.show() },
                accelerator: "CommandOrControl+Alt+P"
            },
        ]))
        hiddenMenu.on("click", () => {
            MainWindow.show()
        })
        hiddenMenu.on("double-click", () => {
            MainWindow.hide()
        })
        MainWindow.on("close", () => {
            app.quit()
        })
    };
    {
        SearchWindow = new BrowserWindow({
            width: 1300,
            height: 100,
            autoHideMenuBar: true,
            frame: false,
            transparent: true,
            skipTaskbar: true,
            show: false,
            resizable: false,
            fullscreenable: false,

            webPreferences: {
                preload: path.join(__dirname, 'Window/SearchWindow/main.js')
            }
        })

        SearchWindow.loadFile("Window/PlayerWindow/index.html")

        globalShortcut.register('CommandOrControl+Alt+P', () => {
            SearchWindow.show()
            SearchWindow.webContents.send("ytsr-focus");
        })

        SearchWindow.on("blur", () => {
            SearchWindow.hide()
        })
    };
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

ipcMain.on("main-HiddenIconTip", function (_event, args) {
    hiddenMenu.setToolTip(args);
});

ipcMain.on("main-BrowserWindow", function (_event, args) {
    const _window = BrowserWindow.getFocusedWindow();
    if (args === "minimize") _window.minimize();
    else if (args === "close") app.quit();
    else if (args === "hide") _window.hide();
    else if (args === "show") MainWindow.show();
});

ipcMain.on("main-keyword", function (_event, args) {
    SearchWindow.webContents.send("main-keyword", args);
});


ipcMain.on("ytsr-hide", function (_event, args) {
    SearchWindow.hide();
});

ipcMain.on("ytsr-keyword", function (_event, args) {
    MainWindow.webContents.send("main-yt-keyword", args);
    SearchWindow.hide();
});

ipcMain.on("ytsr-keyword", function (_event, args) {
    MainWindow.webContents.send("main-yt-keyword", args);
    SearchWindow.hide();
});

ipcMain.on("ytsring", function (_event, args) {
    SearchWindow.webContents.send("ytsring", args);
})