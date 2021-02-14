import {app, screen, BrowserWindow} from 'electron'
import * as url from 'url'
import * as path from 'path'

let win: BrowserWindow = null;

const args = process.argv.slice(1)
const serve = args.some((arg) => arg === '--serve')

function createWindow(): BrowserWindow {
  const screenSize = screen.getPrimaryDisplay()?.workAreaSize

  win = new BrowserWindow({
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
  })

  if(serve) {
    win.webContents.openDevTools()

    require('electron-reload')(__dirname, {
        electron: path.join('node_modules', '.bin', 'electron')
      }
    )
    win.loadURL('http://localhost:4200')
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, "dist/tetris/index.html"),
      protocol: "file:",
      slashes: true,
    }))
  }

  win.on('closed', () => onCloseWindow(win))

  return win;
}

function onCloseWindow(window: BrowserWindow) {
  window = null;
}

try {
  app.on('ready', () => setTimeout(() => createWindow(), 1000))
  app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    if(win === null) {
      createWindow()
    }
  })

} catch (error) {
  console.log(`Error starting Electron App - message: ${error.message || 'unknown error'}`)
}
