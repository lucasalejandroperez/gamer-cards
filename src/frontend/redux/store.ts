import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import marketplaceReducer from './slices/marketplaceSlice';
import web3Reducer from './slices/web3Slice';
import myNFTsReducer from './slices/myNFTsSlice';

export const store = configureStore({
  reducer: {
    marketplace: marketplaceReducer,
    myNFTs: myNFTsReducer,
    web3: web3Reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['web3/setWeb3Handler/fulfilled'],
        // // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['web3.nft', 'web3.marketplace'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
