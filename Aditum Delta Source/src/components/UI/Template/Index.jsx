import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import Options from "./Options";
import {MainContainer} from "../../../styled/index"
import useDialog from "../../../hooks/useDialog";
import {Outlet} from "react-router-dom"
const AppTemplate = () => {
    const sidebar = useDialog()
    const options = useDialog()
    return <>
        <Topbar handleOptions={options.trigger} handleSidebar={sidebar.trigger}/>
        <Options controls={options} />
        <Sidebar controls={sidebar} />
        <MainContainer>
            <Outlet/>
        </MainContainer>
    </>
}
export default AppTemplate;