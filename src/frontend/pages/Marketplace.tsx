import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setItemList, getAllItems, setItemsAsync } from '../redux/slices/marketplaceSlice';
import { setWeb3HandlerAsync } from '../redux/slices/web3Slice';
import { ethers } from "ethers";

export const Marketplace = () => {

  // this is instead of `useSelector((state: RootState) => state.marketplace.value)`
  const items = useAppSelector(getAllItems);
  const dispatch = useAppDispatch();

  const prueba = async() => {
    // console.log('window1: ', window);
    
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // console.log('accounts: ', accounts);
    // console.log('accounts[0]: ', accounts[0]);
    // const selectedAddress = window.ethereum.selectedAddress; 
    // console.log('selected address: ', selectedAddress);
  }

  useEffect(() => {
    // const items = [{
    //   itemId: 1,
    //   name: 'Keznit'
    // },
    // {
    //   itemId: 2,
    //   name: 'm1xwell'
    // },
    // {
    //   itemId: 3,
    //   name: 'TenZ'
    // },
    // ]
    // dispatch(setItemList(items))
    prueba();
    
  }, []);

 
  
  
  
  return (
    <>
        <h1>Listado de NFTs</h1>        
        <button type='button' onClick={ () => dispatch(setItemsAsync()) }>Cargar Items async</button>
        <hr />
        {
          items.map((item) => (
            <div>{item.name}</div>
          ))
        }
    </>
  )
}
