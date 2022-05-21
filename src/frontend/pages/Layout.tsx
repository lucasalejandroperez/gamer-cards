import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setWeb3HandlerAsync, Web3State, getSelectedAccount } from '../redux/slices/web3Slice';

export const Layout = () => {
  const dispatch = useAppDispatch();
  //const selectedAccount = useSelector((state: Web3State) => state.selectedAccount);
  const selectedAccount = useAppSelector(getSelectedAccount);
  
  useEffect(() => {
    console.log('selected acccooount1: ');
  }, []);


  return (
    <main>
        <nav>
            <Link to="/">Home</Link> | { " "}
            <Link to="/marketplace">Marketplace</Link> | { " "}
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
