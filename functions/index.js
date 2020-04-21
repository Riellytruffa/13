var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(function.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendNotifications = functions.database.ref('/notifications{notificationId}').onWrite((event) => {

  if ( event.data.previous.val()) {
    return;
  }
if (!event.data.exists()) {
  return;
}

const NOTIFICATION_SNAPSHOT = event.data;
const payload = {
  notification: {
    title: "New Message from ${NOTIFICATION_SNAPSHOT.val().user}",
    body: NOTIFICATION_SNAPSHOT.val().message,
    icons: NOTIFICATION_SNAPSHOT.val().userProfileImg,
    click_action: "http://{function.config().firebase.authDomain}"
  }
};

console.info(payload);

});
