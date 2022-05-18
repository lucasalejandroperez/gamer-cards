import { Link, Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <main>
        <nav>
            <Link to="/">Home</Link> | { " "}
            <Link to="/marketplace">Marketplace</Link> | { " "}
            <Link to="/about">About</Link> | { " "}
            <button type="button">conectar metamask</button>
        </nav>
        <section>
            <Outlet />
        </section>
    </main>
  )
}
