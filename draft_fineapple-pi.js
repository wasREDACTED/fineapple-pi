var admin = require('firebase-admin');
var serviceAccount = require('./cred/i-entry-firebase-adminsdk-bpur2-5feda99169.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://i-entry.firebaseio.com'
});
var message = {text: 'testing pi-firebase', timestamp: new Date().toString()};
var ref = admin.database().ref().child('nodeclient');
var lockRef = admin.database().ref().child('lockStatus');
var logsRef = ref.child('messages');
var messagesRef = ref.child('logs');
var messageRef = messagesRef.push(message);
var lockValue = ""
logsRef.child(messageRef.key).set(message);

logsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
  console.log('added', snap.val());
});
logsRef.on('child_removed', function(snap) {
  console.log('removed', snap.val());
});
ref.child('logs').on('child_changed', function(snap) {
  console.log('changed', snap.val());
});
ref.child('logs').on('value', function(snap) {
  console.log('value', snap.val());
});

lockRef.on('value', snap => lockValue = JSON.stringify(snap.val()));

const http = require('http');

const hostname = '192.168.20.59';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Door is ${lockValue}`);
});

var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var blinkInterval = setInterval(blinkLED, 450);

function blinkLED() {
	if ((LED.readSync() === 0) || (lockValue === 'unlocked')) {
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

setTimeout(endBlink, 5000);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});