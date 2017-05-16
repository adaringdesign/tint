const fs = require('fs')
const path = require('path')

const electron = require('electron')
const Positioner = require('electron-positioner')

const electronLocalshortcut = require('electron-localshortcut');
const {webContents} = require('electron')

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const Tray = electron.Tray

const HEIGHT = 240
const WIDTH = 225
const ROOT = __dirname
const INDEX = path.join(ROOT, 'index.html')
const ICON = path.join(ROOT, 'images', 'tintTemplate.png')
const ICON_HIGHLIGHT = path.join(ROOT, 'images', 'tintHighlight.png')



let window

if (!fs.existsSync(ICON)) {
  throw Error(`Icon file "${ICON}" does not exist!`)
}

if (!fs.existsSync(INDEX)) {
  throw Error(`index.html file "${INDEX}" does not exist!`)
}

function createWindow() {

  // console.log(`Creating window sized ${WIDTH}x${HEIGHT} pixels.`)

  window = new BrowserWindow({
    frame: false,
    height: HEIGHT,
    show: false,
    //transparent: true,
    width: WIDTH,
    resizable: false,
    alwaysOnTop: true
  })

  window.setVisibleOnAllWorkspaces(true)

  // console.log('Loading URL to HTML file:', INDEX)

  window.loadURL('file://' + INDEX)

  electronLocalshortcut.register(window, 'Cmd+C', (event) => {
    webContents.getFocusedWebContents().send('copy')
  });

  return window
}

function createMenu(app) {

  // console.log('Opening the context menu...')

  const menu = Menu.buildFromTemplate([
    {

      label: 'Preferences',
      enabled: false,
      click() {
        console.log('Preferences not implemented yet!');
      }

    }, {
      type: 'separator'
    }, {

      label: 'Quit Tint',
      click() {
        console.log('Quitting application...')
        app.quit()
      }

    }
  ])

  return menu
}

module.exports = (app) => {

  const statusbar = {}
  statusbar.app = app
  statusbar.tray = new Tray(ICON)
  statusbar.tray.setPressedImage(ICON_HIGHLIGHT)
  statusbar.window = createWindow()
  statusbar.menu = createMenu(statusbar.app)

  statusbar.tray.setToolTip('Tint color picker')

  statusbar.show = (event, bounds) => {
    // Load passed in bounds or fallback to cached bounds.
    statusbar.bounds = bounds || statusbar.bounds

    // console.log('Showing window at bounds:')
    // console.log(JSON.stringify(statusbar.bounds, null, '  '))

    const positioner = new Positioner(statusbar.window)

    const position = positioner.calculate('trayCenter', statusbar.bounds)

    const x = position.x || 0
    const y = position.y || 0

    // console.log(`Setting window position to: ${x} x by ${y} y`)

    statusbar.window.setPosition(x, y)

    statusbar.window.show()
    statusbar.tray.setHighlightMode('always')
  }

  statusbar.hide = () => {
    statusbar.window.hide()
    statusbar.tray.setHighlightMode('never')
  }

  statusbar.quit = () => {
    statusbar.tray.destroy()
    statusbar.window.close()
    statusbar.app.quit()
  }

  statusbar.toggleWindow = (bounds) => {

    // console.log(`Tray clicked and window is ${statusbar.window.isVisible() ? 'visible' : 'hidden'}`)

    if (statusbar.window && statusbar.window.isVisible()) {
      return statusbar.hide()
    }

    statusbar.show(bounds)
  }

  statusbar.app.on('browser-window-blur', (event, win) => statusbar.hide(win))

  // statusbar.tray
  //     .on('click', (e, bounds) => statusbar.toggleWindow(bounds))
  //     .on('double-click', (e, bounds) => statusbar.toggleWindow(bounds))
  //     .on('right-click', (e, bounds) => statusbar.menu.popup(statusbar.window))

  statusbar.tray.on('click', (e, bounds) => {
    statusbar.window.isVisible() ? statusbar.window.hide() : statusbar.show(e, bounds)
  })

  statusbar.tray.on('double-click', (e, bounds) => {
    statusbar.window.isVisible() ? statusbar.window.hide() : statusbar.show(e, bounds)
  })

  statusbar.tray.on('right-click', (e, bounds) => {
    statusbar.menu.popup(statusbar.window)
  })
  return statusbar
}

