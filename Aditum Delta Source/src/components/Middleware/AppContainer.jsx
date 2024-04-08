import useAppContext from "../../hooks/app/useAppContext"
import AppTemplate from "../UI/Template/Index"
import Middleware from "./Index"

const AppContainer = () => {
    const {auth, user} = useAppContext()
    return <Middleware redirect="/auth/login" validacion={(auth === false || user === null)}>
        <AppTemplate />
    </Middleware>
}
export default AppContainer