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
    background: ${({ theme }) => theme.bg};
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transition: all 200ms ease-in;
    z-index: 2;
    position: sticky;
    top: 0;

    & i:hover{
        background: ${({ theme }) => theme.primarycont};
        outline-style: solid;
    }

    @media screen and (min-width: 0px) and (max-width: 480px) {
        &{
            padding: 1rem .5rem;
        }
    }
`;

export const NavHeader = styled.nav`
    display: flex;
    align-items: center;
    gap: 1rem;
    @media screen and (min-width: 0px) and (max-width: 480px) {gap: .5rem;}
`;
export const Container = styled.main`
    color: ${({ theme }) => theme.onbg};
    background: ${({ theme }) => theme.bg};
    min-height: 100%;
`;

export const FlexColum = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Banner = styled.section`
    height: auto;
    background: url(${props => props.url}) center / cover;
    &.light{
        div.info{
            color: ${({ theme }) => theme.bg};
            & div.text{
                text-shadow: 2px 2px 3px ${({ theme }) => theme.onprimarycont};
            }
        }
    }
    &.dark{
        div.info{
            color: ${({ theme }) => theme.onbg};
            & div.text{
                text-shadow: 2px 2px 3px ${({ theme }) => theme.primarycont};
            }
        }
    }
    & div.info{
        background: rgba(0, 0, 0, 0.5);
        padding: 2rem 4rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        @media screen and (min-width: 0px) and (max-width: 480px) {
            padding: 1rem;
            flex-direction: column-reverse;
        }

        & div.text{
            width: 50%;
            gap: 2rem;
            @media screen and (min-width: 0px) and (max-width: 480px) {
                width:100%;
                & h1{text-align: center;}
            }
        }
        & div.img{
            width: 30%;
            @media screen and (min-width: 0px) and (max-width: 480px) {width:50%}
            & img{
                width: 100%;
            }
        }
    }
`;

export const LSlogan = styled(FlexColum)`
    align-items: center;
    justify-content: center;
    & img{width: 25%;}
    & div{
        text-align: center;
        color: ${({ theme }) => theme.primary};
        & small{
            color: ${({ theme }) => theme.outline};
            font-weight: 700;
        }
    }
`;

export const MainContainer = styled.main`
    min-height: 100vh;
    padding: 2rem;
    color: ${({ theme }) => theme.onbg};
    background: ${({ theme }) => theme.bg};
    box-sizing: border-box;
    transition: all 200ms ease-in;
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: .5rem;}
`;
export const SectionBg = styled.section`
    background: ${props => props.bg};
    color: ${props => props.txt};
    padding: 0 2rem;
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: 0 1.5rem;}
`;
export const Field = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 1rem;
    & label{font-weight: 700;}
    &:focus-within label{
        color: ${({theme}) => theme.primary};
        transition: all 200ms ease-in;
    }
    & small{
        color: ${({theme}) => theme.error};
    }
`;
export const FieldInput = styled.input`
    padding: .5rem 1rem;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid ${({theme}) => theme.outline};
    border-radius: .25rem;
    background: inherit;
    color: inherit;
    caret-color: ${({theme}) => theme.secondary};
    box-sizing: border-box;
    &:hover{
        background: ${({theme}) => theme.surfacev};
    }
    &:focus{
        border-color: ${({theme}) => theme.secondary};
        outline: 2px solid ${({theme}) => theme.secondarycont};
    }
    &[type="checkbox"]{
        accent-color: ${({theme}) => theme.secondary};
    }
    &:-webkit-autofill{
        -webkit-box-shadow: 0 0 0px 1000px ${({theme}) => theme.bg} inset;
        -webkit-text-fill-color: ${({theme}) => theme.onbg};
    }
    &::placeholder{
        color: ${({theme}) => theme.onsurfv};
    }
    &.error{
        color: ${({theme}) => theme.error};
        border-color: ${({theme}) => theme.error};
        caret-color: ${({theme}) => theme.error};
        &:focus{
            outline: 2px solid ${({theme}) => theme.errorcont};
        }
        &::placeholder{color: ${({theme}) => theme.error};}
    }
`;
export const FormResponse = styled.small`
    font-weight: 700; text-align: center; padding: .5rem; border-radius: .5rem;
    &.error{
        color: ${({theme}) => theme.error};
        background-color: ${({theme}) => theme.errorcont};
    }
    &.response{
        color: ${({theme}) => theme.ok};
        background-color: ${({theme}) => theme.okcont};
    }
`;
export const BaseBtn = styled.button`
    padding: 1rem 1rem;
    border-radius: .25rem;
    background: ${({theme}) => theme.surfacev};
    transition: all 300ms linear;
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: .5rem 1rem;}
    &.primary{
        background: ${({theme}) => theme.primary};
        color: ${({theme}) => theme.onprimary};
        &:hover{
            outline: 1px solid ${({theme}) => theme.primary};
            color: ${({theme}) => theme.onprimarycont};
            background: ${({theme}) => theme.primarycont};
        }
    }
    &.icon{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        font-weight: 700;
        & i{pointer-events: none;}
    }
`;