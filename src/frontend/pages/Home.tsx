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

export const Home = () => {
  
  return (
    <div>
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
              <GenericButton>LEARN MORE</GenericButton>
              <GenericButton>BUY NOW</GenericButton>
            </HeroButtons>
          </HeroContentLeft>
        </HeroSection>
       
        <HeroSection 
          image={"../assets/images/sell-your-nfts2.png"} 
          backgroundSize={"750px 405px"}
          imagePosition={"left"}
          justifyContent={"right"}
        >
          <HeroContentRight>
            <h1>Sell your NFTs and make huge profits</h1>
            <p>Speculate and sell your NFT when your player is in a big moment.</p>
            <p>Specify any price that you want.</p>
          </HeroContentRight>
        </HeroSection>

        <HeroSection
          alignItems={"flex-start"}
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
