# director

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8d4ed60](https://github.com/SimulatedGREG/electron-vue/tree/8d4ed607d65300381a8f47d97923eb07832b1a9a) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

### git repo
```
https://github.com/iAmKean/fake-server
```

### node version
```
windows: 14.16.1
mac: null/not tested
```

### iview
```
https://www.iviewui.com/docs/guide/install-en
http://v4.iviewui.com/docs/introduce-en
```

### vue-i18n
```
https://www.npmjs.com/package/vue-i18n/v/8.24.1
{{ $t('message')}}
```

### sass-loader
```
https://simulatedgreg.gitbooks.io/electron-vue/content/en/using_pre-processors.html
```

### using-electron-to-access-cross-origin-resources
```
path: \src\main\index.js

mainWindow = new BrowserWindow({
    webPreferences: {
        webSecurity: false
    }
});

https://stackoverflow.com/questions/44205831/using-electron-to-access-cross-origin-resources
```

### serial port
```
npm install serialport@9
npm install electron-rebuild
 ./node_modules/.bin/electron-rebuild

```

### to white list plugins
```
file:  .electron-vue/webpack.renderer.config.js
let whiteListedModules = ['vue', 'view-design', 'iview', 'vuedraggable', 'wavesurfer.js', 'konva', 'vue-konva']
```

### build in mac to avoid the blank page
```
npm run pack && electron-builder build
```


### electron-log
```
https://github.com/megahertz/electron-log
npm install electron-log --save

error, warn, info, verbose, debug, silly

By default, it writes logs to the following locations:

    on Linux: ~/.config/{app name}/logs/{process type}.log
    on macOS: ~/Library/Logs/{app name}/{process type}.log
    on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log
```


### electron writeFileSync
```
https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options

**when creating file in MAC should begins with '/'
fs.writeFileSync(file, data[, options])
```


### rebuil sass
```
npm rebuild node-sass || npm uninstall node-sass && npm install node-sass
```


###
```
https://docs.sentry.io/platforms/javascript/guides/electron/

npm install @sentry/electron


npm install -g @sentry/wizard
sentry-wizard --integration electron

#view issues
https://sentry.io/account/settings/wizard/zy5a7dxql69xp01fchp0tp0ulzn72beoh5jm4ricc67br9nzetsgppoaydavxe5r/
`
```

### node-cmd
```
npm i node-cmd --save
```

taskkill /f /im node.exe

https://stackoverflow.com/questions/14790910/stop-all-instances-of-node-js-server


npm install cross-port-killer -D

https://stackoverflow.com/questions/39322089/node-js-port-3000-already-in-use-but-it-actually-isnt