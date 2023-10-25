import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'

function Input() {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const [text, setText]= useState("")
  const [img, setImg]= useState(null)

  const handleSend = async()=>{
    if (img){
      const storageRef = ref(storage, uuid)
      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }
  
  return (
    <div className='input'>
      <input type="text" placeholder='Type something ...' onChange={e=>setText(e.target.value)} value={text} />
      
      <div className="send">
        <img src="./assets/attach.png" alt="" />
        <input type="file" id='file' onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src="./assets/img.png" alt="" />
        </label>
        <button onClick={handleSend} >send</button>
      </div>
    </div>
  )
}

export default Input