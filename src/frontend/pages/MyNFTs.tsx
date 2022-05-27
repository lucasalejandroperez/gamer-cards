import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NFTItem } from '../components/NFTItem';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMyNFTsAsync, myNFTsItems } from '../redux/slices/myNFTsSlice';
import { RootState } from '../redux/store';

export const MyNFTs = () => {

    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
    const nftContract = useSelector((state: RootState) => state.web3.nft);
    const selectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
    const dispatch = useAppDispatch();
    const items = useAppSelector(myNFTsItems);

    useEffect(() => {
        dispatch(getMyNFTsAsync({marketplaceContract, nftContract, selectedAccount}));
    }, []);
    
    return (
        <div> 
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
        </div>
    )
}
