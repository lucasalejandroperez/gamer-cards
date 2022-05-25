import { useSelector } from 'react-redux';
import { IItem } from '../model/IItem';
import { RootState } from '../redux/store';

export const NFTItem = ({ itemId, nick, team, description, seller, totalPrice, level, image }:IItem) => {

    const getSelectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);

    const handleOnClickBuy = () => {
        console.log('buuuy');
        //await marketplaceContract.purchaseItem(itemId)
    }

    return (
        <>
            <div>Item Id: {itemId}</div>
            <div>Nick: {nick}</div>
            <div>Team: {team}</div>
            <div>Description: {description}</div>
            <div>Seller: {seller}</div>
            <div>Total price: {totalPrice}</div>
            <div>Level: {level}</div>
            <img src={image} alt="NFT Image" />
            {
                getSelectedAccount !== seller &&
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
