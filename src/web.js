const electron = require('electron')

const ipcRenderer = require("electron").ipcRenderer;

const {clipboard} = require('electron')

const React = require('react')
const ReactDOM = require('react-dom')
const ColorPicker = require('react-color')



const Tint = React.createClass({

  displayName: 'Tint',

  render() {
    return (
      <ColorPicker
        id='ColorPicker'
        onChange={this.handleChange}
        type='chrome'
      />
    )
  }
})

ReactDOM.render(<Tint />, document.getElementById('picker'))

function grabColor(){
  var output = document.querySelectorAll("div[id*='output_']")[0];

  switch (RegExp(/(?![output_])(.*$)/i).exec(output.id)[0] ){
    case 'hex':
      console.log( [].map.call(document.querySelectorAll("div[id*='output_'] input"), function( input ) { return input.value; }).join( ', ' ) );
      clipboard.write({text: [].map.call(document.querySelectorAll("div[id*='output_'] input"), function( input ) { return input.value; }).join( ', ' )});
      break;
    case 'rgba':
      console.log( 'rgba('+[].map.call(document.querySelectorAll("div[id*='output_'] input"), function( input ) { return input.value; }).join( ', ' )+')' );
      clipboard.write({text: 'rgba('+[].map.call(document.querySelectorAll("div[id*='output_'] input"), function( input ) { return input.value; }).join( ', ' )+')' });
      break;
    case 'hsla':
      console.log( 'hsla('+[].map.call(document.querySelectorAll("div[id*='output_'] input"), function( input ) { return input.value; }).join( ', ' )+')' );
      clipboard.write({text: 'hsla('+[].map.call(document.querySelectorAll("div[id*='output_'] input"), function( input ) { return input.value; }).join( ', ' )+')' });
      break;
  }
  document.getElementById('spectrum').classList.add('flash');
  setTimeout(function(){
    document.getElementById('spectrum').classList.remove('flash');
  },300)
}


const swatch = document.getElementById('swatch')

swatch.onclick = function(){
  grabColor();
}

ipcRenderer.on('copy', function(){
  grabColor();
})