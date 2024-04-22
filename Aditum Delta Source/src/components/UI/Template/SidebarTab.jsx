import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon/Index";
import useAppContext from "../../../hooks/app/useAppContext";

const NavTab = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({theme}) => theme.primary};
    text-decoration: none;
    border-radius: .5rem;
    padding-left: 0;
    padding-right: .125rem;
    transition: all 300ms ease-in;
    cursor: pointer;
    position: relative;
    &:hover, &:focus{
        background: ${({theme}) => theme.primarycont};
        padding-left: .5rem;
        outline: 2px solid ${({theme}) => theme.primary};
    }
    &.active{
        padding-left: .5rem;
        background: ${({theme}) => theme.onprimarycont};
        color: ${({theme}) => theme.primarycont};
    }
    & small{
        position: absolute;
        top: -.5rem;
        right: -.5rem;
        border-radius: 50%;
        width: 1.30rem;
        height: 1.30rem;
        font-size: .6rem;
        display: grid;
        place-items: center;
        background: ${({theme}) => theme.error};
        color: ${({theme}) => theme.onerror};
    }
`;
const SidebarTab = ({link, handleSidebar, title, icon}) => {
    const {unread} = useAppContext()
    return <NavTab to={link} onClick={()=>{handleSidebar()}} > 
        {title}
        <Icon icon={icon} />
        {(unread > 0 && link === "/notifications") && <small>{unread}</small>}
    </NavTab>
}
export default SidebarTab