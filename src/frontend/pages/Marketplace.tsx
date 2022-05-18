import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setItemList, getAllItems, setItemsAsync } from '../redux/slices/marketplaceSlice';

export const Marketplace = () => {

  // this is instead of `useSelector((state: RootState) => state.marketplace.value)`
  const items = useAppSelector(getAllItems);
  const dispatch = useAppDispatch();

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
