const fs = require('fs')
const path = require('path')
const electron = require('electron')
const {moveToApplications} = require('electron-lets-move')
const settings = require('electron-settings')

const AutoLaunch = require('auto-launch')

const tintAutoLauncher = new AutoLaunch({
  name: path.basename(process.execPath),
  path: path.dirname(process.execPath).replace('/Contents/MacOS', '')
})

// if (!settings.has('tint.autolaunch')){
//   settings.set('tint.autolaunch', false)
//   tintAutoLauncher.disable()
// }

tintAutoLauncher.enable()

tintAutoLauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    tintAutoLauncher.enable();
})
.catch(function(err){
    // handle error 
    console.log(err);
});

const app = require('electron').app

const statusbar = require('./status-bar')

// const globalShortcut = electron.globalShortcut
const electronLocalshortcut = require('electron-localshortcut')
// const {webContents} = require('electron')

// TODO: Make this configurable
const GLOBAL_SHORTCUT = 'Cmd+c'

app.on('ready', () => {
  console.log( settings.getAll() )
  console.log(path.basename(process.execPath));
  // console.log( path.dirname(process.execPath).replace('/Contents/MacOS', '') )

  if (!settings.has('tint.moved')){
    settings.set('tint.moved')

    moveToApplications(function(err, moved) {
      if (err) {
        // log error, something went wrong whilst moving the app.
      }
      if (moved) {
        settings.set('tint.moved', true)
      } else if (!moved) {
        // the user asked not to move the app, it's up to the parent application
        // to store this information and not hassle them again.
        settings.set('tint.moved', false)
      }
    })
  }
  // do the rest of your application startup
  console.log('Application is ready!')

  // Hide the dock.
  if (app.dock) {
    app.dock.hide()
  }

  // Load the status bar.
  const bar = statusbar(app)

  // let win = webContents.getFocusedWebContents()

  // Register the global shortcut
  // const registrationSuccess = globalShortcut.register(
  //   GLOBAL_SHORTCUT,
  //   () => {
  //     win.send('copy')
  //   }
  // )


  app.on('will-quit', () => {

    // Unregister all shortcuts.
    // globalShortcut.unregisterAll()


    electronLocalshortcut.unregisterAll();

    // Close the statusbar cleanly.
    bar.quit()
  })

    
})

