import styled from "styled-components";

export const SLogo = styled.div`
    display: flex;
    align-items: center;

    & img{width: 1.5rem;}
    & h2{line-height: normal;}
    & h2 a{
        text-decoration: none;
        color: inherit;
    }
    @media screen and (min-width: 0px) and (max-width: 480px) {
        & h2{
            font-size: 1.17rem;
        }
    }
`;

export const Header = styled.header`
    background: ${({theme}) => theme.bg};
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid ${({theme}) => theme.primary};
    color: ${({theme}) => theme.primary};
    transition: all 200ms ease-in;
    z-index: 2;
    position: sticky;
    top: 0;

    & i:hover{
        background: ${({theme}) => theme.primarycont};
        outline-style: solid;
    }

    @media screen and (min-width: 0px) and (max-width: 480px) {
        &{
            padding: 1rem .5rem;
        }
    }
`;