import styled from 'styled-components';
import { mainTheme } from '../styles/mainColors';

export const GenericButton = styled.button`
    background-image: linear-gradient(
        to right,
        #21d397 0,${mainTheme.terciaryColor} 51%,${mainTheme.fourthColor}
    );

    width: 150px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: ${mainTheme.contrastColor};
    cursor: pointer;
    margin: 10px;
    height: 50px;
    text-align:center;
    border: 2px solid ${mainTheme.terciaryColor};
    background-size: 300% 100%;
    border-radius: 50px;
    -moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;

    &:hover {
        background-position: 100% 0;
        -moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }

    &:focus {
        outline: none;
    }
`;