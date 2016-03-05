var io = require('socket.io')(8000);
var bebop = require('node-bebop');
var atob = require('atob');
var drone = bebop.createClient();

drone.connect(function() {
  console.log('connected to drone')
});

drone.MediaStreaming.videoEnable(1); // this line should start video

io.on('connection', function (socket) {
  drone.on('video', function (data) {
    socket.emit('data', data.toString('base64'));
  });
});


