/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import dotenv from 'dotenv/config';
import passport from 'passport';
import blizz from 'blizzard.js';
import { userInfo } from 'os';

var spawn = require('child_process').spawn;

var BnetStrategy = require('passport-bnet').Strategy;

var BNET_ID = process.env.ID;
var BNET_SECRET = process.env.SECRET;

var blizzard = blizz.initialize({
  // apikey:
});

passport.use(
  new BnetStrategy(
    {
      clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      callbackURL: 'https://localhost:1212/auth/bnet/callback',
      region: 'eu'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      blizzard = blizz.initialize({ apikey: accessToken });
      return done(null, profile);
    }
  )
);
passport.initialize();
passport.authenticate(function(err, user, info) {
  console.log(user);
});

function runSim() {
  return (rep = new Promise(resolve => {
    switch (process.platform) {
      case 'win32':
        console.log('Detected Windows OS');
        console.log('Running test Simulation');
        const simc = spawn('../simc/simc.exe', [
          path.join(__dirname + `/tmp/${currentTask}.simc`),
          'calculate_scale_factors=0',
          'html=' + path.join(__dirname + `/reports/${currentTask}.html`),
          'iterations=5000'
        ]);
        simc.stdout.on('data', data => {
          console.log(`stdout: ${data}`);
        });

        simc.stderr.on('data', data => {
          console.log(`stderr: ${data}`);
        });

        simc.on('close', () => resolve(true));
        break;
    }
  }));
}

// log.info("test");
// const blizzard = blizz.initialize({ apikey: accessToken });
// blizzard.wow.character(['profile'], { origin: 'eu', realm: 'kazzak', name: 'Tetrodotoxin' })
//   .then(response => {
//   console.log(response.data);
// });

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

//* DOM ready, provide api data
const { ipcMain } = require('electron');
ipcMain.on('dom-ready', () => {
  var data = [];
  data.unshift(process.env.NODE_ENV);
  mainWindow.webContents.send('ping', data);
});
