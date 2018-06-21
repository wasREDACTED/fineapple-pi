var admin = require('firebase-admin');
var serviceAccount = require('/home/pi/cred/i-entry-firebase-adminsdk-bpur2-5feda99169.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://i-entry.firebaseio.com'
});
var message = {text: 'testing pi-firebase', timestamp: new Date().toString()};
var ref = firebase.database().ref().child('nodeclient');
var logsRef = ref.child('messages');
var messagesRef = ref.child('logs');
var messageRef = messagesRef.push(message);

logsRef.child(messageRef.key).set(message);

logsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
    console.log('added', snap.val());
});
logsRef.on()

const http = require('http');

const hostname = '10.15.41.75';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var ref = admin.app().database().ref();
ref.once(`test`)
 .then(function (snap) {
 console.log(`snap.val()`, snap.val());
 });