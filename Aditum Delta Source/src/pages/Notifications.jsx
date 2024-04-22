import { PageTitle } from "../styled";
import useAppContext from "../hooks/app/useAppContext";
import styled from "styled-components";
import Btn from "../components/UI/Button/Index";
import { useEffect } from "react";
const ContainerNotifications = styled.ul`
    max-width: 600px;
    margin: 0 auto;
    & section{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;
    }
    & h2{
        text-align: center;
        padding: 1rem;
        background: ${({theme})=> theme.outline};
        color: ${({theme})=> theme.surfacev};
        border-radius: .25rem;
    }
    & li{
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        background: ${({theme})=> theme.primarycont};
        border-radius: .5rem;
        margin-bottom: .5rem;
        cursor: pointer;
        & img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        & div{
            flex-grow: 1;
            & h3{
                font-weight: 300;
            }
            & p{
                margin-bottom: .5rem;
            }
        }
        &.clicked{
            background: ${({theme})=> theme.surfacev};
        }
    }
`;
const Notifications = () => {
    const {notifications, unread, handleNotifications} = useAppContext()
    const markClicked = (id) => {
        const request = indexedDB.open('notifications', 1);
        request.onerror = (event) => {
            console.error('Error al abrir la base de datos', event.target.error);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('notifications', { autoIncrement: false });
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('notifications', 'readwrite');
            const notificationsStore = transaction.objectStore('notifications');
            const getRequest = notificationsStore.get(id);
            getRequest.onsuccess = (event) => {
                const notification = event.target.result;
                if (notification) {
                    notification.clicked = true;
                    const updateRequest = notificationsStore.put(notification, id);
                    updateRequest.onsuccess = () => {
                        handleNotifications()
                    };
                    updateRequest.onerror = (event) => {
                        console.error('Error al marcar la notificación como leída:', event.target.error);
                    };
                }
            }
            getRequest.onerror = (event) => {
                console.error('Error al obtener la notificación:', event.target.error);
            };
        };
    }
    const readNotifications = () => {
        const request = indexedDB.open('notifications', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('notifications', 'readwrite');
            const objectStore = transaction.objectStore('notifications');
            const getRequest = objectStore.getAll();
            getRequest.onsuccess = (event) => {
                const notifications = event.target.result
                notifications.forEach(notification => {
                    if(!notification.read){
                        notification.read = true;
                        const updateRequest = objectStore.put(notification, notification.id);
                        updateRequest.onerror = (event) => {
                            console.error('Error al marcar la notificación como leída:', event.target.error);
                        };
                    }
                })
                handleNotifications()
            };
            getRequest.onerror = (event) => {
                console.error('Error al leer las notificaciones:', event.target.error);
            };
        };
    }
    const clearAll = () =>{
        const request = indexedDB.open('notifications', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('notifications', 'readwrite');
            const objectStore = transaction.objectStore('notifications');
            const clearRequest = objectStore.clear();
            clearRequest.onsuccess = () => {
                handleNotifications()
            };
            clearRequest.onerror = (event) => {
                console.error('Error al limpiar las notificaciones:', event.target.error);
            };
        };
    }
    useEffect(()=>{
        if(unread > 0){
            readNotifications()
        }
    },[])
    return <>
        <PageTitle>Notificaciones</PageTitle>
        <ContainerNotifications>
            <section>
                <span><b>{unread}</b> {(unread > 1 || unread === 0) ? "notificaciones" : "notificación" }  sin leer</span> 
                <Btn onClick={clearAll} icon="delete" colors="primary cont" type="only-icon" />
            </section>
            {notifications && notifications?.map((notification) => (
                <li className={notification.clicked ? "clicked" : ""} key={notification.id}
                    onClick={()=>{
                        markClicked(notification.id)
                    }}
                >
                    <img src={notification.image} alt="notification" />
                    <div>
                        <h3>{notification.title}</h3>
                        <p>{notification.body}</p>
                        <small>{new Date(notification.time).toLocaleDateString('es-MX')} - <b>{new Date(notification.time).toLocaleTimeString('en-US')}</b></small>
                    </div>
                </li>
            ))}
            {notifications?.length === 0 && <h2>Sin Notificaciones</h2>}
        </ContainerNotifications>
    </>
}
export default Notifications;