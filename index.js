// WIP feeling around in the dark here.


var firebase = require("firebase"); // I need this for firebase, right?

<script type='text/javascript' src='config.js></script> //Adds secrets, maybe?

<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: config.MY_apiKey,
    authDomain: config.MY_authDomain,
    databaseURL: config.MY_databaseURL,
    projectId: config.MY_projectId,
    storageBucket: config.MY_storageBucket,
    messagingSenderId: config.MY_storageBucket
  };
  firebase.initializeApp(config);
</script>


