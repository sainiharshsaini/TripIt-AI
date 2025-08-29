import Header from "./Header"
import Footer from "./Footer"
import ScrollToTop from "@/ScrollToTop"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">
                <ScrollToTop />
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Layout
