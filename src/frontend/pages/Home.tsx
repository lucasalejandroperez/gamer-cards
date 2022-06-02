import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  GenericButton, 
  HeroButtons, 
  HeroContentCenter, 
  HeroContentLeft, 
  HeroContentRight, 
  HeroIntegration, 
  HeroIntegrationIcon, 
  HeroIntegrationText, 
  HeroSection, 
  ServiceIcon, 
  ServicesSection, 
  SingleService, 
  WellcomePromoSection 
} from '../components/generic.elements';
import { mainTheme } from '../styles/mainColors';

export const Home = () => {
  
  const LinkButtonAbstract = styled(Link)`
  `;

  const LinkButton = styled(LinkButtonAbstract)`
    background-image: linear-gradient(
        to right,
        #21d397 0,${mainTheme.terciaryColor} 51%,${mainTheme.fourthColor}
    );
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: ${mainTheme.contrastColor};
    cursor: pointer;
    margin: 10px;
    padding: 0.85rem 2.5rem;
    text-align:center;
    text-decoration: none;
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

  return (
    <div
      data-aos="fade-in"
      data-aos-duration="400"
      data-aos-easing="ease-in-out"
    >
        <HeroSection 
          image={"../assets/images/wellcome-hero-image.png"}
          justifyContent={"left"}
        >
          <HeroContentLeft>
            <WellcomePromoSection>
              <HeroIntegration>
                <HeroIntegrationIcon>
                  <img src="../assets/images/img-dollar.svg" width="24" height="24" alt="dollar" />
                </HeroIntegrationIcon>
                <HeroIntegrationText>Discover a new ways to enjoy your World!</HeroIntegrationText>
              </HeroIntegration>
            </WellcomePromoSection>
            <h1>Buy NFTs of your favorites players</h1>
            <p>Find all gamers in the Valorant scene and buy the player that you want.</p>
            <HeroButtons>
              <LinkButton to="/gettingstarted">LEARN MORE</LinkButton>
              <LinkButton to="/marketplace">BUY NOW</LinkButton>
            </HeroButtons>
          </HeroContentLeft>
        </HeroSection>
       
        <HeroSection 
          image={"../assets/images/sell-your-nfts2.png"} 
          backgroundSize={"750px 405px"}
          imagePosition={"left"}
          justifyContent={"right"}
          data-aos="fade-in" 
          data-aos-duration="400"
          data-aos-easing="ease-in-out"
        >
          <HeroContentRight>
            <h1>Sell your NFTs and make huge profits</h1>
            <p>Speculate and sell your NFT when your player is in a big moment.</p>
            <p>Specify any price that you want.</p>
          </HeroContentRight>
        </HeroSection>


        <HeroSection
          data-aos="fade-in" 
          data-aos-duration="400"
          data-aos-easing="ease-in-out"
        >
          <HeroContentCenter>
            <h1>Earn royalties from NFT sales</h1>
            <p>Be the first to buy an NFT minted to earn royalties for life.</p>
            <ServicesSection>
              <SingleService>
                <ServiceIcon>
                  <img src="../assets/images/service-buy.png" alt="Buy Unique NFTs" />
                </ServiceIcon>
                <h3>Buy Unique NFTs</h3>
                <p>You can buy the most amazing and unique NFTs from your favorites gamers</p>
              </SingleService>
              <SingleService>
                <ServiceIcon>
                  <img src="../assets/images/service-sell.png" alt="Sell NFTs" />
                </ServiceIcon>
                <h3>Sell NFTs</h3>
                <p>Whenever you want, you can sell your Gamer NFT at the highest posibily price</p>
              </SingleService>
              <SingleService>
                <ServiceIcon>
                  <img src="../assets/images/service-royalty.png" alt="Gain Royalties" />
                </ServiceIcon>
                <h3>Gain Royalties</h3>
                <p>Obtain royalties when your NFT is sold by another account</p>
              </SingleService>
            </ServicesSection>
          </HeroContentCenter>
        </HeroSection>
        
    </div>
  )
}
