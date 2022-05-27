import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllItems, setItemsAsync } from '../redux/slices/marketplaceSlice';
import { ethers } from "ethers";
import { NFTItem } from '../components/NFTItem';

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

  return (
    <>
        <h1>Listado de NFTs</h1>        
        <button type='button' onClick={ () => prueba() }>Prueba</button>
        <hr />
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
    </>
  )
}
