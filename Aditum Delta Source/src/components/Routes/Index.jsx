import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../../pages/Welcome";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Home from "../../pages/app/Home";

import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../../styled/themes";

import Loader from "../UI/Loader/Index";
import useAppContext from "../../hooks/app/useAppContext";
import NotFound from "../../pages/NotFound";
import AccountVerifyReset from "../../pages/AccountVerifyReset";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import AuthContainer from "../Middleware/AuthContainer";
import AppContainer from "../Middleware/AppContainer";



const RouteList = () => {
  const { tema, loader} = useAppContext()

  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader message={loader}/>
    <Router>
      <Routes>
        <Route path="/welcome" element={ <Welcome/> }/>
        <Route path="/auth/" element={<AuthContainer/>}>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>}/>
          <Route path="forgot-password" element={ <ForgotPassword/> }/>
        </Route>
        <Route path="/account-verify-reset" element={<AccountVerifyReset/>}/>
        <Route path="/" element={<AppContainer />}>
          <Route path="home" element={<Home/>}/>
          {/*<Route path="/asignaciones" element={<Asignaciones/>}/>*/}
        </Route>
        <Route path="*" element={<NotFound/>}/> 
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList
  