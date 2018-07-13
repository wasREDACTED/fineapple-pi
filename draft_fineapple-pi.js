var admin = require('firebase-admin');
var serviceAccount = require('./cred/i-entry-firebase-adminsdk-bpur2-5feda99169.json');
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out')

//firebase initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://i-entry.firebaseio.com'
});

//var message = {text: 'testing pi-firebase', timestamp: new Date().toString()};
var ref = admin.database().ref().child('nodeclient');
var lockRef = admin.database().ref().child('lockStatus');
//var messageRef = messagesRef.push(message);
var lockValue = ""


//HTTP Server settings
const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Door is ${lockValue}`);
});

//Outputs HTTP Server config to console
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

lockRef.child('Locked').on('value', function(snap) {
  console.log('value', snap.val());
  var lockState = snap.val();
  if (lockState == 0) {
    LED.writeSync(1);
    console.log(lockState, 'Unlocked!');
    setTimeout(function () {
      if (lockState == 0) {
          console.log('re-locking');
          lockState = 1;
          LED.writeSync(0);
          lockRef.set({
            Locked: "1"
          })
      }
  }, 5000);
  } else {
    LED.writeSync(0);
    console.log(lockState, 'DENIED');
  }
});

process.on('SIGINT', function () {
  LED.unexport();
  process.exit();
});
