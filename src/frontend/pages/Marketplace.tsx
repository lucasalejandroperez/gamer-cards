import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllItems, setItemsAsync } from '../redux/slices/marketplaceSlice';
import { ethers } from "ethers";
import { NFTItem } from '../components/NFTItem';
import styled from 'styled-components';
import { Loading } from '../components/Loading';
import { LoadingFullSize } from '../components/LoadingFullSize';

export const Marketplace = () => {

  // this is instead of `useSelector((state: RootState) => state.marketplace.value)`
  const items = useAppSelector(getAllItems);
  const dispatch = useAppDispatch();
  const nftContract = useSelector((state: RootState) => state.web3.nft);
  const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
  const status = useSelector((state: RootState) => state.marketplace.status);

  const prueba = async() => {
    const itemCount = await marketplaceContract.itemCount();
    console.log('itemCount: ', itemCount.toString());
  }

  useEffect(() => {
    dispatch(setItemsAsync({marketplaceContract, nftContract}));
  }, []);

  const CardContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
  `;

  const MarketplaceContainer = styled.div`
    margin-top: 100px;
    margin-left: 40px;
    height: 100vh;
  `;

  if (status === 'loading') {
    return (
      <LoadingFullSize />
    );
  }

  return (
    <MarketplaceContainer>
      {
        items.length === 0 &&
        <h1>You must connect your wallet.</h1>
      }
      <CardContainer>
        {
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
        }
      </CardContainer>
    </MarketplaceContainer>
  )
}
