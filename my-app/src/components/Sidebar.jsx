import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

function Sidebar() {
  return (
    <div className='sidebar' >
      <Navbar/>
      <Search />
      {/* <div>gdgdg</div> */}
      <Chats/>
    </div>
  )
}

export default Sidebar