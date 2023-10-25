import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage , db} from '../firebase'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";





function Register() {
  console.log("Register component rendered");

  const [err, setErr] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    // console.log(e.target[3].files)
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // console.log(res)

      //Create a unique image name
      // const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log("everything went well")
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            // console.log("everything went well")
            navigate("/");
            // console.log("everything went well")
          } catch (err) {
            console.log(err);
            setErr(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      // setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">MST Chat</span>
            <span className="title">register</span>

            <form onSubmit={handleSubmit}>
            {/* <form> */}
                <input type="text" placeholder='display name' />
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <input type="file" id='file' style={{display : "none"}} />
                <label htmlFor="file">
                    <img src="./assets/addAvatar.png" alt="" />
                    <span>add an avatar</span>
                </label>
                <button >sign up</button>
                {err && <span> something went wrong</span>}
            </form>
            <p>you do have an account?<Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register