import {createContext, useLayoutEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, messaging} from "../firebase/firebase";
import { onMessage } from "firebase/messaging";
const handleNotifications = (setNotifications, newNotification) => {
    const request = indexedDB.open('notifications_db', 1);
    request.onerror = (event) => {
        console.error('Error al abrir la base de datos', event.target.error);
    };
    request.addEventListener("success", (event) =>{
        const db = event.target.result;
        const transaction = db.transaction('notifications', 'readwrite');
        const notificationsStore = transaction.objectStore('notifications');
        if(newNotification){
            notificationsStore.add(newNotification);
        }
        const getRequest = notificationsStore.getAll();
        getRequest.onsuccess = (event) => {
            setNotifications(event.target.result);
        };
    })
}
export const AppContext = createContext()
export const AppProvider = ({children}) => {
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", true.toString())
    }
    const [user,setUser] = useState(null)
    const [auth, setAuth] = useState(false)
    const [loader, setLoader] = useState("")
    const [tema, setTema] = useState(localStorage.getItem("theme") === "true")
    const [alerts, setAlerts] = useState([]);
    const [toastTimer, setToastTimer] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const createToast = (newAlert) => {
        setAlerts([...alerts, newAlert]);
        if(toastTimer) {
            clearTimeout(toastTimer);
        }
        const newToastTimer = setTimeout(() => {
            setAlerts([]);
            setToastTimer(null);
        }, 3500);
        setToastTimer(newToastTimer);
    };
    const appToast = {
        info: (title, message, image) =>{
            createToast({variant: "info",title, message, image})
        },
        success: (title, message) =>{
            createToast({variant: "success",title, message})
        },
        warning: (title, message) =>{
            createToast({variant: "warning",title, message})
        },
        error: (title, message) =>{
            createToast({variant: "error",title, message})
        }
    }
    const appLoader = {
        basic: () => {setLoader("Cargando")},
        login: () => {setLoader("Iniciando Sesión")},
        register: () => {setLoader("Creando Cuenta")},
        custom: (message) => {setLoader(message)},
        clearLoader: () => {setLoader("")}
    }
    const toggleTheme = () => {
        localStorage.theme = `${!tema}`
        setTema(!tema)
    }
    const loadNotifications = () => {
        handleNotifications(setNotifications)
    }
    useLayoutEffect(()=>{
        const unsubscribe = onAuthStateChanged(firebaseAuth, async(currentUser) => {
            setUser(currentUser)
            if(currentUser === null){
                localStorage.setItem("uid","")
                setAuth(false)
            }else{
                localStorage.setItem("uid", currentUser.uid)
                setAuth(true)
            }
        });
        return () => unsubscribe();
    },[user])

    onMessage(messaging, (payload) => {
        appToast.info(payload.notification.title, payload.notification.body, payload.notification.image);
        const notification = {...payload.notification, time: payload.data["google.c.a.ts"]}
        handleNotifications(setNotifications, notification)
    });
    const values = {
        auth,
        user,
        loader,
        tema,
        alerts,
        notifications,
        appToast,
        appLoader,
        toggleTheme,
        loadNotifications
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}
