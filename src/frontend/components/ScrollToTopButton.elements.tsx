import styled, { keyframes } from 'styled-components';
import { 
    FaAngleUp
} from 'react-icons/fa';
import { mainTheme } from '../styles/mainColors';

const moveBtnAnimation = keyframes`
    0%{
        transform: translateY(0px);
    }
    50%{
        transform: translateY(20px);
    }
    100%{
        transform: translateY(0px);
    }
`;

export const ScrollButtonContainer = styled.div`
    position: relative;

    
`;

export const ScrollButtonIcon = styled(FaAngleUp)`
    position: fixed;
    bottom: 40px;
    right: 25px;
    z-index: 20;

    background-color: ${mainTheme.terciaryColor};
    border: 2px solid ${mainTheme.contrastColor};
    border-radius: 50%;
    height: 50px;
    width: 50px;
    color: ${mainTheme.contrastColor};
    cursor: pointer;
    animation: 3s ease-in-out infinite;
    transition: all .5s ease-in-out;
    animation-name: ${moveBtnAnimation};
    animation-iteration-count: infinite;

    &:hover {
        background: ${mainTheme.contrastColor};
        color: ${mainTheme.terciaryColor};
        border: 2px solid ${mainTheme.terciaryColor};
    }
`;

