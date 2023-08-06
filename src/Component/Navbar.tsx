import React,{useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { setLogout } from '../Redux/Slice'

function Navbar() {
  const dispatch  =  useDispatch()
  const navigate  =  useNavigate()
 let Email:any =  localStorage.getItem("login-user")
 let parseEmail = JSON.parse(Email)
  const {userIsLoggedIn} = useSelector((state: any) => state.productSlice);
  const handlLogOut =()=>{
    localStorage.removeItem("login-user")
 dispatch(setLogout(navigate))
  }
  
  return (
    <div>
  <nav className="navbar navbar-expand navbar-dark bg-info">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto text-light">
          {
            userIsLoggedIn ? 
            <li className="nav-item">
            <a className="nav-link text-light" >{parseEmail.email}</a>
          </li> :
<>
          <li className="nav-item">
            <a className="nav-link text-light" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/signup">Sign Up</a>
          </li>
</>
          }
        </ul>
      </div>
      {
        userIsLoggedIn &&
        <div className='d-flex'>
            <a className="nav-link text-light " href="/login" onClick={handlLogOut}>Logout</a>
        <button className='btn btn-light btn-sm mx-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Product</button>
        </div>
      }
    </nav>
    
    </div>
  )
}

export default Navbar

