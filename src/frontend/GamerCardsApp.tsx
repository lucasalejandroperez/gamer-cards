import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { Marketplace } from './pages/Marketplace';
import { Mint } from './pages/Mint';
import { MyNFTs } from './pages/MyNFTs';

export const GamerCardsApp = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> }>
                <Route index element={ <Home /> } />
                <Route path="marketplace" element={ <Marketplace /> } />
                <Route path="mynfts" element={ <MyNFTs /> } />
                <Route path="mint" element={ <Mint /> } />
                <Route path="about" element={ <About /> } />

                <Route path="*" element={ <Navigate replace to="/" /> } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
