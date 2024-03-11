import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../../pages/Welcome";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../../UI/themes";

import { useState } from "react";
import Loader from "../Loader/Index";
import useAuth from "../../hooks/useAuth";


const RouteList = () => {
  const [loader, setLoader] = useState("");
  const { login, signUp, loginWithGoogle, loginWithFacebook, user, auth } = useAuth(setLoader)
  const [tema, setTema] = useState(true)
  const toggleTheme = () => {
    localStorage.theme = `${ !tema }`
    setTema(!tema)
  }
  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader message={loader}/>
    {user && user.email}
    <Router>
      <Routes>
        <Route path="/" element={ <Welcome toggleTheme={toggleTheme} tema={tema} /> }/>
        <Route path="/login" element={ <Login action={login} auth={auth} toggleTheme={toggleTheme} google={loginWithGoogle} facebook={loginWithFacebook} tema={tema}/> } />
        <Route path="/register" element={<Register action={signUp} google={loginWithGoogle} toggleTheme={toggleTheme} tema={tema} auth={auth}/>}/> 
        {/* <Route path="/home" element={<Home/> } />
        <Route path="/asignaciones" element={<Asignaciones/>}/>
        <Route path="*" element={<Error404/>}/> */}
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList
  