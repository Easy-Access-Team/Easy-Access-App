import {createContext, useEffect, useLayoutEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, messaging} from "../firebase/firebase";
import { onMessage } from "firebase/messaging";
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
    const [unread, setUnread] = useState(0)
    //Alerts
    const createToast = (newAlert) => {
        setAlerts([...alerts, newAlert]);
        if(toastTimer) {
            clearTimeout(toastTimer);
        }
        const newToastTimer = setTimeout(() => {
            setAlerts([]);
            setToastTimer(null);
        }, 4000);
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
    //Loader
    const appLoader = {
        basic: () => {setLoader("Cargando")},
        login: () => {setLoader("Iniciando Sesión")},
        register: () => {setLoader("Creando Cuenta")},
        custom: (message) => {setLoader(message)},
        clearLoader: () => {setLoader("")}
    }
    //Theme
    const toggleTheme = () => {
        localStorage.theme = `${!tema}`
        setTema(!tema)
    }
    //Auth User
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
    //Push notifications
    const handleNotifications = () => {
        const request = indexedDB.open('notifications', 1);
        request.onerror = (event) => {
            console.error('Error al abrir la base de datos', event.target.error);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('notifications', { autoIncrement: true });
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('notifications', 'readonly');
            const notificationsStore = transaction.objectStore('notifications');
            const getRequest = notificationsStore.getAll();
            getRequest.onsuccess = (event) => {
                setNotifications(event.target.result);
                const unreadNotifications = event.target.result.filter(notification => !notification.read);
                setUnread(unreadNotifications.length)
            };
        };
    }
    useEffect(() => {
        handleNotifications();
    }, []);
    onMessage(messaging, (payload) => {
        appToast.info(payload.notification.title, payload.notification.body, payload.notification.image);
        handleNotifications()
    });
    const values = {
        auth,
        user,
        loader,
        tema,
        alerts,
        notifications,
        unread,
        appToast,
        appLoader,
        toggleTheme, 
        handleNotifications
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}
