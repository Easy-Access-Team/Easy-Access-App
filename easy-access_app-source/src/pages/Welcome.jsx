import { Link, useNavigate } from "react-router-dom";
import { Banner, Container, Header, NavHeader, SectionBg } from "../UI"
import Logo from "../components/Logo/Index"
import LogoSlogan from "../components/Logo/LogoSlogan"
import styled, { useTheme } from "styled-components";
import banner from "../assets/img/landing/places-cover-min.webp"
import qrScan from "../assets/img/landing/qrscan-anim-min.webp"
import { clients } from "../datoswelcome";

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
const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    & li.clientes{
        flex: 0 1 270px;
        border: 1px solid ${({theme}) => theme.outline};
        border-radius: 1rem;
        transition: all 300ms ease;
        background: ${({theme}) => theme.surfacev};
        color: ${({theme}) => theme.onsecondarycont};
        & .head{
            height: 10rem;
            position: relative;
            & img.cover{
                border-radius: 1rem 1rem 0 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            & img.icon{
                width: 4rem;
                position: absolute;
                bottom: -1rem;
                right: -1rem;
                background: white;
                border-radius: 100%;
            }
        }
        & div.text{
            padding: 1rem;
            gap: .5rem;
        }

        &:hover{
            background: ${({theme}) => theme.secondarycont};
            transform: translateY(-.5rem);
        }
    }
`;
const Welcome = ({tema, toggleTheme}) => {
    const colors = useTheme()
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
            <SectionBg bg={colors.secondary} txt={colors.onsecondary}>
                <section className="center">
                    <div className="flex-column description">
                        <h1>Diferentes casos, una solución.</h1>
                        <p>Nos ajustamos a las necesidades de cada cliente, no necesitas pagar por un sistema caro y complejo, nosotros tenemos la solucion definitiva. Administra usuarios, puntos de acceso, encargados para tu instalación y muchos beneficios más.</p>
                    </div>
                </section>
                <List>
                    {clients.map(client => 
                        <li className="clientes" key={client.id}>
                            <div className="head">
                                <img className="cover" src={client.cover} alt="" />
                                <img className="icon" src={client.icon} alt="" />
                            </div>
                            <div className="text flex-column">
                                <h3><b>{client.titulo}</b></h3>
                                <span>{client.descripcion}</span>
                            </div>
                        </li>
                    )}
                </List>
                <section className="center">
                    <div className="description">
                        <h3>Y muchos otros lugares.</h3>
                    </div>
                </section>
            </SectionBg>
        </PageContainer>
    </>
}
export default Welcome