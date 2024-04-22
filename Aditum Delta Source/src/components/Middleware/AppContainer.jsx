import { Navigate, useLocation } from "react-router-dom"
import useAppContext from "../../hooks/app/useAppContext"
import AppTemplate from "../UI/Template/Index"
import Middleware from "./Index"

import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase/firebase";
import { useEffect } from "react"

const AppContainer = () => {
  const {auth, user, appToast} = useAppContext()
  const location = useLocation()
  if(location.pathname === "/"){
    return <Navigate to="/home" />
  }
  const { VITE_APP_VAPID_KEY } = import.meta.env;
  const requestPermission = async() => {
    const permission = await Notification.requestPermission();
    if (permission === "granted" && auth) {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });
      fetch("https://us-central1-aditum-delta.cloudfunctions.net/app/saveToken", {method: 'PUT', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ uid: localStorage.getItem("uid"), token: token })
      }).then(response => {
        if (response.status === 200) {
          const res = response.json()
          if(res.registered){
            appToast.info(res.message, "Recibiras notificaciones en este dispositivo.");
          }
        } else {
          appToast.error('Error al enviar el token al servidor.', "Algo salio mal");
        }
      }).catch(error => {
        console.error('Error de red:', error);
      })
    } else if (permission === "denied") {
      alert("Bloquear las notificaciones no te permitira enterarte de novedades importantes.");
    }
  }
  useEffect(() => {
    requestPermission();
  },[]);
  return <Middleware redirect="/auth/login" validacion={(auth === false || user === null)}>
    <AppTemplate />
  </Middleware>
}
export default AppContainer