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

import AdminContainer from "../Middleware/AdminContainer"
import InstalationContainer from "../Middleware/InstalationContainer";
import Panel from "../../pages/app/admin/Panel";
import Instalation from "../../pages/app/admin/instalation/Dashboard";
import InstalationUsers from "../../pages/app/admin/instalation/InstalationUsers";

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
		<Route path="user/" element={<Outlet/>}>
	        	<Route path="inscription/:id/" element={<Inscription/>}/>
        	</Route>
		<Route path="admin/" element={<AdminContainer/>}>
	        	<Route path="panel" element={<Panel />}/>
		      	<Route path="instalation/:id/" element={<InstalationContainer/>}>
				<Route path="dashboard" element={<Instalation/>} />
	            		<Route path="users" element={<InstalationUsers/>} />
				<Route path="records" element={<Records/>} />
			</Route>
	        </Route>
        </Route>
	<Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList
  
