importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");
const defaultConfig = {
    apiKey: "AIzaSyCCFxEM-hIG7Bl4TBsXl1oWbbF9ays4uBI",
    authDomain: "aditum-delta.firebaseapp.com",
    projectId: "aditum-delta",
    storageBucket: "aditum-delta.appspot.com",
    messagingSenderId: "908407543331",
    appId: "1:908407543331:web:d0dc94822583e6f3ff8396"
};

firebase.initializeApp(defaultConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("push", (event) => {
  const payload = event.data.json();
  const notification = {...payload.notification, time: payload.data["google.c.a.ts"]}
  const request = indexedDB.open('notifications_db', 1);
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('notifications', { autoIncrement: true });
  };
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction('notifications', 'readwrite');
    const notificationsStore = transaction.objectStore('notifications');
    notificationsStore.add(notification);
  };
});