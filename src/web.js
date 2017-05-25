const electron = require('electron')

const ipcRenderer = require("electron").ipcRenderer;

const {clipboard} = require('electron')

// Begin spectrum picker
const jQuery = require('jquery')
// const spectrum = require('spectrum-colorpicker')
const spectrum = require('./spectrum.custom')

function grabColor(){
  clipboard.write({text: jQuery('#picker').spectrum("get").toString() });
  document.getElementsByClassName('copied')[0].classList.add('flash');
  setTimeout(function(){
    document.getElementsByClassName('copied')[0].classList.remove('flash');
  },300)
}

ipcRenderer.on('copy', function(){
  grabColor();
})

ipcRenderer.on('paste', function(){
  jQuery('#picker').spectrum('set', clipboard.readText() );
})

// End spectrum picker