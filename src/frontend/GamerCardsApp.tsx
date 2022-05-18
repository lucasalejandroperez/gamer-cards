import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { Marketplace } from './pages/Marketplace';

export const GamerCardsApp = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> }>
                <Route index element={ <Home /> } />
                <Route path="marketplace" element={ <Marketplace /> } />
                <Route path="about" element={ <About /> } />

                <Route path="*" element={ <Navigate replace to="/" /> } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}