import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../../pages/Welcome";

import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../../UI/themes";

import { useState } from "react";

const RouteList = () => {
  const [tema, setTema] = useState(true)
  const toggleTheme = () => {
    localStorage.theme = `${ !tema }`
    setTema(!tema)
  }
  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Router>
      <Routes>
      <Route path="/" element={ <Welcome toggleTheme={toggleTheme} tema={tema} /> }/>
        {/* <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={<Register/>}/> 
        <Route path="/home" element={<Home/> } />
        <Route path="/asignaciones" element={<Asignaciones/>}/>
        <Route path="*" element={<Error404/>}/> */}
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList
  