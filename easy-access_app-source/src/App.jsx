import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../../UI/themes";
import RouteList from "./components/Routes/Index.jsx"




function App() {

  return (
    <ThemeProvider>
    <RouteList />
    </ThemeProvider>
  )
}

export default App
