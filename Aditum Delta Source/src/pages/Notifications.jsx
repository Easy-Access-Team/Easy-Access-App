import { PageTitle } from "../styled";
import useAppContext from "../hooks/app/useAppContext";
import { useEffect } from "react";
import styled from "styled-components";
const ContainerNotifications = styled.ul`
    max-width: 600px;
    margin: 0 auto;
    & li{
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        background: ${({theme})=> theme.surfacev};
        border-radius: .5rem;
        margin-bottom: .5rem;
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
    }
`;
const Notifications = () => {
    const {notifications, loadNotifications} = useAppContext()
    useEffect(()=>{
        loadNotifications()

    },[])
    return <>
        <PageTitle>Notificaciones</PageTitle>
        <ContainerNotifications>
            {notifications && notifications?.map((notification, index) => (
                <li key={index + notification.title}>
                    <img src={notification.image} alt="notification" />
                    <div>
                        <h3>{notification.title}</h3>
                        <p>{notification.body}</p>
                        <small><b>{new Date(notification.time * 1000).toLocaleTimeString('en-US')}</b></small>
                    </div>
                </li>
            ))}
            {notifications?.length === 0 && <h2>Sin Notificaciones</h2>}
        </ContainerNotifications>
    </>
}
export default Notifications;