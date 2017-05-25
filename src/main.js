const fs = require('fs')
const path = require('path')
const electron = require('electron')
const {moveToApplications} = require('electron-lets-move')
const settings = require('electron-settings')
const isDev = require('isdev')
const AutoLaunch = require('auto-launch')

const tintAutoLauncher = new AutoLaunch({
  name: path.basename(process.execPath),
  path: path.dirname(process.execPath).replace('/Contents/MacOS', '')
})

if (!isDev){
  if (!settings.has('tint.autolaunch')){
    settings.set('tint.autolaunch', false)
    tintAutoLauncher.disable()
  }

  tintAutoLauncher.enable()

  tintAutoLauncher.isEnabled().then(function(isEnabled){
      if(isEnabled){
          return;
      }
      tintAutoLauncher.enable();
  }).catch(function(err){
      // handle error 
      console.log(err);
  });
}

const app = require('electron').app

const statusbar = require('./status-bar')

const electronLocalshortcut = require('electron-localshortcut')

app.on('ready', () => {

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
  if (!isDev){
    if (app.dock) {
      app.dock.hide()
    }
  }
  // Load the status bar.
  const bar = statusbar(app)

  app.on('will-quit', () => {

    electronLocalshortcut.unregisterAll();

    // Close the statusbar cleanly.
    bar.quit()
  })

    
})

