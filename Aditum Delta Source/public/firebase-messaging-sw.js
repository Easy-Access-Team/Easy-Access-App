importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");
const { VITE_APP_API_KEY, VITE_APP_MSENDER_ID, VITE_APP_ID } = import.meta.env;
const defaultConfig = {
    apiKey: VITE_APP_API_KEY,
    authDomain: "aditum-delta.firebaseapp.com",
    projectId: "aditum-delta",
    storageBucket: "aditum-delta.appspot.com",
    messagingSenderId: VITE_APP_MSENDER_ID,
    appId: VITE_APP_ID
};

firebase.initializeApp(defaultConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
    badge: "https://aditum-delta.firebaseapp.com/assets/badge-4EZ-eLE_.png",
    vibrate: [200, 100, 200, 100, 300]
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("push", (event) => {
  const payload = event.data.json();
  const notification = {...payload.notification, time: payload.data.timestamp, read: false, clicked: false, id: payload.fcmMessageId}
  const request = indexedDB.open('notifications', 1);
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('notifications', { autoIncrement: false });
  };
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction('notifications', 'readwrite');
    const notificationsStore = transaction.objectStore('notifications');
    notificationsStore.add(notification, payload.fcmMessageId)
  };
});