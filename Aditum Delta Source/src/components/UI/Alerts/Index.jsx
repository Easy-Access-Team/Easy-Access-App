import styled from "styled-components"
import useAppContext from "../../../hooks/app/useAppContext";

const AlertsContainer = styled.ul`
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: min-content;
    max-width: 480px;
    margin-inline: auto;
    transition: 200ms ease-in;
    @media screen and (min-width: 0px) and (max-width: 480px) {
        width: 80%;
    }
    & li{
        width: 100%;
        box-sizing: border-box;
        padding: .5rem 1rem;
        border-radius: .25rem;
        align-items: center;
        gap: .25rem;
        margin: .25rem 0;
        justify-content: space-between;
        animation: show .5s ease-in-out, hide .5s ease-in-out 3s forwards;
        @keyframes show {
            from {
                display: none;
                opacity: .1;
                transform: translateY(-100%);
            }
            to{
                display: flex;
                opacity: 1;
                transform: translateY(0%);
            }
        }
        @keyframes hide {
            from {
                display: flex;
                opacity: 1;
                transform: translateY(0%);
            }
            to{
                display: none;
                opacity: .1;
                transform: translateY(-100%);
            }
        }
        @media screen and (min-width: 0px) and (max-width: 480px) {
            padding: .5rem;
            margin: .25rem auto;
        }
        & .content{
            display: flex;
            gap: .25rem;
            align-items: center;
            & hr{
                height: 35px;
                border-width: 0;
                border-left: 2px solid currentColor;
                margin: 0;
            }
            & i {font-size: 2rem;}
            & div{
                display: flex;
                flex-direction: column;
                gap: .25rem;
            }
            & img{
                width: 35px;
                height: 35px;
            }
        }
        &.info{
            background: ${({theme}) => theme.primary};
            color: ${({theme}) => theme.onprimary};
        }
        &.success{
            background: ${({theme}) => theme.ok};
            color: ${({theme}) => theme.onok};
        }
        &.warning{
            background: ${({theme}) => theme.alert};
            color: ${({theme}) => theme.alertcont};
        }
        &.error{
            background: ${({theme}) => theme.error};
            color: ${({theme}) => theme.onerror};
        }
    }
`;
const Alerts = () => {
    const {alerts} = useAppContext()
    const variants = {
        info: "info",
        success: "check",
        warning: "warning",
        error: "report"
    }
    return <AlertsContainer>
        {alerts && alerts?.map((alert, i) => 
            <li key={i} className={alert.variant}>
                <div className="content">
                    <i className="material-icons">{variants[alert.variant]}</i>
                    <hr />
                    {alert.image && <img src={alert.image} alt="notification image" />}
                    <div>
                        <b>{alert.title}</b>
                        <small>{alert.message}</small>
                    </div>
                </div>
            </li>
        )}
    </AlertsContainer>
}
export default Alerts