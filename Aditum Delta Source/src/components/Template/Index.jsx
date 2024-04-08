import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import Options from "./Options";
import {MainContainer} from "../../UI/index"
import useDialog from "../../hooks/useDialog";
const AppTemplate = ({children}) => {
    const sidebar = useDialog()
    const options = useDialog()
    return <>
        <Topbar handleOptions={options.trigger} handleSidebar={sidebar.trigger}/>
        <Options controls={options} />
        <Sidebar controls={sidebar} />
        <MainContainer>
            {children}
        </MainContainer>
    </>
}
export default AppTemplate;