import { SignIUContainer, Header, NavHeader, SignIUCard, SignIUCardLeft, SignIUCardRight, FormFields, SignIUFooter, InputColum, FormResponse } from "../UI";
import Logo from "../components/Logo/Index";
import LogoSlogan from "../components/Logo/LogoSlogan";
import Input from "../components/Form/Input";
import InputPass from "../components/Form/InputPass";
import InputCheck from "../components/Form/InputCheck";
import Btn from "../components/Button/Index";
import Icon from "../components/Icon/Index";
import signInUp from "../assets/img/landing/signInUp.webp"
import { Link } from "react-router-dom";
import { validateNameApellidos, validateEmail, validatePass, validatePassconf, validateTerms } from "../validations";
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";

const Register = () => {
    const name = useInput("text", validateNameApellidos)
    const apellidos = useInput("text", validateNameApellidos)
    const email = useInput("email", validateEmail)
    const pass = useInput("password", validatePass)
    const passconf = useInput("password", validatePassconf)
    const terms = useInput("checkbox", validateTerms)
    const { response, type, showResponseError } = useFormResponse();
    return <></>
}

export default Register