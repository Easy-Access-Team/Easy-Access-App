import styled from "styled-components";

import { Header } from "../../UI";
import Logo from "../Logo/Index";

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media screen and (min-width: 0px) and (max-width: 480px) {
        &{
            gap: .5rem;
        }
    }
`;

const Topbar = () => {
    return <Header>
        <Info>
            <Logo />
        </Info>
    </Header>
}

export default Topbar;