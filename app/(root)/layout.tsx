import React, { ReactNode} from 'react'
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const Layout = async ({ children }: { children: ReactNode })=> {
    return (
        <>
            <Navbar/>
            <main className='root-container md:py-5 py-2'>{children}</main>
            <Footer/>
        </>
    )
}
export default Layout
