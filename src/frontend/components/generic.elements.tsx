import styled from 'styled-components';
import { mainTheme } from '../styles/mainColors';

// ****** LINKS ****** 
export const GenericLink = styled.a`
    color: ${mainTheme.fourthColor};
    text-decoration: none;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    &:hover {
        color: ${mainTheme.terciaryColor};
    }
`;

// ****** BUTTONS ****** 
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

// ****** SECTIONS ****** 
interface IHeroSectionProps {
    image?: string;
    backgroundSize?: string; // eg: "800px 459px"
    imagePosition?: string; // eg: "center"
    justifyContent?: string; // eg: "center"
    alignItems?: string; // eg: "center"
  }

export const HeroSection = styled.div<IHeroSectionProps>`
    background-image: url(${(props: IHeroSectionProps) => props.image || ''});
    background-position: ${(props: IHeroSectionProps) => props.imagePosition || 'center'};
    background-repeat: no-repeat;
    background-size: ${(props: IHeroSectionProps) => props.backgroundSize || 'cover'};
    height: 100vh;
    display: flex;
    align-items: ${(props: IHeroSectionProps) => props.alignItems || 'center'};
    justify-content: ${(props: IHeroSectionProps) => props.justifyContent || 'center'};
  `;

export const HeroContent = styled.div`
    position: relative;
    z-index: 1;
    margin-top: -90px;
    width: 35%;

    h1 { 
      font-family: 'Poppins', sans-serif;
      font-size: 45px;
      font-weight: 500;
      margin-bottom: 20px;
      color: ${mainTheme.contrastColor};
    }

    p {
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: ${mainTheme.contrastColor};
      margin-bottom: 30px;
    }
  `;

export const HeroContentLeft = styled(HeroContent)`
    margin-left: 15%;
  `;

export const HeroContentRight = styled(HeroContent)`
    margin-right: 15%;
  `;

export const HeroContentCenter = styled(HeroContent)`
    width: 50%;
  `;

export const WellcomePromoSection = styled.div`
    margin-bottom: 30px;
  `;

export const HeroIntegration = styled.div`
    padding: 8px 10px;
    display: inline-block;
    vertical-align: top;
    position: relative;
    letter-spacing: .58px;
    font-size: 14px;
    line-height: 24px;
    color: #d5d5ea;

    &:hover {
      color: ${mainTheme.contrastColor};
      text-decoration: none;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(to bottom right,#766ee6 0,#3540b0);
      border-radius: 100px;
      opacity: .5;
    }
  `;

export const HeroIntegrationIcon = styled.span`
    margin: 0 5px 0 0;

    &>* {
      position: relative;
      z-index: 2;
      display: inline-block;
      vertical-align: top;
    }
  `;

export const HeroIntegrationText = styled.span`
    margin: 0 7px 0 0;
  `;

export const HeroButtons = styled.div`
  `;

export const ServicesSection = styled.div`
    display: flex;
  `;

export const SingleService = styled.div`
    position: relative;
    z-index: 1;
    padding: 30px 20px 15px;
    border: 1px solid ${mainTheme.fourthColor};  //#08b1b1
    background: rgba(0,0,0,0.1);
    border-radius: 0 20px;
    margin-bottom: 30px;
    margin-right: 20px;
    margin-left: 20px;
    width: 400px;

    h3 {
      margin-bottom: 15px;
      color: ${mainTheme.contrastColor};
    }
  `;

export const ServiceIcon = styled.div`
    margin-bottom: 20px;
    
    i {
      font-size: 30px;
      margin-bottom: 20px;
      color: #fff;
      display: block;
    }
  `;