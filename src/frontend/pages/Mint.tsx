import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import mintTeamsJson from '../mock/mintTeams.json';
import { getSelectedAccount } from '../redux/slices/web3Slice';
import {ethers} from 'ethers'



export const Mint = () => {

    
    // TODO: Pasarlo a utils
    const toWei = (num:number) => ethers.utils.parseEther(num.toString());
    
    const nftContract = useSelector((state: RootState) => state.web3.nft);
    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
    const getSelectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
    

    const handleOnClick = async() => {
        try {
            console.log('nftContract: ', nftContract);
            
            let uris = [];
            let nicks = [];
            let teams = [];
            let prices = [];
            for (const element of mintTeamsJson) {
                uris.push(element.image);
                nicks.push(element.nick);
                teams.push(element.team);
                prices.push(toWei(element.price));
            }
    
            // TODO: Esto se tiene que hacer en una accion con redux?
            console.log('uris: ', uris);
            console.log('nicks: ', nicks);
            console.log('teams: ', teams);
            console.log('prices: ', prices);
            
            // subir a IPFS toda la informacion y asociarla a una URL
            //const tokenIds = await(await nftContract.mint(uris)).wait();
            const transaction = await nftContract.mint(uris);
            let txReceip = await transaction.wait();
            
            //const tokenIds = await wait(transaction);
            console.log('txReceip: ', txReceip);

            const lastTokens = await nftContract.tokenId();
            console.log('lastTokensMinted: ', lastTokens);
            //await(await nftContract.setApprovalForAll(marketplaceContract.address, true)).wait();
            //await(await marketplaceContract.makeItem(nftContract.address, tokenIds, prices, nicks, teams)).wait();
            
        } catch (error) {
            console.log('hubo un eror');
            
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Mintear NFTs</h1>
            <button 
                type="button"
                onClick={ handleOnClick }
            >
                Mint
            </button>
        </div>
    )
}
