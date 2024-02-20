import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const RouteList = () => {
  
    return <>
      <Router>
        <Routes>
          <Route path="/" element={ <Welcome/> }/>
          <Route path="/login" element={ <Login/> } />
          <Route path="/register" element={<Register/>}/> 
          <Route path="/home" element={<Home/> } />
          <Route path="/asignaciones" element={<Asignaciones/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </Router>
    </>
  }
  export default RouteList
  