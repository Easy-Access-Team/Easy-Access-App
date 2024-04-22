import useAppContext from "../../hooks/app/useAppContext"
import styled from "styled-components"
import Inscriptions from "../../features/User/Inscriptions";
import { PageTitle } from "../../styled";
import Btn from "../../components/UI/Button/Index";
const UserWelcome = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    margin-bottom: .5rem;
    flex-wrap: wrap;
    & img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
    & h2{
        text-align: center;
        font-weight: 300;
    }
`;
const Home = () => {
    const {user, appToast} = useAppContext()
    return <>
        <UserWelcome>
            <img src={user.photoURL} alt="profile" referrerPolicy="no-referrer" />
            <h2><b>Bienvenido, </b>{user.displayName || "Usuario"}</h2>
        </UserWelcome>
        <PageTitle>Instalaciones</PageTitle>
        <Btn onClick={()=>{
            fetch("https://us-central1-aditum-delta.cloudfunctions.net/app/send", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid: user.uid })
            }).then(async(response) => {
                const data = await response.json()
                if (response.status !== 200) {
                    appToast.error('Error al enviar una notificacion.', JSON.stringify(data));
                }
            }).catch(error => {
                console.error('Error de red:', error);
            })
        }} action="Send Notification"/>
        <Inscriptions/>
    </>
}
export default Home;