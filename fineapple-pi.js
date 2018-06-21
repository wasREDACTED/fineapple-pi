var admin = require('firebase-admin');

var serviceAccount = require('/home/pi/cred/i-entry-firebase-adminsdk-bpur2-5feda99169.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://i-entry.firebaseio.com'
});

const http = require('http');

const hostname = '10.15.41.75';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

var ref = admin.app().database().ref();
ref.once('value')
 .then(function (snap) {
 console.log('snap.val()', snap.val());
 });

server.listen(port, hostname, () => {
  console.log('Server running at http://${hostname}:${port}/');
});