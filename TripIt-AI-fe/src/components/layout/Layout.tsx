import React, { type ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout