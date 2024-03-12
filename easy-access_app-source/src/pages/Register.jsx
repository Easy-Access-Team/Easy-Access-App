import { SignIUContainer, Header, NavHeader, SignIUCard, SignIUCardLeft, SignIUCardRight, FormFields, SignIUFooter, InputColum, FormResponse } from "../UI";
import Logo from "../components/Logo/Index";
import LogoSlogan from "../components/Logo/LogoSlogan";
import Input from "../components/Form/Input";
import Password from "../components/Form/Password";
import Checkbox from "../components/Form/Checkbox";
import Btn from "../components/Button/Index";
import Icon from "../components/Icon/Index";
import signInUp from "../assets/img/landing/signInUp.webp"
import { Link, Navigate } from "react-router-dom";
import { validateNameApellidos, validateEmail, validatePass, validatePassconf, validateTerms } from "../validations";
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";
import { authErrors } from "../firebase.errors";

const Register = ({ toggleTheme, action, tema, auth, google, facebook, microsoft}) => {
    const name = useInput("text", validateNameApellidos)
    const apellidos = useInput("text", validateNameApellidos)
    const email = useInput("email", validateEmail)
    const pass = useInput("password", validatePass)
    const passconf = useInput("password", validatePassconf)
    const terms = useInput("checkbox", validateTerms)
    const { response, type, showResponseError } = useFormResponse();
    if(auth){
        return <Navigate to="/home"/>
    }
    return <>
        <SignIUContainer>
            <Header>
                <Logo />
                <NavHeader>
                    <Link to="/login">Login</Link>
                    <Icon onClick={toggleTheme} icon={tema ? "light_mode" : "dark_mode"} />
                </NavHeader>
            </Header>
            <SignIUCard>
                <SignIUCardLeft url={signInUp}>
                    <div id="backdrop" className={tema ? "light" : "dark"}>
                        <h2 className="message">¡Bienvenido nuevo usuario!</h2>
                        <Link to="/">
                            <LogoSlogan />
                        </Link>
                        <span className="message">Descubre los beneficios de usar Easy Access, registra tus datos para crear tu cuenta.</span>
                    </div>
                </SignIUCardLeft>
                <SignIUCardRight>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        name.validate(name.value)
                        apellidos.validate(apellidos.value)
                        email.validate(email.value)
                        pass.validate(pass.value)
                        passconf.validate(passconf.value, pass.value)
                        terms.validate(terms.value)
                        if (name.valid && apellidos.valid && email.valid && pass.valid && passconf.valid && terms.valid) {
                            action(name.value, apellidos.value, email.value, pass.value).catch((error)=>{
                                showResponseError(authErrors[error.code]  || authErrors.defaulError)
                            })
                        }
                    }}>
                        <legend><h1>Crear Cuenta</h1></legend>
                        <FormResponse className={type}>{response}</FormResponse>
                        <FormFields>
                            <InputColum>
                                <Input {...name} label="Nombre" id="nombre" placeholder="Escribe tu nombre" />
                                <Input {...apellidos} label="Apellidos" id="apellidos" placeholder="Escribe tus apellidos" />
                            </InputColum>
                            <Input {...email} label="Correo" id="correo" placeholder="Escribe tu correo electronico" />
                            <Password {...pass} label="Contraseña" id="contra" placeholder="Escribe una contraseña" />
                            <Password confirm={pass.value} {...passconf} label="Confirmar Contraseña" id="contraC" placeholder="Confirma la contraseña" />
                            <Checkbox {...terms} id="terms" label="He leído y acepto los términos y condiciones." />
                        </FormFields>
                        <Btn colors="primary" action="Crear Cuenta" />
                        <span>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>.</span>
                       </form>
                    <Btn action="Iniciar sesión con Google" colors="primary" type="icon" icon="login"
                        onClick={() => {
                            google().catch((error) => {
                                showResponseError(authErrors[error.code]  || authErrors.defaulError)
                            })
                        }}
                    />
                    <Btn action="Iniciar sesión con Facebook" colors="primary" type="icon" icon="login"
                        click={()=>{
                            facebook().catch((error)=>{
                                showResponseError(authErrors[error.code] || authErrors.defaulError)
                            })
                        }}
                    />
                    <Btn action="Iniciar sesión con Microsoft" colors="primary" type="icon" icon="login"
                        onClick={() => {
                            microsoft().catch((error) => {
                                showResponseError(authErrors[error.code] || authErrors.defaulError)
                            })
                        }}
                    />
                </SignIUCardRight>
            </SignIUCard>
            <SignIUFooter><h4>Easy-Access. © Derechos Reservados 2023</h4></SignIUFooter>
        </SignIUContainer>
    </>
}

export default Register