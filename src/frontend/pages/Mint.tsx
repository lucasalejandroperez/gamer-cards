import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import mintTeamsJson from '../mock/mintTeams.json';
import { toWei } from '../utilities/ethereumHelper';
import { GenericButton } from '../components/generic.elements';

// TODO: Pasarlo a un .env
const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0'});

export const Mint = () => {
    const nftContract = useSelector((state: RootState) => state.web3.nft);
    const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);
    const getSelectedAccount = useSelector((state: RootState) => state.web3.selectedAccount);

    const handleOnClick = async() => {
        try {
            let uris = [];
            let prices = [];

            for (const {image, nick, team, price, description} of mintTeamsJson) {
                const result = await client.add(JSON.stringify({image, nick, team, price, description}));
                uris.push(`https://ipfs.infura.io/ipfs/${result.path}`);
                prices.push(toWei(price));
            }
            
            // TODO: Esto se tiene que hacer en una accion con redux?
            await(await marketplaceContract.makeItem(nftContract.address, nftContract.address, uris, prices)).wait();
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <div 
            style={{ height: '100vh', margin: '100px 100px' }}
            data-aos="fade-in"
            data-aos-duration="400"
            data-aos-easing="ease-in-out"
        >
            <h1>Mint NFTs</h1>
            <GenericButton 
                type="button"
                onClick={ handleOnClick }
            >
                Mint
            </GenericButton>
        </div>
    )
}
