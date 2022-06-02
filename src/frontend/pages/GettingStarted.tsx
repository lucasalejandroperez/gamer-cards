import styled from 'styled-components';
import { HeroSection } from "../components/generic.elements"
import { mainTheme } from '../styles/mainColors';

export const GettingStarted = () => {

    const NormalSection = styled.div`
        width: 100%;
        height: 100vh;
        margin-top: 150px;
        margin-left: 20px;
    `;

    const NormalRow = styled.div`
        width: 100%;
        margin-bottom: 40px;

        h1 {
            color: ${mainTheme.contrastColor};
        }
    `;


  return (
    <div
    data-aos="fade-in" 
    data-aos-duration="400"
    data-aos-easing="ease-in-out"
    >
        <NormalSection>
            <NormalRow>
                <h1>How do I get royalties?</h1>
                <p>You have to buy an NFT card from a Gamer that you like, and then you have to sell it. Once that seller makes a sale of that same NFT, you will receive a royalty (if that is applicable)</p>
            </NormalRow>
            <NormalRow>
                <h1>What is a "Diamond" card?</h1>
                <p>It is the first purchase in the history of a NFT card, this is "Diamond", it is the one with the highest royalty of all.</p>
            </NormalRow>
            <NormalRow>
                <h1>What is a "Gold" card?</h1>
                <p>When it is the second sale of an NFT card, this card is "Gold" and has a slightly lower royalty than the "Diamond"</p>
            </NormalRow>
            <NormalRow>
                <h1>What is a "Silver" card?</h1>
                <p>When it is the third sale of an NFT card, this card is "Silver" and is the lowest royalty that you can receive</p>
            </NormalRow>
            <NormalRow>
                <h1>What is a "Bronze" card?</h1>
                <p>They are cards that do not have royalties, no matter how many times they are sold, you will not receive any royalty.</p>
            </NormalRow>
            <NormalRow>
                <h1>Are the royalties for life?</h1>
                <p>Yes!, once you bought a card with level "Diamond", "Gold" or "Silver", when they are sold you will receive a royalty for life.</p>
            </NormalRow>
        </NormalSection>
    </div>
  )
}
