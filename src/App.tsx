import { useState,useEffect } from "react";
import RootRoute from "./Routes/Routes";
import {useDispatch} from "react-redux"
import  "./assets/style.css"
import { setLoginState } from "./Redux/Slice";
function App() {
  const isLoggedIn=JSON.parse(localStorage.getItem('isLoggedIn')||'false')
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(setLoginState(isLoggedIn))
  })
  

  return (
    <>
    <RootRoute />
    </>
  );
}

export default App;
