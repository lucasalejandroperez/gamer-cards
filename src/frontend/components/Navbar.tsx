import {useEffect, useState} from 'react';
import { 
    Container, 
    LogoContainer, 
    Logo,
    Menu, 
    MenuItem, 
    MenuItemLink, 
    MobileIcon, 
    Wrapper,
    WalletIcon,
    ConnectWalletButton,
    MenuElement,
    LogoItemLink
} from "./Navbar.elements";
import { 
    FaBars, 
    FaBattleNet,
    FaTimes,
    FaHome,
    FaUserAlt,
    FaBriefcase,
    FaGlasses,
    FaWallet
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getSelectedAccount, setWeb3HandlerAsync } from '../redux/slices/web3Slice';
import { getShortenedAddressAccount } from '../utilities/marketplaceHelper';

export const Navbar = () => {

    const dispatch = useAppDispatch();
    const selectedAccount = useAppSelector(getSelectedAccount);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showNavbarBackgroundColor, setShowNavbarBackgroundColor] = useState(false);

    const changeNavBackgroundColor = () => {
        if (window.scrollY >= 90) {
            setShowNavbarBackgroundColor(true);
        }
        else {
            setShowNavbarBackgroundColor(false);
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', changeNavBackgroundColor);
    
        return () => {
            window.removeEventListener('scroll', changeNavBackgroundColor);
        }
    }, []);

    const handleConnectWalletMobile = () => {
        dispatch(setWeb3HandlerAsync());
        setShowMobileMenu(!showMobileMenu);
    }
    

    return (
        <Container showBackground={showNavbarBackgroundColor}>
            <Wrapper>
                <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
                    <LogoItemLink to="/">
                        <Logo src="../assets/images/logo.png" alt="Gamer Cards" />
                        <p>
                            Gamer Cards
                        </p>
                    </LogoItemLink>
                    <MobileIcon onClick={ () => setShowMobileMenu(!showMobileMenu) }>
                        {
                            showMobileMenu 
                            ?
                            <FaTimes />
                            :
                            <FaBars />
                        }
                    </MobileIcon>
                    <Menu open={showMobileMenu}>
                        <MenuItem>
                            <MenuItemLink to="#" onClick={ () => handleConnectWalletMobile() }>
                                <div>
                                    <FaHome />
                                    CONNECT WALLET
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink to="/" onClick={ () => setShowMobileMenu(!showMobileMenu) }>
                                <div>
                                    <FaHome />
                                    HOME
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink to="/marketplace" onClick={ () => setShowMobileMenu(!showMobileMenu) }>
                                <div>
                                    <FaUserAlt />
                                    MARKETPLACE
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink to="/mynfts" onClick={ () => setShowMobileMenu(!showMobileMenu) }>
                                <div>
                                    <FaBriefcase />
                                    MY NFTS
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink to="/gettingstarted" onClick={ () => setShowMobileMenu(!showMobileMenu) }>
                                <div>
                                    <FaHome />
                                    GETTING STARTED
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink to="/about" onClick={ () => setShowMobileMenu(!showMobileMenu) }>
                                <div>
                                    <FaGlasses />
                                    ABOUT
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                    </Menu>
                    {
                        selectedAccount 
                        ?
                        <WalletIcon>
                            <FaWallet />
                            <span>{getShortenedAddressAccount(selectedAccount)}</span>
                        </WalletIcon>
                        :
                        <MenuElement>
                            <ConnectWalletButton
                                onClick={() => dispatch(setWeb3HandlerAsync())}
                            >
                                <span>CONNECT WALLET</span>
                            </ConnectWalletButton>
                        </MenuElement>
                    }
                </IconContext.Provider>
            </Wrapper>
        </Container>
    )
}
