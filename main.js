"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var url = require("url");
var path = require("path");
var win = null;
var args = process.argv.slice(1);
var serve = args.some(function (arg) { return arg === '--serve'; });
function createWindow() {
    var _a;
    var screenSize = (_a = electron_1.screen.getPrimaryDisplay()) === null || _a === void 0 ? void 0 : _a.workAreaSize;
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: screenSize.width,
        height: screenSize.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: serve ? true : false,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false
        }
    });
    if (serve) {
        win.webContents.openDevTools();
        require('electron-reload')(__dirname, {
            electron: path.join('node_modules', '.bin', 'electron')
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, "dist/tetris/index.html"),
            protocol: "file:",
            slashes: true,
        }));
    }
    win.on('closed', function () { return onCloseWindow(win); });
    return win;
}
function onCloseWindow(window) {
    window = null;
}
try {
    electron_1.app.on('ready', function () { return setTimeout(function () { return createWindow(); }, 1000); });
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        if (win === null) {
            createWindow();
        }
    });
}
catch (error) {
    console.log("Error starting Electron App - message: " + (error.message || 'unknown error'));
}
//# sourceMappingURL=main.js.map