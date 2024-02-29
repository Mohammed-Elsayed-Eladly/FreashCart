import { NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg"
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";



export default function Navbar({userdata ,Logout}) {



  let {cartCount} = useContext(CartContext)
  
  



  return <>

<nav className="navbar navbar-expand-lg bg-white fixed-top py-3 z-3">
  <div className="container">
    <NavLink className="navbar-brand" to="home">
      <img src={logo} alt="logo bage" />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userdata !=null ?<ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="cart">cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="wishList">Wish list</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="product">product</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="catigores">catrgories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="brand">brand</NavLink>
        </li>
      </ul>:""}

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">        
        {userdata == null ?  <>
          <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="login">login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="regester">regester</NavLink>
        </li>
        
        </>:<>
        <li className="nav-item m-auto px-3">
        <NavLink className="nav-link position-relative" aria-current="page" to="Cart">
        
        <i class="fa-solid fa-cart-shopping fa-lg text-secondary fs-3"></i>
  <span class="position-absolute top-0  start-75 translate-middle badge rounded-3 bg-main">
    {cartCount}
  </span>


          
    
        </NavLink>
      </li>
        <li className="nav-item m-auto">
        <span onClick={Logout} className='nav-item  cursor-pointer'>Sign Out</span>
          </li>
        </>}
        
        
      </ul>

    </div>


  


  </div>
</nav>



  </>

}
