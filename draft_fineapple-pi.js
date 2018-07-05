var admin = require('firebase-admin');
var serviceAccount = require('./cred/i-entry-firebase-adminsdk-bpur2-5feda99169.json');
var Gpio = require('onoff').Gpio;

//firebase initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://i-entry.firebaseio.com'
});


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


//RaspPi GPIO control section
var LED = new Gpio(4, 'out');
var blinkInterval = setInterval(blinkLED, 250);

function blinkLED() {
	if (LED.readSync() === 0) {
		LED.writeSync(1);
	} else {
		LED.writeSync(0);
	}
}

function endBlink() {
	clearInterval(blinkInterval);
	LED.writeSync(0);
	LED.unexport();
}

setTimeout(endBlink, 25000);

//var message = {text: 'testing pi-firebase', timestamp: new Date().toString()};
var ref = admin.database().ref().child('nodeclient');
var lockRef = admin.database().ref().child('lockStatus');
var logsRef = ref.child('messages');
var messagesRef = ref.child('logs');
var messageRef = messagesRef.push(message);
var lockValue = ""