import AppTemplate from "../components/Template/Index";
import useAppContext from "../hooks/useAppContext"

const Home = () => {
    const {user} = useAppContext()
    return <AppTemplate>
        <h1> Bienvenido, {user.displayName || "Usuario"}.</h1>
    </AppTemplate>
}

export default Home;