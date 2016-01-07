
var React = window.React = require('react');
var ReactDOM = require('react-dom');
var io = require('socket.io-client');


var Player = require('../../Broadway/Player/Player');
var player = new Player({
  useWorker: true,
  workerFile: '/scripts/Decoder.js'
});

document.body.appendChild(player.canvas);


var toUint8Array = function (parStr) {
  var raw = atob(parStr);
  var array = new Uint8Array(new ArrayBuffer(raw.length));

  Array.prototype.forEach.call(raw, function (data, index) {
    array[index] = raw.charCodeAt(index);
  })

  return array;
};


var socket = io('http://localhost:8000/');
socket.on('data', function (data) {
  player.decode(toUint8Array(data));
});





var App = React.createClass({

  render: function() {
    return (
      <h2>
        browserVideo
      </h2>
    );
  }
});


ReactDOM.render(<App/>, document.getElementById('app'));

