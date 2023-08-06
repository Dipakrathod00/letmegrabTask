import React from 'react'
import {useNavigate} from "react-router-dom"

function PageNotFound() {
    const navigate = useNavigate()
  return (
    <div>
        <div className='alert alert-primary'>Please Navigate on valid page or back</div> 
        <button className='btn btn-success' onClick={()=>navigate('/')}>take me back </button>
    </div>
  )
}

export default PageNotFound