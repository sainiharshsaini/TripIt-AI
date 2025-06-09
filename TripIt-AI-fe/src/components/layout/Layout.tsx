import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import ScrollToTop from "@/ScrollToTop"

const Layout = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
                <ScrollToTop/>
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}

export default Layout