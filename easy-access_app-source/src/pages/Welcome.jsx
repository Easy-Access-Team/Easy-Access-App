import { Link, useNavigate } from "react-router-dom";
import { Banner, Container, Header, NavHeader } from "../UI"
import Logo from "../components/Logo/Index"
import LogoSlogan from "../components/Logo/LogoSlogan"
import styled from "styled-components";
import banner from "../assets/img/landing/places-cover-min.png"
import qrScan from "../assets/img/landing/qrscan-anim-min.png"

const PageContainer = styled(Container)`
    & .center{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column-reverse;
        padding: 2.5rem 0;
    }
    & .flex-column{
        display: flex;
        flex-direction: column;
    }
    & .description{
        width: 60%;
        text-align: center;
        gap: .5rem;
    }
    @media screen and (min-width: 0px) and (max-width: 480px) {
        & .center{ padding: 1rem; flex-direction: column; }
        & .description{ width: 100%; }
    }
`;
const Welcome = ({tema, toggleTheme}) => {
    const navigate = useNavigate()
    
    return <>
        <Header>
            <Logo/>
            <NavHeader>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/home">Home</Link>
            </NavHeader>
        </Header>
        <PageContainer>
            <Banner className={tema ? "light" : "dark"} url={banner}>
                <div className="info">
                    <div className="text flex-column">
                        <h1><b>Accede a tus lugares importantes con solo mostrar un código QR</b></h1>
                        <h3>¡Se acabaron las demoras! no más listas, no más registros. Con Easy Access el acceso es facil y seguro.</h3>
                        <div>
                            <button onClick={() => {navigate("/register")}}>Comenzar</button>
                        </div>
                    </div>
                    <div className="img">
                        <img src={qrScan} alt="qr code" />
                    </div>
                </div>
            </Banner>
            <section className="center">
                <div className="flex-column description">
                    <h1>Administra tus accesos con nosotros.</h1>
                    <p>Easy Access es un sistema de gestión y control de acceso mediante el registro de codigo QR. Desarrollado por estudiantes de la UT Riviera Maya para facilitar el acceso a diversas instalaciones, manteniento la seguridad y brindando herramientas para saber quien entra y sale en todo momento.</p>
                </div>
                <LogoSlogan/>
            </section>
        </PageContainer>
    </>
}
export default Welcome