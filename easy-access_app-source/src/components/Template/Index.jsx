import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import Options from "./Options";
import {MainContainer} from "../../UI/index"
import {useState} from "react";

const AppTemplate = ({children}) => {
    const [sidebar, setSidebar] = useState(false);
    const [options, setOptions] = useState(false);
    return <>
        <Topbar handleSidebar={setSidebar} handleOptions={setOptions}/>
        <Options handleOptions={setOptions} show={options}/>
        <Sidebar handleSidebar={setSidebar} show={sidebar}/>
        <MainContainer>
            {children}
        </MainContainer>
    </>
}
export default AppTemplate;