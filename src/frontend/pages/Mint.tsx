import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import mintTeamsJson from '../mock/mintTeams.json';
import { getSelectedAccount } from '../redux/slices/web3Slice';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
//import { create, urlSource  } from 'ipfs-http-client';
import { useEffect } from 'react';
import MarketplaceAddress from '../abis//Marketplace-address.json';
import NFTAddress from '../abis/NFT-address.json';
import MarketplaceAbi from '../abis/Marketplace.json';
import NFTAbi from '../abis/NFT.json';

const options = {
    host: 'https://ipfs.infura.io:5001/api/v0'
}
//const client = ipfsHttpClient(options);
// connect using a URL
const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0'});

export const Mint = () => {
    
    // TODO: Pasarlo a utils
    const toWei = (num:number) => ethers.utils.parseEther(num.toString());
    
    const nftContract = useSelector((state: RootState) => state.web3.nft);
    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
    const getSelectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);
    

    const handleOnClick = async() => {
        try {
            let uris = [];
            let prices = [];

            for (const {image, nick, team, price, description} of mintTeamsJson) {
                //const imagePath = `https://ipfs.infura.io/ipfs/${image}`;
                const result = await client.add(JSON.stringify({image, nick, team, price, description}));
                uris.push(`https://ipfs.infura.io/ipfs/${result.path}`);
                prices.push(toWei(price));
            }
    
            // TODO: Esto se tiene que hacer en una accion con redux?
            console.log('uris: ', uris);
            console.log('prices: ', prices);
            
            await(await marketplaceContract.makeItem(nftContract.address, nftContract.address, uris, prices)).wait();
        } catch (error) {
            console.log('hubo un eror');
            
            console.log(error);
        }
    }


    const handleOnClick2 = async() => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            
            window.ethereum.on('chainChanged', () => {
                console.log('reloadddd');
                window.location.reload();
            });
            
            window.ethereum.on('accountsChanged', async function (accounts:string[]) {
                console.log('CAMBIO DE ACCOUNT: ', accounts[0]);
                //await handleOnClick2();
            });
            
            const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
            console.log('marketplace contrato: ', marketplace);
            
            const code = provider.getCode(MarketplaceAddress.address).then((res) => {
                console.log('code: ', res);
                
            } );
            const items = await marketplace.itemCount();
            console.log('items: ', items.toString());

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
            <button
                type="button"
                onClick={ () => handleOnClick2() }
            >
                ver items
            </button>
        </div>
    )
}
