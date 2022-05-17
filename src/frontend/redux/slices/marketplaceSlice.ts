import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

interface IItem {
    itemId: number;
    name: string;
}

export interface MarketplaceState {
    value: IItem[];
    status: 'idle' | 'loading' | 'failed';
  }
  
  const initialState: MarketplaceState = {
    value: [],
    status: 'idle',
  };

// Here is the async functions
// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched. Thunks are
// // typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount: number) => {
//       const response = await fetchCount(amount);
//       // The value we return becomes the `fulfilled` action payload
//       return response.data;
//     }
//   );

  export const marketplaceSlice = createSlice({
    name: 'marketplace',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setItemList: (state, action: PayloadAction<IItem[]>) => {
        state.value = action.payload;
      },
    },
    //extraReducers: (builder) ... for the async function
  });

export const { setItemList } = marketplaceSlice.actions;

  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getAllItems = (state: RootState) => state.marketplace.value;

export default marketplaceSlice.reducer;
