import React, { useEffect } from 'react'
import { Row,Col,Card } from 'antd';
import ProfileCard from './ProfileCard/card';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useContext,useState } from 'react';
import {AuthContext} from "../../routes/Auth"
import PostForm from './postForm/PostFrom';
import Topbar from '../../components/navBar/nav';

const { Meta } = Card;
const Profile = () => {
    const [imageUrl,setImageUrl] = useState()
    const [userName,setUserName] = useState()
    const [userBio,setuserBio] = useState()

const User = useContext(AuthContext);
const user = onSnapshot(doc(db, "usersData", User.currentUser.uid), (doc) => {
    const data=doc.data();
    setImageUrl(data.imageUrl)
    setUserName(data.name)
    setuserBio(data.bio)

});


    return (
        <div>
<Topbar></Topbar>
                  <Row type="flex" justify="center"  style={{minHeight: '100vh'}}>
                    <Col offset={18} >
                      <ProfileCard image={imageUrl}  UserName={userName} Bio={userBio} ></ProfileCard>
                      <hr/>
                      <h2> Post here</h2>
                      <PostForm />
                    </Col>


                    
                 
                  </Row>
        </div>
    )
}

export default Profile





