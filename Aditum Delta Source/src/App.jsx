import GlobalStyle from "./GlobalStyles";
import RouteList from "./components/Routes/Index.jsx"
import { AppProvider } from "./context.jsx";


function App() {
  return <AppProvider>
    <GlobalStyle />
    <RouteList />
  </AppProvider>
}

export default App
