import useAppContext from "./useAppContext"

const useMiddleware = () => {
    const { auth, user } = useAppContext()
    const loginM = {
        redirect: "/home",
        validacion: auth
    }
    const authM = {
        redirect: "/login",
        validacion: (auth === false || user === null),
    }
    return {
        loginM,
        authM
    }
}
export default useMiddleware