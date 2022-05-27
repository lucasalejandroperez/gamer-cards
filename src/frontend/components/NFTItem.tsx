import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { IItem } from '../model/IItem';
import { useAppDispatch } from '../redux/hooks';
import { purchaseItemAsync, setItemsAsync, publishItemAsync } from '../redux/slices/marketplaceSlice';
import { RootState } from '../redux/store';
import { getLevelDescription } from '../utilities/marketplaceHelper';

export const NFTItem = ({ itemId, nick, team, description, seller, totalPrice, level, image }:IItem) => {

    const selectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
    const nftContract = useSelector((state: RootState) => state.web3.nft);
    const dispatch = useAppDispatch();
    const [priceToSell, setPriceToSell] = useState('');

    const handleOnClickBuy = () => {
        console.log('itemId: ', itemId);
        
        dispatch(purchaseItemAsync({marketplaceContract, itemId, totalPrice}));
        // TODO: No se actualiza esto
        dispatch(setItemsAsync({marketplaceContract, nftContract}));
    }

    const handleOnClickSell = () => {
        console.log('pricetosell: ', priceToSell);
        dispatch(publishItemAsync({marketplaceContract, nftContract, itemId, priceToSell}));
    }

    const handleOnChangePriceToSell = (event: ChangeEvent<HTMLInputElement>) => {
        setPriceToSell(event.target.value);
    }

    return (
        <>
            <div>Item Id: {itemId}</div>
            <div>Nick: {nick}</div>
            <div>Team: {team}</div>
            <div>Description: {description}</div>
            <div>Seller: {seller}</div>
            <div>Total price: {totalPrice}</div>
            <div>Level: {getLevelDescription(parseInt(level.toString()))}</div>
            <img src={image} alt="NFT Image" />
            {
                selectedAccount === seller.toUpperCase() 
                ?
                    <>
                        <input type="text" onChange={ handleOnChangePriceToSell }></input>
                        <button 
                            type="button"
                            onClick={ () => handleOnClickSell() }
                        >
                            Publish Item for selling!
                        </button>
                    </>
                :
                    <button 
                        type="button"
                        onClick={ () => handleOnClickBuy() }
                    >
                        BUY
                    </button>
            }
        </>
    )
}
