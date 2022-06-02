import { 
  FaGithub,
  FaEnvelope
} from 'react-icons/fa';
import { GenericLink, HeroContentLeft, HeroSection } from "../components/generic.elements"

export const About = () => {

  return (
    <div 
      data-aos="fade-in" 
      data-aos-duration="400"
      data-aos-easing="ease-in-out"
    >
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
            <FaEnvelope />
            <GenericLink
              href="mailto:lucas.alejandro.perez@gmail.com" 
              target="_blank" 
              rel="noreferrer"
            >
              lucas.alejandro.perez@gmail.com
            </GenericLink>
          </p>
          <p>
            <FaGithub />
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
