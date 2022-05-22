import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setWeb3HandlerAsync, getSelectedAccount } from '../redux/slices/web3Slice';
import { RootState } from "../redux/store";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const selectedAccount = useAppSelector(getSelectedAccount);
  const marketplaceContract = useSelector((state: RootState) => state.web3.marketplace);

  const testData = async() => {
    if (marketplaceContract) {
      //const itemCount = await marketplaceContract.itemCount();
    const address = await marketplaceContract.address;
    console.log('address: ', address);
    const prueba = await marketplaceContract.itemCount;
    console.log('itemcount: ', prueba);
    const items = await marketplaceContract.items;
    console.log('itemss: ', items);
    
    
    //console.log('itemCount: ', itemCount);
    }
    
  }
  useEffect(() => {
    console.log('marketplace contract: ', marketplaceContract);
    //marketplaceContract.itemCount();
    if (marketplaceContract) {
        console.log('a');
        testData();
        // const itemCount = marketplaceContract.itemCount().then((resolve:any) => {
        // console.log('item count: ', resolve);
        
        //});
    }
  }, [marketplaceContract]);
  

  return (
    <main>
        <nav>
            <Link to="/">Home</Link> | { " "}
            <Link to="/marketplace">Marketplace</Link> | { " "}
            <Link to="/mint">Mint</Link> | { " "}
            <Link to="/about">About</Link> | { " "}
            <button 
              type="button"
              onClick={() => dispatch(setWeb3HandlerAsync())}
            >
              {
                selectedAccount 
                ?
                selectedAccount
                : 
                `Conectar a metamask`
              }
            </button>
        </nav>
        <section>
            <Outlet />
        </section>
    </main>
  )
}
