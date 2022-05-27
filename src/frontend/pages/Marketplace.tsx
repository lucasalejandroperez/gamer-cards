import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllItems, setItemsAsync } from '../redux/slices/marketplaceSlice';
import { ethers } from "ethers";
import { NFTItem } from '../components/NFTItem';
import styled from 'styled-components';

export const Marketplace = () => {

  // this is instead of `useSelector((state: RootState) => state.marketplace.value)`
  const items = useAppSelector(getAllItems);
  const dispatch = useAppDispatch();
  const nftContract = useSelector((state: RootState) => state.web3.nft);
  const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);

  const prueba = async() => {
    const itemCount = await marketplaceContract.itemCount();
    console.log('itemCount: ', itemCount.toString());
  }

  useEffect(() => {
    dispatch(setItemsAsync({marketplaceContract, nftContract}));
  }, []);

  const main_backgroundColor = "#232323";

  const CardContainer = styled.div`
    position: relative;
  `;

  const Card = styled.div`
    position: relative;
    width: 320px;
    height: 450px;
    background: #232323;
    border-radius: 20px;
    box-shadow:5px 5px 115px -14px black;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #7a2f65;
      background-image: url('https://www.pngplay.com/wp-content/uploads/2/Diamond-PNG-HD-Quality.png');
      background-position: top right;
      background-size: 50px 50px;
      background-repeat: no-repeat;
      clip-path: circle(150px at 80% 20%);
      transition: 0.5s ease-in-out;
    }
    
    &:hover:before {
      clip-path: circle(300px at 80% -20%);
    }

    &:after {
      content: 'SEN';
      position: absolute;
      top: 30%;
      left: -10%;
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
      transition-delay: 0.6s;
    }

    &:hover .contentBox .cardButton {
      opacity: 1;
      transform: translateY(0px);
      transition-delay: 0.75s;
    }
  `;

  const CardImageBox = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10000;
    width: 100%;
    height: 220px;
    transition: 0.5s;
  `;

  const CardImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    width: 270px;
  `;

  const CardContentBox = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    text-align: center;
    transition: 1s;
    z-index: 10;    
  `;

  const CardTitle = styled.h2`
    position: relative;
    font-weight: 600;
    letter-spacing: 1px;
    color: #fff;
    margin: 0;
  `;

  const CardRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    transition: 0.5s;opacity: 0;
    visibility: hidden;
    padding-top: 0;
    padding-bottom: 0;
  `;

  const CardSubtitle = styled.h3`
    color: #fff;
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: 10px;
  `;

  const CardElement = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 5px;
  `;

  const CardButton = styled.a`
    display: inline-block;
    padding: 10px 20px;
    background: #fff;
    border-radius: 4px;
    margin-top: 10px;
    text-decoration: none;
    font-weight: 600;
    color: #111;
    opacity: 0;
    transform: translateY(50px);
    transition: 0.5s;
    margin-top: 0;
  `;

  const CardPrice = styled.span`
    display: flex;
  `;

  const CardPriceIcon = styled.img`
    width: 11px;
    height: 20px;
    margin-right: 5px;
  `;


  return (
    <>
        <h1>Listado de NFTs</h1>        
        <hr />
        <CardContainer>
        {/* Aca falta agregar una prop para que ponga el nombre del team */}
          <Card> 
            <CardImageBox className="imageBox">
              <CardImage src="https://cdn.allfamous.org/people/avatars/tenz-20010505-1631469925312-allfamous.org.jpg" alt="Gamer"></CardImage>
            </CardImageBox>
            <CardContentBox className="contentBox">
              <CardTitle>TenZ - Sentinels</CardTitle>
              {/* <CardRow className="cardRow">
                <CardSubtitle>Sentinels</CardSubtitle>
              </CardRow> */}
              <CardRow className="cardRow">
                <span>Tyson Ngo (born May 5, 2001) is a Canadian player of Vietnamese descent who currently plays for Sentinels...</span>
              </CardRow>
              <CardRow className="cardRow">
                <CardSubtitle>Price:</CardSubtitle>
                <CardElement>
                  <CardPrice>
                    <CardPriceIcon src="../assets/images/ethereum-icon.png" alt="Ethereum Icon" />
                    <span>1.02</span>
                  </CardPrice>
                </CardElement>
              </CardRow>
              <CardButton className="cardButton">BUY NOW</CardButton>
            </CardContentBox>
          </Card>
        </CardContainer>
        {/* {
          items.map((item) => (
            <NFTItem 
              key={item.itemId}
              itemId={item.itemId}
              nick={item.nick}
              team={item.team}
              description={item.description}
              seller={item.seller}
              totalPrice={item.totalPrice}
              level={item.level}
              image={item.image}
            />
          ))
        } */}
    </>
  )
}
