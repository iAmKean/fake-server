import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'
const { download } = require('electron-dl');
const path = require("path");
const os = require("os");
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
		height: process.env.NODE_ENV !== 'development' ? 720 : height,
		x: 0,
		y: 0,
		useContentSize: true,
		process: process,
		width: process.env.NODE_ENV !== 'development' ? 1200 : width,
		minWidth: 1200,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
		},
		useContentSize: true,
		alwaysOnTop: false,
		minimizable: true,
		maximizable: true,
		closable: true,
		// frame: false,
		skipTaskbar: false,
		focusable: true,
	};

	mainWindow = new BrowserWindow(windowOptions)

	mainWindow.loadURL(winURL)

	/*
	  download software item
	*/

	let isDownloadSoftware = false;

	ipcMain.on('download-software-start', async (event, arg) => {
		console.log("######### download-software-start ############");
		console.log("arg", arg);

		const win = BrowserWindow.getFocusedWindow();
		isDownloadSoftware = true;
		download(win, arg.url, arg.properties)
	})

	ipcMain.on('download-start', (event, arg) => {
		console.log("######### download-start ############");
		console.log("arg", arg);

		isDownloadSoftware = false;
		mainWindow.webContents.downloadURL(arg.url)
	})

	mainWindow.webContents.session.on('will-download', (event, item, webContents) => {

		console.log("isDownloadSoftware", isDownloadSoftware);
		if (isDownloadSoftware) {
			// todo: download software item
			item.on('updated', (event, state) => {
				if (state === 'interrupted') {
					console.log('Download is interrupted but can be resumed')
					item.resume()
				} else if (state === 'progressing') {
					if (item.isPaused()) {
						console.log('Download is paused')
						mainWindow.webContents.send('download-software-on-pause');
					} else {
						mainWindow.webContents.send('download-software-on-progress', item.getReceivedBytes());
						console.log(`Received bytes: ${item.getReceivedBytes()}`)
					}
				}
			})

			item.once('done', (event, state) => {
				if (state === 'completed') {
					console.log('Download successfully')
					mainWindow.webContents.send('download-software-success');
				} else {
					// mainWindow.webContents.send('download-failed');
					mainWindow.webContents.send('download-software-failed');
					console.log(`Download failed: ${state}`)
				}
			})

		} else {
			// todo: download the virtual box
			// Set the save path, making Electron not to prompt a save dialog.
			var zipFile = '';
			if (process.platform == 'darwin' || process.platform == 'linux') {
				zipFile = path.join(os.homedir(), 'Downloads', item.getFilename())
			} else {
				zipFile = path.join(os.homedir(), 'Downloads', item.getFilename())
			}

			console.log("zipFile", zipFile);
			item.setSavePath(zipFile)

			mainWindow.webContents.send('get-file-directory', zipFile);
			mainWindow.webContents.send('get-file-size', item.getTotalBytes());

			item.on('updated', (event, state) => {
				if (state === 'interrupted') {
					console.log('Download is interrupted but can be resumed')
					item.resume()
				} else if (state === 'progressing') {
					if (item.isPaused()) {
						console.log('Download is paused')
						mainWindow.webContents.send('download-on-pause');
					} else {
						mainWindow.webContents.send('download-on-progress', item.getReceivedBytes());
						// console.log(`Received bytes: ${item.getReceivedBytes()}`)
					}
				}
			})

			item.once('done', (event, state) => {
				if (state === 'completed') {
					console.log('Download successfully')
					mainWindow.webContents.send('download-success');
				} else {
					mainWindow.webContents.send('download-failed');
					console.log(`Download failed: ${state}`)
				}
			})
		}

	})

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
