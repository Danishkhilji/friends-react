import React from 'react'
import { Card } from 'antd';
import ProfileCard from './ProfileCard/card';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useContext,useState } from 'react';
import {AuthContext} from "../../routes/Auth"


const { Meta } = Card;
const Profile = () => {
    const [imageUrl,setImageUrl] = useState()
    const [userName,setUserName] = useState()
    const [userBio,setuserBio] = useState()
    
const User = useContext(AuthContext);


const unsub = onSnapshot(doc(db, "usersData", User.currentUser.uid), (doc) => {
    const data=doc.data();
    setImageUrl(data.imageUrl)
    setUserName(data.name)
    setuserBio(data.bio)

});

    return (
        <div>
                  <ProfileCard image={imageUrl}  UserName={userName} Bio={userBio} ></ProfileCard>
        </div>
    )
}

export default Profile





