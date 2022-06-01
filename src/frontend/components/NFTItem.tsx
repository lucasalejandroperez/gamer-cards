import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { IItem } from '../model/IItem';
import { useAppDispatch } from '../redux/hooks';
import { purchaseItemAsync, setItemsAsync, publishItemAsync } from '../redux/slices/marketplaceSlice';
import { RootState } from '../redux/store';
import { getLevelColor, getLevelDescription, getLevelImage } from '../utilities/marketplaceHelper';
import { Loading } from './Loading';
import { 
    Card,
    CardImageBox,
    CardImage,
    CardContentBox,
    CardTitle,
    CardRow,
    CardButton,
    CardPrice,
    CardPriceIcon,
    CardLevel,
    CardDescription,
    CardItemId,
    Text
 } from './NFTItem.elements';

export const NFTItem = ({ itemId, nick, team, description, seller, totalPrice, level, image }:IItem) => {
    const selectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
    const nftContract = useSelector((state: RootState) => state.web3.nft);
    const loadingPurchase = useSelector((state: RootState) => state.marketplace.loadingPurchase);
    const loadingPublish = useSelector((state: RootState) => state.marketplace.loadingPublish);
    const dispatch = useAppDispatch();
    const [priceToSell, setPriceToSell] = useState('');

    const handleOnClickBuy = () => {
        dispatch(purchaseItemAsync({marketplaceContract, itemId, totalPrice})).then(() => {
            dispatch(setItemsAsync({marketplaceContract, nftContract}));
        });
    }

    const handleOnClickSell = () => {
        dispatch(publishItemAsync({marketplaceContract, nftContract, itemId, priceToSell}));
    }

    const handleOnChangePriceToSell = (event: ChangeEvent<HTMLInputElement>) => {
        setPriceToSell(event.target.value);
    }

    console.log(`✨✨ level del item ${itemId} - ${nick}: `, level);
    
    

    return (
        <Card 
            backgroundColorLevel={ getLevelColor(parseInt(level.toString())) }
            imageUrlLevel={ getLevelImage(parseInt(level.toString())) }
        > 
            <CardItemId>#{itemId.toString()}</CardItemId>
            <CardLevel>{getLevelDescription(parseInt(level.toString())) }</CardLevel>
            <CardImageBox className="imageBox">
                <CardImage src={image} alt={nick} />
            </CardImageBox>
            <CardContentBox className="contentBox">
                <CardTitle>{nick} <small>({team})</small></CardTitle>
                <CardPrice>
                    PRICE:
                </CardPrice>
                <CardPriceIcon src="../assets/images/ethereum-icon.png" alt="Ethereum Icon" />
                <Text>{totalPrice}</Text>
                <CardRow className="cardRow">
                    <CardDescription>{description}
                    </CardDescription>
                </CardRow>
                {
                    selectedAccount === seller.toUpperCase() 
                    ?
                        loadingPublish 
                        ?
                            <Loading />
                        :
                            <>
                                <input 
                                    type="text" 
                                    onChange={ handleOnChangePriceToSell } 
                                    width="30" 
                                    placeholder='Price in ETH...'
                                />
                                <CardButton 
                                    type="button"
                                    className="cardButton" 
                                    onClick={ () => handleOnClickSell() }
                                >
                                    PUBLISH
                                </CardButton>
                            </>
                    :
                        loadingPurchase
                        ? 
                        <Loading /> 
                        : 
                        <CardButton 
                            className="cardButton" 
                            onClick={ () => handleOnClickBuy() }
                        >
                            BUY NOW
                        </CardButton>
                }
            </CardContentBox>
        </Card>
    )
}
