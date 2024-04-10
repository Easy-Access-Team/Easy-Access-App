import GlobalStyle from "./styled/GlobalStyles.jsx";
import RouteList from "./components/Routes/Index.jsx"
import { AppProvider } from "./contexts/context.jsx";
document.addEventListener("visibilitychange", ()=> {
  const path = window.location.pathname
  if(document.visibilityState === "hidden"){
    if(path !== "/auth/login" && path !== "/auth/register"){
      localStorage.setItem("previous", path)
    }
  }
})
function App() {
  return <AppProvider>
    <GlobalStyle />
    <RouteList />
  </AppProvider>
}

export default App
