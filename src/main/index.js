import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`

function createWindow() {
	/**
	 * Initial window options
	 */


	const { screen } = require('electron')
	const primaryDisplay = screen.getPrimaryDisplay()
	const { width, height } = primaryDisplay.workAreaSize

	const windowOptions = {
		minHeight: 720,
		height: height,
		x: 0,
		y: 0,
		useContentSize: true,
		process: process,
		width: width,
		minWidth: 1024,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
		},
		useContentSize: true,
		alwaysOnTop: false,
		minimizable: true,
		maximizable: true,
		closable: true,
		frame: false,
		skipTaskbar: false,
		focusable: true,
	};

	mainWindow = new BrowserWindow(windowOptions)

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	// custome events
	ipcMain.on('on-closed', (event, arg) => {
		app.quit()
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
