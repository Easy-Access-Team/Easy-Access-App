import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "./UI/themes.js";
import RouteList from "./components/Routes/Index.jsx"


function App() {
  const [tema, setTema] = useState(localStorage.getItem("theme") === "true")

  const toggleTheme = () => {
    localStorage.theme = ${ !tema }
    setTema(!tema)
  }
  return (
    <ThemeProvider theme={tema ? lightTheme : darkTheme}>
      <RouteList toggleTheme={toggleTheme} />
    </ThemeProvider>

  )
}

export default App
