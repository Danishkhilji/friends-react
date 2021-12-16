import React, { useState } from 'react';
import { Upload } from 'antd';
import { storage,logOut ,auth} from '../firebase/config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate=useNavigate();
    
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
      };
      const uploadFiles = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
    
      };

      const logOutHandler=()=>{

                  logOut(auth).then(() => {
                    navigate('/login')
                  }).catch((error) => {
                    // An error happened.
                  });
      }
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const prog = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       );
    //       setProgress(prog);
    //     },
    //     (error) => console.log(error),
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         console.log("File available at", downloadURL);
    //       });
    //     }
    //   );


  return (
    <div className="App">
hello danish

      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <button type="submit" onClick={logOutHandler}>Logout</button>

    </div>
  );
}

export default Home;
