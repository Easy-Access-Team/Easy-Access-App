import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Middleware = ({validacion, children, redirect, message}) => {
    useEffect(() => {
        if(validacion && message) {
            alert(message)
        }
    }, [validacion, message]);
    if(validacion) {
        return <Navigate to={redirect}></Navigate>;
    }
    return <>{children}</>
}
export default Middleware;
