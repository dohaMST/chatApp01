import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContex'
import { ChatContext } from '../context/ChatContext'

function Message({message}) {

  const {currentUser} = useContext(AuthContext)

  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior : "smooth"})
  }, [message])
  
  const {data} = useContext(ChatContext)
  console.log("the message :",message)

  // const dateInf = new Date()

  return (
    <div  ref={ref}
          className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>sent</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message