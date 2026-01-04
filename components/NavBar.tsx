import { Link } from "react-router-dom"
import { AiOutlineShopping } from 'react-icons/ai'
const NavBar = () => {
   return (
     <div className="navbar-container ">
      <p className="logo"><Link to='/'>JSM Headphone</Link></p>

      <button type='button' className="cart-icon" onClick={() => {}}>
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
     </div>
   )
 }
 
 export default NavBar