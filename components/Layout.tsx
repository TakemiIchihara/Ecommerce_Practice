import { useEffect } from "react"

import NavBar from "./NavBar"
import Footer from "./Footer"

const Layout = ({ children }: any) => {

  useEffect(() => {
    document.title = 'Ecommerce Practice'
  }, [])

  return (
    <div className="layout">
      <header>
        <NavBar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout