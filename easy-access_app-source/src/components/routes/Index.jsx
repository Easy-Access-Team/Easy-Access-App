import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../../pages/Welcome";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../../UI/themes";

import Loader from "../Loader/Index";
import useAuth from "../../hooks/useAuth";
import Middleware from "../Middleware/Index";
import useMiddleware from "../../hooks/useMiddleware";
import useAppContext from "../../hooks/useAppContext";



const RouteList = () => {
  const {auth, tema, loader} = useAppContext()
  const { signUp } = useAuth()
  const { authM } = useMiddleware()

  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader message={loader}/>
    <Router>
      <Routes>
        <Route path="/" element={ <Welcome/> }/>
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={<Register/>}/> 
        <Route path="/home" element={<Middleware {...authM} children={<Home/>}/>}/>
        {/*<Route path="/asignaciones" element={<Asignaciones/>}/>
        <Route path="*" element={<Error404/>}/> */}
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList
  