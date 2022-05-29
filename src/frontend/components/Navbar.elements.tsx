import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mainTheme } from '../styles/mainColors';

interface IMenuProps {
    open: boolean;
}

interface IContainerProps {
    showBackground: boolean;
}

export const Container = styled.div<IContainerProps>`
    width: 100%;
    height: 90px;
    position: fixed;
    top: 0;
    background-color: ${(props) => props.showBackground ? mainTheme.primaryColor : 'transparent' };
    transition: 0.5s ease-in-out;
    z-index: 1;
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 1300px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
`;

export const LogoContainer = styled.div`
    margin-left: 0.5rem;
    margin-right: 7.5rem;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-family: 'Poppins', sans-serif;

    p {
        color: ${mainTheme.contrastColor};
    }

    svg {
        fill: ${mainTheme.terciaryColor};
        margin-right: 0.5rem;
    }
`;

export const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

export const Menu = styled.ul<IMenuProps>`
    height: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;

    @media screen and (max-width: 960px) {
        background-color: #23394d;
        position: absolute;
        top: 70px;
        left: ${ (props) => (props.open ? "0" : "-100%")}; //Importante
        width: 100%;
        height: 90vh;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        transition: 0.5s all ease;
    }
`;

export const MenuItem = styled.li`
    height: 100%;

    @media screen and (max-width: 960px) {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const MenuItemLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    height: 100%;
    padding: 0.5rem 1.5rem;
    color: ${mainTheme.lightColor};
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    transition: 0.5s all ease;
    text-decoration: none;

    &:hover {
        /* color: ${mainTheme.darkColor}; */
        /* background-color: ${mainTheme.lightColor}; */
        background: linear-gradient(transparent 50%, ${mainTheme.lightColor});
        border-radius: 0.5rem;
        transition: 0.5s all ease;

        div {
            svg {
                fill: #23394d;
            }
        }
    }

    div {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;

        svg {
            display: none;
            fill: ${mainTheme.terciaryColor};
            margin-right: 0.5rem;
        }
    }

    @media screen and (max-width: 960px) {
        width: 100%;

        div {
            width: 30%;
            justify-content: left;

            svg {
                display: flex;
            }
        }
    }

    @media screen and (max-width: 880px) {
        div {
            width: 40%;
            justify-content: left;

            svg {
                display: flex;
            }
        }
    }

    @media screen and (max-width: 500px) {
        div {
            width: 60%;
            justify-content: left;

            svg {
                display: flex;
            }
        }
    }

    @media screen and (max-width: 260px) {
        div {
            width: 100%;
            justify-content: left;

            svg {
                display: flex;
            }
        }
    }
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px) {
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
            fill: ${mainTheme.terciaryColor};
            margin-right: 0.5rem;
        }
    } 
`;

export const WalletIcon = styled.div`
    display: flex;
    height: 100%;
    align-items: center;

    span {
        margin-left: 0.5rem;
        font-family: 'Poppins', sans-serif;
        color: ${mainTheme.contrastColor};
    }
`;

export const MenuElement = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
`;

export const ConnectWalletButton = styled.a`
    background-image: linear-gradient(to right, ${mainTheme.terciaryColor} 0%, ${mainTheme.terciaryColor} 100%);
    border-radius: 40px;
    box-sizing: border-box;
    cursor: pointer;
    color: ${mainTheme.contrastColor};
    display: block;
    height: 50px;
    font-size: 1em;
    font-family: 'Poppins', sans-serif;
    padding: 1px;
    position: relative;
    text-decoration: none;
    width: 15rem;

    &:hover {
        color: #fff;
    }

    &:hover span {
        background: transparent;
    }

    span {
        align-items: center;
        background: ${mainTheme.primaryColor};
        border-radius: 40px;
        display: flex;
        justify-content: center;
        height: 100%;
        transition: background 0.5s ease;
        width: 100%;
    }
`;