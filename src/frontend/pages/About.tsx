import styled from 'styled-components';
import { GenericLink, HeroContentLeft, HeroSection } from "../components/generic.elements"
import { mainTheme } from '../styles/mainColors';

export const About = () => {

  return (
    <div>
      <HeroSection
        image={"../assets/images/about-image.png"} 
        backgroundSize={"709px 494px"}
        imagePosition={"right"}
        justifyContent={"left"}
      >
        <HeroContentLeft>
          <h1>Developed by</h1>
          <h1>Lucas Perez</h1>
          <p>Web3 Software Developer</p>
          
          <p>
            Mail:
            <a href="mailto:lucas.alejandro.perez@gmail.com" target="_blank" rel="noreferrer" className="text-reset">
              lucas.alejandro.perez@gmail.com
            </a>
          </p>
          <p>
            Github:
            <GenericLink
              href="https://github.com/lucasalejandroperez" 
              target="_blank" 
              rel="noreferrer"
            >
              https://github.com/lucasalejandroperez
            </GenericLink>
          </p>
        </HeroContentLeft>
      </HeroSection>
    </div>
  )
}
