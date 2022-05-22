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

        //const uris = ["sample uri1", "sample uri2", "sample uri3"]
        const tokenIds = await nftContract.mint(uris);
        await marketplaceContract.setApprovalForAll(getSelectedAccount, true);
        await marketplaceContract.makeItem(nftContract.address, tokenIds, prices, nicks, teams);
        // TODO: Esto se tiene que hacer en una accion con redux?
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
