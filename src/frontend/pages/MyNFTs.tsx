import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CardsContainer, CardsGrid } from '../components/Cards.elements';
import { LoadingFullSize } from '../components/LoadingFullSize';
import { NFTItem } from '../components/NFTItem';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMyNFTsAsync, myNFTsItems } from '../redux/slices/myNFTsSlice';
import { RootState } from '../redux/store';

export const MyNFTs = () => {

    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
    const nftContract = useSelector((state: RootState) => state.web3.nft);
    const selectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
    const status = useSelector((state: RootState) => state.marketplace.status);
    const dispatch = useAppDispatch();
    const items = useAppSelector(myNFTsItems);

    useEffect(() => {
        dispatch(getMyNFTsAsync({marketplaceContract, nftContract, selectedAccount}));
    }, []);

    const getNumberLevelFixed = (level:number) => {
        // This is a hack to fix the level number.
        if (level === 0) {
            return 0;
        } 
        else {
            return level - 1;
        }
    }

    if (status === 'loading') {
        return (
          <LoadingFullSize />
        );
    }

    console.log('selected account: ', selectedAccount);
    

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
                        <h1>You don't have any NFT in your collection</h1>
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
                            level={getNumberLevelFixed(parseInt(item.level.toString()))}
                            image={item.image}
                        />
                    ))
                }
            </CardsGrid>
        </CardsContainer>
    )
}
