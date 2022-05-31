import styled from 'styled-components';
import { GenericButton } from '../components/generic.elements';
import { mainTheme } from '../styles/mainColors';

export const Home = () => {

  interface IWelcomeSectionProps {
    image?: string;
    backgroundSize?: string; // eg: "800px 459px"
    imagePosition?: string; // eg: "center"
    justifyContent?: string; // eg: "center"
    alignItems?: string; // eg: "center"
  }

  const WellcomeSection = styled.div<IWelcomeSectionProps>`
    background-image: url(${(props: IWelcomeSectionProps) => props.image || ''});
    background-position: ${(props: IWelcomeSectionProps) => props.imagePosition || 'center'};
    background-repeat: no-repeat;
    background-size: ${(props: IWelcomeSectionProps) => props.backgroundSize || 'cover'};
    height: 100vh;
    display: flex;
    align-items: ${(props: IWelcomeSectionProps) => props.alignItems || 'center'};
    justify-content: ${(props: IWelcomeSectionProps) => props.justifyContent || 'center'};
  `;

  const WellcomeContent = styled.div`
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

  const WellcomeContentLeft = styled(WellcomeContent)`
    margin-left: 15%;
  `;

  const WellcomeContentRight = styled(WellcomeContent)`
    margin-right: 15%;
  `;

  const WellcomeContentCenter = styled(WellcomeContent)`
    width: 50%;
  `;

  const WellcomePromoSection = styled.div`
    margin-bottom: 30px;
  `;

  const WellcomeIntegration = styled.div`
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

  const WellcomeIntegrationIcon = styled.span`
    margin: 0 5px 0 0;

    &>* {
      position: relative;
      z-index: 2;
      display: inline-block;
      vertical-align: top;
    }
  `;

  const WellcomeIntegrationText = styled.span`
    margin: 0 7px 0 0;
  `;

  const WellcomeButtons = styled.div`
  `;

  const ServicesSection = styled.div`
    display: flex;
  `;

  const SingleService = styled.div`
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

  const ServiceIcon = styled.div`
    margin-bottom: 20px;
    
    i {
      font-size: 30px;
      margin-bottom: 20px;
      color: #fff;
      display: block;
    }
  `;
  
  return (
    <div>
        <WellcomeSection 
          image={"../assets/images/wellcome-hero-image.png"}
          justifyContent={"left"}
        >
          <WellcomeContentLeft>
            <WellcomePromoSection>
              <WellcomeIntegration>
                <WellcomeIntegrationIcon>
                  <img src="../assets/images/img-dollar.svg" width="24" height="24" alt="dollar" />
                </WellcomeIntegrationIcon>
                <WellcomeIntegrationText>Discover a new ways to enjoy your World!</WellcomeIntegrationText>
              </WellcomeIntegration>
            </WellcomePromoSection>
            <h1>Buy NFTs of your favorites players</h1>
            <p>Find all gamers in the Valorant scene and buy the player that you want.</p>
            <WellcomeButtons>
              <GenericButton>LEARN MORE</GenericButton>
              <GenericButton>BUY NOW</GenericButton>
            </WellcomeButtons>
          </WellcomeContentLeft>
        </WellcomeSection>
       
        <WellcomeSection 
          image={"../assets/images/sell-your-nfts2.png"} 
          backgroundSize={"750px 405px"}
          imagePosition={"left"}
          justifyContent={"right"}
        >
          <WellcomeContentRight>
            <h1>Sell your NFTs and make huge profits</h1>
            <p>Speculate and sell your NFT when your player is in a big moment.</p>
            <p>Specify any price that you want.</p>
          </WellcomeContentRight>
        </WellcomeSection>

        <WellcomeSection
          alignItems={"flex-start"}
        >
          <WellcomeContentCenter>
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
          </WellcomeContentCenter>
        </WellcomeSection>
        
    </div>
  )
}
