import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Navbar() {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className="logo">
        MST Chat
      </span>
      <div className="user">
        {/* <img src="https://images.pexels.com/photos/18528247/pexels-photo-18528247/free-photo-of-mode-homme-amour-gens.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" /> */}
        <img src={currentUser.photoURL} alt="" />

        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logOut</button>
      </div>
    </div>
  )
}

export default Navbar