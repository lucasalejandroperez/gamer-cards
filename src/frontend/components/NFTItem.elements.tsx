import styled from 'styled-components';
import { mainTheme } from '../styles/mainColors';

interface ICardProps {
    backgroundColorLevel: string;
    imageUrlLevel: string;
}

export const Card = styled.div<ICardProps>`
    position: relative;
    width: 320px;
    height: 450px;
    background: #232323;
    border-radius: 20px;
    box-shadow: 5px 5px 115px -14px gray;  /* 5px 5px 115px -14px gray;  */
    overflow: hidden;
    margin-bottom: 20px;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${(props) => props.backgroundColorLevel}; 
        background-image: ${(props) => `url(${props.imageUrlLevel})`};
        background-position-x: 95%;
        background-size: 50px 50px;
        background-repeat: no-repeat;
        clip-path: circle(150px at 80% 20%);
        transition: 0.5s ease-in-out;
    }
    
    &:hover:before {
        clip-path: circle(300px at 80% -20%);
    }

    &:after {
        content: '';
        position: absolute;
        top: 30%;
        left: -10%;
        font-family: 'Open Sans', sans-serif;
        font-size: 12em;
        font-weight: 800;
        font-style: italic;
        color: rgba(255,255,25,0.05);
    }

    &:hover .contentBox {
        height: 210px;
    } 

    &:hover .imageBox {
        top: 0%;
        transform: translateY(0%);
    }

    &:hover .contentBox .cardRow {
        opacity: 1;
        visibility: visible;
        transition-delay: 0.3s;
    }

    &:hover .contentBox .cardButton { 
        opacity: 1;
        transform: translateY(0px);
        transition-delay: 0.45s;
    }
`;

export const CardImageBox = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    /* z-index: 10000; */
    width: 100%;
    height: 220px;
    transition: 0.5s;
`;

export const CardImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    width: 100%; /* 270px */ 
    height: 220px;
`;

export const CardContentBox = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    text-align: center;
    transition: 1s;
    //z-index: 10;    
`;

export const CardTitle = styled.h2`
    position: relative;
    font-weight: 600;
    letter-spacing: 1px;
    color: #fff;
    margin: 0;
`;

export const CardRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    transition: 0.5s;opacity: 0;
    visibility: hidden;
    padding-top: 0;
    padding-bottom: 0;
`;

export const CardButton = styled.a`
    display: inline-block;
    padding: 10px 20px;
    background: ${mainTheme.terciaryColor};
    border-radius: 4px;
    margin-top: 10px;
    text-decoration: none;
    font-weight: 600;
    color: ${mainTheme.contrastColor};
    opacity: 0;
    transform: translateY(50px);
    transition: 0.5s;
    margin-top: 0;
    cursor: pointer;
`;

export const CardPrice = styled.span`
    color: #fff;
    font-weight: 300;
    font-size: 14px;
    letter-spacing: 2px;
    margin-right: 5px;
    text-transform: uppercase;
`;

export const CardPriceIcon = styled.img`
    width: 11px;
    height: 20px;
    margin-right: 5px;
`;

export const CardLevel = styled.span`
    position: relative;
    top: 10px;
    left: 51%;
    color: black;
`;

export const CardDescription = styled.span`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const CardItemId = styled.span`
    color: #fff;
    position: relative;
    left: 20px;
    top: 10px;
`;

export const Text = styled.span`
`;