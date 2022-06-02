import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../model/IItem';
import { fromWei } from '../../utilities/ethereumHelper';
import { RootState } from '../store';

export interface myNFTsState {
    items: IItem[];
    status: 'idle' | 'loading' | 'failed';
  }
  
  const initialState: myNFTsState = {
    items: [],
    status: 'idle',
  };

export const getMyNFTsAsync = createAsyncThunk(
    'marketplace/getMyNFTs',
    async (parameters:any) => {
        const { marketplaceContract, nftContract, selectedAccount } = parameters;
        let items:IItem[] = [];
        const itemCount = await marketplaceContract.itemCount();

        for (let i = 1; i <= itemCount.toString(); i++) {
            const item:IItem = await marketplaceContract.items(i);
            
            if (item.seller.toUpperCase() === selectedAccount) {
                const totalPrice = await marketplaceContract.getTotalPrice(item.itemId.toString());
                const level = await marketplaceContract.itemCountOfPurchases(item.itemId.toString());
                const uri = await nftContract.tokenURI(parseInt(item.itemId.toString()));
                // TODO: pasar a axios
                const metadata = await fetch(uri).then(res => res.json());
                
                items.push({
                    itemId: parseInt(item.itemId.toString()),
                    nick: metadata.nick,
                    team: metadata.team,
                    description: metadata.description,
                    level: level.toString(),
                    image: metadata.image,
                    seller: item.seller,
                    totalPrice: fromWei(totalPrice)
                })
            }
        }

        return items;
    }
  );

export const myNFTsSlice = createSlice({
    name: 'myNFTs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getMyNFTsAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getMyNFTsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items = action.payload;
          })
          .addCase(getMyNFTsAsync.rejected, (state) => {
            state.status = 'failed';
          })
    }
});

  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const myNFTsItems = (state: RootState) => state.myNFTs.items;

export default myNFTsSlice.reducer;