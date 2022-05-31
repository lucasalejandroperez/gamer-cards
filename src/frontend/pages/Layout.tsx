import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ScrollToTopButton } from '../components/ScrollToTopButton';

export const Layout = () => {
  
  
  return (
    <>
        <Navbar />
        <ScrollToTopButton />
        <section>
            <Outlet />
        </section>
    </>
  )
}
