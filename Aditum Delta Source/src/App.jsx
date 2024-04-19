import GlobalStyle from "./styled/GlobalStyles.jsx";
import RouteList from "./components/Routes/Index.jsx"
import { AppProvider } from "./contexts/context.jsx";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebase.js";
import { useEffect } from "react";

document.addEventListener("visibilitychange", ()=> {
  const path = window.location.pathname
  if(document.visibilityState === "hidden"){
    if(path !== "/auth/login" && path !== "/auth/register"){
      localStorage.setItem("previous", path)
    }
  }
})

function App() {
  const { VITE_APP_VAPID_KEY } = import.meta.env;
  const requestPermission = async() => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      alert("Bloquear las notificaciones no te permitira enterarte de novedades importantes.");
    }
  }
  useEffect(() => {
    requestPermission();
  },[]);
  return <AppProvider>
    <GlobalStyle />
    <RouteList />
  </AppProvider>
}

export default App
