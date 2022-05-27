import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setWeb3HandlerAsync, getSelectedAccount } from '../redux/slices/web3Slice';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const selectedAccount = useAppSelector(getSelectedAccount);

  

  return (
    <main>
        <nav>
            <Link to="/">Home</Link> | { " "}
            <Link to="/marketplace">Marketplace</Link> | { " "}
            <Link to="/mynfts">My NFTs</Link> | { " "}
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
