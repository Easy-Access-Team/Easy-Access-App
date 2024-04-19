const { VITE_APP_VAPID_KEY } = import.meta.env;
export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js').then(async (registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      return registration.pushManager.getSubscription().then(async (subscription) => {
        if (subscription) {
          return subscription;
        }
      }).catch(()=> registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VITE_APP_VAPID_KEY,
      }));
    }).catch((error) => {
      console.error('Error registering service worker:', error);
    });
  }
};