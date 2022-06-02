import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllItems, setItemsAsync } from '../redux/slices/marketplaceSlice';
import { NFTItem } from '../components/NFTItem';
import { LoadingFullSize } from '../components/LoadingFullSize';
import { CardsContainer, CardsGrid } from '../components/Cards.elements';

export const Marketplace = () => {

  // this is instead of `useSelector((state: RootState) => state.marketplace.value)`
  const items = useAppSelector(getAllItems);
  const dispatch = useAppDispatch();
  const nftContract = useSelector((state: RootState) => state.web3.nft);
  const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
  const selectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
  const status = useSelector((state: RootState) => state.marketplace.status);

  useEffect(() => {
    dispatch(setItemsAsync({marketplaceContract, nftContract}));
  }, []);

  if (status === 'loading') {
    return (
      <LoadingFullSize />
    );
  }

  return (
    <CardsContainer
      data-aos="fade-in"
      data-aos-duration="400"
      data-aos-easing="ease-in-out"
    >
      {
        !selectedAccount
        ?
            <h1>You must connect your wallet.</h1>
        :
            items.length > 0 
            ?
                <h1>My NFTs</h1>
            :
                <h1>There is no NFTs in the marketplace yet.</h1>
      }
      <CardsGrid>
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
      </CardsGrid>
    </CardsContainer>
  )
}
