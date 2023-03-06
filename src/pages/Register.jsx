import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
    const [err,setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
      
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
      
            await uploadBytesResumable(storageRef, file).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //Update profile
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });
                  //create user on firestore
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });
                  //create empty user chats on firestore
                  await setDoc(doc(db, "userChats", res.user.uid), {});
                  navigate("/");
                  
                } catch (err) {
                  console.log(err);
                  setErr(true);
                //   setLoading(false);
                }
              });
            });
          } catch (err) {
            setErr(true);
            // setLoading(false);
          }
       
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">React Chat App</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display Name" />
                    <input type="email" placeholder="Email" name="" id="" />
                    <input type="password" placeholder="Password" name="" id="" />
                    <input  style={{display:"none"}}type="file"  name="" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="Add Avatar" />
                        <span>Add an Avatar</span>
                    </label>
                    <button>SignUp</button>
                </form>
                <p>You already have a Account ?<Link to="/login">Sign-in</Link></p>
                {err && <span>Something went wrong!</span>}
            </div>
        </div>
    );
}

export default Register;