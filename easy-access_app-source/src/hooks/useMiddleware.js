const useMiddleware = () => {
    const { auth, user } = useAuth()
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